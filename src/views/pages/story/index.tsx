import { useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { appRouteNames } from "utils/route.names";
import { useAppDispatch } from "application/hook";
import {
  generateStoryAction,
  IGenerateStoryActionPayload,
} from "application/flows/actions/wallet.stat.action";
import { DappName } from "utils/types";
import { ALL_DAPPS } from "utils/constance";
import { useSelector } from "react-redux";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { selectWalletStat } from "application/reducers.slices/wallet.stat.core";
import UserHistoryBox from "./history.box";

export default function Story() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { address, networkId, connecting } = useSelector(selectWallet);
  const { blockMetadata: block } =
    useSelector(selectWalletStat)[networkId] || {};
  const [params, setParams] = useState<Partial<IGenerateStoryActionPayload>>(
    {}
  );
  function validateQueryString(queryString: Record<string, string>) {
    if (!queryString["dappName"]) {
      navigate(appRouteNames.home, { replace: true });
    }
    const historyAction: IGenerateStoryActionPayload = {
      dappName: queryString["dappName"] as DappName,
      username: queryString["username"],
    };
    return historyAction;
  }
  useEffect(() => {
    if (address && location) {
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
  }, [address, JSON.stringify(location)]);
  const { dappName, username } = params;
  const dapp = ALL_DAPPS.find((item) => item.name === dappName);

  if (!address && connecting) {
    return <div>connecting...</div>;
  }

  return (
    <div>
      <h1>{dapp?.label}</h1>
      <div>Latest Block: {block?.latestBlock}</div>
      <div>
        Block History:{" "}
        {block?.latestBlock ? `${block.fromBlock} to ${block.toBlock}` : ""}
      </div>
      <div>
        <UserHistoryBox />
      </div>
    </div>
  );
}
