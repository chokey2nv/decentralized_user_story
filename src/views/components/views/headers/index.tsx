import { selectWallet } from "application/reducers.slices/wallet.core";
import React from "react";
import { useSelector } from "react-redux";
import HeaderConnected from "./header.connected";
import HeaderDisconnected from "./header.disconnected";
const Header = () => {
  const { address } = useSelector(selectWallet);
  if (address) return <HeaderConnected/>;
  return <HeaderDisconnected />;
};
export default Header;
