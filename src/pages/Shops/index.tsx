import React, { useState, useMemo } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from 'urql'
import Skeleton from 'react-loading-skeleton'
import { Link } from 'react-router-dom'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { shopPageQuery } from '../../constants/query'
import Loading from '../../components/Loading/Loading'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import { formatAddress } from '../../constants/variants'
import cameraImg from '../../assets/icon/Camera.svg'

interface IShopToken {
  id: string
  domainName: string
  tokenUri: string | null
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
  const [openDigital, setOpenDigital] = useState(false)
  const [openPhysical, setOpenPhysical] = useState(false)
  const [openClothing, setOpenClothing] = useState(false)
  const [openAccessories, setOpenAccessories] = useState(false)
  const [openFood, setOpenFood] = useState(false)
  const [shopCheckBox, setShopCheckBox] = useState<string[]>([])

  const [result] = useQuery<{
    digitalShopTokens: IShopToken[]
    physicalShopTokens: IShopToken[]
  }>({ query: shopPageQuery })

  const { data, fetching, error } = result

  const [itemresult] = useQuery<{
    digitalItems: { shopDetails: IShopToken }[]
    physicalItems: { shopDetails: IShopToken }[]
  }>({ query: shopItemsQuery, variables: { category: shopCheckBox } })

  const { data: itemData } = itemresult

  const uniqueIds: string[] = []

  const uniqueItem = useMemo(() => {
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

  console.log(uniqueItem)

  return (
    <div>
      <Navigation />
      <div className="website-container" style={{ paddingTop: '51px' }}>
        <div className="website-container-left">
          <h2 className="heading">Shop</h2>

          <div
            className="header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '120px',
            }}
            onClick={() => setOpenDigital((m) => !m)}
          >
            <h2 style={{ fontSize: '14px' }}>Digital goods</h2>
            <IoIosArrowDown
              style={{
                transform: openDigital ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>

          {openDigital && (
            <div className="check-box-container">
              <div className="checkbox-content">
                <label htmlFor="Movies">Movies</label>
                <input id="Movies" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Music">Music</label>
                <input id="Music" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Books">Books</label>
                <input id="Books" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Courses">Courses</label>
                <input id="Courses" type="checkbox" />
              </div>
            </div>
          )}

          <div
            className="header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '110px',
            }}
            onClick={() => setOpenPhysical((m) => !m)}
          >
            <h2 style={{ fontSize: '14px', padding: '12px 0' }}>
              Physical goods
            </h2>
            <IoIosArrowDown
              style={{
                transform: openPhysical ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>
          {openPhysical && (
            <div className="check-box-container">
              <div className="checkbox-content">
                <label htmlFor="Men">Men</label>
                <input id="Men" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Women">Women</label>
                <input id="Women" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Kids">Kids</label>
                <input id="Kids" type="checkbox" />
              </div>
              <div
                className="header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0 1rem',
                }}
                onClick={() => setOpenClothing((m) => !m)}
              >
                <h2
                  style={{
                    fontSize: '14px',
                  }}
                >
                  Clothing
                </h2>
                <IoIosArrowDown
                  style={{
                    transform: openClothing ? 'rotate(180deg)' : 'rotate(0deg)',
                  }}
                />
              </div>

              {openClothing && (
                <div className="check-box-container">
                  <div className="checkbox-content">
                    <label htmlFor="Cloves">Cloves</label>
                    <input id="Cloves" type="checkbox" />
                  </div>
                  <div className="checkbox-content">
                    <label htmlFor="skirt">skirt</label>
                    <input id="skirt" type="checkbox" />
                  </div>
                  <div className="checkbox-content">
                    <label htmlFor="Belt">Belt</label>
                    <input id="Belt" type="checkbox" />
                  </div>
                </div>
              )}

              <div
                className="header"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '0 0 1rem',
                }}
                onClick={() => setOpenAccessories((m) => !m)}
              >
                <h2
                  style={{
                    fontSize: '14px',
                  }}
                >
                  Accessories
                </h2>
                <IoIosArrowDown
                  style={{
                    transform: openAccessories
                      ? 'rotate(180deg)'
                      : 'rotate(0deg)',
                  }}
                />
              </div>

              {openAccessories && (
                <div className="check-box-container">
                  <div className="checkbox-content">
                    <label htmlFor="Bag">Bag</label>
                    <input id="Bag" type="checkbox" />
                  </div>
                  <div className="checkbox-content">
                    <label htmlFor="Jwellery">Jwellery</label>
                    <input id="Jwellery" type="checkbox" />
                  </div>
                  <div className="checkbox-content">
                    <label htmlFor="others">others</label>
                    <input id="others" type="checkbox" />
                  </div>
                </div>
              )}
            </div>
          )}
          <div
            className="header"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '170px',
            }}
            onClick={() => setOpenFood((m) => !m)}
          >
            <h2 style={{ fontSize: '14px' }}>Food</h2>
            <IoIosArrowDown
              style={{
                transform: openFood ? 'rotate(180deg)' : 'rotate(0deg)',
              }}
            />
          </div>

          {openFood && (
            <div className="check-box-container">
              <div className="checkbox-content">
                <label htmlFor="FastFood">Fast Food</label>
                <input id="FastFood" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Sushi">Sushi</label>
                <input id="Sushi" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Restaurants">Restaurants</label>
                <input id="Restaurants" type="checkbox" />
              </div>
              <div className="checkbox-content">
                <label htmlFor="Vegan">Vegan</label>
                <input id="Vegan" type="checkbox" />
              </div>
            </div>
          )}
        </div>

        {fetching ? (
          <div className="loading">
            <Loading />
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
          <div className="website-container-right">
            {shopCheckBox.length === 0 ? (
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
      <div className="website-card-container">
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
