import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { useQuery } from 'urql'

import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'
import { shopPageQuery } from '../../constants/query'
import Loading from '../../components/Loading/Loading'
import { useGetIpfsDataQuery } from '../../store/slices/ipfsApiSlice'
import Skeleton from 'react-loading-skeleton'
import { formatAddress } from '../../constants/variants'

interface IShopToken {
  id: string
  domainName: string
  tokenUri: string | null
  owner: {
    id: string
  }
}

const ShopPage: React.FC = () => {
  const [openDigital, setOpenDigital] = useState(false)
  const [openPhysical, setOpenPhysical] = useState(false)
  const [openClothing, setOpenClothing] = useState(false)
  const [openAccessories, setOpenAccessories] = useState(false)
  const [openFood, setOpenFood] = useState(false)

  const [result] = useQuery<{
    digitalShopTokens: IShopToken[]
    physicalShopTokens: IShopToken[]
  }>({ query: shopPageQuery })

  const { data, fetching, error } = result

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
            {data?.digitalShopTokens.map((f, idx) => (
              <ShopCard key={idx} {...f} type={'Digital'} />
            ))}
            {data?.physicalShopTokens.map((f, idx) => (
              <ShopCard key={idx} {...f} type={'Physical'} />
            ))}
          </div>
        )}
      </div>
      <FooterBottom />
    </div>
  )
}

const ShopCard: React.FC<{ type: string } & IShopToken> = ({
  id,
  domainName,
  type,
  tokenUri,
  owner,
}) => {
  const { data, isLoading } = useGetIpfsDataQuery({ hash: tokenUri ?? '' })
  const [imageError, setImageError] = useState(false)
  console.log(id, isLoading, data)
  return (
    <div className="website-card-container">
      <div className="card">
        <div className="card-top">
          {isLoading ? (
            <Skeleton height={'100%'} />
          ) : !data || imageError ? (
            <img src={cardImg} alt="card" />
          ) : (
            <img
              src={data?.logo}
              alt="card"
              onError={() => setImageError(true)}
            />
          )}
        </div>
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
  )
}

export default ShopPage
