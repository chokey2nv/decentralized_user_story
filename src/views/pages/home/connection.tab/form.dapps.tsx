import {
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import React from "react";
import { DAPPS, DAPPS_NFT } from "utils/constance";
import { DappName } from "utils/types";
import { AppType } from "..";

export interface DappSelectionFormProps {
  address: string;
  appType: AppType;
  contractAddress: string;
  selectedDapp: DappName;
  onDappTypeSelect: (appType: AppType) => void;
  onDappSelect: (dapp: DappName) => void;
  onAddressChange: (address: string) => void;
}
const useStyle = makeStyles(() => ({
  selected: {
    color: "#319EF6",
  },
}));
export default function DappSelectionForm({
  appType,
  address,
  contractAddress,
  selectedDapp,
  onDappSelect,
  onAddressChange,
  onDappTypeSelect,
}: DappSelectionFormProps) {
  const classes = useStyle();
  if (!address) return null;
  return (
    <>
      <FormControl fullWidth>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          value={appType}
          name="radio-buttons-group"
          onChange={(e) => onDappTypeSelect(e.target.value as AppType)}
        >
          <FormControlLabel
            control={<Radio />}
            value="dapp"
            label={
              <span className={appType === "dapp" ? classes.selected : ""}>
                Decentralized App
              </span>
            }
          />
          <FormControlLabel
            control={<Radio />}
            value="nft"
            label={
              <span className={appType === "nft" ? classes.selected : ""}>
                NFT Marketplace
              </span>
            }
            // label="NFT Marketplace"
          />
        </RadioGroup>
      </FormControl>
      <div style={{ marginTop: 20 }} />
      <FormControl fullWidth>
        <InputLabel>Select Dapp</InputLabel>
        <Select
          id="demo-simple-select"
          onChange={(e) => onDappSelect(e.target.value as DappName)}
          value={selectedDapp}
          classes={{}}
        >
          {(appType === "dapp" ? DAPPS : DAPPS_NFT).map((dapp, index) => {
            return (
              <MenuItem key={index + dapp.name} value={dapp.name}>
                {dapp.label}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <div
        style={{
          marginTop: 20,
          marginBottom: 20,
          display: "flex",
          justifyContent: "center",
        }}
      >
        OR
      </div>
      <InputLabel>Input Contract Address</InputLabel>
      <TextField
        value={contractAddress}
        onChange={(e) => onAddressChange(e.target.value)}
        fullWidth
        variant="outlined"
      />
    </>
  );
}
