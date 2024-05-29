import React from "react";

// CardForm component for handling both create and edit card functionalities
function CardForm({ card, handleChange, handleSubmit, handleCancel }) {
  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="front">Front</label>
        <textarea
          className="form-control"
          id="front"
          name="front"
          value={card.front}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <div className="form-group">
        <label htmlFor="back">Back</label>
        <textarea
          className="form-control"
          id="back"
          name="back"
          value={card.back}
          onChange={handleChange}
          required
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button
        type="button"
        onClick={handleCancel}
        className="btn btn-secondary ml-2"
      >
        Cancel
      </button>
    </form>
  );
}

export default CardForm;
