import { MiddlewareAPI, PayloadAction } from "@reduxjs/toolkit";
import {
  IUpdateBlockMetadata,
  updateBlockMetadata,
} from "application/reducers.slices/wallet.stat.core";
import { Infra } from "infrastructure";

export const updateBlockMetadataFlow = async (
  infra: Infra,
  { dispatch }: MiddlewareAPI,
  action: PayloadAction<IUpdateBlockMetadata>
) => {
  dispatch(updateBlockMetadata(action.payload));
};
