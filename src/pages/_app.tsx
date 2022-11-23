import type { AppProps } from "next/app";
import { Roboto } from "@next/font/google";
import { MantineProvider, MantineThemeOverride } from "@mantine/core";
import { NotificationsProvider } from "@mantine/notifications";
import { appWithTranslation } from "next-i18next";
import "../styles/globals.css";

const roboto = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

const theme: MantineThemeOverride = {
  fontFamily: "Roboto, sans-serif",
  defaultRadius: "sm",
  colors: {
    blue: [
      "#b2b9e1",
      "#9fa8da",
      "#8c97d3",
      "#7985cb",
      "#6574c4",
      "#5262bc",
      "#3f51b5",
      "#3949a3",
      "#324191",
      "#2c397f",
    ],
    white: [
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
      "#ffffff",
    ],
  },
  primaryColor: "blue",
  headings: {
    fontWeight: 700,
    sizes: {
      h1: { fontSize: "1.5rem", lineHeight: "2rem" },
      h2: { fontSize: "1.25rem", lineHeight: "1.75rem" },
      h3: { fontSize: "1rem", lineHeight: "1.5rem" },
    },
  },
};

function App({ Component, pageProps }: AppProps) {
  return (
    <main className={roboto.className}>
      <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
        <NotificationsProvider>
          <Component {...pageProps} />
        </NotificationsProvider>
      </MantineProvider>
    </main>
  );
}

export default appWithTranslation(App);
