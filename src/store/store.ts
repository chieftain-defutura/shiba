import { configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useSelector, useDispatch } from 'react-redux'
import alchemyApiSlice from './slices/alchemyApiSlice'

import moralisApi from './slices/moralisApiSlice'
import userSlice from './slices/userSlice'

const store = configureStore({
  reducer: {
    [moralisApi.reducerPath]: moralisApi.reducer,
    user: userSlice.reducer,
    [alchemyApiSlice.reducerPath]: alchemyApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      moralisApi.middleware,
      alchemyApiSlice.middleware,
    ]),
})

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
