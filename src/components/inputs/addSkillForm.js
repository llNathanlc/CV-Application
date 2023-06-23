import React, { useState } from "react";
import AddSkill from "../display/addSkill";

export default function AddSkillForm({ addNewSkill }) {
  const [skill, setSkill] = useState("");
  const [skillText, setSkillText] = useState("");

  function onSubmit(e) {
    e.preventDefault();

    addNewSkill(<AddSkill skill={skill} skillText={skillText} />);
  }

  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="skill">
        <input
          name="skill"
          type="text"
          value={skill}
          onChange={(e) => setSkill(e.target.value)}
        />
      </label>
      <label htmlFor="skillText">
        <input
          name="skillText"
          type="text"
          value={skillText}
          onChange={(e) => setSkillText(e.target.value)}
        />
      </label>
      <button type="submit" >change</button>
    </form>
  );
}
