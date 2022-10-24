import { MiddlewareAPI } from "@reduxjs/toolkit";
import { changeNetwork } from "application/flows/actions";
import { showErrorNotice, showSuccessNotice, showWarningNotice } from "application/flows/actions/notice.action";
import { walletConnect } from "application/reducers.slices/wallet.core";
import { Infra } from "infrastructure";
import getWeb3 from "infrastructure/getWeb3";
import { serializeObject } from "utils/common";
import { LOCAL_STORAGE_PARAMS, NETWORKS } from "utils/constance";
import { Wallets } from "utils/types";
import Web3 from "web3";

export const connectWalletFlow = async (
  { supportedIds, log}: Infra, 
  { dispatch }: MiddlewareAPI,
  action: any = undefined
) => {
  try {
    const wallet: Wallets = 
    (localStorage.getItem(LOCAL_STORAGE_PARAMS.wallet) as Wallets) || "metamask";

    dispatch(showWarningNotice(`Connecting with ${wallet}`))

    const lastNetworkId = localStorage.getItem(LOCAL_STORAGE_PARAMS.networkId) as Wallets;
    let {web3, accounts} = await getWeb3(wallet);
    if(!accounts) accounts = await web3.eth.getAccounts();
    const address = accounts[0],
    networkId = await web3.eth.net.getId();
    if(!supportedIds.includes(String(networkId))){
      const newNetworkId = supportedIds.includes(lastNetworkId) ? 
      lastNetworkId : supportedIds[0],
      network = NETWORKS.find(item => item.id === newNetworkId)
      dispatch(changeNetwork(newNetworkId))
      dispatch(showErrorNotice(`Unsupported network, switch to ${network?.name}`))
    } else {
      const BN = Web3.utils.toBN;
      const network = NETWORKS.find(item => item.id === String(networkId)),
      balance = BN(await web3.eth.getBalance(address)).div(BN(10 ** Number(network?.decimals))).toString();
      console.log(web3)
      dispatch(walletConnect({
        wallet, 
        address,
        networkId : String(networkId), 
        balance: Number(balance),
        symbol : network?.symbol as string, 
        // web3 : serializeObject(web3)
      }))
      dispatch(showSuccessNotice(`Successful connection with ${wallet}`))
    }
  } catch (error) {
      log(error);
      dispatch(showErrorNotice((error as any)?.message))
  }
}