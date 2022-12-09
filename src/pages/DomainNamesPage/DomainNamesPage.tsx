import React, { useState, useCallback, useEffect } from "react"
import { useAccount } from "wagmi"
import { DOMAIN_NFT_CONTRACT_ADDRESS } from "../../utils/contractAddress"
import axios from "axios"
import Navigation from "../../components/Navigation/Navigation"
import FooterBottom from "../../components/FooterBottom/FooterBottom"
import cardImg from "../../assets/img/card-3.png"
import "./DomainNamesPage.css"

const DomainNamesPage = () => {
  const { address } = useAccount()
  const [loading, setLoading] = useState(false)
  const [userNftData, setUserNftData] = useState([])
  console.log(userNftData)

  const handleGetUserNft = useCallback(async () => {
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
      setUserNftData(data.nfts.map((r: any) => r))
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])
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
          {loading ? "loading..." : ""}
          {!userNftData.length && "noResult"}
          {userNftData.map((f, idx) => (
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

export default DomainNamesPage
