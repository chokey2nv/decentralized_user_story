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
export default function DappSelectionForm({
  appType,
  address,
  contractAddress,
  selectedDapp,
  onDappSelect,
  onAddressChange,
  onDappTypeSelect,
}: DappSelectionFormProps) {
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
            label="Decentralized App"
          />
          <FormControlLabel
            control={<Radio />}
            value="nft"
            label="NFT Marketplace"
          />
        </RadioGroup>
      </FormControl>
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
