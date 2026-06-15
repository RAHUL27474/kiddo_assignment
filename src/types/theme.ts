export interface ThemePayload {
  primary: string;
  background: string;
  surface?: string;
  text?: string;
  mutedText?: string;
  border?: string;
  accent?: string;
}

export interface ResolvedTheme {
  primary: string;
  background: string;
  surface: string;
  text: string;
  mutedText: string;
  border: string;
  accent: string;
}
