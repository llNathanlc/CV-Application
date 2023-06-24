import React, { useState } from "react";
import BackdropLayout from "./backdropLayout";
import Card from "../display/card";
import AddInformation from "../display/addInformation";
import AddForm from "../inputs/addForm";

const bulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Developed a REST API using Fast API and PostgreSQL to store data from learning management systems",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint:
      "Developted a full-stack web application using Flask, React, PostgreSQL and Docker to analyze GitHub data",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint:
      "Explored ways to visualize Github collaboration in a classroom setting",
  },
];

const secondBulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Communicate with managers to set up campus computers used on campus",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint:
      "Asses and troubleshoot computer problems brought by students, faculty and staff",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint:
      "Maintain upkeep of computers, classroom equipment, and 200 printers across campus",
  },
];

const example = [
  {
    id: 0,
    key: "firstExample",
    experience: (
      <AddInformation
        name="Undergraduate Research Assistant"
        date="June 2020 - Present"
        information="Texas A&M University"
        place="College Station, TX"
        bulletPoints={bulletPoints}
      />
    ),
  },
  {
    id: 1,
    key: "secondExample",
    experience: (
      <AddInformation
        name="Information Technology Support Specialist"
        date="Sep. 2018 - Present"
        information="Southwestern University"
        place="Georgetown, TX"
        bulletPoints={secondBulletPoints}
      />
    ),
  },
];

let counter = 1;

function Experience() {
  const [showButton, setShowButton] = useState(true);

  const [experienceList, setExperienceList] = useState(example);

  function handleDelete(id) {
    setExperienceList(experienceList.filter((ex) => ex.id !== id));
  }

  function addNewExperience(e) {
    const newList = [
      ...experienceList.slice(0),
      { id: (counter += 1), key: (counter += 1), experience: e },
    ];
    setExperienceList(newList);
  }

  return (
    <div id="experience">
      <div>
        <h3 className="sectionTitle">EXPERIENCE</h3>
        <div className="informationContainer">
          {experienceList.map(({ id, key, experience }) => (
            <div key={key} id={key}>
               <button
                type="button"
                onClick={() => handleDelete(id)}
                className="printVisibility deleteSectionButton"
              >
                -
              </button>
              {experience}
            </div>
          ))}
        </div>
      </div>
      {showButton && (
        <BackdropLayout type="add">
          <Card>
            <AddForm addNewInformation={(e) => addNewExperience(e)} />
          </Card>
        </BackdropLayout>
      )}
    </div>
  );
}

export default Experience;
