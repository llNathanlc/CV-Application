import React, { useState, useEffect } from "react";
import BulletPoints from "../display/bulletPoints";
import "./forms.css";

export default function EditForm({
  name,
  changeName,
  date,
  changeDate,
  information,
  changeInformation,
  place,
  changePlace,
  bulletPoints,
  onChangeBulletPoints,
}) {
  const [newName, setNewName] = useState(name);
  const [newDate, setNewDate] = useState(date);
  const [newInformation, setNewInformation] = useState(information);
  const [newPlace, setNewPlace] = useState(place);
  const [newBulletPoints, setNewBulletPoints] = useState(bulletPoints);

  function onSubmit(e) {
    e.preventDefault();
    changeName(newName);
    changeDate(newDate);
    changeInformation(newInformation);
    changePlace(newPlace);
    onChangeBulletPoints(newBulletPoints);
  }

  return (
    <form onSubmit={onSubmit} className="informationFormContainer">
      <label htmlFor="name" className="formRow">
        <div className="labelForm">Name</div>
        <input
          name="name"
          type="text"
          value={newName}
          className="inputForm"
          onChange={(e) => setNewName(e.target.value)}
        />
      </label>
      <label htmlFor="date" className="formRow">
        <div className="labelForm">Date</div>
        <input
          name="date"
          type="text"
          value={newDate}
          className="inputForm"
          onChange={(e) => setNewDate(e.target.value)}
        />
      </label>
      <label htmlFor="information" className="formRow">
        <div className="labelForm">Information</div>
        <input
          name="information"
          type="text"
          value={newInformation}
          className="inputForm"
          onChange={(e) => setNewInformation(e.target.value)}
        />
      </label>
      <label htmlFor="place" className="formRow">
        <div className="labelForm">Place</div>
        <input
          name="place"
          type="text"
          value={newPlace}
          className="inputForm"
          onChange={(e) => setNewPlace(e.target.value)}
        />
      </label>
      <BulletPoints
        bulletPoints={newBulletPoints}
        onChangeBulletPoints={(e) => setNewBulletPoints(e)}
        visibility={"visible"}
      />
      <button type="submit" className="changeButton-EditForm">
        change
      </button>
    </form>
  );
}
