import React from 'react'
import Skeleton from 'react-loading-skeleton'
import { useQuery } from 'urql'
import closeIcon from '../../assets/img/close-icon.png'
import { getReviewOfShopQuery } from '../../constants/query'
import { IReviewOfShop } from '../../constants/types'
import { formatAddress } from '../../constants/variants'

interface IReviewsProps {
  status: 'GOOD' | 'BAD'
  shopId: string
  handleClose: () => void
}

const Reviews: React.FC<IReviewsProps> = ({ handleClose, shopId, status }) => {
  const [result] = useQuery<{ reviews: IReviewOfShop[] }>({
    query: getReviewOfShopQuery,
    variables: { shopId, status },
  })
  const { fetching, data } = result

  return (
    <div className="up-vote-box">
      <img
        src={closeIcon}
        alt="close"
        className="close-icon"
        onClick={handleClose}
      />
      {fetching ? (
        <Skeleton count={5} />
      ) : !data ? (
        <div
          style={{
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          }}
        >
          <p>Oops something went wrong</p>
        </div>
      ) : !data.reviews.length ? (
        <div
          style={{
            height: '100%',
            display: 'grid',
            placeItems: 'center',
            textAlign: 'center',
          }}
        >
          <p>No reviews is added Yet.</p>
        </div>
      ) : (
        <div>
          {data.reviews.map((details, index) => (
            <p key={index.toString()}>
              {formatAddress(details.user)}: {details.review}
            </p>
          ))}
        </div>
      )}
    </div>
  )
}

export default Reviews
