import React, { useState } from "react";

export default function AddSectionForm({ addNewSection }) {
  const [title, setTitle] = useState("TITLE");
  function onSubmit(e) {
    e.preventDefault();
    addNewSection(title);
  }
  return (
    <form onSubmit={onSubmit} className="informationFormContainer">
      <label htmlFor="title" className="formRow">
        <div className="labelForm">Title</div>
        <input
          name="title"
          type="text"
          value={title}
          className="inputForm"
          placeholder="title"
          onChange={(e) => setTitle(e.target.value)}
        />
      </label>
      <button type="submit" className="printVisibility">
        add
      </button>
    </form>
  );
}
