import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import AddSkill from "../display/addSkill";
import Card from "../display/card";
import AddSkillForm from "../inputs/addSkillForm";

const example = [
  {
    id: 0,
    key: "firstExample",
    skill: (
      <AddSkill
        skill="Languages:"
        skillText="Java, Python, C/C++, SQL(Postgres), Javascript, HTML/CSS,R"
      />
    ),
  },
  {
    id: 1,
    key: "secondExample",
    skill: (
      <AddSkill
        skill="Frameworks:"
        skillText="React, Node.js, Flask, JUnit, WorkdPress, Material-UI, FastAPI"
      />
    ),
  },
  {
    id: 2,
    key: "thirdExample",
    skill: (
      <AddSkill
        skill="Developer Tools:"
        skillText="Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse"
      />
    ),
  },
  {
    id: 3,
    key: "thirdExample",
    skill: <AddSkill skill="Libraries" skillText="pandas, NumPy, Matplotlib" />,
  },
];
let counter = 3;

export default function Skills() {
  const [showButton, setShowButton] = useState(true);

  const [skillsList, setSkillsList] = useState(example);

  function handleDelete(id) {
    setSkillsList(skillsList.filter((sk) => sk.id !== id));
  }

  function addNewSkill(e) {
    const newList = [
      ...skillsList.slice(0),
      { id: (counter += 1), key: (counter += 1), project: e },
    ];
    setSkillsList(newList);
  }
  return (
    <div id="skills">
      <div>
        <h3 className="sectionTitle">SKILLS</h3>
        <div className="skillsContainer">
          {skillsList.map(({ id, key, skill }) => (
            <div key={key} id={key}>
              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="printVisibility deleteSectionButton"
              >
                -
              </button>
              {skill}
            </div>
          ))}
        </div>
      </div>
      {showButton && (
        <BackdropLayout type="add">
          <Card>
            <AddSkillForm addNewSkill={(e) => addNewSkill(e)} />
          </Card>
        </BackdropLayout>
      )}
    </div>
  );
}
