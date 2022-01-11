/**
 * 本アプリで利用する主要なボタンコンポーネント
 *
 * @param
 * - children
 *   ボタンに表示するメッセージ
 */

import { memo, ReactNode, VFC } from "react";
import { Button } from "@chakra-ui/react";

/**
 * propsのタイプ
 *
 *
 */
type Props = {
  children: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick: () => void;
};

export const PrimaryButton: VFC<Props> = memo((props) => {
  const { children, disabled = false, loading = false, onClick } = props;

  return (
    <Button
      bg="teal.400"
      color="white"
      _hover={{ opacity: 0.7 }}
      disabled={disabled}
      isLoading={loading}
      onClick={onClick}
    >
      {children}
    </Button>
  );
});
