import React, { useState } from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'

import HomeLayout from '../../Layout/HomeLayout'
import { IContractData } from '../../constants/contract'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import Loading from '../../components/Loading/Loading'
import camera from '../../assets/icon/Camera.svg'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import { DOMAIN_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import { formatAddress } from '../../constants/variants'

interface INftData {
  id: string
  owner: {
    id: string
  }
  tokenUri: string
  domainName: string
}

const MyContractNfts: React.FC<{ contractData: IContractData }> = ({
  contractData,
}) => {
  const { address } = useAccount()
  const [result] = useQuery({
    query: contractData.userNftsQuery,
    variables: { owner: address?.toLowerCase() },
    pause: !address,
  })
  const { data, fetching, error } = result

  const nftsData: any[] = data ? data[Object.keys(data)[0]] : []
  console.log(nftsData)

  return (
    <div>
      <HomeLayout>
        {fetching ? (
          <div className="loading">
            <Loading />
          </div>
        ) : error ? (
          <div className="error-msg">
            <p>Error</p>
          </div>
        ) : !nftsData.length ? (
          <div className="error-msg">
            <p>No Result</p>
          </div>
        ) : (
          <div className="website-container">
            <div className="website-container-right">
              {nftsData.map((nft, idx) =>
                contractData.address === DOMAIN_NFT_CONTRACT_ADDRESS ? (
                  <DomainNftCard
                    key={idx}
                    data={nft}
                    contractData={contractData}
                  />
                ) : (
                  <NftCard key={idx} data={nft} contractData={contractData} />
                ),
              )}
            </div>
          </div>
        )}
      </HomeLayout>
      <FooterBottom />
    </div>
  )
}

const NftCard: React.FC<{ data: INftData; contractData: IContractData }> = ({
  data,
  contractData,
}) => {
  const { data: ipfsData, isLoading } = useGetIpfsDataQuery(
    { hash: data.tokenUri ?? '' },
    { skip: !data.tokenUri },
  )
  const [imgError, setImageError] = useState(false)

  return (
    <div className="website-card-container">
      <div className="card">
        {isLoading ? (
          <div className="card-loader">
            <Skeleton height={'100%'} />
          </div>
        ) : (
          <div className="card-top">
            {!ipfsData || imgError ? (
              <img src={camera} alt="card" />
            ) : (
              <img
                src={ipfsData?.logo}
                alt="card"
                onError={() => setImageError(true)}
              />
            )}
          </div>
        )}
        <div className="card-center">
          <h3 className="title">
            {isLoading ? (
              <Skeleton />
            ) : !ipfsData ? (
              'unnamed'
            ) : (
              ipfsData?.shopName
            )}
          </h3>
          <h4 className="sub-title">#{data.id}</h4>
        </div>
        <div className="card-bottom">
          {contractData.showDetails ? (
            <Link
              to={`/shop/${contractData.pathName.split('-')[1]}/${data.id}`}
            >
              <p>Shop Details</p>
            </Link>
          ) : (
            <span></span>
          )}

          <Link to={`/${contractData.pathName}/${data.id}`}>
            <button style={{ width: '50px' }}>Get In</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

const DomainNftCard: React.FC<{
  data: INftData
  contractData: IContractData
}> = ({ data, contractData }) => {
  return (
    <div className="website-card-container">
      <div className="card">
        <div
          className="card-top"
          style={{ display: 'grid', placeItems: 'center' }}
        >
          <h3
            style={{
              color: '#343741',
              textAlign: 'center',
              wordBreak: 'break-all',
            }}
          >
            {data.domainName}
          </h3>
        </div>
        <div className="card-center">
          <h3 className="title">{formatAddress(data.owner.id)}</h3>
          <h4 className="sub-title">#{data.id}</h4>
        </div>
        <div className="card-bottom">
          {contractData.showDetails ? (
            <Link
              to={`/shop/${contractData.pathName.split('-')[1]}/${data.id}`}
            >
              <p>Shop Details</p>
            </Link>
          ) : (
            <span></span>
          )}

          <Link to={`/${contractData.pathName}/${data.id}`}>
            <button style={{ width: '50px' }}>Get In</button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default MyContractNfts
