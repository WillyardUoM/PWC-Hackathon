import Login from "./login";
import styles from "./newcomers.module.css";
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import SlideShow from "./slideshow";
import Register from "./register";
import Proceed from "./proceed";
import UploadResume from "./upload_resume";
import Education from "./education";
import Experience from "./experience";
import CareerGoal from "./career_goal";
import SkillsAssessment from "./skills";
import Others from "./other";
import LinkedInURL from "./linkedinURL";


function NewComers() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
            <Routes>
              <Route exact path="/" element={<Login/>} />
              <Route path="/Register" element={<Register/>} />
              <Route exact path="/Proceed" element={<Proceed/>} />
              <Route path="/Upload_Resume" element={<UploadResume/>} />
              <Route exact path="/Education" element={<Education/>} />
              <Route exact path="/Experience" element={<Experience/>} />
              <Route exact path="/Career_Goals" element={<CareerGoal/>} />
              <Route exact path="/Skill_Assessment" element={<SkillsAssessment/>} />
              <Route exact path="/Others" element={<Others/>} />
              <Route exact path="/LinkedinUrl" element={<LinkedInURL/>} />
            </Routes>
        </div>
        <div className={styles.right_side}>
          <SlideShow/>
        </div>
      </div>
    </>
  );
}

export default NewComers;
