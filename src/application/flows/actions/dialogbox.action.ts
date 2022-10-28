import {
  DialogComponent,
  DialogOpenState,
} from "application/reducers.slices/dialog.core";

const pkg = "[DIALOG]";
export const OPEN_DIALOGBOX = `${pkg} open`;
export const CLOSE_DIALOGBOX = `${pkg} close`;
export const SET_COMPONENT = `${pkg} set component`;

export function showDialogAction(payload: DialogOpenState) {
  return {
    type: OPEN_DIALOGBOX,
    payload,
  };
}
export function setDialogComponentAction(payload: DialogComponent) {
  return {
    type: SET_COMPONENT,
    payload,
  };
}
export const hideDialogBoxAction = {
  type: CLOSE_DIALOGBOX,
};
