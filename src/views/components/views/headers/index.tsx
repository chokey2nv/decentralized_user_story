import React from "react";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { selectWallet } from "application/reducers.slices/wallet.core";
import { useSelector } from "react-redux";
import HeaderConnected from "./header.connected";
import ButtonDropdown from "views/components/base/button.custom/button.dropdown";
const StyledRoot = styled("div")(() => ({
  display: "flex",
  padding: 10,
  justifyContent: "space-between",
  width: "100%",
}));
const StyledCompanyContainer = styled("div")(({ theme }) => ({
  display: "flex",
}));
const Logo = styled("img")(() => ({
  width: 40,
  height: 40,
}));
const ImageContainer = styled("div")(({ theme }) => ({}));
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
const StyledConnectionContainer = styled("div")(() => ({
  color: "black",
}));
const Header = () => {
  const { address } = useSelector(selectWallet);
  return (
    <AppBar position="static" elevation={1}>
      <Container maxWidth="xl" style={{ background: "#fff", padding: 0 }}>
        <Toolbar disableGutters>
          <StyledRoot>
            <StyledCompanyContainer>
              <Logo src="/assets/logo.svg" alt="logo" />
              <StyledStack direction="column">
                <ImageContainer>
                  <img src="/assets/rigelprotocol.svg" alt="rigelprotocol" />
                </ImageContainer>
                <Text>Defi Story</Text>
              </StyledStack>
              <ButtonDropdown iconSrc="/assets/menu.svg" text="DApps" />
            </StyledCompanyContainer>
            <StyledConnectionContainer>
              {address ? <HeaderConnected /> : "is not connected"}
            </StyledConnectionContainer>
          </StyledRoot>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
