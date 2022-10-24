import { configureStore } from '@reduxjs/toolkit'
import middleware from 'application/flows'
import infra from 'infrastructure'
import walletCore from 'application/reducers.slices/wallet.core'
import noticeCore from './reducers.slices/notice.core'
// ...

const store = configureStore({
  reducer: {
    wallet: walletCore,
    notice: noticeCore
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(...middleware.map((f: any) => f(infra)))
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export default store;