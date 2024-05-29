import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck, createCard } from "./utils/api";
import CardForm from "./CardForm"; // Importing the reusable CardForm component

function AddCard() {
  const { deckId } = useParams(); // Getting the deckId from the URL parameters
  const [deck, setDeck] = useState(null); // State to store the current deck
  const [card, setCard] = useState({ front: "", back: "" }); // State to store the new card details
  const navigate = useNavigate(); // For programmatically navigating

  // Fetching the deck details using the deckId
  useEffect(() => {
    const loadDeck = async () => {
      const fetchedDeck = await readDeck(deckId);
      setDeck(fetchedDeck); // Setting the fetched deck in the state
    };

    loadDeck();
  }, [deckId]);

  // Handling changes in the form fields
  const handleChange = ({ target }) => {
    setCard({
      ...card,
      [target.name]: target.value, // Updating the card state based on the form input
    });
  };

  // Handling form submission to create a new card
  const handleSubmit = async (event) => {
    event.preventDefault();
    await createCard(deckId, card); // Creating the card using the API
    setCard({ front: "", back: "" }); // Resetting the form fields after submission
  };

  // Handling the cancel button to navigate back to the deck page
  const handleCancel = () => {
    navigate(`/decks/${deckId}`);
  };

  if (!deck) {
    return <p>Loading...</p>; // Show loading message while deck is being fetched
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
            Add Card
          </li>
        </ol>
      </nav>
      <h2>Add Card</h2>
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

export default AddCard;
