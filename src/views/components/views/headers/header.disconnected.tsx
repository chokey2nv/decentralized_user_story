import React from "react";
import { makeStyles } from "@mui/styles";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { useAppDispatch } from "application/hook";
import {
  setDialogComponentAction,
  showDialogAction,
} from "application/flows/actions/dialogbox.action";
import NetworkSelector from "../network.button/network.selector";
import WalletSelector from "../network.button/wallet.selector";
import { Wallets } from "utils/types";
import {
  newConnectionAction,
  setNetworkIdAction,
} from "application/flows/actions";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  connectionBtn: {
    display: `flex`,
    justifyContent: `center`,
    alignItems: `center`,
    padding: `8px`,
    maxHeight: "40px",
    color: "black",
    cursor: "pointer",
    borderRadius: `6px`,
  },
}));

export function HeaderDisConnected() {
  const classes = useStyles(),
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
  }
  const selectWallet = (wallet: Wallets) => {
    dispatch(newConnectionAction(wallet));
  };
  return (
    <div className={classes.root}>
      <Button
        variant="contained"
        color="primary"
        className={classes.connectionBtn}
        onClick={connectToNetwork}
      >
        <div> Connect Wallet </div>
        <AccountBalanceWalletOutlined style={{ marginLeft: 8 }} />
      </Button>
    </div>
  );
}

export default HeaderDisConnected;
