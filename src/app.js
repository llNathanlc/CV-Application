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

function App() {
  const [pages, setPages] = useState([
    [
      { id: uuidv4(), component: Information, props: {} },
      { id: uuidv4(), component: Education, props: {} },
      { id: uuidv4(), component: Experience, props: {} },
      { id: uuidv4(), component: Projects, props: {} },
      { id: uuidv4(), component: Skills, props: {} },
    ],
  ]);

  const [buttonVisibility, setButtonVisibility] = useState("hidden");
  const [hoveredElement, setHoveredElement] = useState(null);

  function addNewSection(e) {
    setPages((oldPages) => {
      const newPages = [...oldPages];
      const newSection = {
        id: uuidv4(),
        component: NewSection,
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
      console.log(contents)

      // Add a new page with the contents
      newPages.push(contents);
      console.log(newPages)
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
        <button type="button" className="printVisibility printButton">
          Download as PDF
        </button>
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
                    {page.map(({ id, component: Component, props }, index) => (
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
                            <Component {...props} provided={provided}>
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
                            </Component>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                    <BackdropLayout
                      type="add"
                      addButtonClassName={"addSectionButton"}
                      buttonVisibility={"visible"}
                    >
                      <Card>
                        <AddSectionForm
                          addNewSection={(e) => addNewSection(e)}
                        />
                      </Card>
                    </BackdropLayout>
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
