import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import {
  SHIB_TOKEN_ADDRESS,
  BONE_TOKEN_ADDRESS,
  PAW_TOKEN_ADDRESS,
  SHI_TOKEN_ADDRESS,
  LEASH_TOKEN_ADDRESS,
} from '../../utils/contractAddress'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    shiBalance: 0,
    pawBalance: 0,
    leashBalance: 0,
    shibBalance: 0,
    boneBalance: 0,
    [SHIB_TOKEN_ADDRESS]: 0,
    [BONE_TOKEN_ADDRESS]: 0,
    [PAW_TOKEN_ADDRESS]: 0,
    [LEASH_TOKEN_ADDRESS]: 0,
    [SHI_TOKEN_ADDRESS]: 0,
  },
  reducers: {
    updateShiBalance: (state, action) => {
      state.shiBalance = Number(action.payload)
      state[SHI_TOKEN_ADDRESS] = Number(action.payload)
    },
    updateLeashBalance: (state, action) => {
      state.leashBalance = Number(action.payload)
      state[LEASH_TOKEN_ADDRESS] = Number(action.payload)
    },
    updateShibBalance: (state, action) => {
      state.shibBalance = Number(action.payload)
      state[SHIB_TOKEN_ADDRESS] = Number(action.payload)
    },
    updateBoneBalance: (state, action) => {
      state.boneBalance = Number(action.payload)
      state[BONE_TOKEN_ADDRESS] = Number(action.payload)
    },
    updatePawBalance: (state, action: PayloadAction<string>) => {
      state.pawBalance = Number(action.payload)
      state[PAW_TOKEN_ADDRESS] = Number(action.payload)
    },
  },
})

export const {
  updatePawBalance,
  updateShiBalance,
  updateLeashBalance,
  updateBoneBalance,
  updateShibBalance,
} = userSlice.actions

export default userSlice
