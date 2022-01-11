/**
 * ユーザーの情報管理に関するコンポーネント
 */

import {
  Center,
  Spinner,
  useDisclosure,
  Wrap,
  WrapItem
} from "@chakra-ui/react";
import { memo, useCallback, useEffect, VFC } from "react";
import { UserCard } from "../organisms/user/UserCard";
import { useAllUsers } from "../../hooks/useAllUsers"; // ユーザー取得ロジックをカスタムフック化
import { UserDetailModel } from "../organisms/user/UserDetailModal";
import { useSelectUser } from "../../hooks/useSelectUser";
import { useLoginUser } from "../../hooks/useLoginUser";

export const UserManagement: VFC = memo(() => {
  const { getUsers, users, loading } = useAllUsers();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { onSelectUser, selectedUser } = useSelectUser();
  const { loginUser } = useLoginUser();

  // 画面描画初回実行時にユーザー一覧を取得する
  useEffect(() => {
    getUsers();
  }, []);

  // モーダルに表示するために対象のユーザーの情報を取得する
  // propsで関数渡すなら、UserCard内で定義しちゃって良いのではとおもったが、
  // onSelectUserの引数は、UserCard内で持っていないため定義できないので、ここで定義するのが適切
  const onClickUser = useCallback(
    (id: number) => {
      // onSelectUserは関数なのに、それをpropsで値渡すのが納得いかない
      onSelectUser({ id, users, onOpen });
    },
    [users, onSelectUser, onOpen]
  );

  return (
    <>
      {loading ? (
        <Center h="100vh">
          <Spinner />
        </Center>
      ) : (
        <Wrap p={{ base: 4, md: 10 }}>
          {users.map((user) => (
            <WrapItem key={user.id} mx="auto">
              <UserCard
                id={user.id}
                imageUrl="https://source.unsplash.com/random"
                userName={user.username}
                fullName={user.name}
                onClick={onClickUser} //UserCard コンポーネントにpropsとして渡される
              />
            </WrapItem>
          ))}
        </Wrap>
      )}
      <UserDetailModel
        user={selectedUser}
        isOpen={isOpen}
        isAdmin={loginUser?.isAdmin}
        onClose={onClose}
      />
    </>
  );
});
