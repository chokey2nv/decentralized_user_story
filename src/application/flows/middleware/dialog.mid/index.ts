import { Middleware } from "@reduxjs/toolkit";
import {
  CLOSE_DIALOGBOX,
  OPEN_DIALOGBOX,
  SET_COMPONENT,
} from "application/flows/actions/dialogbox.action";
import {
  closeDialog,
  openDialog,
  setComponent,
} from "application/reducers.slices/dialog.core";
import { Infra } from "infrastructure";

const dialogMiddleware =
  (infra: Promise<Infra>): Middleware =>
  ({ dispatch }) =>
  (next) =>
  async (action) => {
    next(action);
    switch (action.type) {
      case OPEN_DIALOGBOX:
        dispatch(openDialog(action.payload));
        break;
      case SET_COMPONENT:
        dispatch(setComponent(action.payload));
        break;
      case CLOSE_DIALOGBOX:
        dispatch(closeDialog());
        break;
    }
  };
export default dialogMiddleware;
