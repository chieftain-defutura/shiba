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
  goodsCheckBox: string[]
  priceData:
    | {
        physicalItems: IGoodsPhysicalItem[]
        digitalItems: IGoodsDigitalItem[]
      }
    | undefined
  value: string
}

export const GoodsPhysical: React.FC<IGoodsPhysical> = ({
  data,
  digitalData,
  physicalData,
  clickDropDown,
  goodsCheckBox,
  priceData,
  value,
}) => {
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
          {value === '' ? (
            clickDropDown === null ? (
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
            ) : clickDropDown === 'Physical Goods' ? (
              goodsCheckBox.length <= 0 ? (
                data?.physicalItems.map((f, idx) => (
                  <div key={idx}>
                    <Link
                      to={`/physical-item-details/${f.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <PhysicalItem {...f} />
                    </Link>
                  </div>
                ))
              ) : (
                physicalData?.physicalItems.map((f, idx) => (
                  <div key={idx}>
                    <Link
                      to={`/physical-item-details/${f.id}`}
                      style={{ textDecoration: 'none' }}
                    >
                      <PhysicalItem {...f} />
                    </Link>
                  </div>
                ))
              )
            ) : goodsCheckBox.length <= 0 ? (
              data?.digitalItems.map((f, idx) => (
                <div key={idx}>
                  <Link
                    to={`/digital-item-details/${f.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <DigitalItem {...f} />
                  </Link>
                </div>
              ))
            ) : (
              digitalData?.digitalItems.map((f, idx) => (
                <div key={idx}>
                  <Link
                    to={`/digital-item-details/${f.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <DigitalItem {...f} />
                  </Link>
                </div>
              ))
            )
          ) : (
            <>
              {priceData?.digitalItems.map((f, idx) => (
                <div key={idx}>
                  <Link
                    to={`/digital-item-details/${f.id}`}
                    style={{ textDecoration: 'none' }}
                  >
                    <DigitalItem {...f} />
                  </Link>
                </div>
              ))}
              {priceData?.physicalItems.map((f, idx) => (
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
        </div>
      )}
    </>
  )
}

interface IGoodsMarketPlace {
  digitalData: { digitalItems: IGoodsDigitalItem[] }
  physicalData: { physicalItems: IGoodsPhysicalItem[] }
  clickDropDown: string | null
  goodsCheckBox: string[]
  priceData:
    | {
        physicalItems: IGoodsPhysicalItem[]
        digitalItems: IGoodsDigitalItem[]
      }
    | undefined
  value: string
}

const GoodsMaretPlace: React.FC<IGoodsMarketPlace> = ({
  digitalData,
  physicalData,
  clickDropDown,
  goodsCheckBox,
  priceData,
  value,
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
        goodsCheckBox={goodsCheckBox}
        priceData={priceData}
        value={value}
      />
    </>
  )
}

export default GoodsMaretPlace
