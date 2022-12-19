import React, { useState } from 'react'
import { formatEther } from 'ethers/lib/utils.js'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import ReactCountdown, { CountdownRenderProps } from 'react-countdown'
import Close from '../../assets/icon/close.svg'

import { useTransactionModal } from '../../context/TransactionContext'
import { MARKETPLACE_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import auctionMarketplaceABI from '../../utils/abi/auctionMarketplaceABI.json'
import cardImg from '../../assets/img/card-3.png'
import Modal from '../Model'
import { IAuctionNft } from '../../constants/types'
import Button from '../Button'

const AuctionSaleCard: React.FC<IAuctionNft> = ({
  erc20Token,
  auctionId,
  price,
  owner,
  highestBid,
  endTime,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [open, setOpen] = useState(false)
  const [placeBid, setPlaceBid] = useState('')

  const auctionPrice = Number(formatEther(highestBid ? highestBid : price))

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
      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

  const handleRemoveSale = async () => {
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

  const renderer = ({
    completed,
    days,
    minutes,
    seconds,
    hours,
  }: CountdownRenderProps) => {
    if (completed) {
      return (
        <>
          <div className="card-auction">
            <p>Auction Ended.</p>
          </div>
          <div className="card-btn">
            {address?.toLowerCase() === owner.toLowerCase() ? (
              <>
                <button onClick={handleFinishAuction}> Finish Auction</button>
                <button onClick={handleRemoveSale}>Remove Sale</button>
              </>
            ) : null}
          </div>
        </>
      )
    }
    return (
      <>
        <div className="card-auction">
          <p>Auction ends in</p>
          <p>
            {days}d :{hours}h :{minutes}m :{seconds}s
          </p>
        </div>
        <div className="card-btn">
          {address?.toLowerCase() === owner.toLowerCase() ? (
            <>
              <button onClick={handleFinishAuction}> Finish Auction</button>
              <button onClick={handleRemoveSale}>Remove Sale</button>
            </>
          ) : (
            <button onClick={() => setOpen(true)}>place bid</button>
          )}
        </div>
      </>
    )
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
              {auctionPrice} {erc20Token.symbol}
            </button>
          </div>
          <ReactCountdown date={Number(endTime) * 1000} renderer={renderer} />

          <Modal isOpen={open} handleClose={() => setOpen(false)}>
            <div className="modal-close-icon">
              <img onClick={() => setOpen(false)} src={Close} alt="" />
            </div>
            <div className="modal-reserved">
              <h3>Reserved price</h3>
              <p>
                {auctionPrice} {erc20Token.symbol}
              </p>
            </div>
            <div className="modal-action">
              <label htmlFor="">Price:</label>
              <input
                type="number"
                placeholder="Price"
                name="price"
                onChange={(e) => setPlaceBid(e.target.value)}
              />
            </div>
            <div className="modal-btn">
              <Button
                variant="primary"
                disabled={!placeBid || Number(placeBid) <= auctionPrice}
                onClick={handleSale}
              >
                Place Bid
              </Button>
            </div>
          </Modal>
        </div>
      </div>
    </div>
  )
}

export default AuctionSaleCard
