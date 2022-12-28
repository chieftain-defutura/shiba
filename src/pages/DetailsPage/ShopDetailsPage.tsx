import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'

import './ShopDetailsPage.css'
import HomeLayout from '../../Layout/HomeLayout'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import cardImgOne from '../../assets/img/card-20.png'
import cardImgTwo from '../../assets/img/card-21.png'
import upVoteIcon from '../../assets/img/up-vote-md.png'
import downVoteIcon from '../../assets/img/down-vote-md.png'
import homeIcon from '../../assets/img/home-icon.png'
import questionIcon from '../../assets/img/question-icon.png'
import videoIcon from '../../assets/img/video-icon.png'
import Loading from '../../components/Loading/Loading'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import cameraImg from '../../assets/icon/Camera.svg'
import Reviews from '../../components/ShopDetails/Reviews'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ShopDetailsPage: React.FC<{ query: string }> = ({ query }) => {
  const { shopId } = useParams()
  const [result] = useQuery({
    query,
    variables: { id: shopId },
    pause: !shopId,
  })

  const { data, fetching } = result
  console.log(data)

  return (
    <HomeLayout>
      {fetching ? (
        <div className="loading">
          <Loading />
        </div>
      ) : data[Object.keys(data)[0]] === null ? (
        <div>
          <p>There is no shop with Token Id</p>
        </div>
      ) : (
        <ShopDetails shopData={data[Object.keys(data)[0]]} />
      )}
    </HomeLayout>
  )
}

const ShopDetails: React.FC<{ shopData: any }> = ({ shopData }) => {
  const slider = useRef<Slider>(null)
  const { shopId } = useParams() as { shopId: string }
  const [upVoteClick, setUpVoteClick] = useState(false)
  const [downVoteClick, setDownVoteClick] = useState(false)
  const [shopErrorImgOne, setShopErrorImgOne] = useState(false)
  const [shopErrorImgTwo, setShopErrorImgTwo] = useState(false)
  const [shopErrorImgThree, setShopErrorImgThree] = useState(false)

  const { isLoading, data } = useGetIpfsDataQuery(
    { hash: shopData?.tokenUri ?? '' },
    { skip: !shopData.tokenUri },
  )

  console.log(data)

  return (
    <div className="shoesboutique-container-right">
      <h2 className="title">
        {shopData?.domainName}
        {upVoteClick && (
          <div className="vote-detail">
            <img src={upVoteIcon} alt="up vote" />
            {shopData ? shopData.upVote : 0}
          </div>
        )}
        {downVoteClick && (
          <div className="vote-detail">
            <img src={downVoteIcon} alt="down vote" />
            {shopData ? shopData.downVote : 0}
          </div>
        )}
      </h2>
      <div className="content-box">
        <div className="content-box-left">
          {!upVoteClick && !downVoteClick && (
            <div className="slider">
              <Slider {...settings} ref={slider}>
                <div className="slider-shop-item">
                  {isLoading ? (
                    <Skeleton height={'100%'} />
                  ) : shopErrorImgOne ? (
                    <div className="slider-img-camera">
                      <img src={cameraImg} alt="camera" />
                    </div>
                  ) : (
                    <img
                      src={data?.videoOne}
                      alt="slider"
                      onError={() => setShopErrorImgOne(true)}
                    />
                  )}
                </div>
                <div className="slider-shop-item">
                  {isLoading ? (
                    <Skeleton height={'100%'} />
                  ) : shopErrorImgTwo ? (
                    <div className="slider-img-camera">
                      <img src={cameraImg} alt="camera" />
                    </div>
                  ) : (
                    <img
                      src={data?.videoTwo}
                      alt="slider"
                      onError={() => setShopErrorImgTwo(true)}
                    />
                  )}
                </div>
                <div className="slider-shop-item">
                  {isLoading ? (
                    <Skeleton height={'100%'} />
                  ) : shopErrorImgThree ? (
                    <div className="slider-img-camera">
                      <img src={cameraImg} alt="camera" />
                    </div>
                  ) : (
                    <img
                      src={data?.videoThree}
                      alt="slider"
                      onError={() => setShopErrorImgThree(true)}
                    />
                  )}
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
          )}
          {upVoteClick && (
            <Reviews
              status="GOOD"
              shopId={shopId}
              handleClose={() => setUpVoteClick(false)}
            />
          )}
          {downVoteClick && (
            <Reviews
              status="BAD"
              shopId={shopId}
              handleClose={() => setDownVoteClick(false)}
            />
          )}
          <div className="description-cont">
            <h3>Brief Description: </h3>
            <p>
              Contacts: any info shop want to share Ex phone number, address,
              etc.
            </p>
          </div>
        </div>
        <div className="content-box-right">
          <div className="sales-cards">
            <div className="sale-card">
              <h4 className="title">Last Sale</h4>
              <img src={cardImgOne} alt="product" />
              <div className="card-footer">
                <p>Name:shoes</p>
                <p className="price">Price:10400 SHI</p>
              </div>
            </div>
            <div className="sale-card">
              <h4 className="title">Recently Listed</h4>
              <img src={cardImgTwo} alt="product" />
              <div className="card-footer">
                <p>Name:shoes</p>
                <p className="price">Price:10400 SHI</p>
              </div>
            </div>
          </div>
          <div className="button-cont">
            <button
              onClick={() => {
                setUpVoteClick(true)
                setDownVoteClick(false)
              }}
            >
              <img src={upVoteIcon} alt="up vote" />
              {shopData ? shopData.upVote : 0}
            </button>
            <button>
              <img
                src={downVoteIcon}
                alt="down vote"
                onClick={() => {
                  setDownVoteClick(true)
                  setUpVoteClick(false)
                }}
              />
              {shopData ? shopData.downVote : 0}
            </button>
          </div>
        </div>
        <div className="shoesboutique-container-bottom">
          <img src={homeIcon} alt="home" />
          <img src={questionIcon} alt="question" />
          <img src={videoIcon} alt="video" />
        </div>
      </div>
    </div>
  )
}

export default ShopDetailsPage
