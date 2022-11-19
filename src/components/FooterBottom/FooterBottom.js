import React from "react";
import instagramIconTwo from "../../assets/img/instagram-icon-2.png";
import twitterIconTwo from "../../assets/img/twitter-icon-2.png";
import facebookIconTwo from "../../assets/img/facebook-icon.png";
import "./FooterBottom.css";

const FooterBottom = () => {
  return (
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
  );
};

export default FooterBottom;
