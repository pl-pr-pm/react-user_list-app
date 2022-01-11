/**
 * toast でのメッセージ表示コンポーネント
 */

import { useToast } from "@chakra-ui/react";
import { useCallback } from "react";

type Props = {
  title: string;
  status: "info" | "warining" | "success" | "error";
};

export const useMessage = () => {
  const toast = useToast();

  const showMessage = useCallback(
    (props: Props) => {
      const { title, status } = props;
      toast({
        status,
        title,
        position: "top",
        duration: 2000,
        isClosable: true
      });
    },
    [toast]
  );

  return { showMessage };
};
