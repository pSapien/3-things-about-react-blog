import { createContext, useContext, useEffect, useState } from "react";

class Store {
  constructor(defaultValue) {
    this.value = defaultValue;
    this.listeners = new Set();
  }

  getState() {
    return this.value;
  }

  subscribe(reactSetStateFn) {
    this.listeners.add(reactSetStateFn);

    return () => {
      this.listeners.delete(reactSetStateFn);
    };
  }

  dispatch(newValue) {
    this.value = newValue;
    this.listeners.forEach((listener) => listener(newValue));
  }
}

const ThemeContext = createContext();

export function ThemeProvider({ children, defaultValue }) {
  const [store] = useState(() => {
    return new Store(defaultValue);
  });

  return <ThemeContext.Provider value={store}>{children}</ThemeContext.Provider>;
}

export function useThemeValues() {
  const themeStore = useContext(ThemeContext);
  const [localState, setLocalState] = useState(() => {
    return themeStore.getState();
  });

  useEffect(() => {
    return themeStore.subscribe(setLocalState);
  }, []);

  return localState;
}

export function useThemeChange() {
  const themeStore = useContext(ThemeContext);

  return (newTheme) => {
    themeStore.dispatch(newTheme);
  };
}
