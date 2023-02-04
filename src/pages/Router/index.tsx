import axios from 'axios'
import Loading from 'components/Loading'
import { subdomainNameSearch } from 'constants/query'
import { IFullOnBlockchainArtToken, IWebsiteToken } from 'constants/types'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import FullOnChainArt from './FullOnChainArt'

const Router = () => {
  const [datas, setData] = useState('')
  const [link, setLink] = useState('')
  const { siteId } = useParams()

  const [result] = useQuery<{
    websiteTokens: IWebsiteToken[]
    fullOnBlockchainArtTokens: IFullOnBlockchainArtToken[]
  }>({
    query: subdomainNameSearch,
    variables: {
      domainName: siteId,
    },
  })

  const { data, fetching } = result

  useMemo(() => {
    if (!data) return

    if (data.websiteTokens.length) {
      console.log(data.websiteTokens[0], 'website')
      setLink(data.websiteTokens[0].link)
      setData('website')
      return
    }
    if (data.fullOnBlockchainArtTokens.length) {
      setData('fullOnBlockchainArtTokens')
      return
    }
  }, [data])

  if (fetching)
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <Loading />
      </div>
    )

  if (datas === 'website') {
    return <WebsiteLink data={data} link={link} />
  }

  if (
    datas === 'fullOnBlockchainArtTokens' &&
    data?.fullOnBlockchainArtTokens.length
  ) {
    const artData = data.fullOnBlockchainArtTokens[0]
    return artData.totalChunks === '0' ? (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        No file is linked yet
      </div>
    ) : (
      <FullOnChainArt {...artData} />
    )
  }

  return null
}

export default Router

interface IWebsiteLink {
  data: any
  link: string
}
const WebsiteLink: React.FC<IWebsiteLink> = ({ data, link }) => {
  const [linkData, setLinkData] = useState([])
  const getData = useCallback(async () => {
    if (!data) return

    const { data: linkDatas } = await axios.get(
      `https://dapplink.infura-ipfs.io/ipfs/${link}`,
    )

    setLinkData(linkDatas)
  }, [link, data])

  useEffect(() => {
    getData()
  }, [getData])

  useEffect(() => {
    if (!link) return
    if (link) {
      document.body.style.backgroundColor = 'none'
    }
    document.body.style.backgroundColor = 'white'
    document.body.style.height = '100%'
  }, [link])

  function createMarkup() {
    return { __html: linkData as any }
  }

  return (
    <div>
      {link ? (
        <div dangerouslySetInnerHTML={createMarkup()} />
      ) : (
        <div
          style={{
            fontSize: '20px',
            display: 'grid',
            placeItems: 'center',
            height: '90vh',
          }}
        >
          File is not Linked Yet
        </div>
      )}
    </div>
  )
}
