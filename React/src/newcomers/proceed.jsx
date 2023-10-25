/* eslint-disable no-unused-vars */
import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import "./primereactMod.css";
import SlideShow from "./slideshow";

function Proceed() {
  const navigate = useNavigate();

  function goTo() {
    navigate("/education");
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>How would you like to proceed</h1>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray" }}>10% Completed</span>
              <ProgressBar style={{ height: "15px" }} value={10}></ProgressBar>
            </div>
            <div className={prodStyles.methods}>
              <div>
                <Link to="/LinkedinUrl" style={{ textDecoration: "none" }}>
                  <i className="fa-brands fa-linkedin-in"></i>
                  <h3>LinkedIn Url</h3>
                  <span>Retrieve information via LinkedIn</span>
                </Link>
              </div>
              <div>
                <Link to="/Education" style={{ textDecoration: "none" }}>
                  <i className="fa-regular fa-file-lines"></i>
                  <h3>Form Format</h3>
                  <span>Enter your details manually in a form</span>
                </Link>
              </div>
              <div>
                <Link to="/Upload_Resume" style={{ textDecoration: "none" }}>
                  <i className="fa-regular fa-file-pdf"></i>
                  <h3>Resume Scanner</h3>
                  <span>Upload Resume and retrieve information</span>
                </Link>
              </div>
            </div>
            <button
              style={{ margin: "0" }}
              className={prodStyles.nextBtn}
              onClick={goTo}
            >
              Next
            </button>
          </div>
        </div>
        <div className={styles.right_side}>
          <SlideShow />
        </div>
      </div>
    </>
  );
}

export default Proceed;
