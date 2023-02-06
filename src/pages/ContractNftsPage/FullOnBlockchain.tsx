import React, { ChangeEvent, useEffect, useState } from 'react'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'

import FooterBottom from 'components/FooterBottom/index'
import { fullOnBlockchainPageQuery } from 'constants/query'
import { IFullOnBlockchainArtToken } from 'constants/types'
import { formatAddress } from 'constants/variants'
import { useGetNftsByIdQuery } from 'store/slices/alchemyApiSlice'
import { ART_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'

import camera from 'assets/icon/Camera.svg'
import CardLoading from 'components/Loading/CardLoading'
import './ContractNftsPage.css'
import { Link } from 'react-router-dom'

interface IArtToken {
  id: string
  domainName: string
  link: string
  owner: {
    id: string
  }
  category: string
  checkBox: string[]
}
const Card: React.FC<IArtToken> = ({
  owner,
  id,
  domainName,
  category,
  checkBox,
}) => {
  const { data, isLoading } = useGetNftsByIdQuery({
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
    <>
      {checkBox.length <= 0 ? (
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
                <p>{category}</p>

                <p>Token Id</p>
                <p>#{id}</p>
                {/* <button style={{ width: '50px' }}>Get In</button> */}
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
        checkBox.includes(category) && (
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
                  <p>Token Id</p>
                  <p>#{id}</p>
                  {/* <button style={{ width: '50px' }}>Get In</button> */}
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

const FullOnBlockchainPage: React.FC = () => {
  const [artTokenCheckboxs, setArtTokenCheckBox] = useState<string[]>([])

  const [result] = useQuery<{
    fullOnBlockchainArtTokens: IFullOnBlockchainArtToken[]
  }>({
    query: fullOnBlockchainPageQuery,
  })

  const { data, fetching, error } = result

  const nftData = data?.fullOnBlockchainArtTokens ?? []

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (artTokenCheckboxs.includes(value.toLowerCase())) {
      setArtTokenCheckBox((f) =>
        f.filter((e) => e.toLowerCase() !== value.toLowerCase()),
      )
    } else {
      setArtTokenCheckBox((f) => f.concat(value.toLowerCase()))
    }
  }

  console.log(artTokenCheckboxs)

  return (
    <div>
      <div className="website-container" style={{ paddingTop: '51px' }}>
        <div className="website-container-left">
          <h2 className="heading">Full On Blockchain Art</h2>

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
                <Card
                  key={idx}
                  {...f}
                  checkBox={artTokenCheckboxs}
                  link={'/'}
                />
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

const lable = [{ label: 'file' }, { label: 'art' }, { label: 'other' }]
