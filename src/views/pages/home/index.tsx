import { Box } from "@mui/material";
import React, { useState } from "react";
import Tabs from "views/components/base/tabs";
import TabPanel from "views/components/base/tabs/tabpanel";
import ConnectionTab from "./connection.tab";
import GenerateUserStory from "./story.tab";

export type AppType = "dapp" | "nft";
export interface AppStateObject {
  name: string;
  appType: AppType;
  address?: string;
}
export type HomeState = Partial<{
  tabValue: number;
  appType: AppType;
  dapp: AppStateObject;
  contractAddress: string;
}>;
export default function Home() {
  const [state, _setState] = useState<HomeState>({
    tabValue: 1,
    appType: "dapp",
  });
  const setState = (_state: HomeState) => _setState({ ...state, ..._state });
  const { appType, dapp, tabValue, contractAddress } = state;

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
            dapp={dapp as AppStateObject}
            onDappTypeSelect={(appType: AppType) => setState({ appType })}
            onContinue={() => setState({ tabValue: 1 })}
            onDappSelect={(dapp: AppStateObject) => setState({ dapp })}
            contractAddress={contractAddress as string}
            onAddressChange={(contractAddress) => setState({ contractAddress })}
          />
        </TabPanel>
        <TabPanel value={tabValue as number} index={1}>
          <GenerateUserStory />
        </TabPanel>
      </Box>
    </Box>
  );
}
