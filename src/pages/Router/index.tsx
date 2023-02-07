import Loading from 'components/Loading'
import { subdomainNameSearch } from 'constants/query'
import { IFullOnBlockchainArtToken, IWebsiteToken } from 'constants/types'
import React, { useState, useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from 'urql'
import {
  ART_NFT_CONTRACT_ADDRESS,
  WEBSITE_NFT_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import FullOnChainArt from './FullOnChainArt'

const Router = () => {
  const [datas, setData] = useState('')
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

  if (datas === 'website' && data?.websiteTokens.length) {
    const artData = data.websiteTokens[0]
    return artData.totalChunks === '0' ? (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        No file is linked yet
      </div>
    ) : (
      <FullOnChainArt
        {...artData}
        erc721TokenAddress={WEBSITE_NFT_CONTRACT_ADDRESS}
      />
    )
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
      <FullOnChainArt
        {...artData}
        erc721TokenAddress={ART_NFT_CONTRACT_ADDRESS}
      />
    )
  }

  return null
}

export default Router
