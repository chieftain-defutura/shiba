import React, { useState } from 'react'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import ReactCountdown, { CountdownRenderProps } from 'react-countdown'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'urql'
import { formatEther } from 'ethers/lib/utils.js'

import { useTransactionModal } from 'context/TransactionContext'
import {
  DOMAIN_NFT_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import auctionMarketplaceABI from 'utils/abi/auctionMarketplaceABI.json'
import { IAuctionNft } from 'constants/types'
import Button from '../Button'
import Modal from '../Model'
import { useAppSelector } from '../../store/store'
import { formatTokenUnits } from '../../utils/formatters'
import Close from 'assets/icon/close.svg'
import camera from 'assets/icon/Camera.svg'
import { useGetNftsByIdQuery } from 'store/slices/alchemyApiSlice'
import { formatAddress } from 'constants/variants'
import Loading from '../Loading'

const AuctionSaleCard: React.FC<IAuctionNft> = ({
  erc20Token,
  auctionId,
  price,
  owner,
  id,
  highestBid,
  endTime,
  tokenId,
  erc721TokenAddress,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const [open, setOpen] = useState(false)
  const [placeBid, setPlaceBid] = useState('')
  const user = useAppSelector((store) => store.user)
  const auctionPrice = Number(formatEther(highestBid ? highestBid : price))

  const handleSale = async () => {
    if (!address || !data) return

    try {
      setOpen(false)
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(erc20Token.id, erc20ABI, data)

      if (
        user[erc20Token.id.toLowerCase()] <
        Number(formatTokenUnits(price, erc20Token.decimals))
      )
        return setTransaction({
          loading: true,
          status: 'error',
          message: 'Insufficient balance',
        })

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
          <div className="card-btns">
            {address?.toLowerCase() === owner.toLowerCase() ? (
              <>
                <button onClick={handleFinishAuction}> Finish Auction</button>
                <button onClick={handleRemoveSale}>Remove Sale</button>
              </>
            ) : (
              <button onClick={handleFinishAuction}> Finish Auction</button>
            )}
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
        <div className="card-btns">
          {address?.toLowerCase() === owner.toLowerCase() ? (
            <>
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
        {erc721TokenAddress.toLowerCase() ===
        DOMAIN_NFT_CONTRACT_ADDRESS.toLowerCase() ? (
          <DomainImageCard owner={owner} tokenId={tokenId} />
        ) : (
          <Card
            tokenId={tokenId}
            erc721TokenAddress={erc721TokenAddress}
            owner={owner}
          />
        )}
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

const DomainImageCard: React.FC<{
  tokenId: string
  owner: string
}> = ({ owner }) => {
  const [result] = useQuery({
    query: `query($id: ID!){
    domainToken(id:$id){
      domainName
    }
  }`,
  })
  const { fetching, data } = result
  console.log(data)
  return (
    <>
      <div className="card-top">
        <h3>{fetching ? <Loading /> : data?.domainName}</h3>
      </div>
      <div className="card-center">
        <h3 className="title">Owner</h3>
        <h4 className="sub-title">{formatAddress(owner)}</h4>
      </div>
    </>
  )
}

const Card: React.FC<{
  tokenId: string
  erc721TokenAddress: string
  owner: string
}> = ({ tokenId, erc721TokenAddress, owner }) => {
  const [imageError, setImageError] = useState(false)
  const { data, isLoading } = useGetNftsByIdQuery({
    tokenId,
    contractAddress: erc721TokenAddress,
  })

  return (
    <>
      {isLoading ? (
        <div className="card-loader">
          <Skeleton height={'100%'} />
        </div>
      ) : !data?.metadata?.logo || imageError ? (
        <div className="card-top">
          <img src={camera} alt="card" />
        </div>
      ) : (
        <div className="card-top">
          <img
            src={data?.metadata?.logo}
            alt="card"
            onError={() => setImageError(true)}
          />
        </div>
      )}
      <div className="card-center">
        <h3 className="title">
          {isLoading ? (
            <Skeleton />
          ) : !data?.metadata?.shopName ? (
            'unnamed'
          ) : (
            data?.metadata?.shopName
          )}
        </h3>
        <h4 className="sub-title">{formatAddress(owner)}</h4>
      </div>
    </>
  )
}

export default AuctionSaleCard
