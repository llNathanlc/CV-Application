import React, { useState } from "react";
import AddInformation from "../display/addInformation";
import BulletPoints from "../display/bulletPoints";

export default function AddForm({ addNewInformation }) {
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [information, setInformation] = useState("");
  const [place, setPlace] = useState("");
  const [bulletPoints, setBulletPoints] = useState([]);
  const [bulletPointsCounter, setBulletPointsCounter] = useState(0);

  function onSubmit(e) {
    e.preventDefault();

    addNewInformation(
      <AddInformation
        name={name}
        date={date}
        information={information}
        place={place}
        bulletPoints={bulletPoints}
        bulletPointsCounter={bulletPointsCounter}
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
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="date">
        Date:
        <input
          name="date"
          type="text"
          value={date}
          placeholder="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label htmlFor="information">
        Information:
        <input
          name="information"
          type="text"
          value={information}
          placeholder="information"
          onChange={(e) => setInformation(e.target.value)}
        />
      </label>
      <label htmlFor="place">
        Place:
        <input
          name="place"
          type="text"
          value={place}
          placeholder="place"
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>
      <BulletPoints
        onChangeBulletPoints={(e) => setBulletPoints(e)}
        counter={bulletPointsCounter}
        onChangeBulletPointsCounter={(e) => setBulletPointsCounter(e)}
      />
      <button type="submit" className="printVisibility">
        add
      </button>
    </form>
  );
}
