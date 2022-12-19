import React, { useState } from 'react'
import { useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import { ethers } from 'ethers'
import { useTransactionModal } from '../../../context/TransactionContext'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { parseUnits } from 'ethers/lib/utils.js'

import { MARKETPLACE_CONTRACT_ADDRESS } from '../../../utils/contractAddress'
import auctionMarketplaceABI from '../../../utils/abi/auctionMarketplaceABI.json'
import { ArrElement } from '../../../constants/types'
import { tokensList } from '../../../constants/contract'
import { getTokenDecimals } from '../../../utils/methods'

type IAuctionCardProps = {
  setOnAction: React.Dispatch<boolean>
  contractAddress: string
  isApproved: boolean
  handleApprove: () => Promise<void>
}

const AuctionCard: React.FC<IAuctionCardProps> = ({
  setOnAction,
  contractAddress,
  isApproved,
  handleApprove,
}) => {
  const { id } = useParams()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState(false)
  const [selectedDropDown, setSelectedDropDown] =
    useState<ArrElement<typeof tokensList>>()
  const [price, setPrice] = useState('')
  const [days, setDays] = useState('')

  const handlePutOnSale = async () => {
    if (!address || !data || !selectedDropDown) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.createSaleAuction(
        id,
        parseUnits(
          price,
          await getTokenDecimals(selectedDropDown.address, data),
        ).toString(),
        selectedDropDown?.address,
        Number(days),
        contractAddress,
      )
      await tx.wait()
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log('------Error On Put on Auction--------')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <>
      <div className="on-marketplace-container">
        <BsArrowLeftCircle
          className="arrow-icon"
          onClick={() => {
            setOnAction(false)
          }}
        />

        <p className="title">On Auction</p>
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
                    placeholder="price"
                    onChange={(e) => setPrice(e.target.value)}
                  />
                </div>

                <div className={!dropDown ? ' right' : 'right active'}>
                  <div
                    className="header"
                    onClick={() => setDropDown(!dropDown)}
                  >
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
                <select onChange={(e) => setDays(e.target.value)}>
                  <option value="">select an option</option>
                  <option value="1">1</option>
                  <option value="5">3</option>
                  <option value="7">7</option>
                  <option value="custom">Custom</option>
                </select>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-around',
                  gap: '10px',
                }}
              >
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
                    disabled={!price || !selectedDropDown || !days}
                    onClick={handlePutOnSale}
                  >
                    Put On Sale
                  </button>
                )}
                {days === 'custom' && (
                  <input
                    style={{
                      width: '100%',
                    }}
                    onChange={(e) => setDays(e.target.value)}
                    type="text"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default AuctionCard
