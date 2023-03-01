import Loading from 'components/Loading'
import { getChunksByTokenIdQuery } from 'constants/query'
import { IChunksData, IFullOnBlockchainArtToken } from 'constants/types'
import React, { useMemo } from 'react'
import { useQuery } from 'urql'
import { restoredChunks } from 'utils/formatters'

const FullOnChainArt: React.FC<IFullOnBlockchainArtToken> = ({
  tokenId,
  totalChunks,
}) => {
  const [result] = useQuery<{ chunks: IChunksData[] }>({
    query: getChunksByTokenIdQuery,
    variables: { tokenId: tokenId },
  })
  const { data, fetching, error } = result

  const image = useMemo(() => {
    if (!data) return

    return restoredChunks(
      data.chunks.slice(0, Number(totalChunks)).map((c) => c.chunkData),
    )
  }, [data, totalChunks])

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

  return (
    <div>
      <img src={image} alt="" />
    </div>
  )
}

export default FullOnChainArt
