import React, { useState } from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { useTransactionModal } from '../../context/TransactionContext'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import auctionMarketplaceABI from '../../utils/abi/auctionMarketplaceABI.json'
import cardImg from '../../assets/img/card-3.png'
import Modal from '../Model'
import '../../components/AuctionSaleCard/AuctionSaleCard.scss'

interface IAuctionSaleCard {
  price: any
  auctionId: number
  owner: string
  highestBid: string | null
  erc20Token: {
    id: string
    symbol: string
    decimals: string
  }
}

const AuctionSaleCard: React.FC<IAuctionSaleCard> = ({
  erc20Token,
  auctionId,
  price,
  owner,
  highestBid,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [open, setOpen] = useState(false)
  const [placeBid, setPLaceBit] = useState('')

  const handleSale = async () => {
    if (!address || !data) return

    try {
      setOpen(false)
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
      console.log(auctionId)
      const tx = await contract.placeBid(
        auctionId,
        ethers.utils.parseUnits(placeBid, erc20Token.decimals),
      )
      await tx.wait()
      console.log('added')

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleFinishAuction = async () => {
    if (!address || !data) return

    try {
      setTransaction({ loading: true, status: 'pending' })

      const contract = new ethers.Contract(
        MARKETPLACE_CONTRACT_ADDRESS,
        auctionMarketplaceABI,
        data,
      )
      const tx = await contract.finishAuction(auctionId)
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
          <div className="card-price">
            <p>Reserved price</p>
            <button>
              {formatEther(highestBid ? highestBid : price)} {erc20Token.symbol}
            </button>
          </div>
          <div className="card-auction">
            <p>Auction ends in 5 days</p>
          </div>
          <div className="card-btn">
            {address?.toLowerCase() === owner.toLowerCase() ? (
              <button onClick={handleFinishAuction}> Finish Auction</button>
            ) : (
              <button onClick={() => setOpen(true)}>place bid</button>
            )}
          </div>

          <Modal isOpen={open}>
            <div onClick={() => setOpen(false)}> X</div>
            <div>
              <input
                type="text"
                onChange={(e) => setPLaceBit(e.target.value)}
              />
              <button onClick={handleSale}>Place Bit</button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default AuctionSaleCard
