import React from 'react'
import { useQuery } from 'urql'
import DigitalItem from '../DigitalItem'
import { Link } from 'react-router-dom'
import { IGoodsDigitalItem } from '../../constants/types'
import {
  goodsDigitalItemsQuery,
  goodsPhysicalItemsQuery,
} from '../../constants/query'

export const GoodsDigital = () => {
  const [result] = useQuery<{
    digitalItems: IGoodsDigitalItem[]
  }>({
    query: goodsDigitalItemsQuery,
  })
  const { data } = result
  console.log(data)

  return (
    <>
      {!data?.digitalItems.length ? (
        <div>Loading</div>
      ) : (
        data?.digitalItems.map((f, idx) => (
          <div key={idx}>
            <h4>Digital</h4>
            <Link
              to={`/digital-item-details/${f.id}`}
              style={{ textDecoration: 'none' }}
            >
              <DigitalItem {...f} />
            </Link>
          </div>
        ))
      )}
    </>
  )
}

export const GoodsPhysical = () => {
  const [result] = useQuery<{
    physicalItems: IGoodsDigitalItem[]
  }>({
    query: goodsPhysicalItemsQuery,
  })
  const { data } = result
  console.log(data)

  return (
    <>
      {!data?.physicalItems.length ? (
        <div></div>
      ) : (
        data?.physicalItems.map((f, idx) => (
          <div key={idx}>
            <h4>physical</h4>
            <Link
              to={`/digital-item-details/${f.id}`}
              style={{ textDecoration: 'none' }}
            >
              <DigitalItem {...f} />
            </Link>
          </div>
        ))
      )}
    </>
  )
}

const GoodsMaretPlace: React.FC = () => {
  return (
    <div className="marketplace-container-right-content">
      <GoodsDigital />
      <GoodsPhysical />
    </div>
  )
}

export default GoodsMaretPlace
