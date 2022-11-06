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
import { AppStateObject, AppType } from "..";

export interface DappSelectionFormProps {
  address: string;
  appType: AppType;
  contractAddress: string;
  onDappTypeSelect: (appType: AppType) => void;
  onDappSelect: (dapp: AppStateObject) => void;
  onAddressChange: (address: string) => void;
}
export default function DappSelectionForm({
  appType,
  address,
  contractAddress,
  onDappSelect,
  onAddressChange,
  onDappTypeSelect,
}: DappSelectionFormProps) {
  if (!address) return null;
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onDappTypeSelect((event.target as HTMLInputElement).value as AppType);
  };
  return (
    <>
      <FormControl fullWidth>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          value={appType}
          name="radio-buttons-group"
          onChange={handleChange}
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
          onChange={(e) =>
            onDappSelect({
              appType: appType as AppType,
              name: String(e.target.value),
            })
          }
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
