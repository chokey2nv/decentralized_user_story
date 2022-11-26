import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import { makeStyles } from "@mui/styles";
import { useAppSelector } from "application/hook";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import React from "react";
import StatBase from "./stat.base";
const Root = styled("div")(({ theme }) => ({
  background: "#000000",
  width: 650,
  minHeight: 300,
  padding: 20,
  paddingLeft: 40,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
}));
const StyledCompanyContainer = styled("div")(({ theme }) => ({
  display: "flex",
}));
const Logo = styled("img")(() => ({
  width: 40,
  height: 40,
}));
const ImageContainer = styled("div")(({ theme }) => ({}));
const CompanyName = styled("div")(({ theme }) => ({
  color: "#fff",
}));
const Text = styled("div")(() => ({
  color: "#319EF6",
  fontSize: 14,
  display: "flex",
  fontWeight: "500",
}));
const StyledStack = styled(Stack)(() => ({
  marginLeft: 5,
  marginRight: 5,
  justifyContent: "flex-start",
}));
const Body = styled("div")(() => ({
  marginTop: 50,
}));
const RightBody = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
}));
const LeftBody = styled("div")(() => ({
  width: 400,
  display: "flex",
  flexDirection: "column",
  alignContent: "center",
  justifyContent: "center",
}));
const Stat = styled("div")(() => ({
  color: "#fff",
  fontWeight: "bold",
}));
const HeaderContainer = styled("div")(() => ({
  marginTop: 10,
}));
const Header = styled("div")(() => ({
  marginTop: 20,
  fontWeight: 800,
  color: "#F7B53C",
  fontSize: 30,
}));
const Subheader = styled("div")(() => ({
  color: "#fff",
  display: "flex",
  flexWrap: "wrap",
}));
const SubheaderHighligh = styled("span")(() => ({
  color: "#F7B53C",
  fontSize: 15,
}));
const Download = styled("div")(() => ({
  color: "#4CAFFF",
  fontSize: 16,
  marginTop: 40,
  textDecoration: "underline",
}));
const PoweredBy = styled("div")(() => ({
  color: "#4CAFFF",
  fontSize: 15,
  marginTop: 40,
  fontStyle: "italic",
}));
const DisplayImage = styled("img")(() => ({
  height: 250,
  width: 250,
}));

export default function TransactionCount() {
  const { networkId, address } = useAppSelector(selectWallet);
  const { isSearchingHx, txCounts } =
    useAppSelector(selectWalletStat)[networkId]?.[address] || {};
  return (
    <StatBase
      statString={`${txCounts || "X"} Wallet Transactions`}
      header={"TRANSACTION MAESTRO!"}
      subheader={"You have more transactions than 80% of DeFi users."}
      highlight={"Wow!"}
      imageSrc={"/assets/stats/tx.svg"}
      searching={Boolean(isSearchingHx)}
    />
  );
}
