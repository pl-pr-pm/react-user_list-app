/**
 * global state
 *
 * ステート：Loginユーザーを管理するコンテキスト
 */

import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useState
} from "react";
import { User } from "../types/api/user";

type LoginUser = User & { isAdmin: boolean };

export type LoginUserContextType = {
  loginUser: (User & { isAdmin: boolean }) | null; // USer
  setLoginUser: Dispatch<SetStateAction<LoginUser | null>>; // User型LoginUserをステートに登録する関数
};

/**
 * LoginUserContextを作成
 * loginUser, setLoginUserを保持する
 *
 */
export const LoginUserContext = createContext<LoginUserContextType>(
  {} as LoginUserContextType
);

export const LoginUserProvider = (props: { children: ReactNode }) => {
  const { children } = props;
  const [loginUser, setLoginUser] = useState<LoginUser | null>(null);

  return (
    <LoginUserContext.Provider value={{ loginUser, setLoginUser }}>
      {children}
    </LoginUserContext.Provider>
  );
};
