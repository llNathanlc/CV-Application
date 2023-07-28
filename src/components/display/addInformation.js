import React, { useState, useEffect } from "react";
import BackdropLayout from "../layouts/backdropLayout";
import Card from "./card";
import EditForm from "../inputs/editForm";
import BulletPoints from "./bulletPoints";
import "./addInformation.css";
import changeWidthDinamically from "../utils/functions";

export default function AddInformation({
  id,
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

  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(`cvState-${id}`)) || {
      newName: newName,
      newDate: newDate,
      newInformation: newInformation,
      newPlace: newPlace,
      newBulletPoints: newBulletPoints,
      newBulletPointsCounter: newBulletPointsCounter,
      visibility: "hidden",
    }
  );

  // Save to local storage whenever state changes
  useEffect(() => {
    localStorage.setItem(`cvState-${id}`, JSON.stringify(state));
  }, [state, id]);

  const [newBulletPointsCounter, setNewBulletPointsCounter] =
    useState(bulletPointsCounter);

  const [visibility, setVisibility] = useState("hidden");

  function changeName(newNameAdd) {
    setState((prevState) => ({ ...prevState, newName: newNameAdd }));
    setNewName(newNameAdd);
  }
  function changeDate(newDateAdd) {
    setState((prevState) => ({ ...prevState, newDate: newDateAdd }));
    setNewDate(newDateAdd);
  }
  function changeInformation(newInformationAdd) {
    setState((prevState) => ({
      ...prevState,
      newInformation: newInformationAdd,
    }));
    setNewInformation(newInformationAdd);
  }
  function changePlace(newPlaceAdd) {
    setState((prevState) => ({ ...prevState, newPlace: newPlaceAdd }));
    setNewPlace(newPlaceAdd);
  }
  function onChangeBulletPoints(newBulletPointsAdd) {
    setState((prevState) => ({
      ...prevState,
      newBulletPoints: newBulletPointsAdd,
    }));
    setNewBulletPoints(newBulletPointsAdd);
  }
  function onChangeBulletPointsCounter(newBulletPointsCounterAdd) {
    setState((prevState) => ({
      ...prevState,
      newBulletPointsCounter: newBulletPointsCounterAdd,
    }));
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
              value={state.newName}
              style={{ width: (state.newName.length + 1) * 8 }}
              onChange={(e) => {
                changeWidthDinamically(e);
                changeName(e.target.value);
              }}
            />
          </label>
          <label htmlFor="date" style={{ justifySelf: "end" }}>
            <input
              className="input-Information cursiveText-Information rightSideInput-Information"
              type="text"
              name="date"
              style={{ width: (state.newDate.length + 1) * 8 }}
              value={state.newDate}
              onChange={(e) => {
                changeWidthDinamically(e);
                changeDate(e.target.value);
              }}
            />
          </label>
          <label htmlFor="information">
            <input
              className="input-Information cursiveText-Information"
              type="text"
              name="information"
              style={{ width: (state.newInformation.length + 1) * 8 }}
              value={state.newInformation}
              onChange={(e) => {
                changeWidthDinamically(e);
                changeInformation(e.target.value);
              }}
            />
          </label>
          <label htmlFor="place" style={{ justifySelf: "end" }}>
            <input
              className="input-Information rightSideInput-Information"
              type="text"
              name="place"
              style={{ width: (state.newPlace.length + 1) * 8 }}
              value={state.newPlace}
              onChange={(e) => {
                changeWidthDinamically(e);
                changePlace(e.target.value);
              }}
            />
          </label>
          <BackdropLayout type="edit" buttonVisibility={visibility}>
            {" "}
            <Card>
              <EditForm
                name={state.newName}
                changeName={(e) => changeName(e)}
                date={state.newDate}
                changeDate={(e) => changeDate(e)}
                information={state.newInformation}
                changeInformation={(e) => changeInformation(e)}
                place={state.newPlace}
                changePlace={(e) => changePlace(e)}
                bulletPoints={state.newBulletPoints}
                onChangeBulletPoints={(e) => onChangeBulletPoints(e)}
                bulletPointsCounter={state.newBulletPointsCounter}
                onChangeBulletPointsCounter={(e) =>
                  onChangeBulletPointsCounter(e)
                }
              />
            </Card>
          </BackdropLayout>
        </div>
        <BulletPoints
          bulletPoints={state.newBulletPoints}
          onChangeBulletPoints={(e) => onChangeBulletPoints(e)}
          visibility={visibility}
          counter={state.newBulletPointsCounter}
          onChangeBulletPointsCounter={(e) => onChangeBulletPointsCounter(e)}
        />
      </div>
    </>
  );
}
