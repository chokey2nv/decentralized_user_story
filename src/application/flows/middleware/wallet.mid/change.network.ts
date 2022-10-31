import { MiddlewareAPI } from "@reduxjs/toolkit";
import { connectWalletAction } from "application/flows/actions";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS, NETWORKS } from "utils/constance";
import Web3 from "web3";

export const changeNetworkFlow = async (
  infra: Promise<Infra>,
  { dispatch }: MiddlewareAPI,
  action: any = undefined
) => {
  const { log } = await infra;
  const networkId = action?.payload;
  try {
    //@ts-ignore
    await window?.ethereum?.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: Web3.utils.toHex(networkId) }],
    });
    localStorage.setItem(LOCAL_STORAGE_PARAMS.networkId, networkId);
    dispatch(connectWalletAction);
  } catch (error: any) {
    if (error.code === 4902) {
      try {
        const network = NETWORKS.find((item) => item.id === networkId);
        //@ts-ignore
        await window?.ethereum?.request({
          method: "wallet_addEthereumChain",
          params: [
            {
              name: network?.name,
              networkId: network?.id,
            },
          ],
        });
      } catch (addError: any) {
        log(addError);
        dispatch(showErrorNotice(addError?.message));
      }
    } else {
      log(error);
      dispatch(showErrorNotice(error?.message));
    }
  }
};
