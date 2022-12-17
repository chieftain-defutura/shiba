import React from 'react'
import { useQuery } from 'urql'
import FixedSaleCard from '../FixedSaleCard'
import { IFixedSale } from '../../constants/types'
import { fixedSaleQuery } from '../../constants/query'

const CorporateMarketplace: React.FC = () => {
  const [result] = useQuery<{
    fixedSales: IFixedSale[]
  }>({
    query: fixedSaleQuery,
  })
  const { data, fetching, error } = result
  console.log(data)

  return (
    <div className="marketplace-container-right-content">
      {fetching ? (
        <div>Loading</div>
      ) : error ? (
        <div>Error</div>
      ) : !data?.fixedSales.length ? (
        <div>No Result</div>
      ) : (
        data?.fixedSales.map((f, idx) => (
          <div key={idx}>
            <FixedSaleCard {...f} />
          </div>
        ))
      )}
    </div>
  )
}

export default CorporateMarketplace
