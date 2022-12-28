import React, { useState } from 'react'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import Skeleton from 'react-loading-skeleton'
import { formatUnits } from 'ethers/lib/utils.js'

import { useTransactionModal } from '../../context/TransactionContext'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { IGoodsDigitalItem } from '../../constants/types'
import cameraImg from '../../assets/icon/Camera.svg'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'

const DigitalItem: React.FC<IGoodsDigitalItem> = ({
  erc20Token,
  price,
  id,
  metadata,
  itemName,
  category,
}) => {
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [imageError, setImageError] = useState(false)
  const { isLoading, data } = useGetIpfsDataQuery({ hash: metadata })

  const handleBuy = async () => {
    if (!address || !signerData) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(
        erc20Token.id,
        erc20ABI,
        signerData,
      )

      const allowance = Number(
        (
          await erc20Contract.allowance(
            address,
            DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
          )
        ).toString(),
      )

      if (allowance <= 0) {
        const tx = await erc20Contract.approve(
          DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
          ethers.constants.MaxUint256,
        )
        await tx.wait()
      }

      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        signerData,
      )
      const tx = await contract.buyItem(id)
      await tx.wait()
      console.log('added')

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  return (
    <div className="marketplace-card-container">
      <div className="card">
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
          <button
            onClick={(e) => {
              e.stopPropagation()
              handleBuy()
            }}
          >
            Buy
          </button>
        </div>
      </div>
    </div>
  )
}

export default DigitalItem
