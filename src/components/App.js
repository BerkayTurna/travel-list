import { useState } from "react";
import { Logo } from "./Logo";
import { Form } from "./Form";
import { PackingList } from "./PackingList";
import { Stats } from "./Stats";


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

