import React, { useState } from "react";
import { AppBar, Stack, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Container } from "@mui/system";
import { selectWallet } from "application/reducers.slices/wallet.core";
import HeaderConnected from "./header.connected";
import ButtonDropdown from "views/components/base/button.custom/button.dropdown";
import DappsDropdown from "./Dapps";
import HeaderDisConnected from "./header.disconnected";
import { useAppSelector } from "application/hook";
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
  display: "flex",
  alignItems: "center",
}));
const Header = () => {
  const { address } = useAppSelector(selectWallet),
    [appBtnAnchorEl, setAppBtnAnchorEl] = useState<Element | undefined>(
      undefined
    ),
    handleAppClick: React.MouseEventHandler = (e) => {
      setAppBtnAnchorEl(e.currentTarget);
    };
  return (
    <AppBar position="static" elevation={1} style={{ background: "#fff" }}>
      <Container maxWidth={false} style={{ padding: 0 }}>
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
              <ButtonDropdown
                onClick={handleAppClick}
                iconSrc="/assets/menu.svg"
                text="DApps"
              />
              <DappsDropdown
                anchorEl={appBtnAnchorEl}
                handleCloseEvent={() => setAppBtnAnchorEl(undefined)}
              />
            </StyledCompanyContainer>
            <StyledConnectionContainer>
              {address ? <HeaderConnected /> : <HeaderDisConnected />}
            </StyledConnectionContainer>
          </StyledRoot>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default Header;
