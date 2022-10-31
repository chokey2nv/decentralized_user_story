import { MiddlewareAPI } from "@reduxjs/toolkit";
import { changeNetworkAction } from "application/flows/actions";
import {
  showErrorNotice,
  showSuccessNotice,
  showWarningNotice,
} from "application/flows/actions/notice.action";
import { walletConnect } from "application/reducers.slices/wallet.core";
import { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS, NETWORKS } from "utils/constance";
import { Wallets } from "utils/types";
import Web3 from "web3";

export const connectWalletFlow = async (
  infra: Promise<Infra>,
  { dispatch }: MiddlewareAPI,
  action: any = undefined
) => {
  if (!infra) return;
  let { supportedIds, log, web3, accounts, wallet } = await infra;
  try {
    dispatch(showWarningNotice({ message: `Connecting with ${wallet}` }));

    const lastNetworkId = localStorage.getItem(
      LOCAL_STORAGE_PARAMS.networkId
    ) as Wallets;
    if (!accounts) accounts = await web3.eth.getAccounts();
    const address = accounts?.[0],
      networkId = await web3.eth.net.getId();
    if (!supportedIds.includes(String(networkId))) {
      const newNetworkId = supportedIds.includes(lastNetworkId)
          ? lastNetworkId
          : supportedIds[0],
        network = NETWORKS.find((item) => item.id === newNetworkId);
      dispatch(changeNetworkAction(newNetworkId));
      dispatch(
        showErrorNotice({
          message: `Unsupported network, switch to ${network?.name}`,
        })
      );
    } else {
      const BN = Web3.utils.toBN;
      const network = NETWORKS.find((item) => item.id === String(networkId)),
        balance = BN(await web3.eth.getBalance(address))
          .div(BN(10 ** Number(network?.decimals)))
          .toString();
      dispatch(
        walletConnect({
          wallet,
          address: address as string,
          networkId: String(networkId),
          balance: Number(balance),
          symbol: network?.symbol as string,
        })
      );
      dispatch(
        showSuccessNotice({ message: `Successfully connection with ${wallet}` })
      );
    }
  } catch (error) {
    log(error);
    dispatch(showErrorNotice((error as any)?.message));
  }
};
