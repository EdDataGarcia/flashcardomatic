import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck } from "./utils/api";

// Component for creating a new deck
function CreateDeck() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  // Handles form submission to create a new deck
  const handleSubmit = async (event) => {
    event.preventDefault();
    const newDeck = { name, description };
    const createdDeck = await createDeck(newDeck);
    navigate(`/decks/${createdDeck.id}`);
  };

  return (
    <div>
      <h2>Create Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="btn btn-secondary ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default CreateDeck;
