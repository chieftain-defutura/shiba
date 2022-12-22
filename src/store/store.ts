import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'

import alchemyApiSlice from './slices/alchemyApiSlice'
import generalSlice from './slices/generalSlice'
import ipfsApiSlice from './slices/ipfsApiSlice'
import moralisApi from './slices/moralisApiSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    user: userSlice.reducer,
    general: generalSlice.reducer,
    [moralisApi.reducerPath]: moralisApi.reducer,
    [alchemyApiSlice.reducerPath]: alchemyApiSlice.reducer,
    [ipfsApiSlice.reducerPath]: ipfsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      moralisApi.middleware,
      alchemyApiSlice.middleware,
      ipfsApiSlice.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
