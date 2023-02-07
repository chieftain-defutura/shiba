import React, { useRef, useState } from 'react'
import { useParams } from 'react-router-dom'
import Slider from 'react-slick'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'

import HomeLayout from 'Layout/HomeLayout'
import rightArrowIcon from 'assets/img/right-arrow-icon.png'
import leftArrowIcon from 'assets/img/left-arrow-icon.png'
import upVoteIcon from 'assets/img/up-vote-md.png'
import downVoteIcon from 'assets/img/down-vote-md.png'
import homeIcon from 'assets/img/home-icon.png'
import questionIcon from 'assets/img/question-icon.png'
import videoIcon from 'assets/img/video-icon.png'
import { useGetIpfsDataQuery } from 'store/slices/ipfsApiSlice'
import cameraImg from 'assets/icon/Camera.svg'
import { IReviewOfShop } from 'constants/types'
import { getReviewOfShopQuery } from 'constants/query'
import closeIcon from 'assets/img/close-icon.png'
import { formatAddress } from 'constants/variants'
import { formatTokenUnits } from 'utils/formatters'
import CardDetailsLoading from 'components/Loading/CardDetailsLoading'
import instagramIcon from 'assets/img/instagram-icon.png'
import twitterIcon from 'assets/img/twitter-icon.png'
import descordIcon from 'assets/img/descord-icon.png'

import './ShopDetailsPage.css'

const settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
}

const ShopDetailsPage: React.FC<{
  query: string
  type: 'PHYSICAL' | 'DIGITAL'
}> = ({ query, type }) => {
  const { shopId } = useParams()
  const [result] = useQuery({
    query,
    variables: { id: shopId },
    pause: !shopId,
  })

  const { data, fetching } = result

  return (
    <HomeLayout>
      {fetching ? (
        <div>
          <CardDetailsLoading isShop />
        </div>
      ) : data[Object.keys(data)[0]] === null ? (
        <div>
          <p>There is no shop with Token Id</p>
        </div>
      ) : (
        <ShopDetails shopData={data[Object.keys(data)[0]]} type={type} />
      )}
    </HomeLayout>
  )
}

