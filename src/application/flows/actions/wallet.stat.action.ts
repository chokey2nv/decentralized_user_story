import { WalletStatState } from "application/reducers.slices/wallet.stat.core";
import { DappName } from "utils/types";

const pkg = "[WALLET-STAT]";
export const SET_STAT_WALLET = `${pkg} set stat`;
export const GENERATE_STATS = `${pkg} get stats`;

export const setWalletStatAction = (
  networkId: string,
  stat: Omit<WalletStatState, "networkId">
) => {
  if (!Object.keys(stat).length)
    throw new Error("No stat passed into the object");
  return {
    type: SET_STAT_WALLET,
    payload: {
      networkId,
      stat,
    },
  };
};
export interface IGenerateStoryActionPayload {
  dappName: DappName;
  contractAddress: string | undefined;
  username: string;
}
export function generateStoryAction(payload: IGenerateStoryActionPayload) {
  return {
    type: GENERATE_STATS,
    payload,
  };
}
