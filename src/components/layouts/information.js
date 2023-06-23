import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import InformationForm from "../inputs/informationForm";
import changeWidthDinamically from "../utils/functions"

function Information() {
  const [name, setName] = useState("Jake Ryan");
  const [tlfNumber, setTlfNumber] = useState("123 456 789");
  const [email, setEmail] = useState("jake@su.edu");
  const [linkedin, setLinkedin] = useState("linkedin.com/in/jake");
  const [github, setGithub] = useState("github.com/jake");

  const [showButton, setShowButton] = useState(false);

  function onMouseEnter() {
    setShowButton(true);
  }

  function onMouseLeave(){
    setShowButton(false);
  }

  function changeName(newName) {
    setName(newName);
  }
  function changeTlfNumber(newNumber) {
    setTlfNumber(newNumber);
  }
  function changeEmail(newEmail) {
    setEmail(newEmail);
  }
  function changeLinkedin(newLinkedin) {
    setLinkedin(newLinkedin);
  }
  function changeGithub(newGithub) {
    setGithub(newGithub);
  }


  return (
    <div id="Information" onMouseEnter={onMouseEnter}>
      <label htmlFor="name">
        <input
          name="name"
          className="informationName"
          type="text"
          value={name}
          style={{ width: (name.length + 1) * 20}}
          onChange={(e) => {
            changeWidthDinamically(e);
            setName(e.target.value);
          }}
        />
      </label>
      <div className="informationDiv">
        <label htmlFor="tlfNumber">
          <input
            name="tlfNumber"
            className="inputForm"
            type="text"
            value={tlfNumber}
            style={{ width: (tlfNumber.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              setTlfNumber(e.target.value);
            }}
          />
        </label>
        <div>|</div>
        <label htmlFor="email">
          <input
            name="email"
            className="inputForm"
            type="text"
            value={email}
            style={{ width: (email.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              setEmail(e.target.value);
            }}
          />
        </label>
        <div>|</div>
        <label htmlFor="linkedin">
          <input
            name="linkedin"
            className="inputForm"
            type="text"
            value={linkedin}
            style={{ width: (linkedin.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              setLinkedin(e.target.value);
            }}
          />
        </label>
        <div>|</div>
        <label htmlFor="github">
          <input
            name="github"
            className="inputForm"
            type="text"
            value={github}
            style={{ width: (github.length + 1) * 7 }}
            onChange={(e) => {
              changeWidthDinamically(e);
              setGithub(e.target.value);
            }}
          />
        </label>
      </div>
      {showButton && (
        <BackdropLayout type="edit">
          <Card>
            <InformationForm
              changeName={(e) => changeName(e)}
              name={name}
              changeTlfNumber={(e) => changeTlfNumber(e)}
              tlfNumber={tlfNumber}
              changeEmail={(e) => changeEmail(e)}
              email={email}
              changeLinkedin={(e) => changeLinkedin(e)}
              linkedin={linkedin}
              changeGithub={(e) => changeGithub(e)}
              github={github}
            />
          </Card>
        </BackdropLayout>
      )}
    </div>
  );
}
export default Information;
