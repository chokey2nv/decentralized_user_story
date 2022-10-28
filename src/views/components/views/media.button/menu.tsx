import React from "react";
import { makeStyles } from "@mui/styles";
import { ListItem } from "@mui/material";
import Stack from "@mui/material/Stack";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
const useStyles = makeStyles(() => ({
  cursor: {
    cursor: "pointer",
  },
  mr: {
    marginRight: "8px",
  },
  textUpper: {
    color: "#1a202c",
    fontSize: "16px",
    fontFamily: "Cera Pro",
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#ffffff",
      borderWidth: `1px`,
      borderRadius: "2px",
      width: 200,
      padding: "0px",
    },
  },
  btn: {
    marginLeft: "6px !important",
    border: `1px solid black !important`,
    borderRadius: "6px !important",
    width: "45px !important",
  },
  icon: {
    color: "#1a202c",
  },
}));
export interface SocialMediaProps {
  anchorEl: Element | undefined;
  handleCloseEvent: Function;
}
function SocialMediaMenu({ anchorEl, handleCloseEvent }: SocialMediaProps) {
  const handleClose = (
    event: {},
    reason: "backdropClick" | "escapeKeyDown"
  ) => {
    handleCloseEvent && handleCloseEvent();
  };
  const classes = useStyles();
  return (
    <>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        // classes={{ paper: classes.menu }}
        className={classes.menu}
      >
        <MenuItem>
          <ListItem
            style={{ textAlign: "left" }}
            component="a"
            target="_blank"
            href="https://www.linkedin.com/company/rigelprotocol"
            rel="noreferrer"
          >
            <Stack>
              <div className={classes.textUpper}>Linkedin</div>
            </Stack>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem
            component="a"
            target="_blank"
            href="https://medium.com/rigelprotocol"
            rel="noreferrer"
          >
            <Stack>
              <div className={classes.textUpper}>Medium</div>
            </Stack>
          </ListItem>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItem
            component="a"
            target="_blank"
            href="https://www.t.me/rigelprotocol"
            rel="noreferrer"
          >
            <Stack>
              <div className={classes.textUpper}>Telegram</div>
            </Stack>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem
            component="a"
            target="_blank"
            href="https://twitter.com/rigelprotocol"
            rel="noreferrer"
          >
            <Stack>
              <div className={classes.textUpper}>Twitter</div>
            </Stack>
          </ListItem>
        </MenuItem>
        <Divider />
        <MenuItem>
          <ListItem
            component="a"
            target="_blank"
            href="https://github.com/rigelprotocol"
            rel="noreferrer"
          >
            <Stack>
              <div className={classes.textUpper}>Github</div>
            </Stack>
          </ListItem>
        </MenuItem>
        <MenuItem>
          <ListItem
            component="a"
            target="_blank"
            href="https://discord.gg/j86NH95GDD"
            rel="noreferrer"
          >
            <Stack>
              <div className={classes.textUpper}>Discord</div>
            </Stack>
          </ListItem>
        </MenuItem>
      </Menu>
    </>
  );
}

export default SocialMediaMenu;
