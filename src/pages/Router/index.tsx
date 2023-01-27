import axios from 'axios'
import { subdomainNameSearch } from 'constants/query'
import { IWebsiteToken } from 'constants/types'
import React, { useEffect, useState, useMemo } from 'react'
import { useQuery } from 'urql'

const Router = () => {
  const [datas, setData] = useState('')
  const [link, setLink] = useState('')

  const [result] = useQuery<{
    websiteTokens: IWebsiteToken[]
    fullOnBlockchainArtTokens: IWebsiteToken[]
  }>({
    query: subdomainNameSearch,
    variables: {
      domainName: `${window.location.hostname.split('.')[0]}.${
        window.location.hostname.split('.')[1]
      }`,
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

    console.log(null)
  }, [data])

  if (fetching) return <div>loading...</div>

  if (datas === 'website') {
    return <WebsiteLink data={data} link={link} />
  }

  if (datas === 'fullOnBlockchainArtTokens') {
    return (
      <div>
        {data ? (
          <div>
            <img
              style={{ display: 'block', margin: 'auto' }}
              src={`https://dapplink.infura-ipfs.io/ipfs/${link}`}
              alt=""
            />
          </div>
        ) : (
          <div>no data</div>
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
  const getData = async () => {
    if (!data) return

    const { data: linkDatas } = await axios.get(
      `https://dapplink.infura-ipfs.io/ipfs/${link}`,
    )

    setLinkData(linkDatas)
  }

  useEffect(() => {
    getData()
  }, [link])

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
        <div style={{ color: '#fff', fontSize: '20px' }}>
          File is not Linked Yet
        </div>
      )}
    </div>
  )
}
