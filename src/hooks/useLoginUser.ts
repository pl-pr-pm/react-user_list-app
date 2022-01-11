import { useContext } from "react";
import {
  LoginUserContext,
  LoginUserContextType
} from "../providers/LoginUserProvider"; // global state

/**
 * useContextを実行し、LoginUserContextの値を返却する
 * このフックスを呼び出すだけで、LoginUserContextの値を利用することができる
 */
export const useLoginUser = (): LoginUserContextType =>
  useContext(LoginUserContext);