const ShopDetails: React.FC<{
  shopData: any
  type: 'PHYSICAL' | 'DIGITAL'
}> = ({ shopData, type }) => {
  const slider = useRef<Slider>(null)
  const { shopId } = useParams() as { shopId: string }
  const [upVoteClick, setUpVoteClick] = useState(false)
  const [downVoteClick, setDownVoteClick] = useState(false)
  const [shopErrorImgOne, setShopErrorImgOne] = useState(false)
  const [shopErrorImgTwo, setShopErrorImgTwo] = useState(false)
  const [shopErrorImgThree, setShopErrorImgThree] = useState(false)
  const [goodReviewResult] = useQuery<{ reviews: IReviewOfShop[] }>({
    query: getReviewOfShopQuery,
    variables: { shopId, status: 'GOOD' },
  })
  const [badReviewResult] = useQuery<{ reviews: IReviewOfShop[] }>({
    query: getReviewOfShopQuery,
    variables: { shopId, status: 'BAD' },
  })

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
            {goodReviewResult.data ? goodReviewResult.data.reviews.length : 0}
          </div>
        )}
        {downVoteClick && (
          <div className="vote-detail">
            <img src={downVoteIcon} alt="down vote" />
            {badReviewResult.data ? badReviewResult.data.reviews.length : 0}
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
                  ) : !data || shopErrorImgOne ? (
                    <div className="shop-slider-img-camera">
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
                  ) : !data || shopErrorImgTwo ? (
                    <div className="shop-slider-img-camera">
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
                  ) : !data || shopErrorImgThree ? (
                    <div className="shop-slider-img-camera">
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
            <div className="up-vote-box">
              <img
                src={closeIcon}
                alt="close"
                className="close-icon"
                onClick={() => setUpVoteClick(false)}
              />
              {goodReviewResult.fetching ? (
                <Skeleton count={5} />
              ) : !goodReviewResult.data ? (
                <div
                  style={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <p>Oops something went wrong</p>
                </div>
              ) : !goodReviewResult.data?.reviews.length ? (
                <div
                  style={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <p>No reviews is added Yet.</p>
                </div>
              ) : (
                <div>
                  {goodReviewResult.data.reviews.map((details, index) => (
                    <p key={index.toString()}>
                      {formatAddress(details.user)}: {details.review}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
          {downVoteClick && (
            <div className="up-vote-box">
              <img
                src={closeIcon}
                alt="close"
                className="close-icon"
                onClick={() => setDownVoteClick(false)}
              />
              {badReviewResult.fetching ? (
                <Skeleton count={5} />
              ) : !badReviewResult.data ? (
                <div
                  style={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <p>Oops something went wrong</p>
                </div>
              ) : !badReviewResult.data?.reviews.length ? (
                <div
                  style={{
                    height: '100%',
                    display: 'grid',
                    placeItems: 'center',
                    textAlign: 'center',
                  }}
                >
                  <p>No reviews is added Yet.</p>
                </div>
              ) : (
                <div>
                  {badReviewResult.data.reviews.map((details, index) => (
                    <p key={index.toString()}>
                      {formatAddress(details.user)}: {details.review}
                    </p>
                  ))}
                </div>
              )}
            </div>
          )}
          <div className="description-cont">
            <h3 style={{ marginBottom: '5px' }}>Shop Name: {data.shopName}</h3>
            <h3>Brief Description: {data.description}</h3>
            <p>Contacts: {data.contacts}</p>
          </div>
        </div>
        <div className="content-box-right">
          <div className="sales-cards">
            <div className="sale-card">
              <h4 className="title">Last Sale</h4>
              {shopData?.lastSale === null ? (
                <h4 style={{ lineHeight: '100px' }}>NO ITEMS SOLD YET</h4>
              ) : (
                <LastSale
                  item={
                    type === 'DIGITAL'
                      ? shopData?.lastSale
                      : shopData?.lastSale.itemId
                  }
                />
              )}
            </div>
            <div className="sale-card">
              <h4 className="title">Recently Listed</h4>
              {!shopData?.items?.length ? (
                <h4 style={{ lineHeight: '100px' }}>NO ITEMS LISTED YET</h4>
              ) : (
                <RecentlyListed item={shopData?.items[0]} />
              )}
            </div>
          </div>
          {type === 'PHYSICAL' && (
            <div className="button-cont">
              <button
                onClick={() => {
                  setUpVoteClick(true)
                  setDownVoteClick(false)
                }}
              >
                <img src={upVoteIcon} alt="up vote" />
                {goodReviewResult.data
                  ? goodReviewResult.data.reviews.length
                  : 0}
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
                {badReviewResult.data ? badReviewResult.data.reviews.length : 0}
              </button>
            </div>
          )}
        </div>
        <div className="shoesboutique-container-bottom">
          <img src={homeIcon} alt="home" />
          <img src={questionIcon} alt="question" />
          <img src={videoIcon} alt="video" />
          <a href={data.instagram} target="_blank" rel="noreferrer">
            <div className="insta">
              <img src={instagramIcon} alt="instagram" />
            </div>
          </a>
          <a href={data.twitter} target="_blank" rel="noreferrer">
            <div className="insta">
              <img src={twitterIcon} alt="twitter" />
            </div>
          </a>
          <a href={data.website} target="_blank" rel="noreferrer">
            <div className="insta">
              <img src={descordIcon} alt="descord" />
            </div>
          </a>
        </div>
      </div>
    </div>
  )
}

const LastSale = ({ item }: any) => {
  const { isLoading, data } = useGetIpfsDataQuery(
    { hash: item.metadata },
    { skip: !item.metadata },
  )
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div
        className="card-image"
        style={{
          width: '200px',
          height: '60px',
          margin: 'auto',
          marginBottom: '20px',
        }}
      >
        {isLoading ? (
          <Skeleton height={'100%'} />
        ) : !data || imageError ? (
          <img
            src={cameraImg}
            alt="product"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <img
            src={data?.logo}
            alt="product"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="card-footer">
        <p>Name:{item.itemName}</p>
        <p className="price">
          Price:{formatTokenUnits(item.price, item.erc20Token.decimals)}{' '}
          {item.erc20Token.symbol}
        </p>
      </div>
    </>
  )
}

const RecentlyListed = ({ item }: any) => {
  const { isLoading, data } = useGetIpfsDataQuery(
    { hash: item.metadata },
    { skip: !item.metadata },
  )
  const [imageError, setImageError] = useState(false)

  return (
    <>
      <div
        className="card-image"
        style={{
          width: '200px',
          height: '60px',
          margin: 'auto',
          marginBottom: '20px',
        }}
      >
        {isLoading ? (
          <Skeleton height={'100%'} />
        ) : !data || imageError ? (
          <img
            src={cameraImg}
            alt="product"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
          />
        ) : (
          <img
            src={data?.logo}
            alt="product"
            style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            onError={() => setImageError(true)}
          />
        )}
      </div>
      <div className="card-footer">
        <p>Name:{item.itemName}</p>
        <p className="price">
          Price:{formatTokenUnits(item.price, item.erc20Token.decimals)}{' '}
          {item.erc20Token.symbol}
        </p>
      </div>
    </>
  )
}

export default ShopDetailsPage
