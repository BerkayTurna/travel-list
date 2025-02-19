import { useState } from "react";

export function Form({ handleAddItems }) {
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState(1);

    function handleSubmit(event) {
        event.preventDefault();
        if (!description) return;

        const newItem = {
            description,
            quantity,
            packed: false,
            id: Date.now()
        };
        console.log(newItem);
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
                .map((number) => <option key={number} value={number}>
                    {number}
                </option>
                )}
        </select>
        <input
            type="text"
            placeholder="Item..."
            value={description}
            onChange={(event) => setDescription(event.target.value)} />
        <button>Add</button>
    </form>;
}
