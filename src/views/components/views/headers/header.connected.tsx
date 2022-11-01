import React from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { NETWORKS } from "utils/constance";
import { styled } from "@mui/material";
import { makeStyles } from "@mui/styles";
import ThemeSwitchButton from "../theme.switch";
import MediaButton from "../media.button";
import NetworkButton from "../network.button";
import AccountButton from "../account.button";

const Root = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));
const useStyle = makeStyles(() => ({
  iconButton: {
    padding: 10,
    marginLeft: "5px !important",
  },
}));
export function HeaderConnected(): JSX.Element {
  const { networkId, balance, address, wallet } = useSelector(selectWallet);
  const network = NETWORKS.find(
    (item) => String(item.id) === String(networkId)
  );
  const classes = useStyle();
  return (
    <Root>
      <NetworkButton name={network?.label} logoName={network?.name} />
      <AccountButton
        address={address}
        balance={String(balance)}
        symbol={network?.symbol}
        wallet={wallet as string}
      />
      <MediaButton
        classes={{
          iconButton: classes.iconButton,
        }}
      />
      <ThemeSwitchButton
        classes={{
          iconButton: classes.iconButton,
        }}
      />
    </Root>
  );
}
export default HeaderConnected;
