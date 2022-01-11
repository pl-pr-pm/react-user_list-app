/**
 * ルーティング機能を提供
 * SPAは画面の要素を書き換えてもページは変わらないため、リロード時にindexのページが表示される。そのため、ルーティングを設定する必要がある
 */

import { memo, VFC } from "react";
import { Route, Switch } from "react-router-dom";
import { Login } from "../components/pages/Login";
import { homeRoutes } from "./HomeRoutes"; //
import { Page404 } from "../components/pages/404";
import { HeaderLayout } from "../components/templates/HeaderLayout";
import { LoginUserProvider } from "../providers/LoginUserProvider";

/**
 * memoを利用してコンポーネントのメモ化を実装
 * 親コンポーネントがレンダリングされても、自コンポーネントを再レンダリングしないようにする
 *
 *
 *  */
export const Router: VFC = memo(() => {
  return (
    // <Switch>以降:どのパスにどのコンポーネントを描画するかを設定
    // <Route>に具体的なパスを記述する<Route>のchildrenに遷移
    <Switch>
      <LoginUserProvider>
        {/*完全一致 のみ対象とするため exact を利用*/}
        <Route exact path="/">
          <Login />
        </Route>
        <Route
          path="/home"
          // propsを展開しベースパス: url を利用している
          render={({ match: { url } }) => (
            <Switch>
              {/* homeRoutesをループし /home配下を定義する */}
              {homeRoutes.map((route) => (
                <Route
                  key={route.path}
                  exact={route.exact}
                  path={`${url}${route.path}`}
                >
                  <HeaderLayout>{route.children}</HeaderLayout>
                </Route>
              ))}
            </Switch>
          )}
        />
      </LoginUserProvider>
      <Route path="*">
        <Page404 />
      </Route>
    </Switch>
  );
});
