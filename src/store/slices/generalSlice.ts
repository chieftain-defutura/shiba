import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { getCharityList } from '../../utils/methods'
import { ethers } from 'ethers'

interface IInitialState {
  charityList: string[]
  isFetched: boolean
}

const initialState: IInitialState = {
  charityList: [],
  isFetched: false,
}

export const fetchCarityList = createAsyncThunk(
  'general/get',
  async ({ data }: { data: ethers.Signer }, { rejectWithValue }) => {
    try {
      return await getCharityList(data)
    } catch (err) {
      return rejectWithValue('something went wrong')
    }
  },
)

const generalSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchCarityList.fulfilled, (store, action) => {
      store.charityList = action.payload
      store.isFetched = true
    })
  },
})

export default generalSlice
