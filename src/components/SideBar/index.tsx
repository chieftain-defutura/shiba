import React from 'react'
import CountUp from 'react-countup'
import { Link } from 'react-router-dom'
import { useQuery } from 'urql'
import { useAccount, useContractReads } from 'wagmi'

import {
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  DOMAIN_NFT_CONTRACT_ADDRESS,
  CHARITIES_NFT_CONTRACT_ADDRESS,
  WEBSITE_NFT_CONTRACT_ADDRESS,
  ART_NFT_CONTRACT_ADDRESS,
} from 'utils/contractAddress'
import shopAbi from 'utils/abi/physicalShopABI.json'
import {
  awaitingDeliveryQuery,
  haveToSendQuery,
  userCollectionsQuery,
} from 'constants/query'
import { IUserCollection } from 'constants/types'
import './SideBar.css'

const SideBar: React.FC = () => {
  const { address } = useAccount()
  const [result] = useQuery<{ userCollections: IUserCollection[] }>({
    query: userCollectionsQuery,
    variables: { user: address },
    pause: !address,
  })
  const { data } = result

  const [haveToSendresult] = useQuery<{
    shipments: unknown[]
  }>({
    query: haveToSendQuery,
    variables: {
      owner: address?.toLowerCase(),
    },
    pause: !address,
  })
  const [awaitingDeliveryResult] = useQuery<{
    shipments: unknown[]
  }>({
    query: awaitingDeliveryQuery,
    variables: {
      buyer: address?.toLowerCase(),
    },
    pause: !address,
  })

  const { data: balanceData } = useContractReads({
    contracts: [
      {
        address: DOMAIN_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: CHARITIES_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: WEBSITE_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: 'balanceOf',
        args: [address],
      },
      {
        address: ART_NFT_CONTRACT_ADDRESS,
        abi: shopAbi,
        functionName: 'balanceOf',
        args: [address],
      },
    ],
  })

  const getMyCollectionCount = (category: string) => {
    if (!data) return '0'

    const collection = data.userCollections.find(
      (item) => item.category === category,
    )
    if (!collection) return '0'

    return collection.totalItems
  }

  return (
    <div>
      <div className="sidebar-container">
        <div className="box">
          <h2 className="heading">My Items</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-movies">
                <p className="name">My Movies</p>
                <p className="number">
                  <CountUp
                    end={Number(getMyCollectionCount('movies'))}
                    duration={0.4}
                  />
                </p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-music">
                <p className="name">My Music</p>
                <p className="number">
                  <CountUp
                    end={Number(getMyCollectionCount('music'))}
                    duration={0.4}
                  />
                </p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-books">
                <p className="name">My Books</p>
                <p className="number">
                  <CountUp
                    end={Number(getMyCollectionCount('books'))}
                    duration={0.4}
                  />
                </p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-courses">
                <p className="name">My Courses</p>
                <p className="number">
                  <CountUp
                    end={Number(getMyCollectionCount('courses'))}
                    duration={0.4}
                  />
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Websites</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-websites">
                <p className="name">My Websites</p>
                <p className="number">
                  {balanceData?.[4] ? (
                    <CountUp
                      end={Number(balanceData[4].toString())}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">Full On BlockChain</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-full-on-blockchain-nft">
                <p className="name">Full On BlockChain</p>
                <p className="number">
                  {balanceData?.[5] ? (
                    <CountUp
                      end={Number(balanceData[5].toString())}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Domains</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-domains">
                <p className="name">My Domains</p>
                <p className="number">
                  {balanceData?.[0] ? (
                    <CountUp
                      end={Number(balanceData[0].toString())}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Shops</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-digital-shop">
                <p className="name">My Digital Shop</p>
                <p className="number">
                  {balanceData?.[1] ? (
                    <CountUp
                      end={Number(balanceData[1].toString())}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
            <div className="content">
              <Link to="/my-goods-shop">
                <p className="name">My Goods Shop</p>
                <p className="number">
                  {balanceData?.[2] ? (
                    <CountUp
                      end={Number(balanceData[2].toString())}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">My Charities</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/my-charities">
                <p className="name">My Charities</p>
                <p className="number">
                  {balanceData?.[3] ? (
                    <CountUp
                      end={Number(balanceData[3].toString())}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>
        <div className="box">
          <h2 className="heading">Delivery</h2>
          <div className="content-cont">
            <div className="content">
              <Link to="/have-to-send">
                <p className="name">Have to Send</p>
                <p className="number">
                  {haveToSendresult.data ? (
                    <CountUp
                      end={Number(haveToSendresult.data?.shipments.length)}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
            <div className="content">
              <Link to="/awaiting-delivery">
                <p className="name">Awaiting Delivery</p>
                <p className="number">
                  {awaitingDeliveryResult.data ? (
                    <CountUp
                      end={Number(
                        awaitingDeliveryResult.data?.shipments.length,
                      )}
                      duration={0.4}
                    />
                  ) : (
                    0
                  )}
                </p>
              </Link>
            </div>
          </div>
        </div>
        {/* <div className="select-container">
          <select>
            <option>SORT BY DATE</option>
            <option>Websites</option>
          </select>
        </div> */}
      </div>
    </div>
  )
}

export default SideBar
