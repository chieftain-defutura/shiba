import React from 'react'
import { useQuery } from 'urql'
import DigitalItem from '../DigitalItem'
import { Link } from 'react-router-dom'
import { IGoodsDigitalItem, IGoodsPhysicalItem } from '../../constants/types'
import {
  goodsDigitalItemsQuery,
  goodsPhysicalItemsQuery,
} from '../../constants/query'
import Loading from '../Loading/Loading'
import PhysicalItem from '../PhysicalItem'

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
        <Loading />
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
    physicalItems: IGoodsPhysicalItem[]
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
              to={`/physical-item-details/${f.id}`}
              style={{ textDecoration: 'none' }}
            >
              <PhysicalItem {...f} />
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
