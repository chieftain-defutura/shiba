import React, { useCallback, useEffect, useState } from "react"
import { useAccount } from "wagmi"
import { DOMAIN_NFT_CONTRACT_ADDRESS } from "../../utils/contractAddress"
import axios from "axios"
import Navigation from "../../components/Navigation/Navigation"
import FooterBottom from "../../components/FooterBottom/FooterBottom"
import cardImg from "../../assets/img/card-3.png"
import "./WebsitesPage.css"

const WebsitesPage = () => {
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const [website, setWbsiteData] = useState([])
  console.log(website)

  const handleGetWebsiteData = useCallback(async () => {
    try {
      if (!address) return
      setLoading(true)

      const { data } = await axios.get(
        `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTsForCollection?contractAddress=${DOMAIN_NFT_CONTRACT_ADDRESS}&withMetadata=true`,

        {
          headers: {
            "X-API-KEY": process.env.REACT_APP_ALCHEMY_API_KEY,
          },
        },
      )
      setLoading(false)
      console.log(data)
      setWbsiteData(data.nfts.map((r: any) => r))
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleGetWebsiteData()
  }, [handleGetWebsiteData])
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
          {loading ? "loading..." : ""}
          {!website.length && "noResult"}
          {website.map((f, idx) => (
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
                  <p>id: {idx}</p>
                  {/* <Link to={`/my-digital-shop/${f}`}>
                    <button style={{ width: "50px" }}>Get In</button>
                  </Link> */}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default WebsitesPage
