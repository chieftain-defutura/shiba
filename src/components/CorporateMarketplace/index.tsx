import React from 'react'
import { useQuery } from 'urql'

import FixedSaleCard from '../FixedSaleCard'
import { IFixedSale } from 'constants/types'
import { fixedSaleQuery } from 'constants/query'
import Loading from '../Loading'
import { parseUnits } from 'ethers/lib/utils.js'
import {
  BONE_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from 'utils/contractAddress'

const CorportateQuery = `query($erc721TokenAddress:[String!]!,$price:String!,$erc20Token:[String!]!) {
  fixedSales(where:{status:ACTIVE, erc721TokenAddress_in:$erc721TokenAddress, price_gte:$price,  erc20Token_in:$erc20Token}){
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
  debouncedDomainName: string
  selectedDropDown: any
  categoryCheckBox: string[]
}
const CorporateMarketplace: React.FC<ICorporateMarketplace> = ({
  goodsCheckBox,
  debouncedDomainName,
  selectedDropDown,
  categoryCheckBox,
}) => {
  console.log(categoryCheckBox)
  const [result] = useQuery<{
    fixedSales: IFixedSale[]
  }>({
    query: fixedSaleQuery,
    variables: {
      price: parseUnits(
        !debouncedDomainName ? '0' : debouncedDomainName,
        '18',
      ).toString(),
      erc20Token: selectedDropDown?.address.toLowerCase()
        ? [selectedDropDown.address.toLowerCase()]
        : [
            SHIB_TOKEN_ADDRESS.toLowerCase(),
            SHI_TOKEN_ADDRESS.toLowerCase(),
            LEASH_TOKEN_ADDRESS.toLowerCase(),
            PAW_TOKEN_ADDRESS.toLowerCase(),
            BONE_TOKEN_ADDRESS.toLowerCase(),
          ],
    },
  })
  const { data, fetching, error } = result

  const [filterResult] = useQuery<{
    fixedSales: IFixedSale[]
  }>({
    query: CorportateQuery,
    variables: {
      erc721TokenAddress: goodsCheckBox,
      price: parseUnits(
        !debouncedDomainName ? '0' : debouncedDomainName,
        '18',
      ).toString(),
      erc20Token: selectedDropDown?.address.toLowerCase()
        ? [selectedDropDown.address.toLowerCase()]
        : [
            SHIB_TOKEN_ADDRESS.toLowerCase(),
            SHI_TOKEN_ADDRESS.toLowerCase(),
            LEASH_TOKEN_ADDRESS.toLowerCase(),
            PAW_TOKEN_ADDRESS.toLowerCase(),
            BONE_TOKEN_ADDRESS.toLowerCase(),
          ],
    },
    pause: !goodsCheckBox.length,
  })
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
