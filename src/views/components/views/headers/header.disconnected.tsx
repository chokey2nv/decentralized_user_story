import React from "react";
import { makeStyles } from "@mui/styles";
import ConnectButton from "views/components/base/button.custom/button.connect";
import MediaButton from "../media.button";
import ThemeSwitchButton from "../theme.switch";

const useStyles = makeStyles(() => ({
  root: {
    display: "flex",
    alignItems: "center",
  },
  iconButton: {
    padding: 10,
    marginLeft: "5px !important",
  },
}));

export function HeaderDisConnected() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <ConnectButton />
      <MediaButton
        classes={{
          iconButton: classes.iconButton,
        }}
      />
      <ThemeSwitchButton
        classes={{
          iconButton: classes.iconButton,
        }}
      />
    </div>
  );
}

export default HeaderDisConnected;
