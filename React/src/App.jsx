/* eslint-disable no-unused-vars */
import { HashRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import Education from "./newcomers/education";
import Experience from "./newcomers/experience";
import CareerGoal from "./newcomers/career_goal";
import LinkedInURL from "./newcomers/linkedinURL";
import Academy from "./Academy/Academy";
import React, { useState } from "react";
import styles from "./newcomers/newcomers.module.css";
import SlideShow from "./newcomers/slideshow";
import { SLayout, SMain } from "./Dashboard/components/Layout/styles";
import Sidebar from "./Dashboard/components/Sidebar/Sidebar";
import HomePage from "./Dashboard/pages/HomePage";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "./Dashboard/styles/theme";
import "./Dashboard/styles/globalStyles";
import "./Dashboard/styleOver.css";
import Register from "./newcomers/register";
import Proceed from "./newcomers/proceed";
import UploadResume from "./newcomers/upload_resume";
import SkillsAssessment from "./newcomers/skills";
import Others from "./newcomers/other";
import Login from "./newcomers/login";
import Profile from "./Dashboard/pages/profile";
import Chatbox from "./Dashboard/pages/Chatbot/chatbot";
import Logout from "./FirebaseComponent/Logout";
export const ThemeContext = React.createContext(null);

function App() {
  const [theme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route exact path="/Proceed" element={<Proceed />} />
          <Route path="/Upload_Resume" element={<UploadResume />} />
          <Route exact path="/Education" element={<Education />} />
          <Route exact path="/Experience" element={<Experience />} />
          <Route exact path="/Career_Goals" element={<CareerGoal />} />
          <Route
            exact
            path="/Skill_Assessment"
            element={<SkillsAssessment />}
          />
          <Route exact path="/Others" element={<Others />} />
          <Route exact path="/LinkedinUrl" element={<LinkedInURL />} />
        </Routes>

        <Routes>
          <Route path="/Dashboard" element={<HomePage />} />
          <Route path="/Academy" element={<Academy />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Chatbox" element={<Chatbox />} />
          <Route path="/Logout" element={<Logout />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
