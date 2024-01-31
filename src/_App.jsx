import React, { useEffect, useState } from "react";
import { unstable_batchedUpdates } from "react-dom";

async function delay(num) {
  return new Promise((resolve) => setTimeout(resolve, num));
}

async function apiCall() {
  await delay(200);
  return [];
}

export function App() {
  const [counter1, setCounter1] = useState(0);
  const [counter2, setCounter2] = useState(0);
  const [renderCount, setRenderCount] = useState(0);

  async function handleUpdate() {
    await apiCall(100);
    setCounter1(counter1 + 1);
    setCounter2(counter2 + 1);
  }

  async function handleBatchUpdate() {
    await apiCall(100);
    unstable_batchedUpdates(async () => {
      setCounter1(counter1 + 1);
      setCounter2(counter2 + 1);
    });
  }

  return (
    <main>
      <p>State 1: {counter1}</p>
      <p>State 2: {counter2}</p>
      <p>Render Count: {renderCount}</p>
      <button onClick={handleUpdate}>Normal Update</button>
      <button onClick={handleBatchUpdate}>Batch Update</button>
    </main>
  );
}
