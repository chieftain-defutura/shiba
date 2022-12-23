import React, { useMemo } from 'react'
import { useBalance, useAccount } from 'wagmi'
import { Link } from 'react-router-dom'

import {
  PAW_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
  BONE_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
  SHIB_TOKEN_ADDRESS,
} from '../../utils/contractAddress'
import { useAppDispatch, useAppSelector } from '../../store/store'
import {
  updateBoneBalance,
  updateLeashBalance,
  updatePawBalance,
  updateShiBalance,
  updateShibBalance,
} from '../../store/slices/userSlice'
import './HeaderNav.css'

const HeaderNav: React.FC = () => {
  const { address } = useAccount()
  const dispatch = useAppDispatch()
  const user = useAppSelector((store) => store.user)

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
    token: SHIB_TOKEN_ADDRESS,
  })
  const { data: leashBalanceData } = useBalance({
    address: address,
    token: LEASH_TOKEN_ADDRESS,
  })
  const { data: shiBalanceData } = useBalance({
    address: address,
    token: SHI_TOKEN_ADDRESS,
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
    shiBalanceData,
    leashBalanceData,
    shibBalanceData,
    boneBalanceData,
    dispatch,
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
            }).format(user.shiBalance)}
          </li>
          <li>
            LEASH:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(user.leashBalance)}
          </li>
          <li>
            SHIB:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(user.shibBalance)}
          </li>
          <li>
            BONE:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(user.boneBalance)}
          </li>
          <li>
            PAW:
            {new Intl.NumberFormat('en-US', {
              maximumFractionDigits: 2,
            }).format(user.pawBalance)}
          </li>
          <li>
            <Link to="/send-crypto">
              <button>Send Crypto</button>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default HeaderNav
