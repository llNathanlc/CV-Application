import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const example = [
  {
    id: 0,
    key: "firstExample",
    education: (
      <AddInformation
        name="Southwester University"
        date="Aug. 2018 - May 2021"
        information="Bachelor of Arts in Computer Science, Minor in Business"
        place="Georgetown, TX"
      />
    ),
  },
  {
    id: 1,
    key: "secondExample",
    education: (
      <AddInformation
        name="Blinn College"
        date="Aug. 2014 - May 2018"
        information="Associate's in Liberal Arts"
        place="Bryan, TX"
      />
    ),
  },
];

let counter = 1;

export default function Education() {
  const [educationList, setEducationList] = useState(example);

  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden");

  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    setEducationList(educationList.filter((ed) => ed.id !== id));
  }

  function addNewEducation(e) {
    const newList = [
      ...educationList.slice(0),
      { id: (counter += 1), key: (counter += 1), education: e },
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
    >
      <div>
        <h3 className="sectionTitle"> EDUCATION </h3>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Droppable droppableId="educationList">
            {(provided) => (
              <div
                className="informationContainer"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                {educationList.map(({ id, key, education }, index) => (
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
                        {education}
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
          <AddForm addNewInformation={(e) => addNewEducation(e)} />
        </Card>
      </BackdropLayout>
    </div>
  );
}
