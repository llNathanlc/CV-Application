import React, { useState, useEffect } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
let counter = 1;
let bulletPointsCount = 2;

const bulletPoints = [
  {
    id: uuidv4(),
    key: "firstBulletPoint",
    bulletPoint: "bullet point",
  },
  {
    id: uuidv4(),
    key: "secondBulletPoint",
    bulletPoint: "bullet point",
  },
];

const example = [
  {
    id: uuidv4(),
    key: "firstExample",
    name: "Name",
    date: "Date",
    information: "Information",
    place: "Place",
    bulletPoints: bulletPoints,
  },
];

function newSection({ provided, title, children }) {
  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setNewSectionList(newSectionList.filter((ex) => ex.id !== id));
  }

  const [newSectionList, setNewSectionList] = useState(
    JSON.parse(localStorage.getItem(`newSectionList-section`)) || example
  );

  useEffect(() => {
    localStorage.setItem(
      `newSectionList-section`,
      JSON.stringify(newSectionList)
    );
  }, [newSectionList, counter]);

  function addNewSection(id, name, date, information, place, bulletPoints) {
    const newList = [
      ...newSectionList.slice(0),
      {
        id: id,
        name: name,
        date: date,
        information: information,
        place: place,
        bulletPoints: bulletPoints,
      },
    ];
    setNewSectionList(newList);
  }

  function onMouseEnternewSection() {
    setVisibilityAddButton("visible");
  }

  function onMouseLeavenewSection() {
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

    const items = Array.from(newSectionList);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNewSectionList(items);
  };

  return (
    <div
      id={title}
      className="newSection"
      onMouseEnter={onMouseEnternewSection}
      onMouseLeave={onMouseLeavenewSection}
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
            defaultValue={title}
            className="titleInput"
          ></input>
          {children}
        </div>
        <div className="borderBottomBlack"></div>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId={`${title}List`}>
            {(provided) => (
              <div
                className="informationContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {newSectionList.map(
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
                            id={`experienceExample${id}`}
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
              addNewSection(id, name, date, information, place, bulletPoints)
            }
          />
        </Card>
      </BackdropLayout>
    </div>
  );
}

export default newSection;
