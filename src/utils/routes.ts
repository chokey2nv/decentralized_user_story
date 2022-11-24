import React from "react";
import { appRouteNames } from "./route.names";
const Home = React.lazy(() => import("../views/pages/home/index"));
const Story = React.lazy(() => import("../views/pages/story/index"));
const appRoutes: {
  path: string;
  Component: React.LazyExoticComponent<() => JSX.Element>;
}[] = [
  {
    path: appRouteNames.home,
    Component: Home,
  },
  {
    path: appRouteNames.story,
    Component: Story,
  },
];
export default appRoutes;
