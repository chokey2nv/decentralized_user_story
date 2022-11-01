import { Middleware } from "@reduxjs/toolkit";
import {
  CLOSE_DIALOGBOX,
  OPEN_DIALOGBOX,
  SET_ARROW_BACK_TEXT,
  SET_CLOSE_BUTTON_COMPONENT,
  SET_COMPONENT,
} from "application/flows/actions/dialogbox.action";
import {
  closeDialog,
  openDialog,
  setArrowBackArrow,
  setCloseButtonComponent,
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
      case SET_CLOSE_BUTTON_COMPONENT:
        dispatch(setCloseButtonComponent(action?.payload));
        break;
      case SET_ARROW_BACK_TEXT:
        dispatch(setArrowBackArrow(action?.payload));
        break;
      case CLOSE_DIALOGBOX:
        dispatch(closeDialog());
        break;
    }
  };
export default dialogMiddleware;
