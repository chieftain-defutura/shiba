import React, { useState } from 'react'
import { ethers } from 'ethers'
import { erc20ABI, useAccount, useSigner } from 'wagmi'

import { formatUnits } from 'ethers/lib/utils.js'
import { useTransactionModal } from 'context/TransactionContext'
import {
  DOMAIN_NFT_CONTRACT_ADDRESS,
  MARKETPLACE_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import auctionMarketplaceABI from 'utils/abi/auctionMarketplaceABI.json'
import { IFixedSale } from 'constants/types'
import './FixedSaleCard.scss'
import { useQuery } from 'urql'
import Loading from '../Loading'
import { formatAddress } from 'constants/variants'
import { useGetNftsByIdQuery } from 'store/slices/alchemyApiSlice'
import Skeleton from 'react-loading-skeleton'
import camera from 'assets/icon/Camera.svg'
import { useAppSelector } from 'store/store'
import { formatTokenUnits } from 'utils/formatters'

const FixedSaleCard: React.FC<IFixedSale> = ({
  erc20Token,
  auctionId,
  price,
  owner,
  tokenId,
  erc721TokenAddress,
}) => {
  const { data } = useSigner()
  const { address } = useAccount()
  const { setTransaction } = useTransactionModal()
  const user = useAppSelector((store) => store.user)

  const handleSale = async () => {
    if (!address || !data) return

    if (
      user[erc20Token.id.toLowerCase()] <
      Number(formatTokenUnits(price, erc20Token.decimals))
    )
      return setTransaction({
        loading: true,
        status: 'error',
        message: 'Insufficient balance',
      })

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
      console.log(auctionId)

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
        {erc721TokenAddress.toLowerCase() ===
        DOMAIN_NFT_CONTRACT_ADDRESS.toLowerCase() ? (
          <MarketPlaceImageCard owner={owner} tokenId={tokenId} />
        ) : (
          <Card
            tokenId={tokenId}
            erc721TokenAddress={erc721TokenAddress}
            owner={owner}
          />
        )}
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

const MarketPlaceImageCard: React.FC<{
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

export default FixedSaleCard
