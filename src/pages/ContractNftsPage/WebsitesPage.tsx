import React, { ChangeEvent, useEffect, useState } from 'react'
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

interface Token {
  id: string
  domainName: string
  owner: {
    id: string
  }
  category: string
  websiteCheckboxs: string[]
}

const Card: React.FC<Token> = ({
  owner,
  id,
  domainName,
  category,
  websiteCheckboxs,
}) => {
  const { data, isLoading } = useGetNftsByIdQuery({
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
    <>
      {websiteCheckboxs.length <= 0 ? (
        <Link to={`/site/${domainName}`}>
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
                {category}
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
        </Link>
      ) : (
        websiteCheckboxs.includes(category) && (
          <Link to={`/site/${domainName}`}>
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
                  {category}
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
          </Link>
        )
      )}
    </>
  )
}

const WebsitesPage: React.FC = () => {
  const [websiteCheckboxs, setWebsiteCheckBox] = useState<string[]>([])

  const [result] = useQuery<{ websiteTokens: IWebsiteToken[] }>({
    query: websitePageQuery,
  })

  const { data, fetching, error } = result

  const nftData = data?.websiteTokens ?? []
  console.log(nftData)

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (websiteCheckboxs.includes(value.toLowerCase())) {
      setWebsiteCheckBox((f) =>
        f.filter((e) => e.toLowerCase() !== value.toLowerCase()),
      )
    } else {
      setWebsiteCheckBox((f) => f.concat(value.toLowerCase()))
    }
  }

  console.log(websiteCheckboxs)

  return (
    <div>
      <div className="website-container" style={{ paddingTop: '51px' }}>
        <div className="website-container-left">
          <h2 className="heading">Websites</h2>

          <div className="check-box-container">
            {lable.map((f, index) => (
              <div className="checkbox-content" key={index}>
                <label htmlFor="shib">{f.label}</label>
                <input
                  id="shib"
                  value={f.label}
                  type="checkbox"
                  onChange={handleChange}
                />
              </div>
            ))}
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
                <Card key={idx} {...f} websiteCheckboxs={websiteCheckboxs} />
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

const lable = [
  { label: 'www' },
  { label: 'file' },
  { label: 'art' },
  { label: 'other' },
]
