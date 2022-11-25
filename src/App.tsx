import React, { Suspense, useEffect } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { useAppDispatch } from "application/hook";
import { connectWalletAction } from "application/flows/actions";
import Notice from "views/components/base/snackbar";
import CustomDialog from "views/components/base/dialog";
import appRoutes from "utils/routes";
import AppLayout from "views/pages/layout";

function App() {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(connectWalletAction());
  }, [dispatch]);
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          {appRoutes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <AppLayout>
                    <Suspense>
                      <route.Component />
                    </Suspense>
                  </AppLayout>
                }
              />
            );
          })}
        </Routes>
      </BrowserRouter>
      <CustomDialog />
      <Notice />
    </div>
  );
}

export default App;
