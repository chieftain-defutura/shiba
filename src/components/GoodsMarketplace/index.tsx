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
import PhysicalItem from '../PhysicallItem/PhysicalItem'

export const GoodsDigital = () => {
  const [result] = useQuery<{
    digitalItems: IGoodsDigitalItem[]
  }>({
    query: goodsDigitalItemsQuery,
  })
  const { data, fetching } = result
  console.log(data)

  return (
    <>
      <div style={{ fontSize: '20px', textAlign: 'center' }}>
        <h2>Digital</h2>
      </div>
      {fetching ? (
        <Loading />
      ) : !data?.digitalItems.length ? (
        <div style={{ textAlign: 'center' }}>No Nfts Here for sale</div>
      ) : (
        <div className="marketplace-container-right-content">
          {data?.digitalItems.map((f, idx) => (
            <div key={idx}>
              <Link
                to={`/digital-item-details/${f.id}`}
                style={{ textDecoration: 'none' }}
              >
                <DigitalItem {...f} />
              </Link>
            </div>
          ))}
        </div>
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
      <div style={{ fontSize: '20px', textAlign: 'center' }}>
        <h2>physical</h2>
      </div>
      {!data ? (
        <Loading />
      ) : !data?.physicalItems.length ? (
        <div style={{ textAlign: 'center' }}>No Nfts Here for sale</div>
      ) : (
        <div className="marketplace-container-right-content">
          {data?.physicalItems.map((f, idx) => (
            <div key={idx}>
              <Link
                to={`/physical-item-details/${f.id}`}
                style={{ textDecoration: 'none' }}
              >
                <PhysicalItem {...f} />
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

const GoodsMaretPlace: React.FC = () => {
  return (
    <>
      <GoodsDigital />
      <GoodsPhysical />
    </>
  )
}

export default GoodsMaretPlace
