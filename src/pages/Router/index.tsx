import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGetIpfsDataQuery } from 'store/slices/ipfsApiSlice'

const Router = () => {
  const [data, setData] = useState([])
  const getData = async () => {
    const { data } = await axios.get(
      'https://cyan-high-squirrel-945.mypinata.cloud/ipfs/Qma3Sxf1C8J86QVEBcSTTXiXSAMmXvYx4Ag8edBMLwaxKL',
    )
    setData(data)
  }
  useEffect(() => {
    getData()
  }, [])

  console.log(data)

  function createMarkup() {
    return { __html: data as any }
  }
  return <div dangerouslySetInnerHTML={createMarkup()} />
}

export default Router
