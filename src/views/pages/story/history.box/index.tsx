import React from "react";
import { Forward } from "@mui/icons-material";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import { useSelector } from "react-redux";
import TokenWithImage from "views/components/base/token";
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles(() => ({
  root: {
    border: "1px solid #DEE6ED",
  },
}));

export default function UserHistoryBox() {
  const classes = useStyle();
  const { networkId, address } = useSelector(selectWallet);
  const { swapHistory } =
    useSelector(selectWalletStat)?.[networkId]?.[address] || {};
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText>Swap History</ListItemText>
        </ListItem>
        <Divider />
        {swapHistory?.map((swap, index) => {
          const { sent, received } = swap || {};
          return (
            <ListItem key={index}>
              <div style={{ display: "flex", flexDirection: "column" }}>
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
                <div style={{ padding: 10 }}>
                  {new Date(Number(swap.timestamp) * 1000).toLocaleString()}
                </div>
              </div>
            </ListItem>
          );
        })}
      </List>
    </div>
  );
}
