import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

let counter = 1;
let bulletPointsCount = 3;

const bulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Developed a REST API using Fast API and PostgreSQL to store data from learning management systems",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint:
      "Developted a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint:
      "Explored ways to visualize Github collaboration in a classroom setting",
  },
];

const secondBulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Communicate with managers to set up campus computers used on campus",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint:
      "Asses and troubleshoot computer problems brought by students, faculty and staff",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint:
      "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
  },
];

const example = [
  {
    id: 0,
    key: "firstExample",
    experience: (
      <AddInformation
        name="Undergraduate Research Assistant"
        date="June 2020 - Present"
        information="Texas A&M University"
        place="College Station, TX"
        bulletPoints={bulletPoints}
        bulletPointsCounter={bulletPointsCount}
      />
    ),
  },
  {
    id: 1,
    key: "secondExample",
    experience: (
      <AddInformation
        name="Information Technology Support Specialist"
        date="Sep. 2018 - Present"
        information="Southwestern University"
        place="Georgetown, TX"
        bulletPoints={secondBulletPoints}
        bulletPointsCounter={bulletPointsCount}
      />
    ),
  },
];


function Experience() {
  const [experienceList, setExperienceList] = useState(example);

  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setExperienceList(experienceList.filter((ex) => ex.id !== id));
  }

  function addNewExperience(e) {
    const newList = [
      ...experienceList.slice(0),
      { id: (counter += 1), key: (counter += 1), experience: e },
    ];
    setExperienceList(newList);
  }

  function onMouseEnterExperience() {
    setVisibilityAddButton("visible");
  }

  function onMouseLeaveExperience() {
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

    const items = Array.from(experienceList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setExperienceList(items);
  };

  return (
    <div
      id="experience"
      onMouseEnter={onMouseEnterExperience}
      onMouseLeave={onMouseLeaveExperience}
    >
      <div>
        <h3 className="sectionTitle">EXPERIENCE</h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="experienceList">
            {(provided) => (
              <div
                className="informationContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {experienceList.map(({ id, key, experience }, index) => (
                  <Draggable key={key} draggableId={String(id)} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
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
                          className="printVisibility deleteSectionButton"
                        >
                          -
                        </button>
                        {experience}
                        <div
                          className="printVisibility"
                          style={{
                            cursor: "grab",
                          }}
                          {...provided.dragHandleProps}
                        >
                          ::
                        </div>
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
          <AddForm addNewInformation={(e) => addNewExperience(e)} />
        </Card>
      </BackdropLayout>
    </div>
  );
}

export default Experience;
