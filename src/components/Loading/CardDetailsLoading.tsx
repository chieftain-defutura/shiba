import React from 'react'
import Skeleton from 'react-loading-skeleton'

const CardDetailsLoading: React.FC<{ isShop?: boolean }> = ({ isShop }) => {
  return (
    <>
      <div className="shop-heading">
        <Skeleton height={'100%'} />
      </div>
      <div className="card-details-container">
        <div className="card-details">
          <div className="img-skeleton">
            <Skeleton height={'50vh'} width={'100%'} />
          </div>
          <div>
            {!isShop ? (
              Array.from({ length: 13 }).map((_, index) => (
                <div key={index} className="card-details-content">
                  <div className="cardLine">
                    <Skeleton height={'100%'} />
                  </div>
                </div>
              ))
            ) : (
              <div>
                {Array.from({ length: 2 }).map((_, index) => (
                  <div key={index} className="shop-skeleton-container">
                    <div className="cardLine">
                      <Skeleton height={'15vh'} />
                    </div>
                  </div>
                ))}
                <div className="shop-skeleton-content">
                  {Array.from({ length: 3 }).map((_, index) => (
                    <div key={index} className="shop-skeleton-icon">
                      <div className="cardLine">
                        <Skeleton height={'5vh'} width={'4vw'} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="endPara-content">
          <div className="endLine">
            <Skeleton height={'100%'} />
          </div>
          <div className="endLine">
            <Skeleton height={'100%'} />
          </div>
        </div>
      </div>
    </>
  )
}

export default CardDetailsLoading
