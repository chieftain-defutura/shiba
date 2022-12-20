import React from 'react'
import { formatUnits } from 'ethers/lib/utils.js'

import { IGoodsPhysicalItem } from '../../constants/types'
import cardImg from '../../assets/img/card-3.png'
import '../PhysicallItem/PhysicallItem.scss'

const PhysicalItem: React.FC<IGoodsPhysicalItem> = ({ erc20Token, price }) => {
  return (
    <div className="physicall-item-card-container">
      <div className="card">
        <div className="card-top">
          <img src={cardImg} alt="card" />
        </div>
        <div className="card-center">
          <h3 className="title">The Holy Grail</h3>
          <h4 className="sub-title">Pixart Motion</h4>
        </div>
        <div className="card-bottom">
          <div className="card-btn">
            <p>Fixed price</p>
            <button>
              {formatUnits(price, erc20Token.decimals)} {erc20Token.symbol}
            </button>
          </div>
          <div className="card-shoes">
            <p>Name: Shoes1</p>
            <p>Price: 10400 SHI</p>
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
