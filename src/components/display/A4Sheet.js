import React, { useState, useEffect } from "react";

export default function A4Sheet({ children, addNewPage }) {
  const [node, setNode] = useState(null);

  useEffect(() => {
    if (node && checkOverflow(node)) {
      console.log("overflow")
    }
  }, [children, node]);

  function checkOverflow(element) {
    return element.scrollHeight > element.clientHeight;
  }

  return (
    <div
      ref={setNode} // callback ref
      id="page"
    >
      {children}
    </div>
  );
}
