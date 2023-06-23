import React, { useState } from "react";
import Backdrop from "../display/backdrop";

export default function BackdropLayout({ children, type }) {
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
        <button type="button" onClick={toggleBackdrop} className="editButton printVisibility">
          Edit
        </button>
      ) : (
        <button type="button" onClick={toggleBackdrop} className="addButton printVisibility">
          +
        </button>
      )}
    </>
  );
}
