import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { ethers } from 'ethers'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { parseUnits } from 'ethers/lib/utils.js'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'

import { useTransactionModal } from '../../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import auctionMarketplaceABI from '../../../utils/abi/auctionMarketplaceABI.json'
import { tokensList } from '../../../constants/contract'
import { ArrElement } from '../../../constants/types'
import { getTokenDecimals } from '../../../utils/methods'
import { PENDING_MESSAGE, SUCCESS_MESSAGE } from '../../../utils/messaging'

type IMarketplaceCardProps = {
  setOnMarketplace: React.Dispatch<boolean>
  contractAddress: string
  isApproved: boolean
  handleApprove: () => Promise<void>
}

const MarketPlaceCard: React.FC<IMarketplaceCardProps> = ({
  setOnMarketplace,
  contractAddress,
  isApproved,
  handleApprove,
}) => {
  const { id } = useParams()
  const { address } = useAccount()
  const location = useLocation()
  const navigate = useNavigate()
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState(false)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  const [price, setPrice] = useState('')

  const handlePutOnSale = async () => {
    if (!address || !data || !selectedDropDown) return
    try {
      setTransaction({
        loading: true,
        status: 'pending',
        message: PENDING_MESSAGE,
      })
      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.fixedSale(
        id,
        parseUnits(
          price,
          await getTokenDecimals(selectedDropDown.address, data),
        ).toString(),
        selectedDropDown.address,
        contractAddress,
      )
      await tx.wait()
      setTransaction({
        loading: true,
        status: 'success',
        message: SUCCESS_MESSAGE,
      })
      navigate(`/${location.pathname.split('/')[1]}`)
    } catch (error) {
      console.log('------Error On Put on sale--------')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="on-marketplace-container">
      <BsArrowLeftCircle
        className="arrow-icon"
        onClick={() => {
          setOnMarketplace(false)
        }}
      />
      <p className="title">On Marketplace</p>
      <div className="on-marketplace-sub-container">
        <div className="content">
          <div className="content-left">
            <p>Select Charity Organisation From List</p>
            <p>Price</p>
          </div>
          <div className="content-right">
            <select></select>
            <div className="price-select-container">
              <div className="left">
                <input
                  type="number"
                  placeholder="price"
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <div className={!dropDown ? ' right' : 'right active'}>
                <div className="header" onClick={() => setDropDown(!dropDown)}>
                  <p>{selectedDropDown?.title}</p>
                  <IoIosArrowDown />
                </div>
                <div className={!dropDown ? 'body' : 'body active'}>
                  {tokensList.map((f, index) => {
                    return (
                      <p
                        key={index}
                        onClick={() => {
                          setSelectedDropDown(f)
                          setDropDown(false)
                        }}
                      >
                        {f.title}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
            <div>
              {!isApproved ? (
                <button
                  className="putOnSaleBtn"
                  onClick={() => handleApprove()}
                >
                  Approve
                </button>
              ) : (
                <button
                  className="putOnSaleBtn"
                  disabled={!price || !selectedDropDown}
                  onClick={handlePutOnSale}
                >
                  Put On Sale
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MarketPlaceCard
