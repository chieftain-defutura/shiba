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
    getNftsByContractAddress: builder.query<any, void>({
      query: () => {
        return {
          url: `/nft/0x15e5eF8C7249eAb317517D0f5068F8aFd57Fb586?chain=0x5&limit=1&cursor=`,
        }
      },
    }),
  }),
})

export const { useGetNftsByContractAddressQuery } = moralisApiSlice

export default moralisApiSlice
