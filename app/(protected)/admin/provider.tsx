"use client";

import { ReactNode } from "react";
import { Theme, ThemeUIProvider } from "theme-ui";
import theme from "@hackclub/theme";
import '@hackclub/theme/fonts/reg-ital-bold.css'
// import '@hackclub/theme/fonts/reg-bold.css'
export default function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeUIProvider theme={theme as unknown as Theme} >
      {children}
    </ThemeUIProvider>
  );
}
