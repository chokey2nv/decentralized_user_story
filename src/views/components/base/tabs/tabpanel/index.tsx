import { makeStyles } from "@mui/styles";
import React from "react";

interface TabPanelProps {
  children: React.ReactElement;
  value: number;
  index: number;
}
const useStyle = makeStyles(() => ({
  root: {
    display: "flex",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
}));
export default function TabPanel(props: TabPanelProps) {
  const classes = useStyle();
  const { children, value, index } = props;
  if (value !== index) return null;
  return <div className={classes.root}>{children}</div>;
}
