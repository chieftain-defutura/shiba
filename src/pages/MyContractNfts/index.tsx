import React from 'react'
import { useAccount } from 'wagmi'
import { IContractData } from '../../constants/contract'
import { Link } from 'react-router-dom'

import Navigation from '../../components/Navigation/Navigation'
import HeaderNav from '../../components/HeaderNav/HeaderNav'
import SideBar from '../../components/SideBar/SideBar'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { useGetUserNftsQuery } from '../../store/slices/moralisApiSlice'
import cardImg from '../../assets/img/card-3.png'

const MyContractNfts: React.FC<{ contractData: IContractData }> = ({
  contractData,
}) => {
  const { address } = useAccount()

  const { data, isLoading, isError } = useGetUserNftsQuery({
    erc721Address: contractData.address,
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
          ) : !nftsData.length ? (
            <div>No Result</div>
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
                    <Link to={`/shop-details/${f.id}`}>
                      <p>Shop Details</p>
                    </Link>

                    <Link to={`/${contractData.pathName}/${f.token_id}`}>
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

export default MyContractNfts
