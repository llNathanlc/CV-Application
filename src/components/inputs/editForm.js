import React, { useState } from "react";
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
}) {
  const [newName, setNewName] = useState(name);
  const [newDate, setNewDate] = useState(date);
  const [newInformation, setNewInformation] = useState(information);
  const [newPlace, setNewPlace] = useState(place);



  function onSubmit(e) {
    e.preventDefault();
    changeName(newName);
    changeDate(newDate);
    changeInformation(newInformation);
    changePlace(newPlace);
  }

  return (
      <form onSubmit={onSubmit} className="informationFormContainer">
        <label htmlFor="name">
          Name:
          <input
            name="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <label htmlFor="date">
          Date:
          <input
            name="date"
            type="text"
            value={newDate}
            onChange={(e) => setNewDate(e.target.value)}
          />
        </label>
        <label htmlFor="information">
          Information:
          <input
            name="information"
            type="text"
            value={newInformation}
            onChange={(e) => setNewInformation(e.target.value)}
          />
        </label>
        <label htmlFor="place">
          Place:
          <input
            name="place"
            type="text"
            value={newPlace}
            onChange={(e) => setNewPlace(e.target.value)}
          />
        </label>
        <BulletPoints  />
        <button type="submit" >change</button>
      </form>
  );
}
