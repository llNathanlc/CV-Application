import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";

const example = [
  {
    id: 0,
    key: "firstExample",
    education: (
      <AddInformation
        name="Southwester University"
        date="Aug. 2018 - May 2021"
        information="Bachelor of Arts in Computer Science, Minor in Business"
        place="Georgetown, TX"
      />
    ),
  },
  {
    id: 1,
    key: "secondExample",
    education: (
      <AddInformation
        name="Blinn College"
        date="Aug. 2014 - May 2018"
        information="Associate's in Liberal Arts"
        place="Bryan, TX"
      />
    ),
  },
];

let counter = 1;

export default function Education() {
  const [showButton, setShowButton] = useState(true);

  const [educationList, setEducationList] = useState(example);

  const [visibilityAddButton, setVisibilityAddButton] = useState("hidden")

  const [visibilityRemoveButton, setVisibilityRemoveButton] = useState("hidden")

  function handleDelete(id) {
    setEducationList(educationList.filter((ed) => ed.id !== id));
  }

  function addNewEducation(e) {
    const newList = [
      ...educationList.slice(0),
      { id: (counter += 1), key: (counter += 1), education: e },
    ];
    setEducationList(newList);
  }

  function onMouseEnterEducation() {
    setVisibilityAddButton("visible");
  }
  function onMouseLeaveEducation() {
    setVisibilityAddButton("hidden");
  }
  function onMouseEnterSection() {
    setVisibilityRemoveButton("visible");
  }
  function onMouseLeaveSection() {
    setVisibilityRemoveButton("hidden");
  }


  return (
    <div id="education" onMouseEnter={onMouseEnterEducation} onMouseLeave={onMouseLeaveEducation}>
      <div>
        <h3 className="sectionTitle"> EDUCATION </h3>
        <div className="informationContainer">
          {educationList.map(({ id, key, education }) => (
            <div key={key} id={key} className="section" onMouseEnter={onMouseEnterSection} onMouseLeave={onMouseLeaveSection}>
               <button
                type="button"
                style={{visibility:`${visibilityRemoveButton}`}}
                onClick={() => handleDelete(id)}
                className="printVisibility deleteSectionButton"
              >
                -
              </button>
              {education}
            </div>
          ))}
        </div>
      </div>
      {showButton && (
        <BackdropLayout type="add" buttonVisibility={visibilityAddButton}>
          <Card>
            <AddForm addNewInformation={(e) => addNewEducation(e)} />
          </Card>
        </BackdropLayout>
      )}
    </div>
  );
}
