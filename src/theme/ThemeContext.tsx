import { createContext, memo, type PropsWithChildren, useContext, useMemo } from "react";

import type { ResolvedTheme, ThemePayload } from "../types/theme";

const DEFAULT_THEME: ResolvedTheme = {
  primary: "#FF9933",
  background: "#FFF5E6",
  surface: "#FFFFFF",
  text: "#1F2933",
  mutedText: "#667085",
  border: "#E8D8C4",
  accent: "#2E90FA"
};

const ThemeContext = createContext<ResolvedTheme>(DEFAULT_THEME);

const isColor = (value: unknown): value is string =>
  typeof value === "string" && value.trim().length > 0;

export const resolveTheme = (theme: ThemePayload | null | undefined): ResolvedTheme => ({
  primary: isColor(theme?.primary) ? theme.primary : DEFAULT_THEME.primary,
  background: isColor(theme?.background) ? theme.background : DEFAULT_THEME.background,
  surface: isColor(theme?.surface) ? theme.surface : DEFAULT_THEME.surface,
  text: isColor(theme?.text) ? theme.text : DEFAULT_THEME.text,
  mutedText: isColor(theme?.mutedText) ? theme.mutedText : DEFAULT_THEME.mutedText,
  border: isColor(theme?.border) ? theme.border : DEFAULT_THEME.border,
  accent: isColor(theme?.accent) ? theme.accent : DEFAULT_THEME.accent
});

export const ThemeProvider = memo(function ThemeProvider({
  children,
  theme
}: PropsWithChildren<{ theme: ThemePayload | null | undefined }>) {
  const value = useMemo(
    () => resolveTheme(theme),
    [
      theme?.accent,
      theme?.background,
      theme?.border,
      theme?.mutedText,
      theme?.primary,
      theme?.surface,
      theme?.text
    ]
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
});

export const useTheme = (): ResolvedTheme => useContext(ThemeContext);
