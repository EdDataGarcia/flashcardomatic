import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { readDeck } from "./utils/api";

function StudyDeck() {
  const { deckId } = useParams(); // Getting the deckId from the URL parameters
  const [deck, setDeck] = useState({}); // State to store the current deck
  const [cards, setCards] = useState([]); // State to store the cards of the current deck
  const [currentCard, setCurrentCard] = useState({}); // State to store the current card being displayed
  const [isFlipped, setIsFlipped] = useState(false); // State to track whether the card is flipped or not
  const navigate = useNavigate(); // For programmatically navigating

  // Fetching the deck details and setting the initial card
  useEffect(() => {
    const loadDeck = async () => {
      try {
        const fetchedDeck = await readDeck(deckId);
        setDeck(fetchedDeck); // Setting the fetched deck in the state
        setCards(fetchedDeck.cards); // Setting the cards of the fetched deck in the state
        setCurrentCard(fetchedDeck.cards[0]); // Setting the first card of the deck as the current card
      } catch (error) {
        console.error(error.message);
      }
    };
    loadDeck();
  }, [deckId]);

  // Handling the flip button click to toggle between front and back of the card
  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  // Handling the next button click to go to the next card
  const handleNext = () => {
    const currentIndex = cards.indexOf(currentCard);
    if (cards[currentIndex + 1]) {
      setCurrentCard(cards[currentIndex + 1]); // Setting the next card as the current card
      setIsFlipped(false); // Resetting the flip state
    } else {
      if (
        window.confirm(
          "Restart cards? Click cancel to return to the home page."
        )
      ) {
        setCurrentCard(cards[0]); // Restarting from the first card
        setIsFlipped(false); // Resetting the flip state
      } else {
        navigate("/"); // Navigating to the home page
      }
    }
  };

  if (!deck || !deck.cards) {
    return <p>Loading...</p>; // Show loading message while deck is being fetched
  }

  const cardsLength = cards.length; // Storing the length of the cards array

  // JSX for when there are not enough cards
  const notEnoughCards = (
    <div>
      <h2>Not enough cards.</h2>
      <p>
        You need at least 3 cards to study. This deck only has {cardsLength}{" "}
        cards.
      </p>
      <Link to={`/decks/${deck.id}/cards/new`} className="btn btn-primary">
        Add Cards
      </Link>
    </div>
  );

  // JSX for the breadcrumb navigation bar
  const navBar = (
    <nav aria-label="breadcrumb">
      <ol className="breadcrumb">
        <li className="breadcrumb-item">
          <Link to="/">Home</Link>
        </li>
        <li className="breadcrumb-item">
          <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
        </li>
        <li className="breadcrumb-item active" aria-current="page">
          Study
        </li>
      </ol>
    </nav>
  );

  return (
    <div>
      {navBar}
      <h2>Study: {deck.name}</h2>
      {cardsLength < 3 ? (
        notEnoughCards
      ) : (
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">
              Card {cards.indexOf(currentCard) + 1} of {cardsLength}
            </h5>
            <p className="card-text">
              {isFlipped ? currentCard.back : currentCard.front}
            </p>
            <button onClick={handleFlip} className="btn btn-secondary mr-2">
              Flip
            </button>
            {isFlipped && (
              <button onClick={handleNext} className="btn btn-primary">
                Next
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default StudyDeck;
