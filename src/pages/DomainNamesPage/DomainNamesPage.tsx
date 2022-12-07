import React, { useCallback, useEffect, useState } from 'react'
import Navigation from '../../components/Navigation/Navigation'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import cardImg from '../../assets/img/card-3.png'
import './DomainNamesPage.css'
import axios from 'axios'
import { useAccount } from 'wagmi'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import { useGetNftsByContractAddressQuery } from '../../store/slices/moralisApiSlice'
// import { useAppDispatch, useAppSelector } from "../../store/store"

const DomainNamesPage: React.FC = () => {
  const [loading, setLoading] = useState(false)
  const [userNftData, setUserNftData] = useState([])
  const [visible, setVisible] = useState(1)
  const { data } = useGetNftsByContractAddressQuery()
  console.log(data)
  // const dispatch = useAppDispatch()
  // const read = useAppSelector((state) => state)

  const showMore = () => {
    setVisible((preValue) => preValue + 1)
  }
  const showLess = () => {
    setVisible((preValue) => preValue - 1)
  }

  //eslint-disable-next-line no-unused-vars

  console.log(userNftData)
  const { address } = useAccount()

  // const handleDomainNames = useCallback(async () => {
  //   try {
  //     if (!address) return
  //     setLoading(true)

  //     const { data } = await axios.get(
  //       `https://deep-index.moralis.io/api/v2/nft/0x15e5eF8C7249eAb317517D0f5068F8aFd57Fb586?chain=0x5&limit=${visible}&cursor=`,
  //       {
  //         headers: {
  //           "X-API-KEY": process.env.REACT_APP_MORALIS_API_KEY,
  //         },
  //       },
  //     )
  //     setLoading(false)
  //     setUserNftData(data.result.map((r: any) => r.token_id))

  //     console.log(data)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }, [address])

  // useEffect(() => {
  //   handleDomainNames()
  // }, [handleDomainNames])

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="domain-name-container">
        <div className="domain-name-container-left">
          <h2 className="heading">Domain Names</h2>

          <div className="check-box-container">
            <div className="checkbox-content">
              <label htmlFor="shib">.shib</label>
              <input id="shib" type="checkbox" />
            </div>
          </div>
        </div>
        <div className="domain-name-container-right">
          {loading ? 'loading...' : ''}
          {!userNftData.length && 'noResult'}
          {userNftData.map((_, idx) => (
            <div className="domain-name-card-container" key={idx}>
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

        {/* {visible === userNftData.length ? (
          <div onClick={showLess}>
            <p style={{ cursor: "pointer" }}>Show Less</p>
          </div>
        ) : (
          <div onClick={showMore}>
            <p style={{ cursor: "pointer" }}>Show More</p>
          </div>
        )} */}
      </div>
      <FooterBottom />
    </div>
  )
}

export default DomainNamesPage
