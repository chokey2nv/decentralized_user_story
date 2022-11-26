import { makeStyles } from "@mui/styles";
import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import React from "react";

const useStyle = makeStyles((theme) => ({
  root: {
    borderBottom: "1px solid #DEE6ED",
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 20,
  },
  img: {
    height: 200,
  },
  full: {
    display: "flex",
    width: "100%",
    height: "100vh",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default function SearchHeader() {
  const classes = useStyle();
  const { address, networkId, connecting, wallet } =
    useAppSelector(selectWallet);
  const { blockMetadata: block, isSearchingHx } =
    useAppSelector(selectWalletStat)?.[networkId]?.[address] || {};

  if (connecting) {
    return <div className={classes.full}>Connecting to {wallet} ...</div>;
  }
  return (
    <div className={classes.root}>
      {isSearchingHx && (
        <>
          <img className={classes.img} src="/assets/search.gif" alt="search" />
          <div>
            Searching blocks:{" "}
            {block?.latestBlock ? `${block.fromBlock} to ${block.toBlock}` : ""}
          </div>
        </>
      )}
      <div>
        <strong>Latest Block:</strong> {block?.latestBlock}
      </div>
    </div>
  );
}
