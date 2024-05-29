// src/Layout/index.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import Home from "../Home";
import Deck from "../Deck";
import CreateDeck from "../CreateDeck";
import EditDeck from "../EditDeck";
import StudyDeck from "../StudyDeck";
import AddCard from "../AddCard";
import EditCard from "../EditCard";

function Layout() {
  return (
    <>
      <Header />
      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/decks/new" element={<CreateDeck />} />
          <Route path="/decks/:deckId" element={<Deck />} />
          <Route path="/decks/:deckId/edit" element={<EditDeck />} />
          <Route path="/decks/:deckId/study" element={<StudyDeck />} />
          <Route path="/decks/:deckId/cards/new" element={<AddCard />} />
          <Route
            path="/decks/:deckId/cards/:cardId/edit"
            element={<EditCard />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
