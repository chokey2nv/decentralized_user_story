import React from "react";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";
import {
  newConnectionAction,
  setNetworkIdAction,
} from "application/flows/actions";
import {
  setArrowBackTextAction,
  setDialogComponentAction,
  showDialogAction,
} from "application/flows/actions/dialogbox.action";
import { useAppDispatch, useAppSelector } from "application/hook";
import { Wallets } from "utils/types";
import NetworkSelector from "views/components/views/network.button/network.selector";
import WalletSelector from "views/components/views/network.button/wallet.selector";
import { selectWallet } from "application/reducers.slices/wallet.core";

const useStyle = makeStyles(() => ({
  connectionBtn: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: `24px !important`,
    maxHeight: "40px",
    cursor: "pointer",
    borderRadius: `6px !important`,
  },
}));
export default function ConnectButton() {
  const classes = useStyle(),
    dispatch = useAppDispatch();
  const { connecting } = useAppSelector(selectWallet);
  function onWalletSelect(wallet: Wallets) {
    dispatch(newConnectionAction(wallet));
  }
  function connectToNetwork() {
    dispatch(
      showDialogAction({
        component: () => <NetworkSelector selectNetwork={selectNetwork} />,
      })
    );
  }
  function selectNetwork(networkId: string) {
    dispatch(setNetworkIdAction(networkId));
    dispatch(
      setDialogComponentAction(() => (
        <WalletSelector onWalletSelect={onWalletSelect} />
      ))
    );
    dispatch(
      setArrowBackTextAction({
        text: "Choose network",
        action: () => {
          connectToNetwork();
        },
      })
    );
  }
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.connectionBtn}
      disabled={connecting}
      onClick={connectToNetwork}
    >
      <div> {connecting ? "Connecting..." : "Connect Wallet"} </div>
      <AccountBalanceWalletOutlined style={{ marginLeft: 8 }} />
    </Button>
  );
}
