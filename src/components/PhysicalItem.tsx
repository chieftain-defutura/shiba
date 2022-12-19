import React from 'react'
import { formatUnits } from 'ethers/lib/utils.js'

import cardImg from '../assets/img/card-3.png'
import { IGoodsPhysicalItem } from '../constants/types'

const PhysicalItem: React.FC<IGoodsPhysicalItem> = ({ erc20Token, price }) => {
  return (
    <div className="marketplace-card-container">
      <div className="card">
        <div className="card-top">
          <img src={cardImg} alt="card" />
        </div>
        <div className="card-center">
          <h3 className="title">The Holy Grail</h3>
          <h4 className="sub-title">Pixart Motion</h4>
        </div>
        <div className="card-bottom">
          <p>Fixed price</p>
          <button>
            {formatUnits(price, erc20Token.decimals)} {erc20Token.symbol}
          </button>
          <button>Buy</button>
        </div>
      </div>
    </div>
  )
}

export default PhysicalItem
