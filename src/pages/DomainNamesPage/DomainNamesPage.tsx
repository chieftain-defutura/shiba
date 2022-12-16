import React from 'react'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { DOMAIN_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import { useGetNftsByContractAddressQuery } from '../../store/slices/moralisApiSlice'
import cardImg from '../../assets/img/card-3.png'
import './DomainNamesPage.css'

const DomainNamesPage: React.FC = () => {
  const { data, isLoading, isError } = useGetNftsByContractAddressQuery({
    erc721Address: DOMAIN_NFT_CONTRACT_ADDRESS,
  })

  const nftsData: any[] = data ? data?.result : []

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
        <div className="website-container-right">
          {isLoading ? (
            <div>Loading</div>
          ) : isError ? (
            <div>Error</div>
          ) : (
            nftsData.map((f, idx) => (
              <div className="website-card-container" key={idx}>
                <div className="card">
                  <div className="card-top">
                    <img src={cardImg} alt="card" />
                  </div>
                  <div className="card-center">
                    <h3 className="title">The Holy Grail</h3>
                    <h4 className="sub-title">Pixart Motion</h4>
                  </div>
                  <div className="card-bottom">
                    <p>Shop Details</p>
                    <p>Token Id: {f.token_id}</p>
                    {/* <Link to={`/my-digital-shop/${f}`}>
                    <button style={{ width: "50px" }}>Get In</button>
                  </Link> */}
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default DomainNamesPage
