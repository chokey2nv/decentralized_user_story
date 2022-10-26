import React, { useEffect } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "application/hook";
import { connectWallet } from "application/flows/actions";
import Header from "views/components/views/headers";
import Notice from "views/components/base/snackbar";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connectWallet);
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />} />
        </Routes>
      </BrowserRouter>
      <Notice />
    </div>
  );
}

export default App;
