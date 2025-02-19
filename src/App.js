import { useState } from "react";


export default function App() {

  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems(currentItems => [...currentItems, item])
  }
  function handleDeleteItem(id) {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🏝️ Far Away 🧳</h1>
}

function Form({ handleAddItems }) {
  const [description, setDescription] = useState("")
  const [quantity, setQuantity] = useState(1)

  function handleSubmit(event) {
    event.preventDefault();
    if (!description) return;

    const newItem = {
      description,
      quantity,
      packed: false,
      id: Date.now()
    };
    console.log(newItem)
    handleAddItems(newItem);
    setDescription("");
    setQuantity(1);
  }
  return <form
    className="add-form"
    onSubmit={handleSubmit}
  >
    <h3>What do you need for your 😍 trip?</h3>
    <select
      value={quantity}
      onChange={(event) => setQuantity(event.target.value)}
    >
      {Array.from({ length: 20 },
        (_, index) => index + 1)
        .map((number) =>
          <option key={number} value={number}>
            {number}
          </option>
        )
      }
    </select>
    <input
      type="text"
      placeholder="Item..."
      value={description}
      onChange={
        (event) => setDescription(event.target.value)
      }
    />
    <button>Add</button>
  </form>
}

function PackingList({ items, handleDeleteItem }) {
  return <div className="list">
    <ul>{items.map((item) => (<Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} />))}</ul>
  </div>
}

function Item({ item, handleDeleteItem }) {
  return < li>
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => handleDeleteItem(item.id)}>❌</button>
  </li>;
}

function Stats() {
  return (
    <footer className="stats">
      <em>You have X items on your list, and you already packed Y (x%)</em>
    </footer>
  )
}