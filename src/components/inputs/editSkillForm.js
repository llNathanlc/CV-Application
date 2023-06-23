import React, { useState } from "react";

export default function EditSkillForm({
  skill,
  changeSkill,
  skillText,
  changeSkillText,
}) {
  const [newSkill, setNewSkill] = useState(skill);
  const [newSkillText, setNewSkillText] = useState(skillText);

  function onSubmit(e) {
    e.preventDefault();
    changeSkill(newSkill);
    changeSkillText(newSkillText);
  }
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="skill">
        <input
          name="skill"
          type="text"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
      </label>
      <label htmlFor="skillText">
        <input
          name="skillText"
          type="text"
          value={newSkillText}
          onChange={(e) => setNewSkillText(e.target.value)}
        />
      </label>
      <button type="submit">change</button>
    </form>
  );
}
