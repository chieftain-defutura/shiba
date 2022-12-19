import { ethers } from 'ethers'
import React, { useCallback, useEffect, useState } from 'react'
import { erc721ABI, useAccount, useSigner } from 'wagmi'

import cardImgNine from '../../../assets/img/card-12.png'
import cardImgTen from '../../../assets/img/card-13.png'
import { useTransactionModal } from '../../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import AuctionCard from './AuctionCard'
import MarketPlaceCard from './MarketPlaceCard'

const Sell: React.FC<{ contractAddress: string }> = ({ contractAddress }) => {
  const [onMarketPlace, setOnMarketPlace] = useState(false)
  const [onAction, setOnAction] = useState(false)
  const [isApproved, setIsApproved] = useState(false)
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()

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

  useEffect(() => {
    handleGetIsApproved()
  }, [handleGetIsApproved])

  const handleApprove = async () => {
    if (!signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
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
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <>
      {!onMarketPlace && !onAction && (
        <div className="put-on-sale-sub-menu-container">
          <div className="card">
            <div className="card-left">
              <img src={cardImgNine} alt="card" />
            </div>
            <div className="card-right">
              <p className="card-title">On MarketPlace</p>
              <p className="desc">
                Lorem Ipsum has been the industry standard dummy text ever since
                the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
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
                Lorem Ipsum has been the industry standard dummy text ever since
                the 1500s, when an unknown printer took a galley of type and
                scrambled it to make a type specimen book.
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
        />
      )}
      {onAction && (
        <AuctionCard
          setOnAction={setOnAction}
          contractAddress={contractAddress}
          isApproved={isApproved}
          handleApprove={handleApprove}
        />
      )}
    </>
  )
}

export default Sell
