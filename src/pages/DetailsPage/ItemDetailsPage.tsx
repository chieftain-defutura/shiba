import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiMinus } from 'react-icons/bi'

import slideImg from '../../assets/img/card-22.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import HomeLayout from '../../Layout/HomeLayout'
import './ItemDetailsPage.css'
import CategoriesShippingPage from '../../components/CategoriesShippingPage/CategoriesShippingPage'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ItemDetailsPage: React.FC = () => {
  const [quantity, setQuantity] = useState(1)
  const [categoriesShipping, setCategoriesShipping] = useState(false)
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
        {!categoriesShipping && (
          <div className="categories-details-container">
            <div className="categories-details-container-right">
              <h2 className="title">shoesboutique.shib</h2>
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
                    <p>Item Name: Shoes1</p>
                    <p>Available Sizes: 34, 39, 40</p>
                    <p>Available Colours: Red, Black</p>
                    <p>Fabric Type: 100% Cotton</p>
                    <p>Item Condition: New</p>
                    <p>Manufacturer: Canada</p>
                    <p>Brand: SuperBrand</p>
                    <br />
                    <p>Refund Possible: Yes</p>
                    <p>Department: Women</p>
                    <p>Shipment Area: Worldwide</p>
                    <p>Shipment Fee: 2000 SHI</p>
                    <p>Delivered In: 15-20 Working Days</p>
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
                      <p>Total: 12000 SHI</p>
                    </div>
                    <div onClick={() => setCategoriesShipping(true)}>
                      <button>Buy</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        {categoriesShipping && <CategoriesShippingPage />}
      </HomeLayout>
    </div>
  )
}

export default ItemDetailsPage
