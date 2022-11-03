import { makeStyles } from "@mui/styles";
import React from "react";
import classNames from "classnames";
const useStyle = makeStyles(() => ({
  root: {
    margin: 5,
  },
  menuItem: {
    padding: 10,
    color: "gray",
    borderLeft: "solid 1px",
    cursor: "pointer",
    "&:hover": {
      color: "#1976d2",
    },
  },
  menuItemActive: {
    color: "#1976d2",
    borderLeftWidth: "medium",
  },
}));
interface TabsProps {
  children: React.ReactElement[];
  handleChange?: (event: React.SyntheticEvent, newValue: number) => void;
  value?: number;
}
export default function Tabs(props: TabsProps) {
  console.log(props.children);
  const { handleChange, children, value } = props || {};
  const classes = useStyle();
  return (
    <div className={classes.root}>
      {children?.map((item, index) => ({
        ...item,
        props: {
          ...item.props,
          onClick: (e: React.SyntheticEvent) => handleChange?.(e, index),
          className: classNames(
            item.props?.className,
            classes.menuItem,
            index === value ? classes.menuItemActive : ""
          ),
        },
      }))}
    </div>
  );
}
