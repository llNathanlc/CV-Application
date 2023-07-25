import React, { useState } from "react";
import AddSkill from "../display/addSkill";

export default function AddSkillForm({ addNewSkill }) {
  const [skill, setSkill] = useState("");
  const [skillText, setSkillText] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    addNewSkill(skill, skillText);
  }

  return (
    <form onSubmit={onSubmit} className="informationFormContainer">
      <label htmlFor="skill" className="formRow">
      <div className="labelForm">Title</div>
        <input
          name="skill"
          className="inputForm"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </label>
      <label htmlFor="skillText" className="formRow">
      <div className="labelForm">Skills</div>
        <input
          name="skillText"
          className="inputForm"
          type="text"
          value={skillText}
          onChange={(e) => setSkillText(e.target.value)}
        />
      </label>
      <button type="submit">Add</button>
    </form>
  );
}
