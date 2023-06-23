import React, { useState } from "react";
import AddInformation from "../display/addInformation";
import BulletPoints from "../display/bulletPoints";

export default function AddForm({ addNewInformation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [information, setInformation] = useState("");
  const [place, setPlace] = useState("");


  function onSubmit(e) {
    e.preventDefault();

    addNewInformation(
      <AddInformation
        name={name}
        date={date}
        information={information}
        place={place}
      />
    );
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">
        Name:
        <input
          name="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="date">
        Date:
        <input
          name="date"
          type="text"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label htmlFor="information">
        Information:
        <input
          name="information"
          type="text"
          value={information}
          onChange={(e) => setInformation(e.target.value)}
        />
      </label>
      <label htmlFor="place">
        Place:
        <input
          name="place"
          type="text"
          value={place}
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>
      <BulletPoints />
      <button type="submit" className="printVisibility">add</button>
    </form>
  );
}
