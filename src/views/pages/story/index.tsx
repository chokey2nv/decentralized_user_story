import { Link, useLocation, useNavigate } from "react-router-dom";
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
import { makeStyles } from "@mui/styles";
const useStyle = makeStyles(() => ({
  statDisplay: {
    borderLeft: "solid 1px #DEE6ED",
  },
  img: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  header: {
    display: "flex",
    alignItems: "center",
  },
}));
export default function Story() {
  const classes = useStyle();
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { address, networkId, connecting, wallet } =
    useAppSelector(selectWallet);
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
      fromBlock: Number(queryString["fromBlock"] || 0),
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

  if (connecting) {
    return (
      <div
        style={{
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Connecting to {wallet || " wallet"} ...
      </div>
    );
  } else if (!address) {
    return (
      <div
        style={{
          minHeight: 200,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        Connect to wallet
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <div className={classes.header}>
        <img
          src={`/assets/stats/${dapp?.name}/logo.svg`}
          className={classes.img}
        />
        <h1>{dapp?.label}</h1>
      </div>
      <div>
        <Link to={appRouteNames.home}>Back</Link>
      </div>
      <SearchHeader />
      <Grid container spacing={2} style={{ margin: 0 }}>
        <Grid item xs={12} sm={3} md={3} lg={3} xl={3}>
          <UserHistoryBox />
        </Grid>
        <Grid
          className={classes.statDisplay}
          item
          xs={12}
          sm={9}
          md={9}
          lg={9}
          xl={9}
        >
          <UserStats
            dappName={dappName}
            dappInfo={{
              header: String(dapp?.label),
              dappName: dappName as DappName,
            }}
          />
        </Grid>
      </Grid>
    </div>
  );
}
