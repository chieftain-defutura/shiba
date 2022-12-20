import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IIpfsShipmentDetails } from '../../constants/types'

const ipfsApiSlice = createApi({
  reducerPath: 'pinata-api',
  baseQuery: fetchBaseQuery({
    baseUrl: `${process.env.REACT_APP_PINATA_GATEWAY_URL}/ipfs/`,
  }),
  endpoints: (builder) => ({
    getIpfsData: builder.query<IIpfsShipmentDetails, { hash: string }>({
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
