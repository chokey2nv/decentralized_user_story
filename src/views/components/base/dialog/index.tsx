import React from "react";
import classNames from "classnames";
import { Dialog, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { useSelector } from "react-redux";
import { selectDialog } from "application/reducers.slices/dialog.core";
import { useAppDispatch } from "application/hook";
import { hideDialogBoxAction } from "application/flows/actions/dialogbox.action";
import { Close } from "@mui/icons-material";
const styles = makeStyles(() => ({
  dialogPaper: {
    background: "black",
    border: "1px solid black",
    padding: "1rem",
    minWidth: 300,
  },
  additionalIcon: {
    position: "fixed",
    top: 25,
    right: 60,
    zIndex: 1100,
    borderRadius: 5,
    padding: 5,
  },
  close: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 1100,
    color: "black",
    border: `solid 1px black`,
    borderRadius: 5,
    padding: 5,
  },
  _close: {
    position: "absolute",
  },
  icon: {
    width: 10,
    height: 10,
  },
}));
export default function CustomDialog() {
  const classes = styles(),
    { open, onClose, component: Component } = useSelector(selectDialog),
    dispatch = useAppDispatch(),
    handleOnClose = (
      event: Event,
      reason: "backdropClick" | "escapeKeyDown"
    ) => {
      if (reason === "backdropClick") return;
      if (onClose) onClose();
      dispatch(hideDialogBoxAction);
    };
  return (
    <Dialog
      classes={{
        paper: classNames(classes.dialogPaper),
      }}
      open={Boolean(open)}
      onClose={handleOnClose}
    >
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={() => dispatch(hideDialogBoxAction)}>
          <Close />
        </IconButton>
      </div>
      {Component && React.createElement(Component)}
    </Dialog>
  );
}
