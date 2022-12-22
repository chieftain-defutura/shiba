import React from 'react'
import { useAccount } from 'wagmi'
import { IContractData } from '../../constants/contract'
import { Link } from 'react-router-dom'

import HomeLayout from '../../Layout/HomeLayout'
import FooterBottom from '../../components/FooterBottom/FooterBottom'
import { useGetUserNftsQuery } from '../../store/slices/moralisApiSlice'
import Loading from '../../components/Loading/Loading'
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
      <HomeLayout>
        {isLoading ? (
          <Loading />
        ) : isError ? (
          <div style={{ textAlign: 'center', color: '#fff' }}>Error</div>
        ) : !nftsData.length ? (
          <div style={{ textAlign: 'center', color: '#fff' }}>No Result</div>
        ) : (
          <div className="website-container">
            <div className="website-container-right">
              {nftsData.map((f, idx) => (
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
                      <Link
                        to={`/shop/${contractData.pathName.split('-')[1]}/${
                          f.token_id
                        }`}
                      >
                        <p>Shop Details</p>
                      </Link>

                      <Link to={`/${contractData.pathName}/${f.token_id}`}>
                        <button style={{ width: '50px' }}>Get In</button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </HomeLayout>
      <FooterBottom />
    </div>
  )
}

export default MyContractNfts
