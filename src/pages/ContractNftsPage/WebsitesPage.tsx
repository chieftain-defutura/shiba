import React, { useEffect, useState } from 'react'
import { useQuery } from 'urql'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { websitePageQuery } from '../../constants/query'
import cardImg from '../../assets/img/card-3.png'
import './ContractNftsPage.css'
import { IWebsiteToken } from '../../constants/types'
import { formatAddress } from '../../constants/variants'
import { useGetNftsByIdQuery } from '../../store/slices/alchemyApiSlice'
import { WEBSITE_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'

const Card: React.FC<IWebsiteToken> = ({ owner, id, domainName }) => {
  const { data } = useGetNftsByIdQuery({
    tokenId: id,
    contractAddress: WEBSITE_NFT_CONTRACT_ADDRESS,
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
          {/* <Link to={`/my-digital-shop/${f}`}>
  <button style={{ width: "50px" }}>Get In</button>
</Link> */}
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
      <Navigation />
      <div className="website-container">
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
            'loading...'
          ) : error ? (
            'something went wrong'
          ) : !nftData.length ? (
            'No Nfts Here'
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
