import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "application/store";
export interface IHistoryPayload extends PayloadBase {
  hxs: ISwapData[];
}
export type IUpdateHistoryAction = PayloadAction<IHistoryPayload>;
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
};
export interface IBlockMetadata {
  fromBlock: number;
  toBlock: number;
  latestBlock?: number;
}
export interface IUpdateBlockMetadata extends PayloadBase {
  metadata: IBlockMetadata;
}
export type IFrequency = Record<string, number>;
export type ISwapFrequency = IFrequency;
export interface IUpdateFrequencyPayload extends PayloadBase {
  frequency: ISwapFrequency;
}
interface PayloadBase {
  networkId: string;
  address: string;
}
export interface IIsSearchingHxPayload extends PayloadBase {
  isSeaerching: boolean;
}
export interface ITxCounts {
  address: string;
  count: number;
  percent: number;
}
export type IUpdateTxCountAction = PayloadAction<{
  networkId: string;
  txCount: ITxCounts;
}>;
export interface IIsSearchingHxPayload {}
export interface ITrade {
  address: string;
  count: number;
  symbol: string;
}
export interface ITradePayload extends PayloadBase {
  trades: ITrade[];
}
export interface IHighestTradePayload extends PayloadBase {
  token: ITransferToken;
}
export type IWalletStat = Record<
  string,
  Record<
    string,
    {
      stat?: WalletStatState[];
      txCountPercent?: number;
      txCounts?: number;
      swapHistory?: ISwapData[];
      swapFrequeryList?: ISwapFrequency;
      mostTraded?: ITrade[];
      highestTrade?: ITransferToken;
      blockMetadata?: IBlockMetadata;
      isSearchingHx?: boolean;
    }
  >
>;
const initialState: IWalletStat = {};
function validateState(state: IWalletStat, networkId: string, address: string) {
  if (!state[networkId]) {
    state[networkId] = {
      [address]: {},
    };
  }
  if (!state[networkId][address]) {
    state[networkId][address] = {};
  }
  return state;
}
const walletStatSlice = createSlice({
  name: "walletStat",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateTxCount(state, action: IUpdateTxCountAction) {
      const { networkId, txCount } = action.payload;
      const address = txCount.address;
      state = validateState(state, networkId, address);
      state[networkId][address].txCounts = txCount.count;
      state[networkId][address].txCountPercent = txCount.percent;
      return state;
    },
    updateHistory(state, action: IUpdateHistoryAction) {
      const { networkId, address, hxs } = action.payload;
      state = validateState(state, networkId, address);
      const pHxs =
        (state[networkId][address].swapHistory as ISwapData[])?.concat(hxs) ||
        hxs;
      state[networkId][address].swapHistory = pHxs;
      return state;
    },
    updateBlockMetadata(state, action: PayloadAction<IUpdateBlockMetadata>) {
      const { networkId, address, metadata } = action.payload;
      state = validateState(state, networkId, address);
      state[networkId][address].blockMetadata = {
        ...state[networkId][address].blockMetadata,
        ...metadata,
      };
      return state;
    },
    updateIsSearchingHx(state, action: PayloadAction<IIsSearchingHxPayload>) {
      const { networkId, address, isSeaerching } = action.payload;
      state = validateState(state, networkId, address);
      state[networkId][address].isSearchingHx = isSeaerching;
      return state;
    },
    updateSwapFrequency(state, action: PayloadAction<IUpdateFrequencyPayload>) {
      const { networkId, frequency, address } = action.payload;
      state = validateState(state, networkId, address);
      let pair: string;
      if (frequency)
        for (pair in frequency) {
          if (Object.prototype.hasOwnProperty.call(frequency, pair)) {
            const count = frequency[pair];
            if (state[networkId][address].swapFrequeryList) {
              let initCount = state[networkId][address].swapFrequeryList;
              if (initCount?.[pair]) {
                initCount[pair] += count;
              } else
                initCount = {
                  ...initCount,
                  [pair]: count,
                };
              state[networkId][address].swapFrequeryList = initCount;
            } else {
              state[networkId][address].swapFrequeryList = {
                [pair]: count,
              };
            }
          }
        }
      return state;
    },
    updateMostTraded(state, action: PayloadAction<ITradePayload>) {
      const { networkId, address, trades } = action.payload;
      state = validateState(state, networkId, address);
      const mostTraded = state[networkId][address].mostTraded || [];
      for (let i = 0; i < trades.length; i++) {
        const { address: tokenAddress, count } = trades[i];
        const tradeIndex = mostTraded?.findIndex(
          (item) => item.address === tokenAddress
        );
        if (tradeIndex === -1) {
          mostTraded?.push(trades[i]);
        } else {
          mostTraded[Number(tradeIndex)].count += count;
        }
      }
      state[networkId][address].mostTraded = mostTraded;
      state[networkId][address].mostTraded?.sort((a, b) => b.count - a.count);
      return state;
    },
    updateHighestTradeToken(
      state,
      action: PayloadAction<IHighestTradePayload>
    ) {
      const { networkId, address, token } = action.payload;
      state = validateState(state, networkId, address);
      if (!state[networkId][address].highestTrade) {
        state[networkId][address].highestTrade = token;
      } else {
        const highestTrade = state[networkId][address].highestTrade;
        if (Number(highestTrade?.amount) < Number(token.amount))
          state[networkId][address].highestTrade = token;
      }
      return state;
    },
    clearHistoryy(state, action: PayloadAction<PayloadBase>) {
      const { networkId, address } = action.payload;
      state = validateState(state, networkId, address);
      state[networkId][address].swapFrequeryList = {};
      state[networkId][address].swapHistory = [];
      return state;
    },
  },
});

export const {
  updateTxCount,
  updateHistory,
  updateBlockMetadata,
  updateSwapFrequency,
  updateMostTraded,
  updateIsSearchingHx,
  clearHistoryy,
  updateHighestTradeToken,
} = walletStatSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectWalletStat = (state: RootState) => state.walletStat;

export default walletStatSlice.reducer;
