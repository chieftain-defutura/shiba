import React from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { useTransactionModal } from '../../context/TransactionContext'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import auctionMarketplaceABI from '../../utils/abi/auctionMarketplaceABI.json'
import cardImg from '../../assets/img/card-3.png'

interface IAuctionSaleCard {
  price: any
  auctionId: number
  erc20TokenAddress: string
}

const AuctionSaleCard: React.FC<IAuctionSaleCard> = ({
  erc20TokenAddress,
  auctionId,
  price,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  console.log(erc20TokenAddress)
  const handleSale = async () => {
    if (!address || !data) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(
        erc20TokenAddress,
        erc20ABI,
        data,
      )

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
      const tx = await contract.placeBid(auctionId, price)
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
          <button onClick={handleSale}>{formatEther(price)} ETH</button>
        </div>
      </div>
    </div>
  )
}

export default AuctionSaleCard