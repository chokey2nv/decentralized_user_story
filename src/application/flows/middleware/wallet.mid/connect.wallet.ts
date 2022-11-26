import { MiddlewareAPI } from "@reduxjs/toolkit";
import { changeNetworkAction } from "application/flows/actions";
import {
  showErrorNotice,
  showSuccessNotice,
  showWarningNotice,
} from "application/flows/actions/notice.action";
import {
  setConnectionState,
  walletConnect,
} from "application/reducers.slices/wallet.core";
import AppInfrastructure, { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS, NETWORKS } from "utils/constance";
import { Wallets } from "utils/types";
import BigNumber from "big.js";

export const connectWalletFlow = async (
  infra: Promise<Infra>,
  { dispatch, getState }: MiddlewareAPI,
  action: any = undefined
) => {
  const fWallet =
    action.payload?.wallet || localStorage.getItem(LOCAL_STORAGE_PARAMS.wallet);
  let infrastructure = await infra,
    networkId: string | undefined = undefined;
  if (fWallet) {
    infrastructure = (await AppInfrastructure.getInfrastructure(
      fWallet
    )) as Infra;
    networkId = getState().wallet?.networkId;
  }
  if (!infrastructure) return;
  let { supportedIds, log, web3, accounts, wallet } = infrastructure || {};
  try {
    dispatch(showWarningNotice({ message: `Connecting with ${wallet}` }));
    dispatch(setConnectionState(true));
    const lastNetworkId = localStorage.getItem(
      LOCAL_STORAGE_PARAMS.networkId
    ) as Wallets;
    if (!accounts) accounts = await web3.eth.getAccounts();
    const address = accounts?.[0];
    if (!networkId) networkId = String(await web3.eth.net.getId());
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
      const network = NETWORKS.find((item) => item.id === String(networkId)),
        balance = new BigNumber(await web3.eth.getBalance(address))
          .div(10 ** Number(network?.decimals || 0))
          .toString();
      localStorage.setItem(LOCAL_STORAGE_PARAMS.wallet, wallet);
      localStorage.setItem(LOCAL_STORAGE_PARAMS.networkId, networkId);
      dispatch(
        walletConnect({
          wallet,
          address:
            /*  "0xc8cb5c7ebe866f7bf64246075d53cf4f09b48e9e", // */ address as string,
          networkId: String(networkId),
          balance: Number(balance),
          symbol: network?.symbol as string,
        })
      );
      dispatch(
        showSuccessNotice({ message: `Successfully connection with ${wallet}` })
      );
      dispatch(setConnectionState(false));
    }
  } catch (error) {
    log(error);
    dispatch(showErrorNotice((error as any)?.message));
    dispatch(setConnectionState(false));
  }
};
