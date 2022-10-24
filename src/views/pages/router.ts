import React from "react";
import { createBrowserRouter } from "react-router-dom";
import HeaderConnected from "../components/views/headers/header.connected";
import AppLayout from "./layout";
const router = createBrowserRouter([
  {
    path: "/",
    element: React.createElement(HeaderConnected)
  }
]);
export default router;