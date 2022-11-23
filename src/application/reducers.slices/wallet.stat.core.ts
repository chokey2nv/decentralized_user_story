/**
 * - Number of transactions
 - Token Traded on First Transaction 
- Most Traded Token on wallet 
- Highest Traded token in terms of total ( we would need CMC API to determine price)
 -Best Invested token (we get the time they bought a token that year and at the end of the year we check the price of the token)
 */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "application/store";
export type IUpdateHistoryAction = PayloadAction<{
  networkId: string;
  hxs: ISwapData[];
}>;
export interface ITransferToken {
  address: string;
  symbol: string;
  amount: string;
}
export interface ISwapData {
  address: string;
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
};
export interface IBlockMetadata {
  fromBlock: number;
  toBlock: number;
  latestBlock: number;
}
export interface IUpdateBlockMetadata {
  networkId: string;
  metadata: IBlockMetadata;
}
export type ISwapFrequency = Record<string, Record<string, number>>;
export interface IUpdateFrequencyPayload {
  networkId: string;
  frequency: ISwapFrequency;
}
export interface ITxCounts {
  address: string;
  count: number;
}
export type IUpdateTxCountAction = PayloadAction<{
  networkId: string;
  txCount: ITxCounts;
}>;
export type IWalletStat = Record<
  string,
  {
    stat?: WalletStatState[];
    txCounts?: ITxCounts[];
    swapHistory?: ISwapData[];
    swapFrequeryList?: ISwapFrequency;
    blockMetadata?: IBlockMetadata;
  }
>;
const initialState: IWalletStat = {};
const walletStatSlice = createSlice({
  name: "walletStat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTxCount(state, action: IUpdateTxCountAction) {
      const { networkId, txCount } = action.payload;
      if (state[networkId]) {
        const iTxCounts = [...(state[networkId].txCounts || [])];
        const countIndex = iTxCounts.findIndex(
          (i) => i.address === txCount.address
        );
        if (countIndex !== -1) {
          iTxCounts[countIndex] = txCount;
        } else iTxCounts.push(txCount);
      } else state[networkId] = { txCounts: [txCount] };
    },
    updateHistory(state, action: IUpdateHistoryAction) {
      const { networkId, hxs } = action.payload;
      if (state[networkId]) {
        const pHxs =
          (state[networkId].swapHistory as ISwapData[])?.concat(hxs) || hxs;
        state[networkId].swapHistory = pHxs;
      } else state[networkId] = { swapHistory: hxs };
      return state;
    },
    updateBlockMetadata(state, action: PayloadAction<IUpdateBlockMetadata>) {
      const { networkId, metadata } = action.payload;
      if (state[networkId]) {
        state[networkId].blockMetadata = metadata;
      } else {
        state[networkId] = {
          swapHistory: [],
          stat: [],
          blockMetadata: metadata,
        };
      }
      return state;
    },
    updateSwapFrequency(state, action: PayloadAction<IUpdateFrequencyPayload>) {
      const { networkId, frequency } = action.payload;
      if (state[networkId]) {
        state[networkId].swapFrequeryList = frequency;
      } else state[networkId] = { swapFrequeryList: frequency };
    },
  },
});

export const {
  updateTxCount,
  updateHistory,
  updateBlockMetadata,
  updateSwapFrequency,
} = walletStatSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectWallet = (state: RootState) => state.walletStat;

export default walletStatSlice.reducer;
