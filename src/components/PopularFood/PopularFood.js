import React from 'react'
import SliderCard from '../SliderCard/SliderCard'
import './PopularFood.css'

const PopularFood = () => {
  return (
    <div className="popular-food-container">
      <h2 className="section-title">Popular In Food</h2>
      <SliderCard />
      <div className="btn-container">
        <button>see more</button>
      </div>
    </div>
  )
}

export default PopularFood
