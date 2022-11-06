import { Wallets } from "utils/types";

const pkg = "[WALLET]";
export const CONNECT_WALLET = `${pkg} connect`;
export const CHANGE_NETWORK = `${pkg} change netowrk`;
export const CHANGE_ADDRESS = `${pkg} change netowrk`;
export const DISCONNECT_WALLET = `${pkg} disconnect wallet`;
export const NEW_WALLET_CONNECTION = `${pkg} new wallet connection`;
export const SET_WALLET_NETWORK_ID = `${pkg} set wallet networkId`;

export const connectWalletAction = (wallet?: string) => ({
  type: CONNECT_WALLET,
  payload: { wallet }
});
export const changeNetworkAction = (networkId: string, wallet?: Wallets) => ({
  type: CHANGE_NETWORK,
  payload: { networkId, wallet },
});
export const changeAddressAction = {
  type: CHANGE_ADDRESS,
};
export const disconnectAction = {
  type: DISCONNECT_WALLET,
};
export const newConnectionAction = (wallet: Wallets) => ({
  type: NEW_WALLET_CONNECTION
});
export const setNetworkIdAction = (networkId: string) => ({
  type: SET_WALLET_NETWORK_ID,
  payload: networkId,
});
