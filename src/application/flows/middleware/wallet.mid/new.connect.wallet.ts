import { MiddlewareAPI } from "@reduxjs/toolkit";
import { changeNetworkAction } from "application/flows/actions";
import { hideDialogBoxAction } from "application/flows/actions/dialogbox.action";
import {
  showErrorNotice,
  showSuccessNotice,
  showWarningNotice,
} from "application/flows/actions/notice.action";
import { walletConnect } from "application/reducers.slices/wallet.core";
import AppInfrastructure, { Infra } from "infrastructure";
import { NETWORKS } from "utils/constance";
import Web3 from "web3";

export const newWalletConnectionFlow = async (
  _: Promise<Infra>,
  { dispatch, getState }: MiddlewareAPI,
  action: any = undefined
) => {
  const { wallet } = action.payload || {},
    networkId = getState().wallet?.networkId;
  console.log(networkId, wallet);
  console.log("######################");
  let infra = await AppInfrastructure.getInfrastructure(wallet);
  if (!infra) {
    dispatch(
      showErrorNotice({ message: `Unable to connect to ${wallet}, try again!` })
    );
    return;
  }
  let { log, web3, accounts } = infra;
  try {
    dispatch(showWarningNotice({ message: `Connecting with ${wallet}` }));
    if (!accounts) accounts = await web3.eth.getAccounts();
    const address = accounts?.[0],
      connectedNetworkId = await web3.eth.net.getId(),
      network = NETWORKS.find((item) => item.id === networkId),
      connectedNetwork = NETWORKS.find(
        (item) => item.id === String(connectedNetworkId)
      );

    if (String(connectedNetworkId) !== String(networkId)) {
      dispatch(changeNetworkAction(networkId, wallet));
      dispatch(
        showWarningNotice({
          message: `Switching network from ${connectedNetwork?.label} to ${network?.label}`,
        })
      );
    } else {
      const BN = Web3.utils.toBN,
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
    dispatch(hideDialogBoxAction);
  } catch (error) {
    log(error);
    dispatch(showErrorNotice((error as any)?.message));
  }
};
