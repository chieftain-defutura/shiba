import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import cardImg from "../../assets/img/card-3.png";
import "./WebsitesPage.css";

const WebsitesPage = () => {
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
          {Array.from({ length: 7 }).map((_, idx) => (
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
                  <p>Fixed price</p>
                  <button>0.001 ETH</button>
                </div>
              </div>
              <h4 className="domain-name">Domain:</h4>
            </div>
          ))}
        </div>
      </div>
      <FooterBottom />
    </div>
  );
};

export default WebsitesPage;
