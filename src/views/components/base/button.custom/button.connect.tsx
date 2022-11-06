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
import { useAppDispatch } from "application/hook";
import { Wallets } from "utils/types";
import NetworkSelector from "views/components/views/network.button/network.selector";
import WalletSelector from "views/components/views/network.button/wallet.selector";

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
        <WalletSelector onWalletSelect={selectWallet} />
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
  const selectWallet = (wallet: Wallets) => {
    dispatch(newConnectionAction(wallet));
  };
  return (
    <Button
      variant="contained"
      color="primary"
      className={classes.connectionBtn}
      onClick={connectToNetwork}
    >
      <div> Connect Wallet </div>
      <AccountBalanceWalletOutlined style={{ marginLeft: 8 }} />
    </Button>
  );
}
