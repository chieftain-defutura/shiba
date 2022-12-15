import React from 'react'
import cardImg from '../../assets/img/card-3.png'

const DigitalItemCategoryCard = () => {
  return (
    <div className="card">
      <div className="card-top">
        <img src={cardImg} alt="card" />
      </div>
      <div className="card-center">
        <h3 className="title">The Holy Grail</h3>
        <h4 className="sub-title">Pixart Motion</h4>
      </div>
      <div className="card-bottom">
        <p>Shop Details</p>
      </div>
    </div>
  )
}

export default DigitalItemCategoryCard
