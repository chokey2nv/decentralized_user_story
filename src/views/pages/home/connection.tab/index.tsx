import React from "react";
import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { useSelector } from "react-redux";
import utils from "utils";
import ConnectButton from "views/components/base/button.custom/button.connect";
import { AppStateObject } from "../index";
import DappSelectionForm, { DappSelectionFormProps } from "./form.dapps";

const useStyle = makeStyles(() => ({
  root: {
    width: "100%",
  },
  header: {},
  subheader: {},
  body: {},
  types: {},
  description: {},
  addressContainer: {},
  btnContainer: {},
}));
export interface ConnectionTabPros
  extends Omit<DappSelectionFormProps, "address"> {
  onContinue: React.MouseEventHandler;
  dapp: AppStateObject;
}
export default function ConnectionTab(props: ConnectionTabPros) {
  const { onContinue, ...formOptions } = props;
  const classes = useStyle(),
    { address } = useSelector(selectWallet);
  return (
    <Stack>
      <div className={classes.header}>Create Your Story</div>
      <div className={classes.subheader}>
        Our users have their stories, you can create yours as well.
      </div>
      <div className={classes.body}>
        {address ? (
          <>
            <div className={classes.description}>Wallet Connected</div>
            <div className={classes.addressContainer}>
              {utils.shortAddress(address)}
            </div>
          </>
        ) : (
          <>
            <div className={classes.description}>Connect your wallet</div>
            <ConnectButton />
          </>
        )}
      </div>
      <div className={classes.types}>
        <DappSelectionForm {...{ ...formOptions, address }} />
      </div>
      <div className={classes.btnContainer}>
        <Button fullWidth variant="contained" onClick={onContinue}>
          Continue
        </Button>
      </div>
    </Stack>
  );
}
