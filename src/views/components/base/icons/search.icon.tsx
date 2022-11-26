import { styled } from "@mui/material/styles";
import React from "react";
const Search = styled("img")(() => ({
  height: 50,
  width: 100,
}));
export default function SearchIcon() {
  return <Search src="/assets/search.gif" alt="search" />;
}
