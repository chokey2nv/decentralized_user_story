import React from "react";
import { Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { selectWallet } from "application/reducers.slices/wallet.core";
import utils from "utils";
import ConnectButton from "views/components/base/button.custom/button.connect";
import DappSelectionForm, { DappSelectionFormProps } from "./form.dapps";
import { useAppSelector } from "application/hook";

const useStyle = makeStyles(() => ({
  root: {
    width: "100%",
  },
  header: {
    fontWeight: 500,
    fontSize: 20,
    marginBottom: 10,
  },
  subheader: {
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 20,
  },
  body: {
    background: "#F2F5F8",
    borderRadius: 6,
    padding: 30,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    fontSize: 14,
    marginBottom: 20,
  },
  types: {
    marginBottom: 20,
  },
  description: {
    marginBottom: 20,
    fontSize: 14,
  },
  addressContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    border: "1px solid #319EF6",
    background: "#EBF6FE",
    color: "#319EF6",
    padding: "10px 32px",
    borderRadius: 6,
  },
  btnContainer: {},
}));
export interface ConnectionTabPros
  extends Omit<DappSelectionFormProps, "address"> {
  onContinue: React.MouseEventHandler;
}
export default function ConnectionTab(props: ConnectionTabPros) {
  const { onContinue, ...formOptions } = props;
  const classes = useStyle(),
    { address } = useAppSelector(selectWallet);
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
