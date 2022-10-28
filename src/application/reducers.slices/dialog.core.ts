import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "application/store";
import { ComponentClass, FunctionComponent } from "react";
export type DialogComponent =
  | string
  | FunctionComponent<any>
  | ComponentClass<any, any>;
export interface DialogboxState {
  open: boolean;
  component: DialogComponent | undefined;
  onClose?: Function | undefined;
}
export type DialogOpenState = Omit<DialogboxState, 'open'>
const initialState: DialogboxState = {
  open: false,
  component: undefined,
  onClose: undefined,
};
const dialogboxSlice = createSlice({
  name: "dialogbox",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    openDialog: (state, action: PayloadAction<DialogOpenState>) => {
      state = {
        ...action.payload,
        open: true,
      };
      return state;
    },
    setComponent: (state, action: PayloadAction<DialogComponent>) => {
      state.component = action.payload;
      return state;
    },
    closeDialog: (state) => {
      state = initialState;
      return state;
    },
  },
});

export const { openDialog, setComponent, closeDialog } = dialogboxSlice.actions;
// Other code such as selectors can use the imported `RootState` type
export const selectDialog = (state: RootState) => state.dialogbox;

export default dialogboxSlice.reducer;
