/**
 * ログイン画面
 *
 * 以下を配置
 * - ユーザーIDの入力エリア
 * - ログインボタン
 *
 */

import { Box, Input, Divider, Flex, Heading, Stack } from "@chakra-ui/react";
import { ChangeEvent, memo, useState, VFC } from "react";
import { useAuth } from "../../hooks/useAuth";
import { PrimaryButton } from "../atoms/button/PrimayButton";

export const Login: VFC = memo(() => {
  // 入力するユーザーIDをステートで保持
  const [userId, setUserID] = useState<string>("");
  // ステートと入力したユーザーIDを同期させる
  // レンダリングされないので、入力値を更新できない
  const onChangeUserId = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(e);
    setUserID(e.target.value);
  };

  const { login, loading } = useAuth();
  const onClickLogin = () => login(userId);

  return (
    <Flex align="center" justify="center" height="100vh">
      <Box bg="white" w="sm" p={4} borderRadius="md" shadow="md">
        <Heading as="h1" size="lg" textAlign="center">
          ユーザー管理アプリ
        </Heading>
        <Divider my={4} />
        <Stack spacing={3} py={4} px={10}>
          <Input
            placeholder="ユーザーID"
            value={userId} // onChangeUserIdで登録したステートを指定
            onChange={onChangeUserId}
          />
          <PrimaryButton
            disabled={userId === "" ? true : false} // ユーザーIDの入力がない場合はボタンを非活性とする
            loading={loading}
            onClick={onClickLogin}
          >
            ログイン
          </PrimaryButton>
        </Stack>
      </Box>
    </Flex>
  );
});
