/**
 * /home 配下のパスを定義
 * /home 配下のパスを定義する際のRoute に設定するパラメータをオブジェクトの配列で保持し、呼び出し元でループして利用する
 * - path
 * - exact
 * - children
 */

import { Home } from "../components/pages/Home";
import { Setting } from "../components/pages/Setting";
import { UserManagement } from "../components/pages/UserManagement";
import { Page404 } from "../components/pages/404";
import { ReactNode } from "react";

type homeRoutesType = {
  path: string;
  exact: boolean;
  children: ReactNode;
};

export const homeRoutes = [
  {
    path: "/",
    exact: true,
    children: <Home />
  },
  {
    path: "/user_management",
    exact: false,
    children: <UserManagement />
  },
  {
    path: "/setting",
    exact: false,
    children: <Setting />
  },
  {
    path: "*",
    exact: false,
    children: <Page404 />
  }
];
