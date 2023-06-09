import { styled } from "@mui/material";
import { showDialogAction } from "application/flows/actions/dialogbox.action";
import { useAppDispatch } from "application/hook";
import React from "react";
import utils from "utils";
import AccountInfo from "./account.info";

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
  border: "solid 1px #DEE6ED",
  cursor: "pointer",
}));
const Image = styled("img")(() => ({
  height: 30,
  width: 40,
}));
export interface AccountButtonProps {
  symbol: string | undefined;
  balance: string | undefined;
  address: string | undefined;
  wallet: string | undefined;
}
export default function AccountButton({
  symbol,
  balance,
  address,
  wallet,
}: AccountButtonProps) {
  const dispatch = useAppDispatch();
  function openAccountInfo() {
    dispatch(
      showDialogAction({
        component: AccountInfo,
      })
    );
  }
  return (
    <StyledBalanceAddressBox onClick={openAccountInfo}>
      <StyledBalanceDiv>{`${balance} ${symbol}`}</StyledBalanceDiv>
      <StyledAddress>{utils.shortAddress(address as string)}</StyledAddress>
      <Image src={`/assets/wallets/${wallet}.svg`} alt="wallet" />
    </StyledBalanceAddressBox>
  );
}
