import React from 'react'

import HeaderNav from '../../components/HeaderNav/HeaderNav'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { useGetNftsByContractAddressQuery } from '../../store/slices/moralisApiSlice'
import { CHARITIES_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import cardImg from '../../assets/img/card-3.png'

const DomainNamesPage: React.FC = () => {
  const { data, isLoading, isError } = useGetNftsByContractAddressQuery({
    erc721Address: CHARITIES_NFT_CONTRACT_ADDRESS,
  })

  const nftsData: any[] = data ? data?.result : []

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="domain-name-container">
        <div className="domain-name-container-left">
          <h2 className="heading">Charities</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="shib">.shib</label>
              <input id="shib" type="checkbox" />
            </div>
          </div>
        </div>
        <div className="domain-name-container-right">
          {isLoading ? (
            <div>Loading</div>
          ) : isError ? (
            <div>Error</div>
          ) : (
            nftsData.map((f, idx) => (
              <div className="domain-name-card-container" key={idx}>
                <div className="card">
                  <div className="card-top">
                    <img src={cardImg} alt="card" />
                  </div>
                  <div className="card-center">
                    <h3 className="title">Owner</h3>
                    <h4 className="sub-title">
                      {f.minter_address?.slice(0, 6)}...
                      {f.minter_address?.slice(f.minter_address?.length - 6)}
                    </h4>
                  </div>
                  <div className="card-bottom">
                    <p>Token Id: {f.token_id}</p>
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
