import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import React from "react";
import { StatComponentProps } from ".";
import StatBase from "./stat.base/index";

export default function TransactionCount({ dappInfo }: StatComponentProps) {
  const { networkId, address } = useAppSelector(selectWallet);
  const { isSearchingHx, txCounts, txCountPercent } =
    useAppSelector(selectWalletStat)[networkId]?.[address] || {};
  return (
    <StatBase
      dappInfo={dappInfo}
      statString={`${txCounts || "X"} Wallet Transactions`}
      header={"TRANSACTION MAESTRO!"}
      subheader={`You have more transactions than ${Number(
        Math.round(Number(txCountPercent || 0))
      ).toPrecision(4)}% of DeFi users.`}
      highlight={Number(txCountPercent || 0) > 20 ? "Wow!" : undefined}
      imageSrc={"/assets/stats/tx.svg"}
      searching={Boolean(isSearchingHx)}
    />
  );
}
