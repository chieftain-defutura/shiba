import React, { useRef } from 'react'
import Slider from 'react-slick'
import banner from '../../assets/img/banner.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import './Banner.css'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const Banner = () => {
  const refSlider = useRef(null)

  return (
    <div className="banner">
      <Slider {...settings} ref={refSlider}>
        <div>
          <div className="container">
            <div className="container-left">
              <h1>
                Discover <br /> Collect, & Sell <span>Extraordinary</span> NFTs
              </h1>
              <p>
                the leading NFT Marketplace on Ethereum Home to the next
                generation of digital creators.
              </p>
            </div>
            <div className="container-right">
              <img src={banner} alt="banner" />
            </div>
          </div>
        </div>
        <div>
          <div className="container">
            <div className="container-left">
              <h1>
                Discover <br /> Collect, & Sell <span>Extraordinary</span> NFTs
              </h1>
              <p>
                the leading NFT Marketplace on Ethereum Home to the next
                generation of digital creators.
              </p>
            </div>
            <div className="container-right">
              <img src={banner} alt="banner" />
            </div>
          </div>
        </div>
      </Slider>
      <button
        className="prev-btn slider-btn"
        onClick={() => refSlider.current.slickPrev()}
      >
        <img src={leftArrowIcon} alt="arrow-icon" />
      </button>
      <button
        className="next-btn slider-btn"
        onClick={() => refSlider.current.slickNext()}
      >
        <img src={rightArrowIcon} alt="arrow-icon" />
      </button>
    </div>
  )
}

export default Banner
