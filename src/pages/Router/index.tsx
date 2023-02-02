import axios from 'axios'
import Loading from 'components/Loading'
import { subdomainNameSearch } from 'constants/query'
import { IWebsiteToken } from 'constants/types'
import React, { useEffect, useState, useMemo, useCallback } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'

const Router = () => {
  const [datas, setData] = useState('')
  const [link, setLink] = useState('')
  const { siteId } = useParams()
  console.log(siteId)
  const [result] = useQuery<{
    websiteTokens: IWebsiteToken[]
    fullOnBlockchainArtTokens: IWebsiteToken[]
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
      console.log(
        data.fullOnBlockchainArtTokens[0],
        'fullOnBlockchainArtTokens',
      )
      setLink(data.fullOnBlockchainArtTokens[0].link)
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

  if (datas === 'fullOnBlockchainArtTokens') {
    return (
      <div>
        {link ? (
          <div>
            <img
              style={{ display: 'block', margin: 'auto' }}
              src={`https://dapplink.infura-ipfs.io/ipfs/${link}`}
              alt=""
            />
          </div>
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
