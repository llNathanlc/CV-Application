import React, { useEffect, useState } from "react";
import BackdropLayout from "../layouts/backdropLayout";
import Card from "./card";
import EditSkillForm from "../inputs/editSkillForm";
import changeWidthDinamically from "../utils/functions";
import "./addSkill.css";

export default function AddSkill({
  id,
  skill,
  skillText,
  editButtonVisibility,
}) {
  const [showButton, setShowButton] = useState(true);

  const [newSkill, setNewSkill] = useState(skill);
  const [newSkillText, setNewSkillText] = useState(skillText);

  const [visibility, setVisibility] = useState("hidden");

  const [state, setState] = useState(
    JSON.parse(localStorage.getItem(`cvState-${id}`)) || {
      newSkill: newSkill,
      newSkillText: newSkillText,
      visibility: "hidden",
    }
  );

  useEffect(() => {
    localStorage.setItem(`cvState-${id}`, JSON.stringify(state));
  }, [state, id]);

  function changeSkill(newSkillChange) {
    setNewSkill(newSkillChange);
    setState((prevState) => ({ ...prevState, newSkill: newSkillChange }));
  }
  function changeSkillText(newSkillTextChange) {
    setNewSkillText(newSkillTextChange);
    setState((prevState) => ({
      ...prevState,
      newSkillText: newSkillTextChange,
    }));
  }

  function onMouseEnter() {
    setVisibility("visible");
  }
  function onMouseLeave() {
    setVisibility("hidden");
  }
  return (
    <div onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <label htmlFor="skill">
        <input
          className="input-Skill input-Black"
          name="skill"
          type="text"
          style={{ width: (state.newSkill.length + 1) * 6.7 }}
          value={state.newSkill}
          onChange={(e) => {
            changeWidthDinamically(e);
            changeSkill(e.target.value);
          }}
        />
      </label>
      <label htmlFor="skillText">
        <input
          className="input-Skill"
          name="skillText"
          type="text"
          style={{ width: (state.newSkillText.length + 1) * 6.6 }}
          value={state.newSkillText}
          onChange={(e) => {
            changeWidthDinamically(e);
            changeSkillText(e.target.value);
          }}
        />
      </label>
      <BackdropLayout type="edit" buttonVisibility={editButtonVisibility}>
        <Card>
          <EditSkillForm
            skill={state.newSkill}
            changeSkill={(e) => changeSkill(e)}
            skillText={state.newSkillText}
            changeSkillText={(e) => changeSkillText(e)}
          />
        </Card>
      </BackdropLayout>
    </div>
  );
}
