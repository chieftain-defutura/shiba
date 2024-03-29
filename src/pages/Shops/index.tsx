import React, { useState, useMemo, ChangeEvent } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'

import FooterBottom from 'components/FooterBottom/index'
import { shopPageQuery } from 'constants/query'
import { useGetIpfsDataQuery } from 'store/slices/ipfsApiSlice'
import { formatAddress } from 'constants/variants'
import cameraImg from 'assets/icon/Camera.svg'
import CardLoading from 'components/Loading/CardLoading'
import './Shops.css'

interface IShopToken {
  id: string
  domainName: string
  tokenUri: string | null
  metadata: string
  owner: {
    id: string
  }
}

export const shopItemsQuery = `
query($category:[String!]){
  digitalItems(where:{status:ACTIVE,category_in:$category}){
    shopDetails{
      id
      domainName
      tokenUri
      owner {
        id
      }  
    }
  }
  physicalItems(where:{status:ACTIVE , category_in:$category}){
    shopDetails{
      id
      domainName
      tokenUri
      owner {
        id
      }  
    }
  }
}`

const ShopPage: React.FC = () => {
  const [shopCheckBox, setShopCheckBox] = useState<string[]>([])
  const [labelDropDown, setLabelDropDown] = useState<number[]>([])

  const [result] = useQuery<{
    digitalShopTokens: IShopToken[]
    physicalShopTokens: IShopToken[]
  }>({ query: shopPageQuery })

  const { data, fetching, error } = result
  const [itemresult] = useQuery<{
    digitalItems: { shopDetails: IShopToken }[]
    physicalItems: { shopDetails: IShopToken }[]
  }>({ query: shopItemsQuery, variables: { category: shopCheckBox } })

  const { data: itemData, fetching: filterFetching } = itemresult

  console.log(itemData)
  const uniqueItem = useMemo(() => {
    const uniqueIds: string[] = []
    if (!itemData) return
    const physical = itemData?.physicalItems.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.shopDetails.id)

      if (!isDuplicate) {
        uniqueIds.push(element.shopDetails.id)

        return true
      }

      return false
    })
    const digital = itemData?.digitalItems.filter((element) => {
      const isDuplicate = uniqueIds.includes(element.shopDetails.id)

      if (!isDuplicate) {
        uniqueIds.push(element.shopDetails.id)

        return true
      }

      return false
    })

    return { digital, physical }
  }, [itemData])

  const handleChange = ({
    target: { value },
  }: ChangeEvent<HTMLInputElement>) => {
    if (shopCheckBox.includes(value.toLowerCase())) {
      setShopCheckBox((f) =>
        f.filter((e) => e.toLowerCase() !== value.toLowerCase()),
      )
    } else {
      setShopCheckBox((f) => f.concat(value.toLowerCase()))
    }
  }

  return (
    <div>
      <div className="shop-container" style={{ paddingTop: '51px' }}>
        <div className="shop-container-left">
          <h2 className="heading">Shop</h2>

          <div className="header">
            {shopingData.map((f, idx) => (
              <div key={idx} className="drop-down-container">
                <div
                  className="drop-down-header"
                  onClick={() => {
                    if (labelDropDown.includes(idx)) {
                      setLabelDropDown((l) => l.filter((f) => f !== idx))
                    } else {
                      setLabelDropDown((l) => [...l, idx])
                    }
                  }}
                >
                  <p>{f.title}</p>
                  <div
                    className={
                      labelDropDown.includes(idx) ? 'arrow active' : 'arrow'
                    }
                  >
                    <IoIosArrowDown className="arrow-icon" />
                  </div>
                </div>

                <AnimatePresence>
                  {labelDropDown.includes(idx) && (
                    <motion.div
                      initial={{
                        height: 0,
                        opacity: 0,
                      }}
                      animate={{
                        height: 'auto',
                        opacity: 1,
                      }}
                      exit={{
                        height: 0,
                        opacity: 0,
                      }}
                    >
                      <div className="check-box-container">
                        {f.labels.map((label, index) => (
                          <div className="checkbox-content" key={index}>
                            <label htmlFor="Human Rights">{label}</label>
                            <input
                              id="Human Rights"
                              type="checkbox"
                              value={label}
                              onChange={handleChange}
                            />
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>

        {fetching || filterFetching ? (
          <div>
            <CardLoading />
          </div>
        ) : error ? (
          <div className="error-msg">
            <p>something went wrong</p>
          </div>
        ) : !data?.digitalShopTokens.length ? (
          <div className="error-msg">
            <p>No Result</p>
          </div>
        ) : !data?.physicalShopTokens.length ? (
          <div className="error-msg">
            <p>No Result</p>
          </div>
        ) : (
          <div className="shop-container-right">
            {shopCheckBox.length <= 0 ? (
              <>
                {data?.digitalShopTokens.map((f, idx) => (
                  <ShopCard
                    key={idx}
                    {...f}
                    type={'Digital'}
                    path={'digital'}
                  />
                ))}
                {data?.physicalShopTokens.map((f, idx) => (
                  <ShopCard key={idx} {...f} type={'Physical'} path={'goods'} />
                ))}
              </>
            ) : (
              <>
                {uniqueItem?.digital.map((f, idx) => (
                  <ShopCard
                    key={idx}
                    {...f.shopDetails}
                    type={'Digital'}
                    path={'digital'}
                  />
                ))}
                {uniqueItem?.physical.map((f, idx) => (
                  <ShopCard
                    key={idx}
                    {...f.shopDetails}
                    type={'Physical'}
                    path={'goods'}
                  />
                ))}
              </>
            )}
          </div>
        )}
      </div>
      <FooterBottom />
    </div>
  )
}

const ShopCard: React.FC<{ type: string; path: string } & IShopToken> = ({
  id,
  domainName,
  type,
  tokenUri,
  owner,
  path,
}) => {
  const { data, isLoading } = useGetIpfsDataQuery({ hash: tokenUri ?? '' })
  const [imageError, setImageError] = useState(false)

  return (
    <Link to={`/shop/${path}/${id}`}>
      <div className="shop-card-container">
        <div className="card">
          {isLoading ? (
            <div className="card-loader">
              <Skeleton height={'100%'} />
            </div>
          ) : !data || imageError ? (
            <div className="card-top">
              <img src={cameraImg} alt="card" />
            </div>
          ) : (
            <div className="card-top">
              <img
                src={data?.logo}
                alt="card"
                onError={() => setImageError(true)}
              />
            </div>
          )}
          <div className="card-center">
            <h3 className="title">
              {!data || !data?.shopName ? 'unnamed' : data.shopName}
            </h3>
            <h4 className="sub-title">{formatAddress(owner.id)}</h4>
          </div>
          <div className="card-bottom">
            <p>{type} Shop Id:</p>
            <p>#{id}</p>
          </div>
        </div>
        <div style={{ padding: '5px 0' }}>
          <p style={{ fontSize: '14px' }}>Domain:</p>
          <p style={{ fontSize: '14px', wordBreak: 'break-all' }}>
            <b>{domainName}</b>
          </p>
        </div>
      </div>
    </Link>
  )
}

export default ShopPage

const shopingData = [
  {
    title: 'Digital goods',
    labels: ['Movies', 'Music', 'Books', 'Courses'],
  },
  {
    title: 'Physical goods',
    labels: ['Accessories', 'Clothing', 'Food'],
  },
]
