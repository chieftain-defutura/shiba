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

  digitalData: { digitalItems: IGoodsDigitalItem[] }
  physicalData: { physicalItems: IGoodsPhysicalItem[] }
  clickDropDown: string | null
}

export const GoodsPhysical: React.FC<IGoodsPhysical> = ({
  data,
  digitalData,
  physicalData,
  clickDropDown,
}) => {
  console.log(digitalData.digitalItems)
  console.log(physicalData)
  return (
    <>
      {!data ? (
        <div className="loading">
          <Loading />
        </div>
      ) : !data?.digitalItems.length && !data?.physicalItems.length ? (
        <div className="error-msg">
          <p> No Nfts Here for sale</p>
        </div>
      ) : (
        <div className="marketplace-container-right-content">
          {clickDropDown === null && (
            <>
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
            </>
          )}
          {clickDropDown === 'Physical Goods' &&
            physicalData.physicalItems.map((f, idx) => (
              <div key={idx}>
                <Link
                  to={`/physical-item-details/${f.id}`}
                  style={{ textDecoration: 'none' }}
                >
                  <PhysicalItem {...f} />
                </Link>
              </div>
            ))}

          {clickDropDown === 'Digital Goods' &&
            digitalData.digitalItems.map((f, idx) => (
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
  digitalData: { digitalItems: IGoodsDigitalItem[] }
  physicalData: { physicalItems: IGoodsPhysicalItem[] }
  clickDropDown: string | null
}

const GoodsMaretPlace: React.FC<IGoodsMarketPlace> = ({
  digitalData,
  physicalData,
  clickDropDown,
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
        clickDropDown={clickDropDown}
      />
    </>
  )
}

export default GoodsMaretPlace
