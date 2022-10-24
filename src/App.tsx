import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HeaderConnected from "views/components/views/headers/header.connected";
import { useAppDispatch } from "application/hook";
import { connectWallet } from "application/flows/actions";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connectWallet);
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HeaderConnected />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
