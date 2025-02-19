import { useState } from "react";


export default function App() {

  const [items, setItems] = useState([])

  function handleAddItems(item) {
    setItems(currentItems => [...currentItems, item])
  }
  function handleDeleteItem(id) {
    setItems(currentItems => currentItems.filter(item => item.id !== id))
  }

  function handleToggleItem(id) {
    setItems(currentItems => currentItems.map(item => item.id === id ? { ...item, packed: !item.packed } : item))
  }

  function handleClearList() {
    const confirmed = window.confirm("Are you sure you want to delete all items?")

    if (confirmed) setItems([])
  }
  return (
    <div className="app">
      <Logo />
      <Form handleAddItems={handleAddItems} />
      <PackingList items={items} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} handleClearList={handleClearList} />
      <Stats items={items} />
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

function PackingList({ items, handleDeleteItem, handleToggleItem, handleClearList }) {

  const [sortBy, setSortBy] = useState("input")

  let sortedItems;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "description") sortedItems = items.slice().sort((a, b) => a.description.localeCompare(b.description))
  if (sortBy === "packed") sortedItems = items.slice().sort((a, b) => Number(a.packed) - Number(b.packed))

  return <div className="list">
    <ul>{sortedItems.map((item) => (<Item item={item} key={item.id} handleDeleteItem={handleDeleteItem} handleToggleItem={handleToggleItem} />))}</ul>
    <div className="actions">
      <select value={sortBy} onChange={event => setSortBy(event.target.value)}>
        <option value="input">Sort by Input order</option>
        <option value="description">Sort by description</option>
        <option value="packed">Sort by packed status</option>
      </select>
      <button onClick={handleClearList}>Clear List</button>
    </div>
  </div>
}

function Item({ item, handleDeleteItem, handleToggleItem }) {
  return < li>
    <input type="checkbox" onChange={() => handleToggleItem(item.id)} />
    <span style={item.packed ? { textDecoration: "line-through" } : {}}>{item.quantity} {item.description}</span>
    <button onClick={() => handleDeleteItem(item.id)}>❌</button>
  </li>;
}

function Stats({ items }) {
  if (!items.length)
    return (
      <p className="stats">
        Start adding some items to your packing list 🪄
      </p>
    );

  const numOfItems = items.length
  const numOfPackedItems = items.filter(item => item.packed === true).length
  const percentage = Math.round(numOfPackedItems / numOfItems * 100)

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ?
          "You got everything! Ready to go ✈" :
          `You have ${numOfItems} items on your list, and you already packed ${numOfPackedItems} (${percentage}%)`}
      </em>
    </footer>
  )
}