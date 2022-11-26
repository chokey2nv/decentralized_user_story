import { Stack } from "@mui/material";
import { styled } from "@mui/material/styles";
import React from "react";
import { DappName } from "utils/types";

const StyledCompanyContainer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
}));
const Logo = styled("img")(() => ({
  width: 40,
  height: 40,
}));
const ImageContainer = styled("div")(({ theme }) => ({}));
export const CompanyName = styled("div")(({ theme }) => ({
  color: "#fff",
}));
const Text = styled("div")(() => ({
  color: "#319EF6",
  fontSize: 14,
  display: "flex",
  fontWeight: "500",
}));
const StyledStack = styled(Stack)(() => ({
  marginLeft: 5,
  marginRight: 5,
  justifyContent: "flex-start",
}));
export interface IDappTradeMarkProps {
  dappName: DappName;
  header: string;
  subheader?: string;
  classes?: {
    name: string;
  };
}
export default function DappTradeMark({
  dappName,
  header,
  subheader,
  classes,
}: IDappTradeMarkProps) {
  return (
    <StyledCompanyContainer>
      <Logo src={`/assets/stats/${dappName}/logo.svg`} alt={dappName} />
      <StyledStack direction="column">
        <ImageContainer>
          <CompanyName className={classes?.name}>{header}</CompanyName>
        </ImageContainer>
        <Text>{subheader}</Text>
      </StyledStack>
    </StyledCompanyContainer>
  );
}
