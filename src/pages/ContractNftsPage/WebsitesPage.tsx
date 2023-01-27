import React, { useEffect, useState } from 'react'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'

import FooterBottom from 'components/FooterBottom/index'
import { websitePageQuery } from 'constants/query'
import { IWebsiteToken } from 'constants/types'
import { formatAddress } from 'constants/variants'
import { useGetNftsByIdQuery } from 'store/slices/alchemyApiSlice'
import { WEBSITE_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'
import camera from 'assets/icon/Camera.svg'
import './ContractNftsPage.css'
import CardLoading from 'components/Loading/CardLoading'
import { Link } from 'react-router-dom'
import { getApp } from 'utils/helper'

const Card: React.FC<IWebsiteToken> = ({ owner, id, domainName }) => {
  const read = getApp()
  const { data, isLoading } = useGetNftsByIdQuery({
    tokenId: id,
    contractAddress: WEBSITE_NFT_CONTRACT_ADDRESS,
  })
  const [imageError, setImageError] = useState(false)
  console.log(read)
  useEffect(() => {
    if (!data) return

    const image = new Image()
    image.src = data?.metadata?.logo
    image.onerror = () => setImageError(true)
  }, [data])

  // useEffect(() => {
  //   let host = window.location.host
  //   const arr = host.split('.').slice(0, host.includes('localhost') ? -1 : -2)
  //   if (arr.length > 0) {
  //     host =
  //       window.location.protocol +
  //       '//' +
  //       domainName +
  //       '.' +
  //       window.location.host
  //   }
  // }, [])
  return (
    <div className="website-card-container">
      <div className="card">
        <div className="card-top">
          {isLoading ? (
            <Skeleton height={'100%'} />
          ) : !data || imageError ? (
            <img src={camera} alt="card" />
          ) : (
            <img
              src={data?.metadata?.logo}
              alt="card"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="card-center">
          <h3 className="title">Owner</h3>
          <h4 className="sub-title">{formatAddress(owner.id)}</h4>
        </div>
        <div className="card-bottom">
          <p>Token Id</p>
          <p>#{id}</p>
          <a
            href={`${
              window.location.protocol +
              '//' +
              domainName +
              '.' +
              window.location.host
            }`}
          >
            <button style={{ width: '50px' }}>Get In</button>
          </a>
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

const WebsitesPage: React.FC = () => {
  const [result] = useQuery<{ websiteTokens: IWebsiteToken[] }>({
    query: websitePageQuery,
  })

  const { data, fetching, error } = result

  const nftData = data?.websiteTokens ?? []

  return (
    <div>
      <div className="website-container" style={{ paddingTop: '51px' }}>
        <div className="website-container-left">
          <h2 className="heading">Websites</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="shib">News</label>
              <input id="shib" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="shib">Portfolio</label>
              <input id="shib" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="shib">Brochure</label>
              <input id="shib" type="checkbox" />
            </div>
          </div>
        </div>
        <div>
          {fetching ? (
            <div>
              <CardLoading />
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

export default WebsitesPage
