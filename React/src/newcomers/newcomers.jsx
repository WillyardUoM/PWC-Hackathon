import Login from "./login";
import styles from "./newcomers.module.css";
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import SlideShow from "./slideshow";
import Register from "./register";
import Proceed from "./proceed";
import UploadResume from "./upload_resume";
import Education from "./education";
import Experience from "./experience";


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
