import React, { useState } from "react";

export default function InformationForm({
  changeName,
  name,
  changeTlfNumber,
  tlfNumber,
  changeEmail,
  email,
  changeLinkedin,
  linkedin,
  changeGithub,
  github,
}) {
  const [newName, setNewName] = useState(name);
  const [newTlfNumber, setNewTlfNumber] = useState(tlfNumber);
  const [newEmail, setNewEmail] = useState(email);
  const [newLinkedin, setNewLinkedin] = useState(linkedin);
  const [newGithub, setNewGithub] = useState(github);

  function onSubmit(e) {
    e.preventDefault();
    changeName(newName);
    changeTlfNumber(newTlfNumber);
    changeEmail(newEmail);
    changeGithub(newGithub);
    changeLinkedin(newLinkedin);
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
      <label htmlFor="tlfNumber" className="formRow">
        <div className="labelForm">Telefon Number</div>
        <input
          name="tlfNumber"
          type="text"
          value={newTlfNumber}
          className="inputForm"
          onChange={(e) => setNewTlfNumber(e.target.value)}
        />
      </label>
      <label htmlFor="email" className="formRow">
        <div className="labelForm">Email</div>
        <input
          name="email"
          type="text"
          value={newEmail}
          className="inputForm"
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </label>
      <label htmlFor="linkedin" className="formRow">
        <div className="labelForm">Linkedin</div>
        <input
          name="linkedin"
          type="text"
          value={newLinkedin}
          className="inputForm"
          onChange={(e) => setNewLinkedin(e.target.value)}
        />
      </label>
      <label htmlFor="github" className="formRow">
        <div className="labelForm">Github</div>
        <input
          name="github"
          type="text"
          value={newGithub}
          className="inputForm"
          onChange={(e) => setNewGithub(e.target.value)}
        />
      </label>
      <button type="submit" className="changeButton-InformationForm">
        change
      </button>
    </form>
  );
}
