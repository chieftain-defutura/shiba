import React, { useState, useCallback, useEffect } from 'react'
import { useAccount } from 'wagmi'
import {
  DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
  PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS,
} from '../../utils/contractAddress'
import axios from 'axios'
import { IoIosArrowDown } from 'react-icons/io'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'

const ShopPage: React.FC = () => {
  const { address } = useAccount()
  const [openDigital, setOpenDigital] = useState(false)
  const [openPhysical, setOpenPhysical] = useState(false)
  const [openClothing, setOpenClothing] = useState(false)
  const [openAccessories, setOpenAccessories] = useState(false)
  const [openFood, setOpenFood] = useState(false)
  const [loading, setLoading] = useState(false)
  const [digitalNftData, setDigitalNftData] = useState([])
  const [physicalNftData, setPhysicalNftData] = useState([])
  console.log(digitalNftData)

  const handleDigitalNftData = useCallback(async () => {
    try {
      if (!address) return
      setLoading(true)

      const { data } = await axios.get(
        `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTsForCollection?contractAddress=${DIGITAL_GOODS_NFT_CONTRACT_ADDRESS}&withMetadata=true`,

        {
          headers: {
            'X-API-KEY': process.env.REACT_APP_ALCHEMY_API_KEY,
          },
        },
      )
      const { data: physicalData } = await axios.get(
        `https://eth-goerli.g.alchemy.com/nft/v2/${process.env.REACT_APP_ALCHEMY_API_KEY}/getNFTsForCollection?contractAddress=${PHYSICAL_GOODS_NFT_CONTRACT_ADDRESS}&withMetadata=true`,

        {
          headers: {
            'X-API-KEY': process.env.REACT_APP_ALCHEMY_API_KEY,
          },
        },
      )
      setLoading(false)
      console.log(data)
      setDigitalNftData(data.nfts.map((r: any) => r))
      setPhysicalNftData(physicalData.nfts.map((r: any) => r))
    } catch (error) {
      console.log(error)
    }
  }, [address])

  useEffect(() => {
    handleDigitalNftData()
  }, [handleDigitalNftData])

  // const filterCategory =()=>{}
  return (
    <div>
      <Navigation />
      <div className="website-container">
        <div className="website-container-left">
          <h2 className="heading">Shop</h2>

          <div
            className="header"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
            onClick={() => setOpenDigital((m) => !m)}
          >
            <h2>Digital goods</h2>
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
              justifyContent: 'space-between',
            }}
            onClick={() => setOpenPhysical((m) => !m)}
          >
            <h2>Physical goods</h2>
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
              justifyContent: 'space-between',
            }}
            onClick={() => setOpenFood((m) => !m)}
          >
            <h2>Food</h2>
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

        <div className="website-container-right">
          {loading && 'loading...'}
          {!digitalNftData.length || (physicalNftData.length ? 'noResult' : '')}

          {!openDigital &&
            digitalNftData.map((f, idx) => (
              <div className="website-card-container" key={idx}>
                <div className="card">
                  <div className="card-top">
                    <img src={cardImg} alt="card" />
                  </div>
                  <div className="card-center">
                    <h3 className="title">The Holy Grail</h3>
                    <h4 className="sub-title">Pixart Motion</h4>
                  </div>
                  <div className="card-bottom">
                    <p>Category: Book</p>
                    <p>id: {idx}</p>
                  </div>
                </div>
              </div>
            ))}
          {!openPhysical &&
            physicalNftData.map((f, idx) => (
              <div className="website-card-container" key={idx}>
                <div className="card">
                  <div className="card-top">
                    <img src={cardImg} alt="card" />
                  </div>
                  <div className="card-center">
                    <h3 className="title">The Holy Grail</h3>
                    <h4 className="sub-title">Pixart Motion</h4>
                  </div>
                  <div className="card-bottom">
                    <p>Category: Music</p>
                    <p>id: {idx}</p>
                    {/* <Link to={`/my-digital-shop/${f}`}>
                    <button style={{ width: "50px" }}>Get In</button>
                  </Link> */}
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ShopPage
