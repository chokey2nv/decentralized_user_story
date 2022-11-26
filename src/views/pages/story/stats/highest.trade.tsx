import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import React from "react";
import { StatComponentProps } from ".";
import StatBase from "./stat.base/index";

export default function HighestTrade({ dappName, dappInfo }: StatComponentProps) {
  const { networkId, address } = useAppSelector(selectWallet);
  const { isSearchingHx, highestTrade } =
    useAppSelector(selectWalletStat)[networkId]?.[address] || {};
  const token = highestTrade
    ? `${highestTrade?.amount} ${highestTrade?.symbol}`
    : "0 X-Token";

  return (
    <StatBase
      statString={token}
      dappInfo={dappInfo}
      header="HIGHEST TRADE"
      subheader={`${token} was recorded as your hughest trade on PancakeSwap. Living Large!`}
      imageSrc={`/assets/stats/${dappName}/highesttrade.svg`}
      searching={Boolean(isSearchingHx)}
    />
  );
}
