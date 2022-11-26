import { makeStyles } from "@mui/styles";
import React from "react";
import TransactionCount from "./transaction";

const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
}));

export default function UserStats() {
  const classes = useStyle();
  return (
    <div className={classes.root}>
      <TransactionCount />
    </div>
  );
}
