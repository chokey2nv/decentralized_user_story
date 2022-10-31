import { MiddlewareAPI } from "@reduxjs/toolkit";
import {
  changeNetworkAction,
  connectWalletAction,
} from "application/flows/actions";
import { hideDialogBoxAction } from "application/flows/actions/dialogbox.action";
import {
  showErrorNotice,
  showWarningNotice,
} from "application/flows/actions/notice.action";
import AppInfrastructure, { Infra } from "infrastructure";
import { NETWORKS } from "utils/constance";

export const newWalletConnectionFlow = async (
  _: Promise<Infra>,
  { dispatch, getState }: MiddlewareAPI,
  action: any = undefined
) => {
  const { wallet } = action.payload || {},
    networkId = getState().wallet?.networkId;
  let infra = await AppInfrastructure.getInfrastructure(wallet);
  if (!infra) {
    dispatch(
      showErrorNotice({ message: `Unable to connect to ${wallet}, try again!` })
    );
    return;
  }
  let { log, web3 } = infra;
  try {
    dispatch(showWarningNotice({ message: `Connecting with ${wallet}` }));
    const connectedNetworkId = await web3.eth.net.getId(),
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
      dispatch(connectWalletAction(wallet));
    }
    dispatch(hideDialogBoxAction);
  } catch (error) {
    log(error);
    dispatch(showErrorNotice((error as any)?.message));
  }
};
