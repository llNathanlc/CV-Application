import React, { useState } from "react";
import changeWidthDinamically from "../utils/functions";
import "./bulletPoints.css";

let count = 2;

export default function BulletPoints({ bulletPoints = [], onChange }) {
  const [newBulletPoints, setNewBulletPoints] = useState(bulletPoints);

  function handleDelete(id) {
    setNewBulletPoints(newBulletPoints.filter((bullet) => bullet.id !== id));
    onChange(newBulletPoints);
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
    onChange(newBulletPoints);
  }
  function handleAdd() {
    count += 1;
    setNewBulletPoints([
      ...newBulletPoints,
      { id: count, key: count, bulletPoint: "" },
    ]);
    onChange(newBulletPoints);
  }

  return (
    <>
    <button type="button" className="printVisibility addBulletPointButton" onClick={handleAdd}>
        Add bulletpoint
      </button>
      <ul>
        {newBulletPoints.map(({ id, key, bulletPoint }) => (
          <li key={key}>
            <label htmlFor={id}>
              <input
                type="text"
                className="inputBulletPoint"
                style={{ width: `${(bulletPoint.length ) * 7}px` }}
                name={id}
                key={key}
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
              onClick={() => handleDelete(id)}
            >
              -
            </button>
          </li>
        ))}
      </ul>
    </>
  );
}
