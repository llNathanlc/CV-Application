import React, { useState, useEffect } from "react";
import BackdropLayout from "./backdropLayout";
import AddSkill from "../display/addSkill";
import Card from "../display/card";
import AddSkillForm from "../inputs/addSkillForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

const example = [
  {
    id: uuidv4(),
    skill: "Languages:",
    skillText: "Java, Python, C/C++, SQL(Postgres), Javascript, HTML/CSS,R",
  },
  {
    id: uuidv4(),
    skill: "Frameworks:",
    skillText: "React, Node.js, Flask, JUnit, WorkdPress, Material-UI, FastAPI",
  },
  {
    id: uuidv4(),
    skill: "Developer Tools:",
    skillText:
      "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
  },
  {
    id: uuidv4(),
    skill: "Libraries",
    skillText: "pandas, NumPy, Matplotlib",
  },
];

export default function Skills({ provided, children }) {
  const [skillsList, setSkillsList] = useState(
    JSON.parse(localStorage.getItem(`skillsList-skills`)) || example
  );

  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setSkillsList(skillsList.filter((sk) => sk.id !== id));
  }

  useEffect(() => {
    localStorage.setItem(`skillsList-skills`, JSON.stringify(skillsList));
  }, [skillsList]);

  function addNewSkill(skill, skillText) {
    const newList = [
      ...skillsList.slice(0),
      {
        id: uuidv4(),
        skill: skill,
        skillText: skillText,
      },
    ];
    setSkillsList(newList);
  }

  function onMouseEnterSkills() {
    setVisibilityAddButton("visible");
  }

  function onMouseLeaveSkills() {
    setVisibilityAddButton("hidden");
  }

  function onMouseEnterSection(id) {
    setHoveredElement(id);
  }
  function onMouseLeaveSection() {
    setHoveredElement(null);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(skillsList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSkillsList(items);
  };

  return (
    <div
      id="skills"
      onMouseEnter={onMouseEnterSkills}
      onMouseLeave={onMouseLeaveSkills}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div>
        <div className="sectionTitle">
          <div
            className="grabber printVisibility"
            {...provided.dragHandleProps}
          >
            ::
          </div>
          <input
            type="text"
            defaultValue="SKILLS"
            className="titleInput"
          ></input>
          {children}
        </div>
        <div className="borderBottomBlack"></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="projectList">
            {(provided) => (
              <div
                className="skillsContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {skillsList.map(({ id, skill, skillText }, index) => (
                  <Draggable key={id} draggableId={String(id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        id={id}
                        className="section"
                        onMouseEnter={() => onMouseEnterSection(id)}
                        onMouseLeave={onMouseLeaveSection}
                      >
                        <button
                          type="button"
                          style={{
                            visibility:
                              hoveredElement === id ? "visible" : "hidden",
                          }}
                          onClick={() => handleDelete(id)}
                          className="printVisibility deleteInformationButton"
                        >
                          -
                        </button>
                        <AddSkill
                          id={`skillExample-${id}`}
                          skill={skill}
                          skillText={skillText}
                          editButtonVisibility={
                            hoveredElement === id ? "visible" : "hidden"
                          }
                        ></AddSkill>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <BackdropLayout type="add" buttonVisibility={visibilityAddButton}>
        <Card>
          <AddSkillForm
            addNewSkill={(id, skill, skillText) =>
              addNewSkill(id, skill, skillText)
            }
          />
        </Card>
      </BackdropLayout>
    </div>
  );
}
