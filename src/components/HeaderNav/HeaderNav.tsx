import React from 'react'
import './HeaderNav.css'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import {
  PAW_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  BONE_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from '../../utils/contractAddress'

const HeaderNav: React.FC = () => {
  const { address } = useAccount()

  const { data: pawBalanceData } = useBalance({
    address: address,
    token: PAW_TOKEN_ADDRESS,
  })
  const { data: boneBalanceData } = useBalance({
    address: address,
    token: BONE_TOKEN_ADDRESS,
  })
  const { data: shibBalanceData } = useBalance({
    address: address,
    token: SHI_TOKEN_ADDRESS,
  })
  const { data: leashBalanceData } = useBalance({
    address: address,
    token: LEASH_TOKEN_ADDRESS,
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
