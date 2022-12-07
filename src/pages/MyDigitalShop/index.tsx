import React from 'react'
import { useAccount } from 'wagmi'
import { Link } from 'react-router-dom'

import Navigation from '../../components/Navigation/Navigation'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { DIGITAL_GOODS_NFT_CONTRACT_ADDRESS } from '../../utils/contractAddress'
import { useGetUserNftsQuery } from '../../store/slices/moralisApiSlice'
import cardImg from '../../assets/img/card-3.png'

const MyDigitalShop: React.FC = () => {
  const { address } = useAccount()

  const { data, isLoading, isError } = useGetUserNftsQuery({
    erc721Address: DIGITAL_GOODS_NFT_CONTRACT_ADDRESS,
    address: address ?? '',
  })

  const nftsData: any[] = data ? data?.result : []

  return (
    <div>
      <Navigation />
      <HeaderNav />
      <div className="website-container">
        <div className="website-container-right">
          <SideBar />
        </div>
        <div className="website-container-right">
          {isLoading ? (
            <div>Loading</div>
          ) : isError ? (
            <div>Error</div>
          ) : (
            nftsData.map((f, idx) => (
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
                    <p>Shop Details</p>
                    <Link to={`/my-digital-shop/${f}`}>
                      <button style={{ width: '50px' }}>Get In</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
      <FooterBottom />
    </div>
  )
}

export default MyDigitalShop
