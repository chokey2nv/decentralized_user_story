import React from "react";
const Home = React.lazy(() => import("../views/pages/home/index"));
const appRoutes: {
  path: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    path: "/",
    Component: Home,
  },
];
export default appRoutes;
