import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Outlet, Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import "./other.css";

function Proceed() {
  return (
    <>
      <div className={styles.login}>
        <h1>How would you like to proceed</h1>
        <div className={prodStyles.progressBar}>
          <span style={{ color: "gray" }}>10% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={10}></ProgressBar>
        </div>
        <div className={prodStyles.methods}>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <i class="fa-regular fa-file-lines"></i>
              <h3>Form Format</h3>
              <span>Enter your details manually in a form</span>
            </Link>
          </div>
          <div>
            <Link to="/" style={{ textDecoration: "none" }}>
              <i class="fa-regular fa-file-lines"></i>
              <h3>Form Format</h3>
              <span>Enter your details manually in a form</span>
            </Link>
          </div>
        </div>
        <input type="button" value={"Next"} />
      </div>
    </>
  );
}

export default Proceed;
