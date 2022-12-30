import React, { useState } from 'react'
import { formatUnits } from 'ethers/lib/utils.js'
import Skeleton from 'react-loading-skeleton'

import { IGoodsPhysicalItem } from 'constants/types'
import cameraImg from 'assets/icon/Camera.svg'
import '../PhysicallItem/PhysicallItem.scss'
import { useGetIpfsDataQuery } from 'store/slices/ipfsApiSlice'

const PhysicalItem: React.FC<IGoodsPhysicalItem> = ({
  erc20Token,
  price,
  quantity,
  shopDetails,
  metadata,
  itemName,
  category,
}) => {
  const [imageError, setImageError] = useState(false)
  const { isLoading, data } = useGetIpfsDataQuery({ hash: metadata })

  return (
    <div className="physicall-item-card-container">
      <div className="card">
        {isLoading ? (
          <div className="card-top">
            <Skeleton height={'100%'} />
          </div>
        ) : !data || imageError ? (
          <div className="card-top">
            <img src={cameraImg} alt="card" />
          </div>
        ) : (
          <div className="card-top">
            <img
              src={data?.logo}
              alt="card"
              onError={() => setImageError(true)}
            />
          </div>
        )}
        <div className="card-center">
          <h3 className="title">{itemName}</h3>
          <h4 className="sub-title">{category}</h4>
        </div>
        <div className="card-bottom">
          <div className="card-btn">
            <p>Fixed price</p>
            <button>
              {formatUnits(price, erc20Token.decimals)} {erc20Token.symbol}
            </button>
          </div>
          <div className="card-shoes">
            <p style={{ color: '#fff' }}>Name: {itemName}</p>
            <p style={{ color: '#fff' }}>Quantity: {quantity}</p>
          </div>
          <div className="card-overlay">
            <button
              style={{
                width: '91px',
                height: '21px',
                background: '#38F2AF',
                color: '#fff',
                fontWeight: '500',
                fontSize: '12px',
                fontFamily: 'Oswald',
              }}
            >
              Details
            </button>
            <button
              style={{
                width: '91px',
                height: '21px',
                background: '#38F2AF',
                color: '#fff',
                fontWeight: '500',
                fontSize: '12px',
                fontFamily: 'Oswald',
              }}
            >
              Buy
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PhysicalItem
