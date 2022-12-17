import React, { useMemo } from 'react'
import './HeaderNav.css'
import { useBalance } from 'wagmi'
import { useAccount } from 'wagmi'
import {
  PAW_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  BONE_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
} from '../../utils/contractAddress'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  updateBoneBalance,
  updateLeashBalance,
  updatePawBalance,
  updateShiBalance,
  updateShibBalance,
} from '../../store/slices/userSlice'

const HeaderNav: React.FC = () => {
  const { address } = useAccount()
  const dispatch = useAppDispatch()
  // const balances = useAppSelector((store) => store.user)

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

  useMemo(() => {
    if (pawBalanceData) dispatch(updatePawBalance(pawBalanceData.formatted))
    if (shiBalanceData) dispatch(updateShiBalance(shiBalanceData.formatted))
    if (leashBalanceData)
      dispatch(updateLeashBalance(leashBalanceData.formatted))
    if (shibBalanceData) dispatch(updateShibBalance(shibBalanceData.formatted))
    if (boneBalanceData) dispatch(updateBoneBalance(boneBalanceData.formatted))
  }, [
    pawBalanceData,
    updateShiBalance,
    leashBalanceData,
    shibBalanceData,
    boneBalanceData,
  ])

  return (
    <div className="header-nav-container">
      <div className="header-nav">
        <ul>
          <li>
            <button>My Items: 105</button>
          </li>

          <li>
            SHI:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(Number(shiBalanceData?.formatted))}
          </li>
          <li>
            LEASH:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(Number(leashBalanceData?.formatted))}
          </li>
          <li>
            SHIB:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(Number(shibBalanceData?.formatted))}
          </li>
          <li>
            BONE:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(Number(boneBalanceData?.formatted))}
          </li>
          <li>
            PAW:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(Number(pawBalanceData?.formatted))}
          </li>

          <li>
            <button>Send Crypto</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderNav
