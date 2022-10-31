import { makeStyles } from "@mui/styles";
import { ListItem, Stack, Menu, MenuItem } from "@mui/material";
const useStyles = makeStyles(() => ({
  root: {},
  cursor: {
    cursor: "pointer",
  },
  mr: {
    marginRight: "8px",
  },
  textUpper: {
    color: "#1a202c",
    fontSize: "1rem",
    fontFamily: "Cera Pro",
  },
  textLower: {
    color: "#718096",
    fontSize: "1rem",
    fontFamily: "Cera Pro",
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: "#ffffff",
    },
  },
  menuItem: {
    "&hover": {
      backgroundColor: "#646464",
    },
  },
  outlinedPrimary: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    maxHeight: "48px",
    color: "black",
    border: `1px solid #213345`,
    borderRadius: "6px",
    padding: "12px 16px",
  },
  btn: {
    display: "flex !important",
    justifyContent: "center !important",
    alignItems: "center !important",
    maxHeight: "48px !important",
    maxWidth: "137px !important",
    color: `#000000 !important`,
    borderRadius: "6px !important",
    padding: "12px 16px !important",
  },
}));
export interface DappsDropdownProps {
  anchorEl: Element | undefined;
  handleCloseEvent: Function;
}
function DappsDropdown({ anchorEl, handleCloseEvent }: DappsDropdownProps) {
  const handleClose = (
      event: {},
      reason: "backdropClick" | "escapeKeyDown"
    ) => {
      handleCloseEvent && handleCloseEvent();
    },
    classes = useStyles(),
    dropDownData = [
      {
        header: "SmartSwap",
        subheading: "Swap tokens directly.",
        link: "https://smartswap.rigelprotocol.com",
      },
      {
        header: "GiftDApp",
        subheading: "Gift tokens in a fun way.",
        link: "https://gift.rigelprotocol.com/",
      },
      { header: "Smart Bid", subheading: "Bid on tokens.", link: "" },
      {
        header: "Leverage Exchange",
        subheading: "Trade using decentralized tokens.",
        link: "",
      },
      {
        header: "LaunchPad",
        subheading: "Join projects hosted on RigelProtocol.",
        link: "/",
      },
    ];

  return (
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
      <div>
        {dropDownData.map((item, index): any => {
          const isSameRoute = item.link === "/",
            itemProps: Partial<{
              target: string;
              href: string;
              component: string;
            }> = {};
          if (!isSameRoute) {
            itemProps.target = "_blank";
            itemProps.component = "a";
            itemProps.href = item.link;
          }
          return (
            <MenuItem key={index + item.link}>
              <ListItem {...itemProps} className={classes.menuItem}>
                <Stack>
                  <div className={classes.textUpper}>{item.header}</div>
                  <div className={classes.textLower}>{item.subheading}</div>
                </Stack>
              </ListItem>
            </MenuItem>
          );
        })}
      </div>
    </Menu>
  );
}

export default DappsDropdown;
