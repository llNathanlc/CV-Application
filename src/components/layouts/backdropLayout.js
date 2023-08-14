import React, { useState } from "react";
import Backdrop from "../display/backdrop";

export default function BackdropLayout({ children, type, buttonVisibility, addButtonClassName }) {
  const [showBackdrop, setShowBackdrop] = useState(false);

  function toggleBackdrop() {
    setShowBackdrop(!showBackdrop);
  }
  return (
    <>
      {showBackdrop && (
        <Backdrop onClose={() => toggleBackdrop()}>{children}</Backdrop>
      )}
      {type === "edit" ? (
        <button
          type="button"
          onClick={toggleBackdrop}
          style={{ visibility: `${buttonVisibility}` }}
          className="editButton printVisibility"
        >
          Edit
        </button>
      ) : (
        <button
          type="button"
          onClick={toggleBackdrop}
          style={{ visibility: `${buttonVisibility}` }}
          className={`${addButtonClassName} addButton printVisibility`}
        >
          +
        </button>
      )}
    </>
  );
}
