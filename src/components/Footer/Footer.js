import React from "react"
import logo from "../../assets/img/logo.png"
import descordIcon from "../../assets/img/descord-icon.png"
import twitterIcon from "../../assets/img/twitter-icon.png"
import instagramIcon from "../../assets/img/instagram-icon.png"
import youtubeIcon from "../../assets/img/youtube-icon.png"
import instagramIconTwo from "../../assets/img/instagram-icon-2.png"
import twitterIconTwo from "../../assets/img/twitter-icon-2.png"
import facebookIconTwo from "../../assets/img/facebook-icon.png"
import "./Footer.css"

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="footer-top">
        <div className="footer-logo-cont">
          <img src={logo} alt="footer logo" />
        </div>
        <div className="footer-grid-cont">
          <div className="footer-top-left">
            <p>
              the leading NFT Marketplace on Ethereum Home to the next
              generation of digital creators. Discover the best NFT collections.
            </p>
            <div className="social-links-container">
              <div>
                <img src={descordIcon} alt="discord icon" />
              </div>
              <div>
                <img src={twitterIcon} alt="twitter Icon" />
              </div>
              <div>
                <img src={instagramIcon} alt="instagram Icon" />
              </div>
              <div>
                <img src={youtubeIcon} alt="youtube Icon" />
              </div>
            </div>
          </div>
          <div className="footer-top-center">
            <div>
              <h3>Marketplace</h3>
              <p>Explore</p>
              <p>Articles</p>
              <p>How it Works</p>
              <p>Help</p>
            </div>
          </div>
          <div className="footer-top-right">
            <div>
              <h3>Links</h3>
              <p>Tokens</p>
              <p>API</p>
              <p>Big Bounty</p>
              <p>Become Partners</p>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <div className="footer-nav">
          <ul>
            <li>ABOUT</li>
            <li>CONTACT US</li>
            <li>help</li>
            <li>legal</li>
            <li>store</li>
          </ul>
        </div>
        <div className="footer-bottom-social-link">
          <div>
            <img src={instagramIconTwo} alt="instagram" />
          </div>
          <div>
            <img src={twitterIconTwo} alt="twitter" />
          </div>
          <div>
            <img src={facebookIconTwo} alt="facebook" />
          </div>
        </div>
        <p>
          © 2022 NFT MINT.com <span>By MindStar</span>
        </p>
      </div>
    </footer>
  )
}

export default Footer
