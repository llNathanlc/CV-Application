import ReactDOM from "react-dom";
import React, { useEffect, useRef } from "react";
import "./backdrop.css";

export default function Backdrop({ onClose, children }) {
  const elemRef = useRef(document.createElement("div"));
  elemRef.current.classList.add("backdropContainer");

  useEffect(() => {
    const elem = elemRef.current;
    document.body.appendChild(elem);

    const handleClick = (e) => {
      if (e.target === e.currentTarget) {
        onClose();
      }
    };

    elem.addEventListener("click", handleClick);

    return function cleanUp() {
      document.body.removeChild(elem);
    };
  }, [onClose]);

  return ReactDOM.createPortal(<>{children}</>, elemRef.current);
}
