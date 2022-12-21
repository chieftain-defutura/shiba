import React from 'react'

import './Card.css'
import cardImg from '../../assets/img/card-2.png'

const Card = () => {
  return (
    <div className="card-container">
      <div className="card-top">
        <img src={cardImg} alt="card" />
      </div>
      <div className="card-center">
        <h5>COOLGUYZZ</h5>
        <p>Coolguyzz.io</p>
      </div>
      <div className="card-bottom">
        <div className="left">
          <h5>1.5 ETH</h5>
          <p>Floor Price </p>
        </div>
        <div className="right">
          <h5>$2045.12</h5>
          <p>-12.45%</p>
        </div>
      </div>
    </div>
  )
}

export default Card
