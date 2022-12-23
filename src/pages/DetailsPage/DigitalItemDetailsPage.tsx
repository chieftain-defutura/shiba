import React, { useRef } from 'react'
import Slider from 'react-slick'
import { ethers } from 'ethers'
import { useQuery } from 'urql'
import { erc20ABI, useAccount, useSigner } from 'wagmi'
import { useParams } from 'react-router-dom'
import Skeleton from 'react-loading-skeleton'

import { useTransactionModal } from '../../context/TransactionContext'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import digitalShopABI from '../../utils/abi/digitalShopABI.json'
import slideImg from '../../assets/img/card-22.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import HomeLayout from '../../Layout/HomeLayout'
import { IDigitalItem } from '../../constants/types'
import { DigitalItemQuery } from '../../constants/query'
import './DigitalItemDetailsPage.css'
import Loading from '../../components/Loading/Loading'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'

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
  const [result] = useQuery<{ digitalItem: IDigitalItem }>({
    query: DigitalItemQuery,
    variables: { id: itemId },
  })

  const { data, fetching } = result
  console.log(result)

  if (fetching) return <Loading />

  if (!data)
    return (
      <div>
        <p style={{ textTransform: 'uppercase' }}>
          There is no item with this id
        </p>
      </div>
    )

  return <ProductDetails {...data.digitalItem} />
}

const ProductDetails: React.FC<IDigitalItem> = ({
  erc20Token,
  shopDetails,
  metadata,
  price,
}) => {
  const { itemId } = useParams()
  const { data: signerData } = useSigner()
  const { address } = useAccount()
  const slider = useRef<Slider>(null)
  const { setTransaction } = useTransactionModal()
  const { data: ipfsData, isLoading } = useGetIpfsDataQuery({
    hash: metadata,
  })
  console.log(ipfsData)
  const handleBuy = async () => {
    if (!address || !signerData) return

    try {
      setTransaction({ loading: true, status: 'pending' })
      const erc20Contract = new ethers.Contract(
        erc20Token.id,
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

  return (
    <HomeLayout>
      <div className="music-details-container">
        <div className="music-details-container-right">
          <h2 className="title">{shopDetails.domainName}</h2>
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
                <h3>
                  Product Description:{' '}
                  {isLoading ? <Skeleton /> : ipfsData?.description}
                </h3>
              </div>
            </div>
            <div className="content-box-right">
              <div className="product-details">
                <p>Name: {isLoading ? <Skeleton /> : ipfsData?.itemName}</p>
                <br />
                <p>Details: {isLoading ? <Skeleton /> : ipfsData?.details}</p>
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
                  <p>
                    Price:
                    {ethers.utils.formatUnits(price, erc20Token.decimals)}
                    {erc20Token.symbol}
                  </p>
                </div>
                <button onClick={handleBuy}>Buy</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </HomeLayout>
  )
}

export default DigitalItemsDetailsPage
