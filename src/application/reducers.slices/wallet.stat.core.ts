/**
 * - Number of transactions
 - Token Traded on First Transaction 
- Most Traded Token on wallet 
- Highest Traded token in terms of total ( we would need CMC API to determine price)
 -Best Invested token (we get the time they bought a token that year and at the end of the year we check the price of the token)
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "application/store";
export interface ITransferToken {
  address: string;
  symbol: string;
  amount: string;
}
export interface ISwapData {
  received?: ITransferToken;
  sent?: ITransferToken;
  timestamp: number | string;
}
export type WalletStatState = {
  address: string;
  txCount?: number;
  firstTxToken?: string;
  mostTradedToken?: string;
  highestTradedToken?: string;
  bestToken?: any;
  swapHistory?: ISwapData[]
};

// Define the initial state using that type
const initialState: Record<string, WalletStatState[]> = {};
const walletStatSlice = createSlice({
  name: "walletStat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    setWalletStat(
      state,
      action: PayloadAction<{ networkId: string; stat: WalletStatState }>
    ) {
      const { networkId, stat } = action.payload;
      if (state[networkId]) {
        const addressStatIndex = state[networkId].findIndex(
          (item) => item.address === stat.address
        );
        if (addressStatIndex !== -1) {
          let addressStat = state[networkId][addressStatIndex];
          addressStat = { ...addressStat, ...stat };
          state[networkId][addressStatIndex] = addressStat;
          return state;
        }
      } else if (state[networkId]) state[networkId].push(stat);
      else state[networkId] = [stat];
      return state;
    },
  },
});

export const { setWalletStat } = walletStatSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectWallet = (state: RootState) => state.walletStat;

export default walletStatSlice.reducer;
