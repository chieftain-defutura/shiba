import React from 'react'
import './HeaderNav.css'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'

const HeaderNav: React.FC = () => {
  const { address } = useAccount()

  const { data: pawBalanceData } = useBalance({
    address: address,
    token: '0xDe84104b17889bcad097AAF42A089591f523981d',
  })
  const { data: boneBalanceData } = useBalance({
    address: address,
    token: '0xB77B2660264763927AbE1Fcf845490d38860EF4F',
  })
  const { data: shibBalanceData } = useBalance({
    address: address,
    token: '0xd1B82CBC72ea2787178E4E9F4268901671039334',
  })
  const { data: leashBalanceData } = useBalance({
    address: address,
    token: '0xB77B2660264763927AbE1Fcf845490d38860EF4F',
  })
  const { data: shiBalanceData } = useBalance({
    address: address,
    token: '0x84b17f5f0Aa6fe08dBf8a5357E366Dd2A9665467',
  })

  return (
    <div className="header-nav-container">
      <div className="header-nav">
        <ul>
          <li>
            <button>My Items: 105</button>
          </li>

          <li>SHI: {shiBalanceData?.formatted}</li>
          <li>LEASH: {leashBalanceData?.formatted}</li>
          <li>SHIB: {shibBalanceData?.formatted}</li>
          <li>BONE: {boneBalanceData?.formatted}</li>
          <li>PAW: {pawBalanceData?.formatted}</li>

          <li>
            <button>Send Crypto</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderNav
