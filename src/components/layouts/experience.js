import React, { useState, useEffect } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
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
    id: uuidv4(),
    name: "Undergraduate Research Assistant",
    date: "June 2020 - Present",
    information: "Texas A&M University",
    place: "College Station, TX",
    bulletPoints: bulletPoints,
    bulletPointsCounter: bulletPointsCount,
  },
  {
    id: uuidv4(),
    name: "Information Technology Support Specialist",
    date: "Sep. 2018 - Present",
    information: "Southwestern University",
    place: "Georgetown, TX",
    bulletPoints: secondBulletPoints,
    bulletPointsCounter: bulletPointsCount,
  },
];

function Experience({ provided, children }) {
  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setExperienceList(experienceList.filter((ex) => ex.id !== id));
  }

  const [experienceList, setExperienceList] = useState(
    JSON.parse(localStorage.getItem(`experienceList-experience`)) || example
  );

  useEffect(() => {
    localStorage.setItem(
      `experienceList-experience`,
      JSON.stringify(experienceList)
    );
  }, [experienceList, counter]);

  function addNewExperience(
    id,
    name,
    date,
    information,
    place,
    bulletPoints,
    bulletPointsCount
  ) {
    const newList = [
      ...experienceList.slice(0),
      {
        id: id,
        name: name,
        date: date,
        information: information,
        place: place,
        bulletPoints: bulletPoints,
        bulletPointsCount: bulletPointsCount,
      },
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
            defaultValue="EXPERIENCE"
            className="titleInput"
          ></input>
          {children}
        </div>
        <div className="borderBottomBlack"></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="experienceList">
            {(provided) => (
              <div
                className="informationContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {experienceList.map(
                  (
                    {
                      id,
                      name,
                      date,
                      information,
                      place,
                      bulletPoints,
                      bulletPointsCount,
                    },
                    index
                  ) => (
                    <Draggable key={id} draggableId={String(id)} index={index}>
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
                            className="printVisibility deleteInformationButton"
                          >
                            -
                          </button>
                          <AddInformation
                            id={`experienceExample${id}`}
                            name={name}
                            date={date}
                            information={information}
                            place={place}
                            bulletPoints={bulletPoints}
                            bulletPointsCounter={bulletPointsCount}
                          />
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
          <AddForm
            addNewInformation={(
              id,
              name,
              date,
              information,
              place,
              bulletPoints,
              bulletPointsCount
            ) =>
              addNewExperience(
                id,
                name,
                date,
                information,
                place,
                bulletPoints,
                bulletPointsCount
              )
            }
          />
        </Card>
      </BackdropLayout>
    </div>
  );
}

export default Experience;
