import React, { useCallback, useState } from "react";
import { Box } from "@mui/material";
import { showErrorNotice } from "application/flows/actions/notice.action";
import { useAppDispatch } from "application/hook";
import { DAPPS, DAPPS_NFT } from "utils/constance";
import { DappName } from "utils/types";
import Tabs from "views/components/base/tabs";
import TabPanel from "views/components/base/tabs/tabpanel";
import ConnectionTab from "./connection.tab";
import GenerateUserStory from "./story.tab";
import { useNavigate } from "react-router-dom";
import { appRouteNames } from "utils/route.names";

export type AppType = "dapp" | "nft";
export type HomeState = Partial<{
  tabValue: number;
  appType: AppType;
  selectedDapp: DappName;
  contractAddress: string;
  username: string;
}>;
export default function Home() {
  const [state, _setState] = useState<HomeState>({
    tabValue: 0,
    appType: "dapp",
    selectedDapp: DAPPS[0].name,
    username: "",
  });
  const setState = (_state: HomeState) => _setState({ ...state, ..._state });
  const { appType, selectedDapp, tabValue, contractAddress, username } = state;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const generateStory = useCallback(
    function () {
      if (!username) {
        return dispatch(
          showErrorNotice({
            message: "Username missing!",
          })
        );
      }
      navigate(appRouteNames.story, {
        state: {
          username: String(username),
          dappName: selectedDapp as DappName,
        },
      });
    },
    [username, contractAddress, selectedDapp, JSON.stringify(dispatch)]
  );
  return (
    <Box component="div" sx={{ display: "flex", marginTop: 10 }}>
      <Box component="div" sx={{ padding: 5 }}>
        <Tabs
          handleChange={(_, tabValue) => setState({ tabValue })}
          value={tabValue}
        >
          <div>Connect Wallet</div>
          <div>Generate Story</div>
        </Tabs>
      </Box>
      <Box style={{ display: "flex", flexGrow: 1 }}>
        <TabPanel value={tabValue as number} index={0}>
          <ConnectionTab
            appType={appType as AppType}
            selectedDapp={selectedDapp as DappName}
            onDappTypeSelect={(appType: AppType) => {
              setState({
                appType,
                selectedDapp:
                  appType === "dapp" ? DAPPS[0].name : DAPPS_NFT[0].name,
              });
            }}
            onContinue={() => setState({ tabValue: 1 })}
            onDappSelect={(selectedDapp: DappName) =>
              setState({ selectedDapp })
            }
            contractAddress={contractAddress as string}
            onAddressChange={(contractAddress) => setState({ contractAddress })}
          />
        </TabPanel>
        <TabPanel value={tabValue as number} index={1}>
          <GenerateUserStory
            setUsername={(username: string) => setState({ username })}
            username={username as string}
            onContinue={generateStory}
          />
        </TabPanel>
      </Box>
    </Box>
  );
}
