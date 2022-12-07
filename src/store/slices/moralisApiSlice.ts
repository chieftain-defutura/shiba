import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const moralisApiSlice = createApi({
  reducerPath: 'moralis',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://deep-index.moralis.io/api/v2',
    prepareHeaders: (headers) => {
      headers.set('X-API-KEY', process.env.REACT_APP_MORALIS_API_KEY ?? '')
      return headers
    },
  }),
  endpoints: (builder) => ({
    getNftsByContractAddress: builder.query<any, { erc721Address: string }>({
      query: ({ erc721Address }) => {
        return {
          url: `/nft/${erc721Address}?chain=0x5&limit=2&cursor=`,
        }
      },
    }),
    getUserNfts: builder.query<any, { erc721Address: string; address: string }>(
      {
        query: ({ erc721Address, address }) => {
          return {
            url: `/${address}/nft?chain=0x5&token_addresses=${erc721Address}`,
          }
        },
      },
    ),
  }),
})

export const { useGetNftsByContractAddressQuery, useGetUserNftsQuery } =
  moralisApiSlice

export default moralisApiSlice
