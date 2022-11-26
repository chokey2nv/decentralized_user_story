import { Divider } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { DappName } from "utils/types";
import FirstTrade from "./first.trade";
import HighestTrade from "./highest.trade";
import MostTraded from "./most.traded";
import { IDappTradeMarkProps } from "./stat.base/dapp.trade.mark";
import TransactionCount from "./transaction";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },
}));
export interface StatComponentProps {
  dappName?: DappName;
  dappInfo: IDappTradeMarkProps;
}
export default function UserStats(props: StatComponentProps) {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <TransactionCount {...props}/>
      <Divider style={{ marginTop: 20 }} />
      <FirstTrade {...props} />
      <Divider style={{ marginTop: 20 }} />
      <MostTraded {...props} />
      <Divider style={{ marginTop: 20 }} />
      <HighestTrade {...props} />
    </div>
  );
}
