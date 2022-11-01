import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "application/store";
import { Wallets } from "utils/types";
// Define a type for the slice state
export interface WalletState {
  address: string;
  wallet: Wallets | null | undefined;
  networkId: string;
  balance: number;
  symbol: string;
  web3?: any;
}
export type NetworkState = Omit<WalletState, "address" | "wallet">;
export type AddressState = Pick<WalletState, "address" | "balance">;
export type BalanceState = number;
export type SymbolState = string;
// Define the initial state using that type
const initialState: WalletState = {
  address: "",
  wallet: undefined,
  networkId: "",
  balance: 0,
  symbol: "",
};
const walletSlice = createSlice({
  name: "wallet",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    walletConnect: (state, action: PayloadAction<WalletState>) => {
      state = action.payload;
      return state;
    },
    walletDisconnect: (state) => {
      state = { ...initialState };
      return state;
    },
    setNetworkId: (state, action: PayloadAction<string>) => {
      state.networkId = action.payload;
      return state;
    },
    setNetwork: (state, action: PayloadAction<NetworkState>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    setAddress: (state, action: PayloadAction<AddressState>) => {
      state = {
        ...state,
        ...action.payload,
      };
      return state;
    },
    setBalance: (state, action: PayloadAction<BalanceState>) => {
      state.balance = action.payload;
      return state;
    },
    setSymbol: (state, action: PayloadAction<SymbolState>) => {
      state.symbol = action.payload;
      return state;
    },
    disconnectAccount: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const {
  walletConnect,
  walletDisconnect,
  setNetwork,
  setNetworkId,
  setAddress,
  setBalance,
  setSymbol,
  disconnectAccount,
} = walletSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectWallet = (state: RootState) => state.wallet;

export default walletSlice.reducer;
