import Login from "./login";
import styles from "./newcomers.module.css";
import { HashRouter as Router, Route, Routes} from 'react-router-dom';
import SlideShow from "./slideshow";
import Register from "./register";
import Proceed from "./proceed";


function NewComers() {
  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
            <Routes>
              <Route exact path="/" element={<Proceed/>} />
              <Route path="/Register" element={<Register/>} />
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
