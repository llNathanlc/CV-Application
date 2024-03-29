import React, { useState } from "react";
import AddInformation from "../display/addInformation";
import BulletPoints from "../display/bulletPoints";
import { v4 as uuidv4 } from "uuid";

export default function AddForm({ addNewInformation }) {
  const [name, setName] = useState("Name");
  const [date, setDate] = useState("Date");
  const [information, setInformation] = useState("Information");
  const [place, setPlace] = useState("Place");
  const [bulletPoints, setBulletPoints] = useState([]);

  function onSubmit(e) {
    e.preventDefault();

    addNewInformation(uuidv4(), name, date, information, place, bulletPoints);
  }
  return (
    <form onSubmit={onSubmit} className="informationFormContainer">
      <label htmlFor="name" className="formRow">
        <div className="labelForm">Name</div>
        <input
          name="name"
          type="text"
          value={name}
          className="inputForm"
          placeholder="name"
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <label htmlFor="date" className="formRow">
        <div className="labelForm">Date</div>
        <input
          name="date"
          type="text"
          value={date}
          className="inputForm"
          placeholder="date"
          onChange={(e) => setDate(e.target.value)}
        />
      </label>
      <label htmlFor="information" className="formRow">
        <div className="labelForm">Information</div>
        <input
          name="information"
          type="text"
          value={information}
          className="inputForm"
          placeholder="information"
          onChange={(e) => setInformation(e.target.value)}
        />
      </label>
      <label htmlFor="place" className="formRow">
        <div className="labelForm">Place</div>
        <input
          name="place"
          type="text"
          value={place}
          className="inputForm"
          placeholder="place"
          onChange={(e) => setPlace(e.target.value)}
        />
      </label>
      <BulletPoints
        bulletPoints={bulletPoints}
        onChangeBulletPoints={(e) => setBulletPoints(e)}
      />
      <button type="submit" className="printVisibility">
        add
      </button>
    </form>
  );
}
