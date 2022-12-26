import React from 'react'
import { useQuery } from 'urql'

import FixedSaleCard from '../FixedSaleCard'
import { IFixedSale } from '../../constants/types'
import { fixedSaleQuery } from '../../constants/query'
import Loading from '../Loading/Loading'

const CorporateMarketplace: React.FC = () => {
  const [result] = useQuery<{
    fixedSales: IFixedSale[]
  }>({
    query: fixedSaleQuery,
  })
  const { data, fetching, error } = result
  console.log(data)

  return (
    <div>
      {fetching ? (
        <div className="loading">
          <Loading />
        </div>
      ) : error ? (
        <div className="error-msg">
          <p>something went wrong</p>
        </div>
      ) : !data?.fixedSales.length ? (
        <div className="error-msg">
          <p>No Result</p>
        </div>
      ) : (
        <div className="marketplace-container-right-content">
          {data?.fixedSales.map((f, idx) => (
            <div key={idx}>
              <FixedSaleCard {...f} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default CorporateMarketplace
