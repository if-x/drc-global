import * as React from "react";

export interface SiteContext {
  isMobile: boolean;
  isDarkMode: boolean;
  setDarkmode: (isDarkMode: boolean) => void;
}

const defaultContextValue: SiteContext = {
  isMobile: false,
  isDarkMode: false,
  setDarkmode: () => undefined,
};

export const SiteContext =
  React.createContext<SiteContext>(defaultContextValue);
