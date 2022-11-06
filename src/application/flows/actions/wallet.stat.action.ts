import { WalletStatState } from "application/reducers.slices/wallet.stat.core";

const pkg = "[WALLET-STAT]";
export const SET_STAT_WALLET = `${pkg} set stat`;
export const GET_STAT_WALLET_TX_COUNT = `${pkg} get stat tx count`;
export const GET_STAT_WALLET_TOKEN_ON_FIRST_TX = `${pkg} get stat token on 1st tx`;

export const setWalletStatAction = (
  networkId: string,
  stat: Omit<WalletStatState, "networkId">
) => {
  if (!Object.keys(stat).length)
    throw new Error("No stat passed into the object");
  return {
    type: SET_STAT_WALLET,
    payload: {
      networkId,
      stat,
    },
  };
};
export const getStatWalletTxCount = {
  type: GET_STAT_WALLET_TX_COUNT,
};
export const getStatWalletTokenOnFirstTx = {
  type: GET_STAT_WALLET_TOKEN_ON_FIRST_TX,
};
