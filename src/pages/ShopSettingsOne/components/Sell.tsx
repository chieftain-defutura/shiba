import { ethers } from 'ethers'
import React, { useCallback, useEffect, useState } from 'react'
import { erc721ABI, useAccount, useSigner } from 'wagmi'

import { useTransactionModal } from '../../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from '../../../utils/messaging'
import AuctionCard from './AuctionCard'
import MarketPlaceCard from './MarketPlaceCard'

import cardImgNine from '../../../assets/img/card-12.png'
import cardImgTen from '../../../assets/img/card-13.png'
import { useAppDispatch, useAppSelector } from '../../../store/store'
import { fetchCarityList } from '../../../store/slices/generalSlice'
import { BsArrowLeftCircle } from 'react-icons/bs'

const Sell: React.FC<{
  contractAddress: string
  setClickCard: React.Dispatch<any>
}> = ({ contractAddress, setClickCard }) => {
  const [onMarketPlace, setOnMarketPlace] = useState(false)
  const [onAction, setOnAction] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const dispatch = useAppDispatch()
  const isFetched = useAppSelector((store) => store.general.isFetched)

  const handleGetIsApproved = useCallback(async () => {
    if (!signerData || !address) return

    const tokenContract = new ethers.Contract(
      contractAddress,
      erc721ABI,
      signerData,
    )
    setIsApproved(
      await tokenContract.isApprovedForAll(
        address,
        MARKETPLACE_CONTRACT_ADDRESS,
      ),
    )
  }, [signerData, address, contractAddress])

  const handleCharityList = useCallback(async () => {
    if (!signerData || isFetched) return
    dispatch(fetchCarityList({ data: signerData }))
  }, [signerData, isFetched, dispatch])

  useEffect(() => {
    handleGetIsApproved()
    handleCharityList()
  }, [handleGetIsApproved, handleCharityList])

  const handleApprove = async () => {
    if (!signerData) return
    try {
      setTransaction({
        loading: true,
        status: 'pending',
        message: PENDING_MESSAGE,
      })
      const tokenContract = new ethers.Contract(
        contractAddress,
        erc721ABI,
        signerData,
      )
      const tx = await tokenContract.setApprovalForAll(
        MARKETPLACE_CONTRACT_ADDRESS,
        true,
      )
      await tx.wait()
      setIsApproved(true)
      setTransaction({
        loading: true,
        status: 'success',
        message: SUCCESS_MESSAGE,
      })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <>
      <div className="sell-container" style={{ width: '110%' }}>
        {!onMarketPlace && !onAction && (
          <BsArrowLeftCircle
            className="arrow-icon"
            style={{ marginTop: '18px' }}
            onClick={() => setClickCard(null)}
          />
        )}
        <h2 className="title">Put On Sale</h2>
        {!onMarketPlace && !onAction && (
          <div className="put-on-sale-sub-menu-container">
            <div className="card">
              <div className="card-left">
                <img src={cardImgNine} alt="card" />
              </div>
              <div className="card-right">
                <p className="card-title">On MarketPlace</p>
                <p className="desc">
                  Lorem Ipsum has been the industry standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
                <button onClick={() => setOnMarketPlace(true)}>Demo</button>
              </div>
            </div>
            <div className="card">
              <div className="card-left">
                <img src={cardImgTen} alt="card" />
              </div>
              <div className="card-right">
                <p className="card-title">On Auction</p>
                <p className="desc">
                  Lorem Ipsum has been the industry standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book.
                </p>
                <button onClick={() => setOnAction(true)}>Demo</button>
              </div>
            </div>
          </div>
        )}
        {onMarketPlace && (
          <MarketPlaceCard
            setOnMarketplace={setOnMarketPlace}
            contractAddress={contractAddress}
            isApproved={isApproved}
            handleApprove={handleApprove}
            setClickCard={setClickCard}
          />
        )}
        {onAction && (
          <AuctionCard
            setOnAction={setOnAction}
            contractAddress={contractAddress}
            isApproved={isApproved}
            handleApprove={handleApprove}
            setClickCard={setClickCard}
          />
        )}
      </div>
    </>
  )
}

export default Sell
