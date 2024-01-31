import React, { createContext, useContext, useState } from "react";

const ThemeContext = createContext();

export function ThemeProvider({ children, defaultTheme }) {
  const [localTheme, setLocalTheme] = useState(defaultTheme);

  return (
    <ThemeContext.Provider
      value={{
        theme: localTheme,
        onChangeTheme: setLocalTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export function useThemeValues() {
  return useContext(ThemeContext).theme;
}

export function useThemeChange() {
  return useContext(ThemeContext).onChangeTheme;
}
