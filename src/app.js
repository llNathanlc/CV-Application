import React, { useState, useRef, useEffect } from "react";
import Information from "./components/layouts/information";
import Education from "./components/layouts/education";
import Experience from "./components/layouts/experience";
import Projects from "./components/layouts/projects";
import Skills from "./components/layouts/skills";
import NewSection from "./components/layouts/newSection";
import AddSectionForm from "./components/inputs/addSectionForm";
import BackdropLayout from "./components/layouts/backdropLayout";
import Card from "./components/display/card";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import "./components/layouts/parts.css";
import "./app.css";
import { v4 as uuidv4 } from "uuid";
import A4Sheet from "./components/display/A4Sheet";
import jsPDF from "jspdf";
import domtoimage from "dom-to-image";

function App() {
  const COMPONENT_MAP = {
    Information: Information,
    Education: Education,
    Experience: Experience,
    Projects: Projects,
    Skills: Skills,
    NewSection: NewSection,
  };
  const [buttonVisibility, setButtonVisibility] = useState("hidden");
  const [hoveredElement, setHoveredElement] = useState(null);

  const [pages, setPages] = useState(() => {
    const savedPages = localStorage.getItem("pages");
    if (savedPages) {
      return JSON.parse(savedPages).map((page) => {
        return page.map((item) => {
          return {
            ...item,
            component: COMPONENT_MAP[item.componentName],
          };
        });
      });
    } else {
      return [
        [
          { id: uuidv4(), componentName: "Information", props: {} },
          { id: uuidv4(), componentName: "Education", props: {} },
          { id: uuidv4(), componentName: "Experience", props: {} },
          { id: uuidv4(), componentName: "Projects", props: {} },
          { id: uuidv4(), componentName: "Skills", props: {} },
        ],
      ].map((page) => {
        return page.map((item) => {
          return {
            ...item,
            component: COMPONENT_MAP[item.componentName],
          };
        });
      });
    }
  });

  useEffect(() => {
    localStorage.setItem("pages", JSON.stringify(pages));
  }, [pages]);

  function addNewSection(e) {
    setPages((oldPages) => {
      const newPages = [...oldPages];
      const newSection = {
        id: uuidv4(),
        componentName: "NewSection", // Store the name here
        props: { title: e },
      };
      const lastPageIndex = newPages.length - 1;
      newPages[lastPageIndex] = [...newPages[lastPageIndex], newSection];
      return newPages;
    });
  }

  const addNewPage = () => {
    setPages((oldPages) => {
      const newPages = [...oldPages];

      const contents = newPages[newPages.length - 1].splice(-1);
      console.log(contents);

      // Add a new page with the contents
      newPages.push(contents);
      console.log(newPages);
      return newPages;
    });
  };
  function handleDelete(id, pageIndex) {
    setPages((oldPages) => {
      const newPages = [...oldPages];
      newPages[pageIndex] = newPages[pageIndex].filter(
        (item) => item.id !== id
      );
      const finalPages = newPages.filter((page) => page.length !== 0);
      return finalPages;
    });
  }
  function onMouseEnter() {
    setButtonVisibility("visible");
  }

  function onMouseLeave() {
    setButtonVisibility("hidden");
  }
  function onMouseEnterSection(id) {
    setHoveredElement(id);
  }
  function onMouseLeaveSection() {
    setHoveredElement(null);
  }


  function printButton() {
    window.print();
  }
  const generatePDF = () => {
    const node = document.getElementById("page");

    domtoimage
      .toPng(node, {
        height: node.offsetHeight * 2,
        width: node.offsetWidth * 2,
        style: {
          transform: "scale(2)",
          transformOrigin: "top left",
          width: node.offsetWidth + "px",
          height: node.offsetHeight + "px",
        },
      })
      .then((dataUrl) => {
        const img = new Image();
        img.src = dataUrl;

        img.onload = function () {
          const pdf = new jsPDF("p", "mm", "a4");
          const imgProps = pdf.getImageProperties(img);
          const pdfWidth = pdf.internal.pageSize.getWidth();
          const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
          pdf.addImage(img, "PNG", 0, 0, pdfWidth, pdfHeight);
          pdf.save("download.pdf");
        };
      })
      .catch((error) => {
        console.error("oops, something went wrong!", error);
      });
  };
  const handleOnDragEnd = (result) => {
    if (!result.destination) return;

    const startPageIndex = result.source.droppableId;
    const endPageIndex = result.destination.droppableId;

    const startPage = [...pages[startPageIndex]];
    const [reorderedItem] = startPage.splice(result.source.index, 1);

    if (startPageIndex === endPageIndex) {
      // Reordering within the same page
      startPage.splice(result.destination.index, 0, reorderedItem);
      setPages((oldPages) => {
        const newPages = [...oldPages];
        newPages[startPageIndex] = startPage;
        return newPages;
      });
    } else {
      // Moving to a different page
      const endPage = [...pages[endPageIndex]];
      endPage.splice(result.destination.index, 0, reorderedItem);
      setPages((oldPages) => {
        const newPages = [...oldPages];
        newPages[startPageIndex] = startPage;
        newPages[endPageIndex] = endPage;
        return newPages;
      });
    }
  };

  function checkOverflow(element) {
    return element.scrollHeight > element.clientHeight;
  }

  return (
    <div>
      <div>
        <button
          type="button"
          className="printVisibility printButton"
          onClick={printButton}
        >
          Print
        </button>
        <button
          type="button"
          className="printVisibility printButton"
          onClick={generatePDF}
        >
          Download as PDF
        </button>
        <BackdropLayout
          type="add"
          addButtonClassName={"addSectionButton"}
          buttonVisibility={"visible"}
        >
          <Card>
            <AddSectionForm addNewSection={(e) => addNewSection(e)} />
          </Card>
        </BackdropLayout>
      </div>
      <div style={{ display: "flex", gap: "1rem" }}>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          {pages.map((page, pageIndex) => (
            <A4Sheet key={pageIndex} addNewPage={addNewPage}>
              <Droppable droppableId={String(pageIndex)}>
                {(provided) => (
                  <div
                    id={`page-${pageIndex}`}
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                  >
                    {page.map(({ id, componentName, props }, index) => (
                      <Draggable
                        key={id}
                        draggableId={String(id)}
                        index={index}
                      >
                        {(provided) => (
                          <div
                            onMouseEnter={() => onMouseEnterSection(id)}
                            onMouseLeave={onMouseLeaveSection}
                          >
                            {React.createElement(
                              COMPONENT_MAP[componentName],
                              { ...props, provided },
                              <button
                                type="button"
                                onClick={() => handleDelete(id, pageIndex)}
                                style={{
                                  visibility:
                                    hoveredElement === id
                                      ? "visible"
                                      : "hidden",
                                }}
                                className="printVisibility deleteSectionButton"
                              >
                                -
                              </button>
                            )}
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </A4Sheet>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}

export default App;
