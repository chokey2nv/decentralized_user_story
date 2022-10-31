import React, { useState } from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@mui/styles";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Link from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import classNames from "classnames";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { disconnectAction } from "application/flows/actions";
import { useAppDispatch } from "application/hook";
import { NETWORKS } from "utils/constance";
import utils from "utils";
import {
  hideDialogBoxAction,
  setDialogComponentAction,
} from "application/flows/actions/dialogbox.action";
import NetworkSelector from "../network.button/network.selector";

const useStyles = makeStyles(() => ({
  box: {
    display: "flex",
    justifyContent: `center`,
    alignItems: `center`,
    padding: `4px 6px`,
    borderRadius: `6px`,
    maxHeight: "40px",
    border: `1px solid black`,
  },
  transparent: {
    border: "0px",
  },

  midiumlogo: {
    height: 20,
    width: 20,
  },
  cursor: {
    cursor: "pointer",
  },
  smallSpace: {
    margin: 4,
  },
  walletBalance: {
    display: "flex",
    marginLeft: "8px",
    borderRadius: `6px`,
    cursor: "pointer",
    border: `1px solid black`,
  },
  modalHeader: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: "1.5rem",
  },
  modalBody: {
    display: "flex",
    flexDirection: "column",
  },
  dashBox: {
    padding: "26px",
    border: "1px dashed",
    borderColor: "#DEE6ED",
    borderRadius: "6px",
    fontSize: "16px",
    margineTop: "6px",
  },
  topStack: {
    border: "1px solid",
    borderColor: "#DEE6ED",
    borderRadius: "6px",
    padding: "4px 0",
    justifyContent: "space-between",
    marginBottom: "12px",
    alignItems: "center",
  },
  btnOne: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    border: "1px solid",
    borderColor: "#319EF6",
    boxSizing: "border-box",
    boxShadow: "0px 1px 7px rgba(41, 45, 50, 0.08)",
    borderRadius: "6px",
    padding: "16px 0",
    color: "#319EF6",
    width: "100%",
    whiteSpace: "nowrap",
    textTransform: "capitalize",
    marginRight: "14px",
    "&:hover": {
      background: "#4CAFFF",
      color: "#fff",
    },
  },
  btnTwo: {
    display: "flex",
    justifyContent: "center",
    background: "transparent",
    border: "1px solid",
    borderColor: "#666666",
    boxSizing: "border-box",
    boxShadow: "0px 1px 7px rgba(41, 45, 50, 0.08)",
    borderRadius: "6px",
    padding: "16px 0",
    color: "#999999",
    width: "100%",
    textTransform: "capitalize",
    whiteSpace: "nowrap",
    "&:hover": {
      background: "#7599BD",
      color: "#fff",
    },
  },
  btnStack: {
    justifyContent: "space-between",
    marginBottom: "18px",
  },
  heading: {
    fontWeight: 400,
    fontSize: "1.25rem",
    color: "#333333",
    lineHeight: "1.75rem",
    marginBottom: "1rem",
  },
  selectBorder: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    background: "transparent",
    cursor: "pointer",
    border: `1px solid black`,
    "&:hover": {
      border: `1px solid black`,
    },
    boxSizing: "border-box",
    borderRadius: ".375rem",
    height: "4rem",
    padding: "1rem",
    marginBottom: "1rem",
  },
  bottomText: {
    textAlign: "center",
    color: "#666666",
  },
}));

function AccountInfo() {
  const classes = useStyles();
  const dispatch = useAppDispatch();
  const { address, networkId, wallet } = useSelector(selectWallet),
    network = NETWORKS.find((item) => item.id === networkId);
  const [tooltipTitle, setTooltipTitle] = useState("Copy");
  const copyToClipBoard = async (text: any) => {
    try {
      await navigator.clipboard.writeText(text);
      setTooltipTitle("Copied");
      setTimeout(() => {
        setTooltipTitle("Copy");
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  };

  function disconnect() {
    dispatch(disconnectAction);
    dispatch(hideDialogBoxAction);
  }
  function showNetworkSelector() {
    dispatch(setDialogComponentAction(NetworkSelector));
  }
  return (
    <div>
      <div className={classes.modalHeader}>
        <div className={classes.heading}>Wallet</div>
      </div>
      <div className={classes.modalBody}>
        <Box margin="0 auto" fontSize="14px">
          <Stack direction="row" className={classes.topStack}>
            {/* <div
              style={{
                color: "#333333",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            > */}
            <img src={`/assets/wallets/${wallet}.svg`} alt="wallet" />
            {String(address).toUpperCase()}
            {/* </div> */}
            <Tooltip
              title={tooltipTitle}
              style={{ backgroundColor: "gray.300", color: "black" }}
            >
              <IconButton aria-label="Copy address">
                <ContentCopyIcon
                  style={{ color: "#666666" }}
                  onClick={() => copyToClipBoard(address)}
                />
              </IconButton>
            </Tooltip>
          </Stack>
          <Box style={{ marginTop: "4px", fontSize: "16px", color: "#DCE6EF" }}>
            <Link
              target="_blank"
              href={utils.walletExplorer(network, "address", address) || "#"}
            >
              <Box display="flex">
                <img
                  style={{ height: "24px", width: "24px", marginRight: "4px" }}
                  src="/assets/routesquare-light.svg"
                  alt="explorer"
                />
                <div
                  style={{
                    color: "#666666",
                    marginBottom: "10px",
                    marginTop: "4px",
                  }}
                >
                  View on {utils.walletExplorer(network)}
                </div>
              </Box>
            </Link>
          </Box>
          <Box>
            <Stack direction="row" className={classes.btnStack}>
              <div
                className={classNames(classes.btnOne, classes.cursor)}
                onClick={showNetworkSelector}
              >
                Switch Wallet
              </div>
              <div
                className={classNames(classes.btnTwo, classes.cursor)}
                onClick={disconnect}
              >
                Disconnect Wallet
              </div>
            </Stack>
          </Box>
          <Box className={classes.dashBox}>
            <div className={classes.bottomText}>
              Your recent transactions will appear here
            </div>
          </Box>
        </Box>
      </div>
    </div>
  );
}
export default AccountInfo;
