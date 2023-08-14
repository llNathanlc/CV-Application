import React, { useState, useEffect } from "react";
import changeWidthDinamically from "../utils/functions";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";
import "./bulletPoints.css";

export default function BulletPoints({
  bulletPoints = [],
  onChangeBulletPoints,
  visibility,
}) {
  const [hoveredElement, setHoveredElement] = useState(null);

  function handleDelete(id) {
    const newBulletPoint = bulletPoints.filter((bullet) => bullet.id !== id);

    onChangeBulletPoints(newBulletPoint);
  }
  function updateBulletPoint(id, e) {
    const updatedBulletPoints = bulletPoints.map((bulletPoint) => {
      if (bulletPoint.id === id) {
        return { ...bulletPoint, bulletPoint: e.target.value };
      }
      return bulletPoint;
    });

    onChangeBulletPoints(updatedBulletPoints);
  }
  function handleAdd() {
    const newBulletPoints = [
      ...bulletPoints,
      { id: uuidv4(), key: uuidv4(), bulletPoint: "Bullet point" },
    ];

    onChangeBulletPoints(newBulletPoints);
  }

  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(bulletPoints);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    onChangeBulletPoints(items);
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
            <ul className="bulletPointsContainer" ref={provided.innerRef}>
              {bulletPoints.map(({ id, key, bulletPoint }, index) => (
                <Draggable key={key} draggableId={String(id)} index={index}>
                  {(provided) => (
                    <li
                      id={`bulletpoint ${id}`}
                      ref={provided.innerRef}
                      onMouseEnter={() => onMouseEnter(id)}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
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
