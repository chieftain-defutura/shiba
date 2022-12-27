import React from 'react'
import { useNavigate } from 'react-router-dom'

import './RecentlyListed.css'
import SliderCard from '../SliderCard/SliderCard'

const RecentlyListed = () => {
  const navigate = useNavigate()
  return (
    <div className="recently-listed">
      <h2 className="section-title">Recently listed Goods</h2>
      <SliderCard />
      <div className="btn-container">
        <button onClick={() => navigate('/marketplace')}>see more</button>
      </div>
    </div>
  )
}

export default RecentlyListed
