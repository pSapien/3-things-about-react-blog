Super Saiyan way to use context in react.

In React, context is used to pass data through the component tree without having to pass props manually at every level. Or, context is global state for all the components that falls under the umbrella of its definition.
Such global state could range from "themes" to "localization" to "user authentication status" where every component needs to access them

Let's just create a basic `ThemeContext` and use it across our app.
For the sake of simplicity, our

```jsx
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
```

In our `App.jsx` file, we could use the theme

```jsx
import { ThemeProvider, useThemeChange, useThemeValues } from "./basic-context";

export function App() {
  return (
    <main>
      <ThemeProvider defaultTheme="light">
        <section style={{ gap: 20, display: "flex", justifyContent: "center" }}>
          <ThemedBox1 />
          <ThemedBox2 />
          <ThemedBox3 />
          <ThemeLess />
        </section>
        <ThemeOption />
      </ThemeProvider>
    </main>
  );
}

function ThemeLess() {
  return (
    <div
      style={{
        height: 120,
        width: 120,
        background: "#333",
      }}
    >
      <p style={{ color: "white" }}>Themed Less Box</p>
    </div>
  );
}

function ThemeOption() {
  const onChangeTheme = useThemeChange();
  console.log("re-render in ThemeOption component");

  return (
    <div style={{ textAlign: "center", paddingTop: 20 }}>
      <button onClick={() => onChangeTheme("dark")} style={{ marginRight: 10 }}>
        Dark
      </button>
      <button onClick={() => onChangeTheme("light")}>Light</button>
    </div>
  );
}

function ThemedBox1() {
  const theme = useThemeValues();

  return (
    <div
      style={{
        height: 120,
        width: 120,
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <p
        style={{
          color: theme === "light" ? "#333" : "#fff",
        }}
      >
        Themed Box 1
      </p>
    </div>
  );
}

function ThemedBox2() {
  const theme = useThemeValues();

  return (
    <div
      style={{
        height: 120,
        width: 120,
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <p
        style={{
          color: theme === "light" ? "#333" : "#fff",
        }}
      >
        Themed Box 2
      </p>
    </div>
  );
}

function ThemedBox3() {
  const theme = useThemeValues();

  return (
    <div
      style={{
        height: 120,
        width: 120,
        backgroundColor: theme === "light" ? "#fff" : "#333",
      }}
    >
      <p
        style={{
          color: theme === "light" ? "#333" : "#fff",
        }}
      >
        Themed Box 3
      </p>
    </div>
  );
}
```

We have defined multiple themed component that use `useThemeValues` ook to show the theme.
While we also have an option to change the theme to either "dark" or "light" mode using `ThemeOption` component.

For an keen observer, one could notice that there is a `ThemeLess` component that doesn't use theme at all and yet upon changing the `theme` via `ThemeOption` component, it gets re-rendered.

For a simple component, the re-render would be inexpensive, but one could imagine nested component structures, where one re-render could lead to slow UI interactions.

Let's create context in such a way that we do not re-render the `ThemeLess` component.

```jsx
// super-theme.jsx
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
```

And we could simply change the imports in the App.tsx file to

```

```
