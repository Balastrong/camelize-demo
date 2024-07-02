import { useState } from "react";
import { httpClient } from "./httpClient";
import { Item } from "./schema";

function App() {
  const [item, setItem] = useState<Item>();

  const readItem = async () => {
    const newItem = await httpClient.getItem();
    setItem(newItem);
  };

  const updateItem = () => {
    if (!item) return;
    setItem(undefined);
    httpClient.postItem({ ...item, itemId: item.itemId + 1 });
  };

  const reset = () => {
    setItem(undefined);
  };

  return (
    <>
      <button onClick={readItem}>GET</button>
      <button onClick={updateItem}>POST</button>
      <button onClick={reset}>RESET</button>
      <pre>{JSON.stringify(item, null, 2)}</pre>
    </>
  );
}

export default App;
