import React, { useState, useEffect } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import InformationForm from "../inputs/informationForm";
import changeWidthDinamically from "../utils/functions";

function Information({ provided }) {
  const [name, setName] = useState("Jake Ryan");
  const [tlfNumber, setTlfNumber] = useState("123 456 789");
  const [email, setEmail] = useState("jake@su.edu");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/jake");
  const [github, setGithub] = useState("github.com/jake");

  const [visibility, setVisibility] = useState("hidden");

  const [state, setState] = useState(
    JSON.parse(localStorage.getItem("cvState-header")) || {
      newName: name,
      newTlfNumber: tlfNumber,
      newEmail: email,
      newLinkedin: linkedin,
      newGithub: github,
      visibility: "hidden",
    }
  );
  useEffect(() => {
    localStorage.setItem(`cvState-header`, JSON.stringify(state));
  }, [state]);

  function onMouseEnter() {
    setVisibility("visible");
  }
  function onMouseLeave() {
    setVisibility("hidden");
  }

  function changeName(newName) {
    setName(newName);
    setState((prevState) => ({ ...prevState, newName: newName }));
  }
  function changeTlfNumber(newNumber) {
    setTlfNumber(newNumber);
    setState((prevState) => ({ ...prevState, newTlfNumber: newNumber }));
  }
  function changeEmail(newEmail) {
    setEmail(newEmail);
    setState((prevState) => ({ ...prevState, newEmail: newEmail }));
  }
  function changeLinkedin(newLinkedin) {
    setLinkedin(newLinkedin);
    setState((prevState) => ({ ...prevState, newLinkedin: newLinkedin }));
  }
  function changeGithub(newGithub) {
    setGithub(newGithub);
    setState((prevState) => ({ ...prevState, newGithub: newGithub }));
  }

  return (
    <div
      id="Information"
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <label htmlFor="name">
        <input
          name="name"
          className="informationName"
          type="text"
          value={state.newName}
          style={{ width: (state.newName.length + 1) * 20 }}
          onChange={(e) => {
            changeWidthDinamically(e);
            changeName(e.target.value);
          }}
        />
        <BackdropLayout type="edit" buttonVisibility={visibility}>
          <Card>
            <InformationForm
              changeName={(e) => changeName(e)}
              name={state.newName}
              changeTlfNumber={(e) => changeTlfNumber(e)}
              tlfNumber={state.newTlfNumber}
              changeEmail={(e) => changeEmail(e)}
              email={state.newEmail}
              changeLinkedin={(e) => changeLinkedin(e)}
              linkedin={state.newLinkedin}
              changeGithub={(e) => changeGithub(e)}
              github={state.newGithub}
            />
          </Card>
        </BackdropLayout>
      </label>
      <div className="informationDiv">
        <label htmlFor="tlfNumber">
          <input
            name="tlfNumber"
            className="input-Header"
            type="text"
            value={state.newTlfNumber}
            style={{ width: (state.newTlfNumber.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              changeTlfNumber(e.target.value);
            }}
          />
        </label>
        <div>|</div>
        <label htmlFor="email">
          <input
            name="email"
            className="input-Header"
            type="text"
            value={state.newEmail}
            style={{ width: (state.newEmail.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              changeEmail(e.target.value);
            }}
          />
        </label>
        <div>|</div>
        <label htmlFor="linkedin">
          <input
            name="linkedin"
            className="input-Header"
            type="text"
            value={state.newLinkedin}
            style={{ width: (state.newLinkedin.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              changeLinkedin(e.target.value);
            }}
          />
        </label>
        <div>|</div>
        <label htmlFor="github">
          <input
            name="github"
            className="input-Header"
            type="text"
            value={state.newGithub}
            style={{ width: (state.newGithub.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              changeGithub(e.target.value);
            }}
          />
        </label>
      </div>
    </div>
  );
}
export default Information;
