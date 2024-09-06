import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { CssBaseline } from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";

import PrimarySearchAppBar from "@src/components/AppBar/AppBar";
import theme from "@src/theme/theme";

export const metadata: Metadata = {
  title: "rpg-manager",
  description: "A simple RPG manager",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body
        style={{ margin: 0, padding: 0, height: "100vh", overflow: "auto" }}
      >
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <PrimarySearchAppBar />
            <CssBaseline />
            <div style={{ paddingTop: "64px" }}>
              {" "}
              {/* Ajuste o paddingTop conforme o height da AppBar */}
              {children}
            </div>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
