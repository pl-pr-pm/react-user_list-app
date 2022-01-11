/**
 *アプリケーションの実態をレンダリングする
 *@remarks
 *ChakraUIを利用するために<ChakraProvider>を使用
 *ルーティングを有効化するために<BrowserRouter>を使用
 *<Router>にてルーティング機能を実装
 */

import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import theme from "./theme/theme";
import { Router } from "./router/Router";

export default function App() {
  return (
    <ChakraProvider theme={theme}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ChakraProvider>
  );
}
