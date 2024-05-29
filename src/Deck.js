import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck, deleteDeck, deleteCard } from "./utils/api";

function Deck() {
  const { deckId } = useParams(); // Get the deckId from the URL parameters
  const navigate = useNavigate(); // Hook for navigation
  const [deck, setDeck] = useState(null); // State to hold the deck information

  // Load the deck from the API when the component mounts or deckId changes
  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck);
    };

    loadDeck();
  }, [deckId]);

  // Handle the deletion of the deck
  const handleDeleteDeck = async () => {
    const confirmed = window.confirm(
      "Delete this deck? You will not be able to recover it."
    );
    if (confirmed) {
      await deleteDeck(deckId);
      navigate("/"); // Navigate back to home after deletion
    }
  };

  // Handle the deletion of a card
  const handleDeleteCard = async (cardId) => {
    const confirmed = window.confirm(
      "Delete this card? You will not be able to recover it."
    );
    if (confirmed) {
      await deleteCard(cardId);
      setDeck((prevDeck) => ({
        ...prevDeck,
        cards: prevDeck.cards.filter((card) => card.id !== cardId), // Remove the deleted card from the state
      }));
    }
  };

  // Show loading message while the deck is being fetched
  if (!deck) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            {deck.name}
          </li>
        </ol>
      </nav>
      <h2>{deck.name}</h2>
      <p>{deck.description}</p>
      <Link to={`/decks/${deck.id}/edit`} className="btn btn-secondary mr-2">
        Edit
      </Link>
      <Link to={`/decks/${deck.id}/study`} className="btn btn-primary mr-2">
        Study
      </Link>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
        Add Card
      </Link>
      <button onClick={handleDeleteDeck} className="btn btn-danger ml-2">
        Delete Deck
      </button>
      <h3>Cards</h3>
      <ul className="list-group">
        {deck.cards.map((card) => (
          <li key={card.id} className="list-group-item">
            <div className="d-flex justify-content-between">
              <div>
                <p>{card.front}</p>
                <p>{card.back}</p>
              </div>
              <div>
                <Link
                  to={`/decks/${deck.id}/cards/${card.id}/edit`}
                  className="btn btn-secondary mr-2"
                >
                  Edit
                </Link>
                <button
                  onClick={() => handleDeleteCard(card.id)}
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

export default Deck;
