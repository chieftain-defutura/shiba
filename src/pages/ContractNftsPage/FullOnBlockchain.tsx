import React, { useEffect, useState } from 'react'
import { useQuery } from 'urql'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { fullOnBlockchainPageQuery } from '../../constants/query'
import { IFullOnBlockchainArtToken } from '../../constants/types'
import { formatAddress } from '../../constants/variants'
import { useGetNftsByIdQuery } from '../../store/slices/alchemyApiSlice'
import { ART_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import Loading from '../../components/Loading/Loading'

import cardImg from '../../assets/img/card-3.png'
import './ContractNftsPage.css'

const Card: React.FC<IFullOnBlockchainArtToken> = ({
  owner,
  id,
  domainName,
}) => {
  const { data } = useGetNftsByIdQuery({
    tokenId: id,
    contractAddress: ART_NFT_CONTRACT_ADDRESS,
  })
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    if (!data) return

    const image = new Image()
    image.src = data?.metadata?.logo
    image.onerror = () => setImageError(true)
  }, [data])

  return (
    <div className="website-card-container">
      <div className="card">
        <div className="card-top">
          {imageError ? (
            <img src={cardImg} alt="" />
          ) : (
            <img src={data?.metadata?.logo} alt="" />
          )}
        </div>
        <div className="card-center">
          <h3 className="title">Owner</h3>
          <h4 className="sub-title">{formatAddress(owner.id)}</h4>
        </div>
        <div className="card-bottom">
          <p>Token Id</p>
          <p>#{id}</p>
        </div>
      </div>
      <div style={{ padding: '5px 0' }}>
        <p style={{ fontSize: '14px' }}>Domain:</p>
        <p style={{ fontSize: '14px', wordBreak: 'break-all' }}>
          <b>{domainName}</b>
        </p>
      </div>
    </div>
  )
}

const FullOnBlockchainPage: React.FC = () => {
  const [result] = useQuery<{
    fullOnBlockchainArtTokens: IFullOnBlockchainArtToken[]
  }>({
    query: fullOnBlockchainPageQuery,
  })

  const { data, fetching, error } = result

  const nftData = data?.fullOnBlockchainArtTokens ?? []

  return (
    <div>
      <Navigation />
      <div className="website-container" style={{ paddingTop: '51px' }}>
        <div className="website-container-left">
          <h2 className="heading">Full On Blockchain Art</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="shib">Art</label>
              <input id="shib" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="shib">File</label>
              <input id="shib" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="shib">Other</label>
              <input id="shib" type="checkbox" />
            </div>
          </div>
        </div>
        <div>
          {fetching ? (
            <div className="loading">
              <Loading />
            </div>
          ) : error ? (
            <div className="error-msg">
              <p>something went wrong</p>
            </div>
          ) : !nftData.length ? (
            <div className="error-msg">
              <p>No Nfts Here</p>
            </div>
          ) : (
            <div className="website-container-right">
              {nftData.map((f, idx: number) => (
                <Card key={idx} {...f} />
              ))}
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default FullOnBlockchainPage
