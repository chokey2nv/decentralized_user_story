import React from "react";
import { useSelector } from "react-redux";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { NETWORKS } from "utils/constance";
import { styled } from "@mui/material";
import ButtonDropdown from "views/components/base/button.custom/button.dropdown";
import { makeStyles } from "@mui/styles";
import ThemeSwitchButton from "../theme.switch";
import MediaButton from "../media.button";
import utils from "utils";

const Root = styled("div")(() => ({
  display: "flex",
  alignItems: "center",
}));
const StyledBalanceDiv = styled("div")(() => ({
  background: "#F2F5F8",
  padding: "15px 5px",
  borderRadius: "5px 0px 0px 5px",
}));
const StyledAddress = styled("div")(() => ({
  padding: "15px 5px",
  borderRadius: "0px 5px 5px 0px",
}));
const StyledBalanceAddressBox = styled("div")(() => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  margin: "0px 5px",
  border: "solid 1px #F2F5F8",
}));
const Image = styled("img")(() => ({
  height: 30,
  width: 40,
}));
const useStyle = makeStyles(() => ({
  iconButton: {
    padding: 10,
    marginLeft: 5,
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
      <ButtonDropdown
        iconSrc={`/assets/networks/${network?.logoName}.svg`}
        text={network?.name as string}
      />
      <StyledBalanceAddressBox>
        <StyledBalanceDiv>{`${balance} ${network?.symbol}`}</StyledBalanceDiv>
        <StyledAddress>{utils.shortAddress(address)}</StyledAddress>
        <Image src={`/assets/wallets/${wallet}.svg`} alt="wallet" />
      </StyledBalanceAddressBox>
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
