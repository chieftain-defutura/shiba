import React from 'react'

import { Link } from 'react-router-dom'
import { useQuery } from 'urql'

import DigitalItem from '../DigitalItem'
import { IGoodsDigitalItem, IGoodsPhysicalItem } from '../../constants/types'
import {
  // goodsDigitalItemsQuery,
  goodsItemsQuery,
  // goodsPhysicalItemsQuery,
} from '../../constants/query'
import Loading from '../Loading/Loading'
import PhysicalItem from '../PhysicallItem/PhysicalItem'

// interface IGoodsDigital {
//   data: IGoodsDigitalItem[] | undefined
// }

// export const GoodsDigital: React.FC<IGoodsDigital> = ({ data }) => {
//   return (
//     <>
//       {data?.map((f, idx) => (
//         <div key={idx}>
//           <Link
//             to={`/digital-item-details/${f.id}`}
//             style={{ textDecoration: 'none' }}
//           >
//             <DigitalItem {...f} />
//           </Link>
//         </div>
//       ))}
//     </>
//   )
// }

interface IGoodsPhysical {
  data:
    | {
        physicalItems: IGoodsPhysicalItem[]
        digitalItems: IGoodsDigitalItem[]
      }
    | undefined
}

export const GoodsPhysical: React.FC<IGoodsPhysical> = ({ data }) => {
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

const GoodsMaretPlace: React.FC = () => {
  const [result] = useQuery<{
    physicalItems: IGoodsPhysicalItem[]
    digitalItems: IGoodsDigitalItem[]
  }>({
    query: goodsItemsQuery ? goodsItemsQuery : goodsItemsQuery,
  })
  const { data } = result
  console.log(data)
  return (
    <>
      {/* <GoodsDigital data={data?.digitalItems} /> */}
      <GoodsPhysical data={data} />
    </>
  )
}

export default GoodsMaretPlace
