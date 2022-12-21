import React, { useRef } from 'react'
import Slider from 'react-slick'

import cardOne from '../../assets/img/card-1.png'
import avatarOne from '../../assets/img/avatar-1.png'
import ethIcon from '../../assets/img/eth-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import './SliderCard.css'

const settings = {
  className: 'center',
  arrows: false,
  centerMode: true,
  infinite: true,
  centerPadding: '160px',
  slidesToShow: 3,
  speed: 500,
}

const SliderCard = () => {
  const refSlider = useRef(null)

  return (
    <div className="slider-card-container">
      <Slider {...settings} ref={refSlider}>
        <div>
          <div className="slider-card">
            <div className="card-top">
              <img src={cardOne} alt="card" />
            </div>
            <div className="card-bottom">
              <div className="top">
                <div className="top-left">
                  <div className="avatar-container">
                    <img src={avatarOne} alt="avatar" />
                  </div>
                  <div>
                    <span>
                      CryptoPunk 3D <br /> #13
                    </span>
                    <p>3D cryptopunk</p>
                  </div>
                </div>
                <div className="top-right">
                  <button className="eth-btn">
                    <img src={ethIcon} alt="eth icon" />
                  </button>
                </div>
              </div>
              <div className="bottom">
                <div className="left">
                  <h5>9.61 ETH</h5>
                  <p>latest Bid</p>
                </div>
                <div className="center">
                  <h5>
                    4.12
                    <br />
                    ETH
                  </h5>
                  <p>from</p>
                </div>
                <div className="right">
                  <h5>$103,025</h5>
                  <p>-2.25%</p>
                </div>
              </div>
            </div>
            <button className="collect-btn">Collect Now</button>
          </div>
        </div>
        <div>
          <div className="slider-card">
            <div className="card-top">
              <img src={cardOne} alt="card" />
            </div>
            <div className="card-bottom">
              <div className="top">
                <div className="top-left">
                  <div className="avatar-container">
                    <img src={avatarOne} alt="avatar" />
                  </div>
                  <div>
                    <span>
                      CryptoPunk 3D <br /> #13
                    </span>
                    <p>3D cryptopunk</p>
                  </div>
                </div>
                <div className="top-right">
                  <button className="eth-btn">
                    <img src={ethIcon} alt="eth icon" />
                  </button>
                </div>
              </div>
              <div className="bottom">
                <div className="left">
                  <h5>9.61 ETH</h5>
                  <p>latest Bid</p>
                </div>
                <div className="center">
                  <h5>
                    4.12
                    <br />
                    ETH
                  </h5>
                  <p>from</p>
                </div>
                <div className="right">
                  <h5>$103,025</h5>
                  <p>-2.25%</p>
                </div>
              </div>
            </div>
            <button className="collect-btn">Collect Now</button>
          </div>
        </div>
        <div>
          <div className="slider-card">
            <div className="card-top">
              <img src={cardOne} alt="card" />
            </div>
            <div className="card-bottom">
              <div className="top">
                <div className="top-left">
                  <div className="avatar-container">
                    <img src={avatarOne} alt="avatar" />
                  </div>
                  <div>
                    <span>
                      CryptoPunk 3D <br /> #13
                    </span>
                    <p>3D cryptopunk</p>
                  </div>
                </div>
                <div className="top-right">
                  <button className="eth-btn">
                    <img src={ethIcon} alt="eth icon" />
                  </button>
                </div>
              </div>
              <div className="bottom">
                <div className="left">
                  <h5>9.61 ETH</h5>
                  <p>latest Bid</p>
                </div>
                <div className="center">
                  <h5>
                    4.12
                    <br />
                    ETH
                  </h5>
                  <p>from</p>
                </div>
                <div className="right">
                  <h5>$103,025</h5>
                  <p>-2.25%</p>
                </div>
              </div>
            </div>
            <button className="collect-btn">Collect Now</button>
          </div>
        </div>
        <div>
          <div className="slider-card">
            <div className="card-top">
              <img src={cardOne} alt="card" />
            </div>
            <div className="card-bottom">
              <div className="top">
                <div className="top-left">
                  <div className="avatar-container">
                    <img src={avatarOne} alt="avatar" />
                  </div>
                  <div>
                    <span>
                      CryptoPunk 3D <br /> #13
                    </span>
                    <p>3D cryptopunk</p>
                  </div>
                </div>
                <div className="top-right">
                  <button className="eth-btn">
                    <img src={ethIcon} alt="eth icon" />
                  </button>
                </div>
              </div>
              <div className="bottom">
                <div className="left">
                  <h5>9.61 ETH</h5>
                  <p>latest Bid</p>
                </div>
                <div className="center">
                  <h5>
                    4.12
                    <br />
                    ETH
                  </h5>
                  <p>from</p>
                </div>
                <div className="right">
                  <h5>$103,025</h5>
                  <p>-2.25%</p>
                </div>
              </div>
            </div>
            <button className="collect-btn">Collect Now</button>
          </div>
        </div>
      </Slider>
      <div className="slider-btn-container prev-slider-btn-cont">
        <button className="prev-btn">
          <img
            src={leftArrowIcon}
            alt="arrow icon"
            onClick={() => refSlider.current.slickPrev()}
          />
        </button>
      </div>
      <div className="slider-btn-container next-slider-btn-cont">
        <button
          className="next-btn"
          onClick={() => refSlider.current.slickNext()}
        >
          <img src={rightArrowIcon} alt="arrow icon" />
        </button>
      </div>
    </div>
  )
}

export default SliderCard
