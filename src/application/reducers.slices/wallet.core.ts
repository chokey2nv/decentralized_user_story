import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from 'application/store'
import { serializeFunction } from 'utils/common';
import { Wallets } from 'utils/types';
// Define a type for the slice state
export interface WalletState {
  address: string;
  wallet: Wallets | null | undefined;
  networkId: string;
  balance: number;
  symbol: string;
  web3?: any;
}
export type NetworkState = Omit<WalletState, 'address' | 'wallet'>;
export type AddressState = Pick<WalletState, 'address' | 'balance'>;
export type BalanceState = number;
export type SymbolState = string;
// Define the initial state using that type
const initialState: WalletState = {
  address: "",
  wallet: undefined,
  networkId: "",
  balance: 0,
  symbol: "",
  web3: null,
}
const walletSlice = createSlice({
  name: 'wallet',
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    walletConnect: (state, action: PayloadAction<WalletState>) => {
      state = action.payload
    },
    walletDisconnect : (state) => {
      state = {...initialState}
    },
    setNetwork: (state, action: PayloadAction<NetworkState>) => {
      state = {
        ...state,
        ...action.payload
      }
    },
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state = {
        ...state, 
        ...action.payload
      }
    },
    setBalance: (state, action: PayloadAction<BalanceState>) => {
      state.balance = action.payload;
    },
    setSymbol: (state, action: PayloadAction<SymbolState>) => {
      state.symbol = action.payload
    }
  },
})

export const { 
  walletConnect, walletDisconnect, setNetwork, 
  setAddress, setBalance, setSymbol
} = walletSlice.actions
// Other code such as selectors can use the imported `RootState` type
export const selectWallet = (state: RootState) => state.wallet

export default walletSlice.reducer;