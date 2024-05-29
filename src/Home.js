import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks, deleteDeck } from "./utils/api";

function Home() {
  const [decks, setDecks] = useState([]); // State to hold the list of decks

  // Load the decks from the API when the component mounts
  useEffect(() => {
    const loadDecks = async () => {
      const fetchedDecks = await listDecks();
      setDecks(fetchedDecks);
    };

    loadDecks();
  }, []);

  // Handle the deletion of a deck
  const handleDelete = async (deckId) => {
    const confirmed = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmed) {
      await deleteDeck(deckId);
      setDecks((prevDecks) => prevDecks.filter((deck) => deck.id !== deckId)); // Remove the deleted deck from the state
    }
  };

  return (
    <div>
      <Link to="/decks/new" className="btn btn-primary mb-2">
        Create Deck
      </Link>
      <ul className="list-group">
        {decks.map((deck) => (
          <li key={deck.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <h3>{deck.name}</h3>
                <p>{deck.cards.length} cards</p>
              </div>
              <div>
                <Link
                  to={`/decks/${deck.id}/study`}
                  className="btn btn-secondary mr-2"
                >
                  Study
                </Link>
                <Link
                  to={`/decks/${deck.id}`}
                  className="btn btn-secondary mr-2"
                >
                  View
                </Link>
                <button
                  onClick={() => handleDelete(deck.id)}
                  className="btn btn-danger"
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Home;
