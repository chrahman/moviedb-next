import { extendTheme } from "@chakra-ui/react";

const customTheme = extendTheme({
  initalColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: `'Poppins', sans-serif`,
    body: `'Poppins', sans-serif`,
  },
  colors: {
    brand: {
      900: "#000000",
      800: "#333333",
      700: "#666666",
      600: "#999999",
      500: "#0bb5df",
      400: "#eeeeee",
      300: "#f5f5f5",
      200: "#f9f9f9",
      100: "#ffffff",
    },
    body: {
      bg: "#f9f9f9",
      color: "red",
    },
  },
});

export default customTheme;
