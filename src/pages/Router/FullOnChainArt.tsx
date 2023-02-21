import Loading from 'components/Loading'
import { getChunksByTokenIdQuery } from 'constants/query'
import { IChunksData, IFullOnBlockchainArtToken } from 'constants/types'
import React, { useMemo } from 'react'
import { useQuery } from 'urql'
import { WEBSITE_NFT_CONTRACT_ADDRESS } from 'utils/contractAddress'
import { restoredChunks } from 'utils/formatters'

const FullOnChainArt: React.FC<
  IFullOnBlockchainArtToken & { erc721TokenAddress: string }
> = ({ tokenId, totalChunks, erc721TokenAddress }) => {
  const [result] = useQuery<{ chunks: IChunksData[] }>({
    query: getChunksByTokenIdQuery,
    variables: {
      tokenId: tokenId,
      erc721TokenAddress: erc721TokenAddress.toLowerCase(),
    },
  })
  const { data, fetching, error } = result

  const image = useMemo(() => {
    if (!data) return

    if (!data.chunks.length) return 'not_found'

    if (
      erc721TokenAddress.toLowerCase() ===
      WEBSITE_NFT_CONTRACT_ADDRESS.toLowerCase()
    ) {
      return data.chunks.map((chunk) => chunk.chunkData).join('')
    }

    return restoredChunks(
      data.chunks.slice(0, Number(totalChunks)).map((c) => c.chunkData),
    )
  }, [data, totalChunks, erc721TokenAddress])

  if (error)
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <p>Something went wrong</p>
      </div>
    )

  if (fetching)
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <Loading />
      </div>
    )

  if (!image)
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <p>Something went wrong</p>
      </div>
    )

  if (image === 'not_found')
    return (
      <div style={{ height: '100vh', display: 'grid', placeItems: 'center' }}>
        <p>File is not linked yet</p>
      </div>
    )

  return (
    <div style={{ height: '100vh' }}>
      <iframe
        title="fullonblockchainart"
        src={image}
        width="100%"
        height={'100%'}
      />
    </div>
  )
}

export default FullOnChainArt
