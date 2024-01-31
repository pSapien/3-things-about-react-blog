import { ThemeProvider, useThemeChange, useThemeValues } from "./basic-context";
// import { ThemeProvider, useThemeChange, useThemeValues } from "./super-context";

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
  // const reRenderCount = useRef(0);
  // reRenderCount.current++;
  console.log("re-render in ThemeLess");

  return (
    <div
      style={{
        height: 120,
        width: 120,
        background: "#333",
      }}
    >
      <p style={{ color: "white" }}>Themed Less Box Render Count</p>
    </div>
  );
}

function ThemeOption() {
  const onChangeTheme = useThemeChange();

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
