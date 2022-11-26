import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import React from "react";
import { DappName } from "utils/types";
import { StatComponentProps } from ".";
import StatBase from "./stat.base/index";

export default function MostTraded({ dappName, dappInfo }: StatComponentProps) {
  const { networkId, address } = useAppSelector(selectWallet);
  const { isSearchingHx, mostTraded } =
    useAppSelector(selectWalletStat)[networkId]?.[address] || {};
  const mostToken = mostTraded?.[0]?.symbol || "X Token";
  return (
    <StatBase
      dappInfo={dappInfo}
      statString={`${mostToken}`}
      header="MOST TRADED TOKEN"
      subheader={`The ${mostToken} token was recorded as your most traded token on PancakeSwap.`}
      highlight="Consistent!"
      imageSrc={`/assets/stats/${dappName}/mosttraded.svg`}
      searching={Boolean(isSearchingHx)}
    />
  );
}
