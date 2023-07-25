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
    <form onSubmit={onSubmit} className="informationFormContainer">
      <label htmlFor="skill" className="formRow">
        <div className="labelForm">Title</div>
        <input
          name="skill"
          type="text"
          className="inputForm"
          value={newSkill}
          onChange={(e) => setNewSkill(e.target.value)}
        />
      </label>
      <label htmlFor="skillText" className="formRow">
        <div className="labelForm">Skills</div>
        <input
          name="skillText"
          type="text"
          className="inputForm"
          style={{ width: (newSkillText.length + 1) * 6.7 }}
          value={newSkillText}
          onChange={(e) => setNewSkillText(e.target.value)}
        />
      </label>
      <button type="submit">change</button>
    </form>
  );
}
