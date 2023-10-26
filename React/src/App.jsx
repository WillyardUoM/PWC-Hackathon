import { HashRouter, Route, Routes } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";
import Education from "./newcomers/education";
import Experience from "./newcomers/experience";
import LinkedInURL from "./newcomers/linkedinURL";
import Academy from "./Academy/Academy";
import React, { useState } from "react";
import HomePage from "./Dashboard/pages/Homepage/HomePage";
import { darkTheme, lightTheme } from "./Dashboard/styles/theme";
import "./Dashboard/styles/globalStyles";
import "./Dashboard/styleOver.css";
import Register from "./newcomers/register";
import Proceed from "./newcomers/proceed";
import UploadResume from "./newcomers/upload_resume";
import Login from "./newcomers/login";
import Profile from "./Dashboard/pages/profile";
import Chatbox from "./Dashboard/pages/Chatbot/chatbot";
import Logout from "./FirebaseComponent/Logout";
import CalendarMain from "./Dashboard/pages/calendarMain";
import Interest from "./newcomers/interest";
import CareerPath from "./newcomers/career_path";
import ProjectCompleted from "./newcomers/project_completed";
import CourseCompleted from "./newcomers/course_completed";
import Skill from "./newcomers/skill";
import Loading from "./Loader/logos";
export const ThemeContext = React.createContext(null);

function App() {
  const [theme] = useState("light");
  // eslint-disable-next-line no-unused-vars
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  return (
    <>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Loading />} />
          <Route path="/Login" element={<Login />} />
          <Route path="/Register" element={<Register />} />
          <Route exact path="/Proceed" element={<Proceed />} />
          <Route exact path="/LinkedinUrl" element={<LinkedInURL />} />
          <Route path="/Upload_Resume" element={<UploadResume />} />
          <Route exact path="/Education" element={<Education />} />
          <Route exact path="/Experience" element={<Experience />} />
          <Route exact path="/Skill" element={<Skill />} />
          <Route
            exact
            path="/Project_Completed"
            element={<ProjectCompleted />}
          />
          <Route exact path="/Interest" element={<Interest />} />
          <Route exact path="/Career_Path" element={<CareerPath />} />
          <Route exact path="/Course_Completed" element={<CourseCompleted />} />
        </Routes>

        <Routes>
          <Route path="/Dashboard" element={<HomePage />} />
          <Route path="/Academy" element={<Academy />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Chatbox" element={<Chatbox />} />
          <Route path="/Logout" element={<Logout />} />
          <Route path="/Calendar" element={<CalendarMain />} />
        </Routes>
      </HashRouter>
    </>
  );
}

export default App;
