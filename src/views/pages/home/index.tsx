import { Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import React, { useState } from "react";
import classNames from "classnames";
import Tabs from "views/components/base/tabs";
import TabPanel from "views/components/base/tabs/tabpanel";

const menu = [
  {
    label: "Connect Wallet",
    name: "connect",
  },
  {
    label: "Generate Story",
    name: "story",
  },
];
export default function Home() {
  const [value, setValue] = useState(0);
  return (
    <Box component="div" sx={{ display: "flex" }}>
      <Box>
        <Tabs handleChange={(_, value) => setValue(value)} value={value}>
          <div>Connect Wallet</div>
          <div>Generate Story</div>
        </Tabs>
      </Box>
      <Box>
        <TabPanel value={value} index={0}>
          <div>I am trying to Connect</div>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <div>Generate story</div>
        </TabPanel>
      </Box>
    </Box>
  );
}
