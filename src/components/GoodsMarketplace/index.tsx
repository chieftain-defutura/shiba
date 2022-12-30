import React from 'react'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'

import DigitalItem from '../DigitalItem'
import { IGoodsDigitalItem, IGoodsPhysicalItem } from 'constants/types'
import { goodsItemsQuery } from 'constants/query'
import Loading from '../Loading'
import PhysicalItem from '../PhysicallItem'
import { parseUnits } from 'ethers/lib/utils.js'
import {
  BONE_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from 'utils/contractAddress'

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
}

export const GoodsPhysical: React.FC<IGoodsPhysical> = ({
  data,
  digitalData,
  physicalData,
  clickDropDown,
  goodsCheckBox,
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
          {clickDropDown === null ? (
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
  debouncedDomainName: string
  selectedDropDown: string | undefined
}

const GoodsMaretPlace: React.FC<IGoodsMarketPlace> = ({
  digitalData,
  physicalData,
  clickDropDown,
  goodsCheckBox,
  debouncedDomainName,
  selectedDropDown,
}) => {
  const [result] = useQuery<{
    physicalItems: IGoodsPhysicalItem[]
    digitalItems: IGoodsDigitalItem[]
  }>({
    query: goodsItemsQuery,
    variables: {
      price:
        parseUnits(
          !debouncedDomainName ? '0' : debouncedDomainName,
          '18',
        ).toString() || !debouncedDomainName,
      erc20Token: selectedDropDown?.toLowerCase()
        ? [selectedDropDown.toLowerCase()]
        : [
            SHIB_TOKEN_ADDRESS.toLowerCase(),
            SHI_TOKEN_ADDRESS.toLowerCase(),
            LEASH_TOKEN_ADDRESS.toLowerCase(),
            PAW_TOKEN_ADDRESS.toLowerCase(),
            BONE_TOKEN_ADDRESS.toLowerCase(),
          ],
    },
  })
  const { data } = result

  return (
    <>
      <GoodsPhysical
        data={data}
        digitalData={digitalData}
        physicalData={physicalData}
        clickDropDown={clickDropDown}
        goodsCheckBox={goodsCheckBox}
      />
    </>
  )
}

export default GoodsMaretPlace
