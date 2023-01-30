import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const ipfsApiSlice = createApi({
  reducerPath: 'pinata-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_INFURA_GATEWAY_URL}/ipfs/`,
  }),
  endpoints: (builder) => ({
    getIpfsData: builder.query<any, { hash: string }>({
      query: ({ hash }) => {
        return {
          url: hash,
        }
      },
    }),
  }),
})

export const { useGetIpfsDataQuery } = ipfsApiSlice

export default ipfsApiSlice
