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
      "Developed a full-stack web application using Flasj serving a REST API with React as the frontend",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint: "Implemented GitHub OAuth to get data from user's repositores",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint: "Visualized GitHub data to show collaboration",
  },
  {
    id: 3,
    key: "fourthBulletPoint",
    bulletPoint: "Used Celery and Redis for asynchonous tasks",
  },
];

const secondBulletPoints = [
  {
    id: 0,
    key: "firstBulletPoint",
    bulletPoint:
      "Developed a Minecraft server plugin to entertain kids during free time for a previous job",
  },
  {
    id: 1,
    key: "secondBulletPoint",
    bulletPoint:
      "Published plugin to websites gaining 2K+ downloads and an average 4.5/5-star review",
  },
  {
    id: 2,
    key: "thirdBulletPoint",
    bulletPoint:
      "Implemented continous delivery using TravisCI to build the plugin upon a new release",
  },
  {
    id: 3,
    key: "fourthBulletPoint",
    bulletPoint:
      "Collaborated with Minecraft server administrators to suggest features and get feedback about the plugin",
  },
];

const example = [
  {
    id: 0,
    key: "firstExample",
    project: (
      <AddInformation
        name="Giglytics"
        date="June 2020 - Present"
        information="Python, Flask, React, PostgreSQL, Docker"
        place=""
        bulletPoints={bulletPoints}
      />
    ),
  },
  {
    id: 1,
    key: "secondExample",
    project: (
      <AddInformation
        name="Simple Paintball"
        date="May 2018 - May 2020"
        information="Spigot API, Java, Maven, TravicCI, Git"
        place=""
        bulletPoints={secondBulletPoints}
      />
    ),
  },
];

let counter = 1;

function Projects() {
  const [showButton, setShowButton] = useState(true);

  const [projectList, setProjectList] = useState(example);

  function handleDelete(id) {
    setProjectList(projectList.filter((ex) => ex.id !== id));
  }

  function addNewProject(e) {
    const newList = [
      ...projectList.slice(0),
      { id: (counter += 1), key: (counter += 1), project: e },
    ];
    setProjectList(newList);
  }

  return (
    <div id="project">
      <div>
        <h3 className="sectionTitle">PROJECTS</h3>
        <div className="informationContainer">
          {projectList.map(({ id, key, project }) => (
            <div key={key} id={key} className="section">
              <button
                type="button"
                onClick={() => handleDelete(id)}
                className="printVisibility deleteSectionButton"
              >
                -
              </button>
              {project}
            </div>
          ))}
        </div>
      </div>
        {showButton && (
          <BackdropLayout type="add">
            <Card>
              <AddForm addNewInformation={(e) => addNewProject(e)} />
            </Card>
          </BackdropLayout>
        )}
    </div>
  );
}

export default Projects;
