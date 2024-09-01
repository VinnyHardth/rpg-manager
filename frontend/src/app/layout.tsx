import { CssBaseline } from "@mui/material";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v14-appRouter";
import { ThemeProvider } from "@mui/material/styles";
import type { Metadata } from "next";
import NavbarSelector from "./components/General/NavbarSelector";
import ProtectedRouter from "./components/General/ProtectedRouter";
import { AuthProvider } from "./context/AuthProvider";
import theme from "./theme/theme";

export const metadata: Metadata = {
  title: "OptiHire",
  description: "Uma plataforma intuitiva para seleção de candidatos.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <AuthProvider>
              <ProtectedRouter>
                <CssBaseline />
                <NavbarSelector />
                {children}
              </ProtectedRouter>
            </AuthProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
