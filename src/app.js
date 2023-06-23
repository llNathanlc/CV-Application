import React from "react";
import Information from "./components/layouts/information";
import Education from "./components/layouts/education";
import Experience from "./components/layouts/experience";
import Projects from "./components/layouts/projects";
import Skills from "./components/layouts/skills";
import "./components/layouts/parts.css";
import "./app.css";

function App() {
  return (
    <div id="page">
      <Information />
      <Education />
      <Experience />
      <Projects />
      <Skills />
    </div>
  );
}

export default App;
