import { Alert, Snackbar, SnackbarCloseReason } from "@mui/material";
import { hideNotice } from "application/flows/actions/notice.action";
import { useAppDispatch, useAppSelector } from "application/hook";
import { selectNotice } from "application/reducers.slices/notice.core";
import React from "react";

const Notice = () => {
  const { open, onClose, type, message, duration } = useAppSelector(selectNotice),
    dispatch = useAppDispatch();

  if (!open) return null;

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    // if (reason === "clickaway") {
    //   return;
    // }
    dispatch(hideNotice);
    onClose && onClose();
  };
  return (
    open && (
      <Snackbar open={open} autoHideDuration={duration} onClose={handleClose}>
        <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    )
  );
};
export default Notice;
