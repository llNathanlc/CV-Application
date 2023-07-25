import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import AddSkill from "../display/addSkill";
import Card from "../display/card";
import AddSkillForm from "../inputs/addSkillForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

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
    key: "fourthExample",
    skill: <AddSkill skill="Libraries" skillText="pandas, NumPy, Matplotlib" />,
  },
];

export default function Skills({ provided, children }) {
  const [skillsList, setSkillsList] = useState([
    {
      id: uuidv4(),
      key: "firstExample",
      component: AddSkill,
      props: {
        skill: "Languages:",
        skillText: "Java, Python, C/C++, SQL(Postgres), Javascript, HTML/CSS,R",
      },
    },
    {
      id: uuidv4(),
      key: "secondExample",
      component: AddSkill,
      props: {
        skill: "Frameworks:",
        skillText:
          "React, Node.js, Flask, JUnit, WorkdPress, Material-UI, FastAPI",
      },
    },
    {
      id: uuidv4(),
      key: "thirdExample",
      component: AddSkill,
      props: {
        skill: "Developer Tools:",
        skillText:
          "Git, Docker, TravisCI, Google Cloud Platform, VS Code, Visual Studio, PyCharm, IntelliJ, Eclipse",
      },
    },
    {
      id: uuidv4(),
      key: "fourthExample",
      component: AddSkill,
      props: {
        skill: "Libraries",
        skillText: "pandas, NumPy, Matplotlib",
      },
    },
  ]);

  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setSkillsList(skillsList.filter((sk) => sk.id !== id));
  }

  function addNewSkill(skill, skillText) {
    const newList = [
      ...skillsList.slice(0),
      {
        id: uuidv4(),
        key: uuidv4(),
        component: AddSkill,
        props: { skill: skill, skillText: skillText },
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
                {skillsList.map(
                  ({ id, key, component: Component, props }, index) => (
                    <Draggable key={key} draggableId={String(id)} index={index}>
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
                          <Component
                            {...props}
                            editButtonVisibility={
                              hoveredElement === id ? "visible" : "hidden"
                            }
                          />
                        </div>
                      )}
                    </Draggable>
                  )
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
      <BackdropLayout type="add" buttonVisibility={visibilityAddButton}>
        <Card>
          <AddSkillForm
            addNewSkill={(skill, skillText) => addNewSkill(skill, skillText)}
          />
        </Card>
      </BackdropLayout>
    </div>
  );
}
