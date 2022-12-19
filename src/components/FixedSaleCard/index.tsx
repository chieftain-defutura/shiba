import React from 'react'
import { formatUnits } from 'ethers/lib/utils.js'
import { useTransactionModal } from '../../context/TransactionContext'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import auctionMarketplaceABI from '../../utils/abi/auctionMarketplaceABI.json'
import cardImg from '../../assets/img/card-3.png'
import './FixedSaleCard.scss'
import { IFixedSale } from '../../constants/types'

const FixedSaleCard: React.FC<IFixedSale> = ({
  erc20Token,
  auctionId,
  price,
  owner,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const handleSale = async () => {
    if (!address || !data) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(erc20Token.id, erc20ABI, data)

      const allowance = Number(
        (
          await erc20Contract.allowance(address, MARKETPLACE_CONTRACT_ADDRESS)
        ).toString(),
      )

      if (allowance <= 0) {
        const tx = await erc20Contract.approve(
          MARKETPLACE_CONTRACT_ADDRESS,
          ethers.constants.MaxUint256,
        )
        await tx.wait()
      }

      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.finishFixedSale(auctionId)
      await tx.wait()
      console.log('saled')
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleRemove = async () => {
    if (!address || !data) return
    try {
      setTransaction({ loading: true, status: 'pending' })
      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.removeSale(auctionId)
      await tx.wait()

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
        <div className="cards-bottom">
          <p>Fixed price</p>
          <button style={{ width: '80%' }}>
            {formatUnits(price, erc20Token.decimals)} {erc20Token.symbol}
          </button>

          {address?.toLowerCase() === owner.toLowerCase() ? (
            <button onClick={handleRemove} style={{ width: '80%' }}>
              Remove Sale
            </button>
          ) : (
            <button onClick={handleSale} style={{ width: '80%' }}>
              buy
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default FixedSaleCard
