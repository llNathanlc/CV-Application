import React, { useEffect, useState } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

let counter = 1;
let bulletPoints = [];

const example2 = [
  {
    id: uuidv4(),
    name: "Southwester University",
    date: "Aug. 2018 - May 2021",
    information: "Bachelor of Arts in Computer Science, Minor in Business",
    place: "Georgetown, TX",
    bulletPoints: bulletPoints,
  },
  {
    id: uuidv4(),
    name: "Blinn College",
    date: "Aug. 2014 - May 2018",
    information: "Associate's in Liberal Arts",
    place: "Bryan, TX",
    bulletPoints: bulletPoints,
  },
];
export default function Education({ provided, children }) {
  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setEducationList(educationList.filter((ed) => ed.id !== id));
  }

  const [educationList, setEducationList] = useState(
    JSON.parse(localStorage.getItem(`educationList-education`)) || example2
  );

  useEffect(() => {
    localStorage.setItem(
      `educationList-education`,
      JSON.stringify(educationList)
    );
  }, [educationList, counter]);

  function addNewEducation(
    id,
    name,
    date,
    information,
    place,
    bulletPoints,
  ) {
    const newList = [
      ...educationList.slice(0),
      {
        id: id,
        name: name,
        date: date,
        information: information,
        place: place,
        bulletPoints: bulletPoints,
      },
    ];
    setEducationList(newList);
  }

  function onMouseEnterEducation() {
    setVisibilityAddButton("visible");
  }
  function onMouseLeaveEducation() {
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

    const items = Array.from(educationList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEducationList(items);
  };

  return (
    <div
      id="education"
      onMouseEnter={onMouseEnterEducation}
      onMouseLeave={onMouseLeaveEducation}
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
            defaultValue="EDUCATION"
            className="titleInput"
          ></input>

          {children}
        </div>
        <div className="borderBottomBlack"></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="educationList">
            {(provided) => (
              <div
                className="informationContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {educationList.map(
                  (
                    { id, name, date, information, place, bulletPoints },
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
                            id={`educationExample${id}`}
                            name={name}
                            date={date}
                            information={information}
                            place={place}
                            bulletPoints={bulletPoints}
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
              bulletPoints
            ) =>
              addNewEducation(id, name, date, information, place, bulletPoints)
            }
          />
        </Card>
      </BackdropLayout>
    </div>
  );
}
