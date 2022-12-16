import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import slideImg from '../../assets/img/card-22.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiMinus } from 'react-icons/bi'
import HomeLayout from '../../Layout/HomeLayout'
import './ShopDetailsPage.css'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ShopDetailsPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1)
  const slider = useRef<Slider>(null)

  const handlePlus = () => {
    setQuantity(quantity + 1)
  }

  const handleMinus = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  return (
    <div>
      <HomeLayout>
        <div className="music-details-container">
          <div className="music-details-container-right">
            <h2 className="title">digitalboutique.shib</h2>
            <div className="content-box">
              <div className="content-box-left">
                <div className="slider">
                  <Slider {...settings} ref={slider}>
                    <div className="slider-item">
                      <img src={slideImg} alt="slider" />
                    </div>
                    <div className="slider-item">
                      <img src={slideImg} alt="slider" />
                    </div>
                  </Slider>
                  <button
                    className="prev-btn slider-btn"
                    onClick={() => slider.current?.slickPrev()}
                  >
                    <img src={leftArrowIcon} alt="arrow" />
                  </button>
                  <button
                    className="next-btn slider-btn"
                    onClick={() => slider.current?.slickNext()}
                  >
                    <img src={rightArrowIcon} alt="arrow" />
                  </button>
                </div>
                <div className="description-cont">
                  <h3>Product Description:</h3>
                  <p>Product Details:</p>
                </div>
              </div>
              <div className="content-box-right">
                <div className="product-details">
                  <p>Name: MusicName</p>
                  <br />
                  <p>
                    Details: First and foremost, Ashley McDonald is a country
                    storyteller. And like many a great storyteller, she takes...{' '}
                    <span>more</span>
                  </p>
                  <button className="preview-btn">Preview</button>
                </div>
                <br />
                <div className="quantity-container">
                  <p>Quantity:</p>
                  <div className="quantity-box">
                    <button onClick={handleMinus}>
                      <BiMinus />
                    </button>
                    <p>{quantity}</p>
                    <button onClick={handlePlus}>
                      <AiOutlinePlus />
                    </button>
                  </div>
                </div>
                <div className="buy-container">
                  <div className="top">
                    <p>Price: 10000 SHI</p>
                  </div>
                  <button>Buy</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </HomeLayout>
    </div>
  )
}

export default ShopDetailsPage
