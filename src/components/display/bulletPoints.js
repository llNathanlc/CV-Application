import React, { useState, useEffect } from "react";
import changeWidthDinamically from "../utils/functions";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./bulletPoints.css";

export default function BulletPoints({
  bulletPoints = [],
  onChangeBulletPoints,
  onChangeBulletPointsCounter,
  visibility,
  counter,
}) {
  const [newBulletPoints, setNewBulletPoints] = useState(bulletPoints);

  const [newCounter, setNewCounter] = useState(counter);

  const [hoveredElement, setHoveredElement] = useState(null);

  useEffect(() => {
    onChangeBulletPoints(newBulletPoints);
    onChangeBulletPointsCounter(newCounter);
  }, [newBulletPoints, newCounter]);

  function handleDelete(id) {
    setNewBulletPoints(newBulletPoints.filter((bullet) => bullet.id !== id));
  }
  function updateBulletPoint(id, e) {
    setNewBulletPoints(
      newBulletPoints.map((bulletPoint) => {
        if (bulletPoint.id === id) {
          return { ...bulletPoint, bulletPoint: e.target.value };
        }
        return bulletPoint;
      })
    );
  }
  function handleAdd() {
    setNewCounter(newCounter + 1);
    console.log(newCounter);
    setNewBulletPoints([
      ...newBulletPoints,
      { id: newCounter, key: newCounter, bulletPoint: "Bullet point" },
    ]);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(newBulletPoints);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setNewBulletPoints(items);
  };

  function onMouseEnter(id) {
    setHoveredElement(id);
  }
  function onMouseLeave() {
    setHoveredElement(null);
  }

  return (
    <>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="bulletPointsList">
          {(provided) => (
            <ul
              className="bulletPointsContainer"
              ref={provided.innerRef}
              {...provided.droppableProps}
            >
              {newBulletPoints.map(({ id, key, bulletPoint }, index) => (
                <Draggable key={key} draggableId={String(id)} index={index}>
                  {(provided) => (
                    <li
                      id={`bulletpoint ${id}`}
                      ref={provided.innerRef}
                      {...provided.dragHandleProps}
                      {...provided.draggableProps}
                      onMouseEnter={() => onMouseEnter(id)}
                      onMouseLeave={onMouseLeave}
                      className="bulletPoint"
                    >
                      <label htmlFor={id}>
                        <input
                          type="text"
                          className="inputBulletPoint"
                          style={{ width: `${bulletPoint.length * 7}px` }}
                          name={id}
                          value={bulletPoint}
                          onChange={(e) => {
                            changeWidthDinamically(e);
                            updateBulletPoint(id, e);
                          }}
                        />
                      </label>
                      <button
                        type="button"
                        className="printVisibility removeBulletPointButton"
                        style={{
                          visibility:
                            hoveredElement === id ? "visible" : "hidden",
                        }}
                        onClick={() => handleDelete(id)}
                      >
                        -
                      </button>
                    </li>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ul>
          )}
        </Droppable>
      </DragDropContext>
      <button
        type="button"
        className="printVisibility addBulletPointButton"
        onClick={handleAdd}
        style={{ visibility: `${visibility}` }}
      >
        Add bulletpoint
      </button>
    </>
  );
}
