import React, { useRef, useState, useEffect, useCallback } from 'react'
import Slider from 'react-slick'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import slideImg from '../../assets/img/card-22.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiMinus } from 'react-icons/bi'
import HomeLayout from '../../Layout/HomeLayout'
import './DigitalItemDetailsPage.css'
import { SUB_GRAPH_API_URL } from '../../constants/api'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const DigitalItemsDetailsPage: React.FC = () => {
  const { itemId } = useParams()

  const [quantity, setQuantity] = useState(1)
  const slider = useRef<Slider>(null)
  const [digitalDetails, setDigitalDetails] = useState<any[]>([])
  // const NFT_METADATA_API = `https://eth-goerli.g.alchemy.com/nft/v2/:${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${}&tokenId=${id}&tokenType=ERC721&refreshCache=false`

  const handleGetUserNft = useCallback(async () => {
    try {
      const { data } = await axios.post(
        SUB_GRAPH_API_URL,
        {
          query: `
          query{
            digitalItem(id:"${itemId}"){
              id
              shopDetails{
                id
              }
              price
              owner {
                id
              }
              erc20Token {
                id
                symbol
                decimals
              }
              subcategory
              category
            }
          }
        `,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
      console.log(data.data)
      setDigitalDetails(data.data.digitalItems)
    } catch (error) {
      console.log(error)
    }
  }, [itemId])

  useEffect(() => {
    handleGetUserNft()
  }, [handleGetUserNft])

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

export default DigitalItemsDetailsPage
