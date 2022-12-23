import React from 'react'

import { Link } from 'react-router-dom'
import { useQuery } from 'urql'

import DigitalItem from '../DigitalItem'
import { IGoodsDigitalItem, IGoodsPhysicalItem } from '../../constants/types'
import { goodsItemsQuery } from '../../constants/query'
import Loading from '../Loading/Loading'
import PhysicalItem from '../PhysicallItem/PhysicalItem'

interface IGoodsPhysical {
  data:
    | {
        physicalItems: IGoodsPhysicalItem[]
        digitalItems: IGoodsDigitalItem[]
      }
    | undefined

  digitalData: IGoodsDigitalItem[]
  physicalData: IGoodsPhysicalItem[]
}

export const GoodsPhysical: React.FC<IGoodsPhysical> = ({
  data,
  digitalData,
  physicalData,
}) => {
  return (
    <>
      {!data ? (
        <Loading />
      ) : !data?.digitalItems.length && !data?.physicalItems.length ? (
        <div style={{ textAlign: 'center', marginTop: '60px' }}>
          No Nfts Here for sale
        </div>
      ) : (
        <div className="marketplace-container-right-content">
          {/* {physicalData.map((f, idx) => (
            <div key={idx}>
              <Link
                to={`/physical-item-details/${f.id}`}
                style={{ textDecoration: 'none' }}
              >
                <PhysicalItem {...f} />
              </Link>
            </div>
          ))} */}
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
          {/* {digitalData.map((f, idx) => (
            <div key={idx}>
              <Link
                to={`/digital-item-details/${f.id}`}
                style={{ textDecoration: 'none' }}
              >
                <DigitalItem {...f} />
              </Link>
            </div>
          ))} */}
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

interface IGoodsMarketPlace {
  digitalData: IGoodsDigitalItem[]
  physicalData: IGoodsPhysicalItem[]
}

const GoodsMaretPlace: React.FC<IGoodsMarketPlace> = ({
  digitalData,
  physicalData,
}) => {
  const [result] = useQuery<{
    physicalItems: IGoodsPhysicalItem[]
    digitalItems: IGoodsDigitalItem[]
  }>({
    query: goodsItemsQuery,
  })
  const { data } = result
  return (
    <>
      {/* <GoodsDigital data={data?.digitalItems} /> */}
      <GoodsPhysical
        data={data}
        digitalData={digitalData}
        physicalData={physicalData}
      />
    </>
  )
}

export default GoodsMaretPlace
