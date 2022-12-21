import React from 'react'

import cardImg from '../../assets/img/card-3.png'

const DigitalItemCategoryCard: React.FC = () => {
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
        <div className="cards-bottom">
          <p>Fixed price</p>
          <button>price</button>
        </div>
      </div>
    </div>
  )
}

export default DigitalItemCategoryCard
