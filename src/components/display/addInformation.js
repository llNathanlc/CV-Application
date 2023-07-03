import React, { useState, useEffect } from "react";
import BackdropLayout from "../layouts/backdropLayout";
import Card from "./card";
import EditForm from "../inputs/editForm";
import BulletPoints from "./bulletPoints";
import "./addInformation.css";
import changeWidthDinamically from "../utils/functions";

export default function AddInformation({
  name,
  date,
  information,
  place,
  bulletPoints,
  bulletPointsCounter,
}) {
  const [newName, setNewName] = useState(name);
  const [newDate, setNewDate] = useState(date);
  const [newInformation, setNewInformation] = useState(information);
  const [newPlace, setNewPlace] = useState(place);
  const [newBulletPoints, setNewBulletPoints] = useState(bulletPoints);

  const [newBulletPointsCounter, setNewBulletPointsCounter] =
    useState(bulletPointsCounter);

  const [visibility, setVisibility] = useState("hidden");

  function changeName(newNameAdd) {
    setNewName(newNameAdd);
  }
  function changeDate(newDateAdd) {
    setNewDate(newDateAdd);
  }
  function changeInformation(newInformationAdd) {
    setNewInformation(newInformationAdd);
  }
  function changePlace(newPlaceAdd) {
    setNewPlace(newPlaceAdd);
  }
  function onChangeBulletPoints(newBulletPointsAdd) {
    setNewBulletPoints(newBulletPointsAdd);
  }
  function onChangeBulletPointsCounter(newBulletPointsCounterAdd) {
    setNewBulletPointsCounter(newBulletPointsCounterAdd);
  }

  function onMouseEnter() {
    setVisibility("visible");
  }
  function onMouseLeave() {
    setVisibility("hidden");
  }
  return (
    <>
      <div
        className="gridContainer"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <div className="add-InformationGrid">
          <label htmlFor="name">
            <input
              className="input-Information nameSection"
              type="text"
              name="name"
              value={newName}
              style={{ width: (newName.length + 1) * 8 }}
              onChange={(e) => {
                changeWidthDinamically(e);
                setNewName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="date" style={{ justifySelf: "end" }}>
            <input
              className="input-Information cursiveText-Information rightSideInput-Information"
              type="text"
              name="date"
              style={{ width: (newDate.length + 1) * 8 }}
              value={newDate}
              onChange={(e) => {
                changeWidthDinamically(e);
                setNewDate(e.target.value);
              }}
            />
          </label>
          <label htmlFor="information">
            <input
              className="input-Information cursiveText-Information"
              type="text"
              name="information"
              style={{ width: (newInformation.length + 1) * 8 }}
              value={newInformation}
              onChange={(e) => {
                changeWidthDinamically(e);
                setNewInformation(e.target.value);
              }}
            />
          </label>
          <label htmlFor="place" style={{ justifySelf: "end" }}>
            <input
              className="input-Information rightSideInput-Information"
              type="text"
              name="place"
              style={{ width: (newPlace.length + 1) * 8 }}
              value={newPlace}
              onChange={(e) => {
                changeWidthDinamically(e);
                setNewPlace(e.target.value);
              }}
            />
          </label>
          <BackdropLayout type="edit" buttonVisibility={visibility}>
            {" "}
            <Card>
              <EditForm
                name={newName}
                changeName={(e) => changeName(e)}
                date={newDate}
                changeDate={(e) => changeDate(e)}
                information={newInformation}
                changeInformation={(e) => changeInformation(e)}
                place={newPlace}
                changePlace={(e) => changePlace(e)}
                bulletPoints={newBulletPoints}
                onChangeBulletPoints={(e) => onChangeBulletPoints(e)}
                bulletPointsCounter={newBulletPointsCounter}
                onChangeBulletPointsCounter={(e) =>
                  setNewBulletPointsCounter(e)
                }
              />
            </Card>
          </BackdropLayout>
        </div>
        <BulletPoints
          bulletPoints={newBulletPoints}
          onChangeBulletPoints={(e) => onChangeBulletPoints(e)}
          visibility={visibility}
          counter={newBulletPointsCounter}
          onChangeBulletPointsCounter={(e) => onChangeBulletPointsCounter(e)}
        />
      </div>
    </>
  );
}
