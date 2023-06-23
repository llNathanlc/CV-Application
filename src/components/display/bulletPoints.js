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
      <ul>
        {newBulletPoints.map(({ id, key, bulletPoint }) => (
          <li key={key}>
            <label htmlFor={id}>
              <input
                type="text"
                className="inputBulletPoint"
                style={{ width: (bulletPoint.length + 1) * 7 }}
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
              className="printVisibility"
              onClick={() => handleDelete(id)}
            >
              delete
            </button>
          </li>
        ))}
      </ul>
      <button type="button" className="printVisibility" onClick={handleAdd}>
        add
      </button>
    </>
  );
}
