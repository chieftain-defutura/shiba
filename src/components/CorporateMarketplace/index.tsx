import React from 'react'
import { useQuery } from 'urql'

import FixedSaleCard from '../FixedSaleCard'
import { IFixedSale } from '../../constants/types'
import { fixedSaleQuery } from '../../constants/query'
import Loading from '../Loading/Loading'

const CorportateQuery = `query($erc721TokenAddress:[String!]!) {
  fixedSales(where:{status:ACTIVE, erc721TokenAddress_in:$erc721TokenAddress}){
  id
  auctionId
  tokenId
  owner
  price
  erc20Token{
    id
    symbol
    decimals
  }
  erc721TokenAddress
  status
}
}`
interface ICorporateMarketplace {
  goodsCheckBox: string[]
}
const CorporateMarketplace: React.FC<ICorporateMarketplace> = ({
  goodsCheckBox,
}) => {
  const [result] = useQuery<{
    fixedSales: IFixedSale[]
  }>({
    query: fixedSaleQuery,
  })
  const { data, fetching, error } = result

  const [filterResult] = useQuery<{
    fixedSales: IFixedSale[]
  }>({
    query: CorportateQuery,
    variables: {
      erc721TokenAddress: goodsCheckBox,
    },
    pause: !goodsCheckBox,
  })
  console.log(goodsCheckBox)
  const { data: filteredData, fetching: filterFetching } = filterResult

  return (
    <div>
      {fetching || filterFetching ? (
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
          {goodsCheckBox.length <= 0
            ? data?.fixedSales.map((f, idx) => (
                <div key={idx}>
                  <FixedSaleCard {...f} />
                </div>
              ))
            : filteredData?.fixedSales.map((f, idx) => (
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
