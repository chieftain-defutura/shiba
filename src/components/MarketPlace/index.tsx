import React, { useState } from 'react'
import { useAccount, useSigner, erc721ABI, useContractRead } from 'wagmi'
import { ethers } from 'ethers'
import { useParams } from 'react-router-dom'

import { useTransactionModal } from '../../context/TransactionContext'
import { IoIosArrowDown } from 'react-icons/io'
import { BsArrowLeftCircle } from 'react-icons/bs'
import {
  MARKETPLACE_CONTRACT_ADDRESS,
  BONE_TOKEN_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from '../../utils/contractAddress'
import auctionMarketplaceABI from '../../utils/abi/auctionMarketplaceABI.json'
import { parseUnits } from 'ethers/lib/utils.js'

interface ITokenData {
  title: string
  address: string
  allowance: number
  decimal: string
}

const TokensList = [
  {
    title: 'Shi',
    address: SHI_TOKEN_ADDRESS,
    allowance: 0,
    decimal: '18',
  },
  {
    title: 'Shib',
    address: SHIB_TOKEN_ADDRESS,
    allowance: 0,
    decimal: '18',
  },
  {
    title: 'Leash',
    address: LEASH_TOKEN_ADDRESS,
    allowance: 0,
    decimal: '18',
  },
  {
    title: 'Bone',
    address: BONE_TOKEN_ADDRESS,
    allowance: 0,
    decimal: '18',
  },
  {
    title: 'Paw',
    address: PAW_TOKEN_ADDRESS,
    allowance: 0,
    decimal: '18',
  },
]

const MarketPlace: React.FC<{ setOnMarketplace: React.Dispatch<any> }> = ({
  setOnMarketplace,
}) => {
  const { id } = useParams()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const { data } = useSigner()
  const [dropDown, setDropDown] = useState<any>(null)
  const [selectedDropDown, setSelectedDropDown] = useState<ITokenData>()
  const [price, setPrice] = useState('')

  const { data: readData } = useContractRead({
    address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    abi: erc721ABI,
    functionName: 'isApprovedForAll',
    args: [address as any, MARKETPLACE_CONTRACT_ADDRESS],
  })

  const handleApproveToken = async () => {
    if (!data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        erc721ABI,
        data,
      )
      const tx = await contract.setApprovalForAll(
        MARKETPLACE_CONTRACT_ADDRESS,
        true,
      )
      await tx?.wait()

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handlePutOnSale = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.fixedSale(
        id,
        parseUnits(price, selectedDropDown?.decimal).toString(),
        selectedDropDown?.address,
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
      )
      await tx.wait()
      console.log('added')
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log('Error sending File to IPFS:')
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="on-marketplace-container">
      <BsArrowLeftCircle
        className="arrow-icon"
        onClick={() => {
          setOnMarketplace(null)
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
                  {TokensList.map((f, index) => {
                    return (
                      <p key={index} onClick={() => setSelectedDropDown(f)}>
                        {f.title}
                      </p>
                    )
                  })}
                </div>
              </div>
            </div>
            <div>
              {!readData ? (
                <button
                  className="putOnSaleBtn"
                  onClick={() => handleApproveToken()}
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

export default MarketPlace
