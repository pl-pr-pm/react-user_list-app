/**
 * ログイン機能のカスタムフック
 * APIでユーザー情報を取得し、一致する入力されたユーザーIDが存在するかを確認
 */

import { useHistory } from "react-router-dom";
import { User } from "../types/api/user";
import axios from "axios";
import { useCallback, useState } from "react";
import { useMessage } from "./useMessage";
import { useLoginUser } from "../hooks/useLoginUser";

export const useAuth = () => {
  const history = useHistory(); // ページ遷移のため利用
  // /home 画面にてローディングを描画したいため、ローディングをステートで保持する
  const [loading, setLoading] = useState(false);
  const { showMessage } = useMessage();
  const { setLoginUser } = useLoginUser();
  // ユーザー情報APIにリクエストし、引数のユーザーIDに一致した場合、
  // ログインしたメッセージを表示し、homeに遷移する
  // ここでは、仮決めでユーザーIDが１０を管理者とし、その場合はlogin userのデータに isAdminを追加する
  const login = useCallback(
    (id: string) => {
      setLoading(true);
      axios
        .get<User>(`https://jsonplaceholder.typicode.com/users/${id}`)
        .then((res) => {
          if (res.data) {
            const isAdmin = res.data.id === 10 ? true : false;
            setLoginUser({ ...res.data, isAdmin });
            showMessage({ title: "ログインしました", status: "success" });
            history.push("/home");
          } else {
            showMessage({ title: "ユーザーがみつかりません", status: "error" });
            setLoading(false);
          }
        })
        .catch(() => {
          showMessage({ title: "ログインできません", status: "error" });
          setLoading(false);
        });
    },
    [history]
  );
  return { login, loading, setLoginUser };
};
