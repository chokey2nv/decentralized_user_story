const pkg = "[WALLET]";
export const CONNECT_WALLET = `${pkg} connect`;
export const CHANGE_NETWORK = `${pkg} change netowrk`;
export const CHANGE_ADDRESS = `${pkg} change netowrk`;
export const DISCONNECT_WALLET = `${pkg} disconnect wallet`;

export const connectWalletAction = {
  type: CONNECT_WALLET,
};
export const changeNetworkAction = (networkId: string) => ({
  type: CHANGE_NETWORK,
  payload: networkId,
});
export const changeAddressAction = {
  type: CHANGE_ADDRESS,
};
export const disconnectAction = {
  type: DISCONNECT_WALLET,
};
