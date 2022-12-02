import React from "react"
import SliderCard from "../SliderCard/SliderCard"
import "./RecentlyListed.css"

const RecentlyListed = () => {
  return (
    <div className="recently-listed">
      <h2 className="section-title">Recently listed Goods</h2>
      <SliderCard />
      <div className="btn-container">
        <button>see more</button>
      </div>
    </div>
  )
}

export default RecentlyListed
