import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const alchemyApiSlice = createApi({
  reducerPath: 'alchemy',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}`,
  }),
  endpoints: (builder) => ({
    getNftsById: builder.query<
      any,
      { tokenId: string; contractAddress: string }
    >({
      query: ({ tokenId, contractAddress }) => {
        return {
          url: `/getNFTMetadata`,
          params: {
            refreshCache: true,
            tokenType: 'ERC721',
            tokenId,
            contractAddress,
          },
        }
      },
    }),
  }),
})

export const { useGetNftsByIdQuery } = alchemyApiSlice

export default alchemyApiSlice
