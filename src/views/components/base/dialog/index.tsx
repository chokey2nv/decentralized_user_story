import React from "react";
import classNames from "classnames";
import { Dialog, IconButton } from "@mui/material";
import { makeStyles } from "@mui/styles";
import { selectDialog } from "application/reducers.slices/dialog.core";
import { useAppDispatch, useAppSelector } from "application/hook";
import { hideDialogBoxAction } from "application/flows/actions/dialogbox.action";
import { ArrowBack, Close } from "@mui/icons-material";
const styles = makeStyles(() => ({
  headerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
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
  backArrowContainer: {
    top: 20,
    zIndex: 1100,
    left: -60,
    position: "relative",
  },
  backIcon: {
    color: "black",
    border: "solid 1px black !important",
    borderRadius: "5px !important",
    padding: "0px !important",
  },
  close: {
    position: "fixed",
    top: 20,
    right: 20,
    zIndex: 1100,
    color: "black",
    border: "solid 1px black !important",
    borderRadius: "5px !important",
    padding: "0px !important",
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
    {
      open,
      onClose,
      component: Component,
      closeButton,
      closeButtonComponent: TopComponent,
      backArrow,
    } = useAppSelector(selectDialog),
    dispatch = useAppDispatch(),
    handleOnClose = (
      event: Event,
      reason: "backdropClick" | "escapeKeyDown"
    ) => {
      if (reason === "backdropClick") return;
      if (onClose) onClose();
      dispatch(hideDialogBoxAction);
    };
  if (Boolean(open))
    return (
      <Dialog
        classes={{
          paper: classNames(classes.dialogPaper),
        }}
        open={Boolean(open)}
        onClose={handleOnClose}
      >
        {(closeButton || TopComponent) && (
          <div className={classes.headerContainer}>
            {TopComponent ? React.createElement(TopComponent) : <div />}
            {backArrow && (
              <div className={classes.backArrowContainer}>
                <IconButton
                  className={classes.backIcon}
                  onClick={backArrow.action}
                >
                  <ArrowBack />
                </IconButton>{" "}
                {backArrow.text}
              </div>
            )}
            {closeButton && (
              <IconButton
                className={classes.close}
                onClick={() => dispatch(hideDialogBoxAction)}
              >
                <Close />
              </IconButton>
            )}
          </div>
        )}
        {Component && React.createElement(Component)}
      </Dialog>
    );
  else return null;
}
