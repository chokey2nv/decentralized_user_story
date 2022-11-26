import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { appRouteNames } from "utils/route.names";
import { useAppDispatch, useAppSelector } from "application/hook";
import {
  generateStoryAction,
  IGenerateStoryActionPayload,
} from "application/flows/actions/wallet.stat.action";
import { DappName } from "utils/types";
import { ALL_DAPPS } from "utils/constance";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import UserHistoryBox from "./history.box";
import SearchHeader from "./history.box/search.header";
import { Grid } from "@mui/material";
import UserStats from "./stats";

export default function Story() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { address, networkId, connecting } = useAppSelector(selectWallet);
  const { blockMetadata: block, isSearchingHx } =
    useAppSelector(selectWalletStat)?.[networkId]?.[address] || {};
  const [params, setParams] = useState<Partial<IGenerateStoryActionPayload>>({
    username: undefined,
    dappName: undefined,
    contractAddress: undefined,
  });
  function validateQueryString(queryString: Record<string, string>) {
    if (!queryString["dappName"]) {
      navigate(appRouteNames.home, { replace: true });
    }
    const historyAction: IGenerateStoryActionPayload = {
      dappName: queryString["dappName"] as DappName,
      username: queryString["username"],
      contractAddress: undefined,
    };
    return historyAction;
  }
  useEffect(() => {
    if (!isSearchingHx && address && location) {
      const { state, search } = location;
      let queryString: Record<string, string> = {};
      if (state) {
        queryString = state;
      } else {
        search
          .substring(1)
          .split("&")
          .forEach((item) => {
            const keyValue = item.split("=");
            queryString[keyValue[0]] = keyValue[1];
          });
      }
      const payload = validateQueryString(queryString);
      dispatch(generateStoryAction(payload));
      setParams(payload);
    }
  }, [address, JSON.stringify(location), JSON.stringify(dispatch)]);
  const { dappName, username } = params;
  const dapp = ALL_DAPPS.find((item) => item.name === dappName);

  if (!address && connecting) {
    return <div>connecting...</div>;
  }

  return (
    <div>
      <h1>{dapp?.label}</h1>
      <SearchHeader />
      <Grid container spacing={2}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <UserHistoryBox />
        </Grid>
        <Grid item xs={12} sm={9} md={9} lg={9} xl={9}>
          <UserStats />
        </Grid>
      </Grid>
    </div>
  );
}
