import React from 'react'
import { useQuery } from 'urql'

import './ContractNftsPage.css'
import cardImg from '../../assets/img/card-3.png'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { charitiesPageQuery } from '../../constants/query'
import { ICharityToken } from '../../constants/types'
import { formatAddress } from '../../constants/variants'

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
            'loading...'
          ) : error ? (
            'something went wrong'
          ) : !nftData.length ? (
            'No Nfts Here'
          ) : (
            <div className="website-container-right">
              {nftData.map((f, idx: number) => (
                <div className="website-card-container" key={idx}>
                  <div className="card">
                    <div className="card-top">
                      <img src={cardImg} alt="" />
                    </div>
                    <div className="card-center">
                      <h3 className="title">Owner</h3>
                      <h4 className="sub-title">{formatAddress(f.owner.id)}</h4>
                    </div>
                    <div className="card-bottom">
                      <p>Token Id</p>
                      <p>#{f.id}</p>
                      {/* <Link to={`/my-digital-shop/${f}`}>
                <button style={{ width: "50px" }}>Get In</button>
              </Link> */}
                    </div>
                  </div>
                  <div style={{ padding: '5px 0' }}>
                    <p style={{ fontSize: '14px' }}>Domain:</p>
                    <p style={{ fontSize: '14px', wordBreak: 'break-all' }}>
                      <b>{f.domainName}</b>
                    </p>
                  </div>
                </div>
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
