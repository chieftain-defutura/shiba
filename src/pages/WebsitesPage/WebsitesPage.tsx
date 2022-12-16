import React from 'react'
// import { useAccount } from 'wagmi'
import {
  // DOMAIN_NFT_CONTRACT_ADDRESS,
  WEBSITE_NFT_CONTRACT_ADDRESS,
} from '../../utils/contractAddress'
// import axios from 'axios'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'
import './WebsitesPage.css'
import { useGetNftsByContractAddressQuery } from '../../store/slices/moralisApiSlice'

const WebsitesPage: React.FC = () => {
  // const { address } = useAccount()
  // const [loading, setLoading] = useState(false)
  // const [website, setWbsiteData] = useState([])
  // console.log(website)

  const { data, isLoading, isError } = useGetNftsByContractAddressQuery({
    erc721Address: WEBSITE_NFT_CONTRACT_ADDRESS,
  })

  const nftsData: any[] = data ? data?.result : []

  console.log(nftsData)

  return (
    <div>
      <Navigation />
      <div className="website-container">
        <div className="website-container-left">
          <h2 className="heading">Websites</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="News">News</label>
              <input id="News" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="Portofolio">Portofolio</label>
              <input id="Portofolio" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="Brochure">Brochure</label>
              <input id="Brochure" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="NonProfit">NonProfit</label>
              <input id="NonProfit" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="Business">Business</label>
              <input id="Business" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="Community Forum">Community Forum</label>
              <input id="Community Forum" type="checkbox" />
            </div>
            <div className="checkbox-content">
              <label htmlFor="Wiki">Wiki</label>
              <input id="Wiki" type="checkbox" />
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

export default WebsitesPage
