import React, { useState, useEffect } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

let counter = 1;
let bulletPointsCount = 4;
const bulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Developed a full-stack web application using Flasj serving a REST API with React as the frontend",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint: "Implemented GitHub OAuth to get data from user's repositores",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint: "Visualized GitHub data to show collaboration",
  },
  {
    id: 3,
    key: "fourthBulletPoint",
    bulletPoint: "Used Celery and Redis for asynchonous tasks",
  },
];

const secondBulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint:
      "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint:
      "Implemented continous delivery using TravisCI to build the plugin upon a new release",
  },
  {
    id: 3,
    key: "fourthBulletPoint",
    bulletPoint:
      "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
  },
];

const example = [
  {
    id: uuidv4(),
    name: "Giglytics",
    date: "June 2020 - Present",
    information: "Python, Flask, React, PostgreSQL, Docker",
    place: "",
    bulletPoints: bulletPoints,
    bulletPointsCounter: bulletPointsCount,
  },
  {
    id: uuidv4(),
    name: "Simple Paintball",
    date: "May 2018 - May 2020",
    information: "Spigot API, Java, Maven, TravicCI, Git",
    place: "",
    bulletPoints: secondBulletPoints,
    bulletPointsCounter: bulletPointsCount,
  },
];

function Projects({ provided, children }) {
  const [projectList, setProjectList] = useState(
    JSON.parse(localStorage.getItem(`projectList-project`)) || example
  );

  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setProjectList(projectList.filter((ex) => ex.id !== id));
  }

  useEffect(() => {
    localStorage.setItem(`projectList-project`, JSON.stringify(projectList));
  }, [projectList, counter]);

  function addNewProject(
    id,
    name,
    date,
    information,
    place,
    bulletPoints,
    bulletPointsCount
  ) {
    const newList = [
      ...projectList.slice(0),
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
    setProjectList(newList);
  }
  function onMouseEnterProjects() {
    setVisibilityAddButton("visible");
  }

  function onMouseLeaveProjects() {
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

    const items = Array.from(projectList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setProjectList(items);
  };

  return (
    <div
      id="project"
      onMouseEnter={onMouseEnterProjects}
      onMouseLeave={onMouseLeaveProjects}
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div>
        <div className="sectionTitle">
          <div
            className="grabber  printVisibility"
            {...provided.dragHandleProps}
          >
            ::
          </div>
          <input
            type="text"
            defaultValue="PROJECTS"
            className="titleInput"
          ></input>
          {children}
        </div>
        <div className="borderBottomBlack"></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="projectList">
            {(provided) => (
              <div
                className="informationContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {projectList.map(
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
                            id={`projectExample${id}`}
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
              addNewProject(
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

export default Projects;
