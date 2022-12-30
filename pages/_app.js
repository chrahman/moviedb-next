import { ChakraProvider } from "@chakra-ui/react";
import Layout from "../Layout";
import customTheme from "../config/theme";
import { store } from "../store/store";
import { Provider } from "react-redux";
import '@fontsource/poppins'

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={customTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </Provider>
  );
}
