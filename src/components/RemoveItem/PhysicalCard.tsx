import React, { useState } from 'react'
import { ethers } from 'ethers'
import { useAccount, useSigner } from 'wagmi'
import Skeleton from 'react-loading-skeleton'
import { formatUnits } from 'ethers/lib/utils.js'

import { useTransactionModal } from '../../context/TransactionContext'
import { PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import physicalShopABI from '../../utils/abi/physicalShopABI.json'
import cameraImg from '../../assets/icon/Camera.svg'
import { IRemovePhysicalItem } from '../../constants/types'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import { useNavigate } from 'react-router-dom'

const PhysicalCard: React.FC<IRemovePhysicalItem> = ({
  id: itemId,
  shopDetails: { id: shopId },
  erc20Token,
  price,
  quantity,
  itemName,
  category,
  metadata,
}) => {
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const navigate = useNavigate()
  const { setTransaction, loading } = useTransactionModal()
  const [imageError, setImageError] = useState(false)
  const { isLoading, data } = useGetIpfsDataQuery({ hash: metadata })

  const handleRemoveItem = async () => {
    if (!address || !signerData) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
        physicalShopABI,
        signerData,
      )
      const tx = await contract.removeItem(shopId, itemId)
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
    <div>
      <div className="remove-item-card">
        {isLoading ? (
          <div className="card-top">
            <Skeleton height={'100%'} />
          </div>
        ) : !data || imageError ? (
          <div className="card-top">
            <img src={cameraImg} alt="card" />
          </div>
        ) : (
          <div className="card-top">
            <img
              src={data?.logo}
              alt="card"
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <div className="card-center">
          <h3 className="title">{itemName}</h3>
          <h4 className="sub-title">{category}</h4>
        </div>
        <div className="card-bottom">
          <p>Fixed price</p>
          <button>
            {formatUnits(price, erc20Token.decimals)} {erc20Token.symbol}
          </button>
        </div>
        <div className="card-overlay">
          <button onClick={() => navigate(`/physical-item-details/${itemId}`)}>
            Details
          </button>
          <button disabled={loading} onClick={handleRemoveItem}>
            Remove Shop
          </button>
        </div>
      </div>
      <div className="remove-card-bottom">
        <p>Name: {itemName}</p>
        <p>Quantity: {quantity}</p>
      </div>
    </div>
  )
}

export default PhysicalCard
