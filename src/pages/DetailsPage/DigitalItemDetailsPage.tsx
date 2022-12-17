import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { ethers } from 'ethers'
import { useQuery } from 'urql'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import { useTransactionModal } from '../../context/TransactionContext'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import slideImg from '../../assets/img/card-22.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import { AiOutlinePlus } from 'react-icons/ai'
import { BiMinus } from 'react-icons/bi'
import HomeLayout from '../../Layout/HomeLayout'
import './DigitalItemDetailsPage.css'
import { SUB_GRAPH_API_URL } from '../../constants/api'
import { IDigitalItem } from '../../constants/types'
import { DigitalItemQuery } from '../../constants/query'

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
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const [quantity, setQuantity] = useState(1)
  const slider = useRef<Slider>(null)
  const [result, reexecuteQuery] = useQuery<{ digitalItem: IDigitalItem }>({
    query: DigitalItemQuery,
    variables: { id: itemId },
  })

  const { data, fetching, error } = result
  console.log(result)
  // const NFT_METADATA_API = `https://eth-goerli.g.alchemy.com/nft/v2/:${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTMetadata?contractAddress=${}&tokenId=${id}&tokenType=ERC721&refreshCache=false`

  const { setTransaction } = useTransactionModal()

  const handleBuy = async () => {
    if (!address || !data || !signerData) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(
        data.digitalItem.erc20Token.id,
        erc20ABI,
        signerData,
      )

      const allowance = Number(
        (
          await erc20Contract.allowance(
            address,
            DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
          )
        ).toString(),
      )

      if (allowance <= 0) {
        const tx = await erc20Contract.approve(
          DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
          ethers.constants.MaxUint256,
        )
        await tx.wait()
      }

      const contract = new ethers.Contract(
        DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        digitalShopABI,
        signerData,
      )
      const tx = await contract.buyItem(itemId)
      await tx.wait()
      console.log('added')

      setTransaction({ loading: true, status: 'success' })
    } catch (error) {
      console.log(error)
      setTransaction({ loading: true, status: 'error' })
    }
  }

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
                {/* <div className="quantity-container">
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
                </div> */}
                <div className="buy-container">
                  <div className="top">
                    <p>Price: 10000 SHI</p>
                  </div>
                  <button onClick={handleBuy}>Buy</button>
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
