import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { readDeck, updateDeck } from "./utils/api";

function EditDeck() {
  const { deckId } = useParams(); // Get the deckId from the URL parameters
  const [deck, setDeck] = useState({ name: "", description: "" }); // State to hold deck information
  const navigate = useNavigate(); // Hook for navigation

  // Load the deck from the API when the component mounts or deckId changes
  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };

    loadDeck();
  }, [deckId]);

  // Handle form submission to update the deck
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateDeck(deck);
    navigate(`/decks/${deck.id}`); // Navigate to the deck view after updating
  };

  return (
    <div>
      <h2>Edit Deck</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            className="form-control"
            id="name"
            value={deck.name}
            onChange={(e) => setDeck({ ...deck, name: e.target.value })}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            className="form-control"
            id="description"
            value={deck.description}
            onChange={(e) => setDeck({ ...deck, description: e.target.value })}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <button
          type="button"
          onClick={() => navigate(`/decks/${deck.id}`)}
          className="btn btn-secondary ml-2"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

export default EditDeck;
