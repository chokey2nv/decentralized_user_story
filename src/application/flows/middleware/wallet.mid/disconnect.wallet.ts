import { MiddlewareAPI } from "@reduxjs/toolkit";
import {
  showErrorNotice,
  showSuccessNotice,
  showWarningNotice,
} from "application/flows/actions/notice.action";
import { disconnectAccount } from "application/reducers.slices/wallet.core";
import { Infra } from "infrastructure";
import { LOCAL_STORAGE_PARAMS } from "utils/constance";

export const disconnectWalletFlow = async (
  infra: Promise<Infra>,
  { dispatch }: MiddlewareAPI,
  action: any = undefined
) => {
  let { log, wallet } = await infra;
  try {
    dispatch(
      showWarningNotice({ message: `Disconnecting from ${wallet} ...` })
    );
    localStorage.removeItem(LOCAL_STORAGE_PARAMS.wallet);
    localStorage.removeItem(LOCAL_STORAGE_PARAMS.networkId);
    dispatch(disconnectAccount());
    dispatch(showSuccessNotice({ message: `Disconnected from ${wallet}` }));
  } catch (error) {
    log(error);
    dispatch(showErrorNotice((error as any)?.message));
  }
};
