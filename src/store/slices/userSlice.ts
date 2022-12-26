import { createSlice, PayloadAction } from '@reduxjs/toolkit'

const userSlice = createSlice({
  name: 'user',
  initialState: {
    shiBalance: 0,
    pawBalance: 0,
    leashBalance: 0,
    shibBalance: 0,
    boneBalance: 0,
  },
  reducers: {
    updateShiBalance: (state, action) => {
      state.shiBalance = Number(action.payload)
    },
    updateLeashBalance: (state, action) => {
      state.leashBalance = Number(action.payload)
    },
    updateShibBalance: (state, action) => {
      state.shibBalance = Number(action.payload)
    },
    updateBoneBalance: (state, action) => {
      state.boneBalance = Number(action.payload)
    },
    updatePawBalance: (state, action: PayloadAction<string>) => {
      state.pawBalance = Number(action.payload)
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
