import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardLoading: React.FC = () => {
  return (
    <div className="skeleton">
      {Array.from({ length: 10 }).map((_, index) => (
        <div key={index} className="skeleton-container">
          <div className="card-img">
            <Skeleton height={'18vh'} />
          </div>
          <div className="card-line">
            <Skeleton height={'100%'} />
          </div>
          <div className="card-line">
            <Skeleton height={'100%'} />
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardLoading
