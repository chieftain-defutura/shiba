import React, { useRef, useState } from 'react'
import Slider from 'react-slick'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'

import './SliderCard.css'
import Loading from '../Loading/Loading'
import Camera from '../../assets/icon/Camera.svg'
import ethIcon from '../../assets/img/eth-icon.png'
import leftArrowIcon from '../../assets/img/left-arrow-icon.png'
import rightArrowIcon from '../../assets/img/right-arrow-icon.png'
import { recentlyListedQuery } from '../../constants/query'
import { IPhysicalItem } from '../../constants/types'
import { formatTokenUnits } from '../../utils/formatters'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import { formatAddress } from '../../constants/variants'
import { useNavigate } from 'react-router-dom'

type IRecentlyListedItems = IPhysicalItem & {
  shopDetails: {
    owner: { id: string }
  }
}

const settings = {
  className: 'center',
  arrows: false,
  centerMode: true,
  infinite: true,
  centerPadding: '160px',
  slidesToShow: 3,
  speed: 500,
}

const Card: React.FC<IRecentlyListedItems> = ({
  id,
  itemName,
  price,
  erc20Token,
  metadata,
  shopDetails,
}) => {
  const { isLoading, data } = useGetIpfsDataQuery({ hash: metadata })
  const [imageError, setImageError] = useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <div className="slider-card">
        <div className="card-top">
          {isLoading ? (
            <Skeleton height={'100%'} />
          ) : !data || imageError ? (
            <img src={Camera} alt="card" />
          ) : (
            <img
              src={data?.logo}
              alt="card"
              onError={() => setImageError(true)}
            />
          )}
        </div>
        <div className="card-bottom">
          <div className="top">
            <div className="top-left">
              {/* <div className="avatar-container">
                <img src={avatarOne} alt="avatar" />
              </div> */}
              <div>
                <span>
                  {itemName} <br /> #{id}
                </span>
                <p>{formatAddress(shopDetails.owner.id)}</p>
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
              <h5>
                {formatTokenUnits(price, erc20Token.decimals)}{' '}
                {erc20Token.symbol}
              </h5>
              <p>Price</p>
            </div>
            {/* <div className="center">
              <h5>
                4.12
                <br />
                ETH
              </h5>
              <p>from</p>
            </div> */}
            {/* <div className="right">
              <h5>$103,025</h5>
              <p>-2.25%</p>
            </div> */}
          </div>
        </div>
        <button
          className="collect-btn"
          onClick={() => navigate(`/physical-item-details/${id}`)}
        >
          Buy Now
        </button>
      </div>
    </div>
  )
}

const SliderCard = () => {
  const refSlider = useRef<Slider>(null)
  const [result] = useQuery<{ physicalItems: IRecentlyListedItems[] }>({
    query: recentlyListedQuery,
  })
  const { fetching, data } = result

  if (fetching) return <Loading />

  return (
    <div className="slider-card-container">
      <Slider {...settings} ref={refSlider}>
        {data?.physicalItems.map((item) => (
          <Card key={item.id} {...item} />
        ))}
      </Slider>
      <div className="slider-btn-container prev-slider-btn-cont">
        <button className="prev-btn">
          <img
            src={leftArrowIcon}
            alt="arrow icon"
            onClick={() => refSlider.current?.slickPrev()}
          />
        </button>
      </div>
      <div className="slider-btn-container next-slider-btn-cont">
        <button
          className="next-btn"
          onClick={() => refSlider.current?.slickNext()}
        >
          <img src={rightArrowIcon} alt="arrow icon" />
        </button>
      </div>
    </div>
  )
}

export default SliderCard
