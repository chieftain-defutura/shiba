import React, { useState } from "react"
import { IoIosArrowDown } from "react-icons/io"

import Navigation from "../../components/Navigation/Navigation"
import FooterBottom from "../../components/FooterBottom/FooterBottom"
import cardImg from "../../assets/img/card-3.png"
import "./ActionPage.css"

const ActionPage = () => {
  const [clickDropDown, setClickDropDown] = useState(null)

  const handleDropDown = (idx) => {
    if (clickDropDown === idx) {
      return setClickDropDown(null)
    }
    setClickDropDown(idx)
  }

  return (
    <div>
      <Navigation />
      <div className="action-container">
        <div className="action-container-left">
          <h2 className="heading">Auction</h2>
          <div className="accordion-container">
            {accordionData.map((item, idx) => (
              <div key={idx} className="drop-down-container ">
                <div
                  className={
                    clickDropDown === idx
                      ? "drop-down-header active"
                      : "drop-down-header"
                  }
                  onClick={() => handleDropDown(idx)}
                >
                  <p>{item?.title}</p>
                  <IoIosArrowDown className="arrow-icon" />
                </div>
                {clickDropDown === idx && (
                  <div
                    className={
                      clickDropDown === idx
                        ? "drop-down-body active"
                        : "drop-down-body"
                    }
                  >
                    <div className="check-box-container">
                      {item.labels.map((label, index) => (
                        <div className="checkbox-content" key={index}>
                          <label htmlFor="Human Rights">{label.label}</label>
                          <input id="Human Rights" type="checkbox" />
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="price-container">
            <p className="title">Price</p>
            <div className="price-content">
              <div className="price-select-cont">
                <IoIosArrowDown className="arrow-icon" />
              </div>
              <div className="check-box-container">
                <label htmlFor="min">MIN</label>
                <input id="min" type="checkbox" />
              </div>
              <div className="check-box-container">
                <label htmlFor="max">Max</label>
                <input id="max" type="checkbox" />
              </div>
            </div>
          </div>
          <div className="currency-container">
            <p className="title">Currency</p>
            <div className="currency-content">
              <div className="currency-select-cont">
                <IoIosArrowDown className="arrow-icon" />
              </div>
            </div>
          </div>
          <div className="sort-container">
            <p className="title">Sort By</p>
            <div className="sort-content">
              <div className="radio-btn-cont">
                <label htmlFor="high-to-low">High To Low</label>
                <input id="high-to-low" name="high-to-low" type="radio" />
                <span></span>
              </div>
              <div className="radio-btn-cont">
                <label htmlFor="Recently-listed">Recently listed</label>
                <input id="Recently-listed" type="radio" />
                <span></span>
              </div>
              <div className="radio-btn-cont">
                <label htmlFor="Ending-soon">Ending soon</label>
                <input id="Ending-soon" type="radio" />
                <span></span>
              </div>
            </div>
          </div>
        </div>
        <div className="action-container-right">
          <div className="action-container-right-content">
            {Array.from({ length: 7 }).map((_, idx) => (
              <div className="action-card-container" key={idx}>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ActionPage

const accordionData = [
  {
    title: "Domain Names",
    labels: [
      { label: "Human Rights" },
      { label: "Education" },
      { label: "Religion" },
      { label: "Animals" },
      { label: "Enviorment" },
      { label: "Health" },
      { label: "Sport" },
    ],
  },
  {
    title: "Physical Goods Shop",
    labels: [
      { label: "Human Rights" },
      { label: "Education" },
      { label: "Religion" },
      { label: "Animals" },
      { label: "Enviorment" },
      { label: "Health" },
      { label: "Sport" },
    ],
  },
  {
    title: "Digital Goods Shop",
    labels: [
      { label: "Human Rights" },
      { label: "Education" },
      { label: "Religion" },
      { label: "Animals" },
      { label: "Enviorment" },
      { label: "Health" },
      { label: "Sport" },
    ],
  },
  {
    title: "Charity Organisation",
    labels: [
      { label: "Human Rights" },
      { label: "Education" },
      { label: "Religion" },
      { label: "Animals" },
      { label: "Enviorment" },
      { label: "Health" },
      { label: "Sport" },
    ],
  },
  {
    title: "Websites",
    labels: [
      { label: "Human Rights" },
      { label: "Education" },
      { label: "Religion" },
      { label: "Animals" },
      { label: "Enviorment" },
      { label: "Health" },
      { label: "Sport" },
    ],
  },
  {
    title: "Full On Blockchain NFT",
    labels: [{ label: "ART" }, { label: "File" }, { label: "Other" }],
  },
]
