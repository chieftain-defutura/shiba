import React from 'react'
import { useQuery } from 'urql'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'
import './DomainNamesPage.css'
import { domainPageQuery } from '../../constants/query'
import { IDomainNft } from '../../constants/types'

const DomainNamesPage: React.FC = () => {
  const [result, reexecuteQuery] = useQuery<{ domainTokens: IDomainNft[] }>({
    query: domainPageQuery,
  })

  const { data, fetching, error } = result

  const nftData = data?.domainTokens ?? []

  return (
    <div>
      <Navigation />
      <div className="domain-name-container">
        <div className="domain-name-container-left">
          <h2 className="heading">Domain Names</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="shib">.shib</label>
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
            'No domain Nfts here'
          ) : (
            <div className="domain-name-container-right">
              {nftData.map((f, idx: number) => (
                <div className="domain-name-card-container" key={idx}>
                  <div className="card">
                    <div className="card-top">
                      <h3>{f.domainName}</h3>
                    </div>
                    <div className="card-center">
                      <h3 className="title">The Holy Grail</h3>
                      <h4 className="sub-title">Pixart Motion</h4>
                    </div>
                    <div className="card-bottom">
                      <p>Token Id</p>
                      <p>#{f.id}</p>
                      {/* <Link to={`/my-digital-shop/${f}`}>
                  <button style={{ width: "50px" }}>Get In</button>
                </Link> */}
                    </div>
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

export default DomainNamesPage
