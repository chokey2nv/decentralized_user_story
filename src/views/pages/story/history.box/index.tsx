import React from "react";
import { Forward } from "@mui/icons-material";
import { List, ListItem } from "@mui/material";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import { useSelector } from "react-redux";
import TokenWithImage from "views/components/base/token";

export default function UserHistoryBox() {
  const { networkId, address } = useSelector(selectWallet);
  const { swapHistory } =
    useSelector(selectWalletStat)?.[networkId]?.[address] || {};
  return (
    <List>
      <ListItem></ListItem>
      {swapHistory?.map((swap, index) => {
        const { sent, received } = swap || {};
        return (
          <ListItem key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <TokenWithImage symbol={sent?.symbol} />
              <Forward />
              <TokenWithImage symbol={received?.symbol} />
            </div>
          </ListItem>
        );
      })}
    </List>
  );
}
