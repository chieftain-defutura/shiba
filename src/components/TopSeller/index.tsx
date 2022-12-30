import React from 'react'

import Card from 'components/Card'
import './TopSeller.css'

const TopSeller: React.FC = () => {
  return (
    <div className="top-seller-container">
      <h2 className="section-title">Top Seller</h2>
      <div className="top-seller-nav">
        <ul>
          <li className="active">Art</li>
          <li>Apk</li>
          <li>Video</li>
          <li>Music</li>
          <li>Food</li>
          <li>Sushi</li>
          <li>Vegan</li>
        </ul>
      </div>
      <div className="top-seller-cards-container">
        {Array.from({ length: 8 }).map((_, idx) => (
          <Card key={idx} />
        ))}
      </div>
      <div className="btn-container">
        <button>see more</button>
      </div>
    </div>
  )
}

export default TopSeller
