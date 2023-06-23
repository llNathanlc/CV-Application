import React, { useState } from "react";
import BackdropLayout from "../layouts/backdropLayout";
import Card from "./card";
import EditSkillForm from "../inputs/editSkillForm";
import changeWidthDinamically from "../utils/functions";
import "./addSkill.css";

export default function AddSkill({ skill, skillText }) {
  const [showButton, setShowButton] = useState(true);

  const [newSkill, setNewSkill] = useState(skill);
  const [newSkillText, setNewSkillText] = useState(skillText);

  function changeSkill(newSkillChange) {
    setNewSkill(newSkillChange);
  }
  function changeSkillText(newSkillTextChange) {
    setNewSkillText(newSkillTextChange);
  }
  return (
    <div>
      <label htmlFor="skill">
        <input
          className="input-Skill input-Black"
          name="skill"
          type="text"
          style={{ width: (newSkill.length + 1) * 6.7 }}
          value={newSkill}
          onChange={(e) => {
            changeWidthDinamically(e);
            setNewSkill(e.target.value);
          }}
        />
      </label>
      <label htmlFor="skillText">
        <input
          className="input-Skill"
          name="skillText"
          type="text"
          style={{ width: (newSkillText.length + 1) * 6.6 }}
          value={newSkillText}
          onChange={(e) => {
            changeWidthDinamically(e);
            setNewSkillText(e.target.value);
          }}
        />
      </label>
      {showButton && (
        <BackdropLayout type="edit">
          <Card>
            <EditSkillForm
              skill={newSkill}
              changeSkill={(e) => changeSkill(e)}
              skillText={newSkillText}
              changeSkillText={(e) => changeSkillText(e)}
            />
          </Card>
        </BackdropLayout>
      )}
    </div>
  );
}
