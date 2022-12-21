import React from 'react'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'

import { formatUnits } from 'ethers/lib/utils.js'
import { useTransactionModal } from '../../context/TransactionContext'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import { IGoodsDigitalItem } from '../../constants/types'
import cardImg from '../../assets/img/card-3.png'
// import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'

const DigitalItem: React.FC<IGoodsDigitalItem> = ({
  erc20Token,
  price,
  id,
  metadata,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  // const { data: IPFSdata ,isLoading} = useGetIpfsDataQuery({ hash: metadata })
  // console.log(IPFSdata)

  const handleBuy = async () => {
    if (!address || !data) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(erc20Token.id, erc20ABI, data)

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
        data,
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
        <div className="card-top">
          <img src={cardImg} alt="card" />
        </div>
        <div className="card-center">
          <h3 className="title">The Holy Grail</h3>
          <h4 className="sub-title">Pixart Motion</h4>
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
