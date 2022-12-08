import React, { useState } from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'
// import "./WebsitesPage.css";

const ShopPage = () => {
  const [openDigital, setOpenDigital] = useState(false)
  const [openPhysical, setOpenPhysical] = useState(false)
  const [openClothing, setOpenClothing] = useState(false)
  const [openAccessories, setOpenAccessories] = useState(false)
  const [openFood, setOpenFood] = useState(false)

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
          {Array.from({ length: 7 }).map((_, idx) => (
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
                  <p>Fixed price</p>
                  <button>0.001 ETH</button>
                </div>
              </div>
              <h4 className="domain-name">Domain:</h4>
            </div>
          ))}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default ShopPage