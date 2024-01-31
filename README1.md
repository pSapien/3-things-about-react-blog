3 Things you didn't know about react

1. forget about `forwardRef`, use this instead

So, you've been tossing around forwardRef like it's confetti at a party, just like this.

```jsx
function App() {
  const buttonRef = useRef();
  return <FancyButton ref={buttonRef} />;
}

function Button(props, ref) {
  return (
    <button ref={ref} className="FancyButton">
      {props.children}
    </button>
  );
}

const FancyButton = React.forwardRef(Button);
```

What if I say, there is a neater way to handle this without the `forwardRef` shenangins.
Rather than treating `ref` as special, we could pass it just like a `prop`

```jsx
function App() {
  const buttonRef = useRef();
  return <Button propRef={buttonRef} />;
}

function Button(props) {
  return (
    <button ref={props.propRef} className="FancyButton">
      {props.children}
    </button>
  );
}
```

2. A key to reset the child

Resetting a child component may feel like a trip to Mordor, a lot of dark turns and hoops along the way

```jsx
function App() {
  const [resetCount, setResetCount] = useState(0);

  return (
    <main>
      <LoginForm shouldReset={resetCount > 0} />
      <button onClick={() => setResetCount((r) => r + 1)}>Reset</button>
    </main>
  );
}

function LoginForm({ shouldReset }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    /*** submitted logic here */
  }

  useEffect(() => {
    if (shouldReset) {
      setEmail("");
      setPassword("");
    }
  }, [shouldReset]);

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      <label>
        Email:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

But what if I told you that there's a key that could make it a breeze. A key to rule them all.

```jsx
function App() {
  const [resetCount, setResetCount] = useState(0);

  return (
    <main>
      <LoginForm key={resetCount} />
      <button onClick={() => setResetCount((r) => r + 1)}>Reset</button>
    </main>
  );
}

function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSubmit(e) {
    /*** submitted logic here */
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Email:
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
      </label>

      <label>
        Email:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
      </label>
      <button type="submit">Submit</button>
    </form>
  );
}
```

We basically told react to use a fresh instance of the component, whenever the key is changed, thus resetting all it's effect and internal state

3. Batch the updates, will you?

So, you are writing some React code, and one day your app becomes a giant mess of multiple `setState` calls causing massive performance hits and you wonder what lead you to this.

```jsx
import React from "react";

function App() {
  const [data, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleApiCall() {
    setIsLoading(true);
    const data = await apiCall();
    setData(data);
    setIsLoading(false);
  }

  return; // UI
}
```

One way to resolve this would be use an object that keeps the value of the state.

```jsx
import React from "react";

function App() {
  const [state, setState] = useState({ isLoading: false, data: null });

  async function handleApiCall() {
    setState({ isLoading: true, data: null });
    const data = await apiCall();
    setState({ data, isLoading: false });
  }

  return; // UI
}
```

But what if I told you we could use a magic wand to cure you from your identity crisis.
Not a magic wand, but a function aptly named `unstable_batchedUpdates`.

```jsx
import React from "react";
import { unstable_batchedUpdates } from "react-native";
// import { unstable_batchedUpdates } from "react-dom";

function App() {
  const [data, setApiData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleApiCall() {
    setIsLoading(true);
    const data = await apiCall();

    ReactNative.unstable_batchedUpdates(() => {
      setData(data);
      setIsLoading(false);
    });
  }

  return; // UI
}
```

Although the example sounds trivial, `unstable_batchUpdates` is secret code of order for library authors.
So, please, do keep it a secret.
