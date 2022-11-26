import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import React from "react";
import { StatComponentProps } from ".";
import StatBase from "./stat.base/index";

export default function FirstTrade({
  dappName,
  dappInfo,
}: StatComponentProps) {
  const { networkId, address } = useAppSelector(selectWallet);
  const { isSearchingHx, swapHistory } =
    useAppSelector(selectWalletStat)[networkId]?.[address] || {};
  const firstToken = swapHistory?.[0]?.received?.symbol || "No";
  const isToken = swapHistory?.[0] || !isSearchingHx;
  return (
    <StatBase
      dappInfo={dappInfo}
      statString={`${isToken ? firstToken : "X"} Token`}
      header="FIRST TOKEN TRADED"
      subheader={`${
        isToken ? `The ${firstToken} ` : "No "
      } token was recorded as the token traded on your first transaction.`}
      imageSrc={`/assets/stats/${dappName}/firsttrade.svg`}
      searching={!Boolean(isToken)}
    />
  );
}
