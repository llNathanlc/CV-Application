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
    <div className="informationFormContainer">
      <form onSubmit={onSubmit}>
        <label htmlFor="name">
          Name:
          <input
            name="name"
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
          />
        </label>
        <label htmlFor="tlfNumber">
          Telefon Number:
          <input
            name="tlfNumber"
            type="text"
            value={newTlfNumber}
            onChange={(e) => setNewTlfNumber(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            name="email"
            type="text"
            value={newEmail}
            onChange={(e) => setNewEmail(e.target.value)}
          />
        </label>
        <label htmlFor="linkedin">
          Linkedin:
          <input
            name="linkedin"
            type="text"
            value={newLinkedin}
            onChange={(e) => setNewLinkedin(e.target.value)}
          />
        </label>
        <label htmlFor="github">
          Github:
          <input
            name="github"
            type="text"
            value={newGithub}
            onChange={(e) => setNewGithub(e.target.value)}
          />
        </label>
        <button type="submit">change</button>
      </form>
    </div>
  );
}
