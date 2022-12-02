import React from "react";
import Navigation from "../../components/Navigation/Navigation";
import FooterBottom from "../../components/FooterBottom/FooterBottom";
import cardImg from "../../assets/img/card-3.png";
import "./DomainNamesPage.css";

const DomainNamesPage = () => {
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
        <div className="domain-name-container-right">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div className="domain-name-card-container" key={idx}>
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

export default DomainNamesPage;
