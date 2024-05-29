import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, readCard, updateCard } from "./utils/api";
import CardForm from "./CardForm"; // Importing the reusable CardForm component

function EditCard() {
  const { deckId, cardId } = useParams(); // Getting deckId and cardId from URL parameters
  const [deck, setDeck] = useState(null); // State to store the current deck
  const [card, setCard] = useState({ front: "", back: "" }); // State to store the current card details
  const navigate = useNavigate(); // For programmatically navigating

  // Fetching the deck and card details using deckId and cardId
  useEffect(() => {
    const loadDeckAndCard = async () => {
      const fetchedDeck = await readDeck(deckId);
      const fetchedCard = await readCard(cardId);
      setDeck(fetchedDeck); // Setting the fetched deck in the state
      setCard(fetchedCard); // Setting the fetched card in the state
    };

    loadDeckAndCard();
  }, [deckId, cardId]);

  // Handling changes in the form fields
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value, // Updating the card state based on the form input
    });
  };

  // Handling form submission to update the card
  const handleSubmit = async (event) => {
    event.preventDefault();
    await updateCard(card); // Updating the card using the API
    navigate(`/decks/${deck.id}`); // Navigating back to the deck page
  };

  // Handling the cancel button to navigate back to the deck page
  const handleCancel = () => {
    navigate(`/decks/${deck.id}`);
  };

  if (!deck || !card.id) {
    return <p>Loading...</p>; // Show loading message while deck and card are being fetched
  }

  return (
    <div>
      <nav aria-label="breadcrumb">
        <ol className="breadcrumb">
          <li className="breadcrumb-item">
            <Link to="/">Home</Link>
          </li>
          <li className="breadcrumb-item">
            <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
          </li>
          <li className="breadcrumb-item active" aria-current="page">
            Edit Card {card.id}
          </li>
        </ol>
      </nav>
      <h2>Edit Card</h2>
      {/* Using the reusable CardForm component */}
      <CardForm
        card={card}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        handleCancel={handleCancel}
      />
    </div>
  );
}

export default EditCard;
