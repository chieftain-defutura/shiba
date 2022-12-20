import React, { useEffect, useState } from 'react'
import { useQuery } from 'urql'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { charitiesPageQuery } from '../../constants/query'
import { ICharityToken } from '../../constants/types'
import { formatAddress } from '../../constants/variants'
import { useGetNftsByIdQuery } from '../../store/slices/alchemyApiSlice'
import { CHARITIES_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import Loading from '../../components/Loading/Loading'

import cardImg from '../../assets/img/card-3.png'
import './ContractNftsPage.css'

const Card: React.FC<ICharityToken> = ({ owner, id, domainName }) => {
  const { data } = useGetNftsByIdQuery({
    tokenId: id,
    contractAddress: CHARITIES_NFT_CONTRACT_ADDRESS,
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

const CharitiesPage: React.FC = () => {
  const [result] = useQuery<{ charityTokens: ICharityToken[] }>({
    query: charitiesPageQuery,
  })

  const { data, fetching, error } = result

  const nftData = data?.charityTokens ?? []

  return (
    <div>
      <Navigation />
      <div className="website-container">
        <div className="website-container-left">
          <h2 className="heading">Charities</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="shib">Human Rights</label>
              <input id="shib" type="checkbox" />
            </div>
          </div>
        </div>
        <div>
          {fetching ? (
            <Loading />
          ) : error ? (
            <div style={{ textAlign: 'center' }}>something went wrong</div>
          ) : !nftData.length ? (
            <div style={{ textAlign: 'center' }}>No Nfts Here</div>
          ) : (
            <div className="website-container-right">
              {nftData.map((nft, idx: number) => (
                <Card key={idx} {...nft} />
              ))}
            </div>
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default CharitiesPage
