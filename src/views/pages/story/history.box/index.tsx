import React from "react";
import { Forward } from "@mui/icons-material";
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { styled } from "@mui/material/styles";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import TokenWithImage from "views/components/base/token";
import { makeStyles } from "@mui/styles";
import SearchIcon from "views/components/base/icons/search.icon";
import { useAppSelector } from "application/hook";
const useStyle = makeStyles(() => ({
  root: {},
}));
const Search = styled(SearchIcon)(() => ({
  ":root": {
    width: 50,
    height: 20,
  },
}));
export default function UserHistoryBox() {
  const classes = useStyle();
  const { networkId, address } =
    useAppSelector(selectWallet);
  const { swapHistory, isSearchingHx } =
    useAppSelector(selectWalletStat)?.[networkId]?.[address] || {};
  return (
    <div className={classes.root}>
      <List>
        <ListItem>
          <ListItemText
            primaryTypographyProps={{
              style: { display: "flex", alignItems: "center" },
            }}
          >
            <strong style={{ marginRight: 20 }}>Swap History</strong>
            {isSearchingHx && <Search />}
          </ListItemText>
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
                <div style={{ padding: 10, color: "red" }}>
                  {sent?.amount} {sent?.symbol}
                </div>
                <div style={{ padding: 10, color: "green" }}>
                  {received?.amount} {received?.symbol}
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
