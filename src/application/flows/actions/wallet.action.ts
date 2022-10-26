const pkg = "[WALLET]";
export const CONNECT_WALLET = `${pkg} connect`;
export const CHANGE_NETWORK = `${pkg} change netowrk`;
export const CHANGE_ADDRESS = `${pkg} change netowrk`;

export const connectWallet = {
  type: CONNECT_WALLET,
};
export const changeNetwork = (networkId: string) => ({
  type: CHANGE_NETWORK,
  payload: networkId,
});
export const changeAddress = {
  type: CHANGE_ADDRESS,
};
