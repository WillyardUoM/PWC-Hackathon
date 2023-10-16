import prodStyles from "./proceed.module.css";
import { Outlet, Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import "./primereactMod.css";

function Others() {
  return (
    <>
      <div className={prodStyles.proceed}>
        <h1>Others</h1>
        <p style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
        </p>
        <div className={prodStyles.progressBar}>
          <span style={{ color: "gray", fontSize: "14px" }}>80% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
        </div>

        <form id="others" className={prodStyles.eduList}>
          <div className={prodStyles.fields}>
            <div>
              <span>
                <b>Motivation and Commitment</b>
              </span>
              <label htmlFor="motiv">
                <textarea
                  name="motiv"
                  id="motiv"
                  rows={3}
                  style={{ width: "100%" }}
                  required
                  placeholder="Why do you want to pursue this career path?&#10;What are your short-term and long-term goals?"
                ></textarea>
              </label>
            </div>
            <div style={{ flex: "100%" }}>
              <span>
                <b>Challenges and Concerns</b>
              </span>
              <label htmlFor="challenge">
                <textarea
                  name="challenge"
                  id="challenge"
                  rows={3}
                  style={{ width: "100%" }}
                  required
                  placeholder="Any specific challenges, concerns, or obstacles that should be considered in the plan"
                ></textarea>
              </label>
            </div>
            <div>
              <span>
                <b>Additional Comments or Preferences</b>
              </span>
              <label htmlFor="additional">
                <textarea
                  name="additional"
                  id="additional"
                  rows={3}
                  style={{ width: "100%" }}
                  placeholder="Any other information or specific preferences the user want to provide"
                ></textarea>
              </label>
            </div>
          </div>
        </form>

        <div className={prodStyles.BackNextBtn}>
          <button style={{ border: "2px solid lightgray" }}>
            <Link to="/proceed" style={{ textDecoration: "none" }}>
              Go Back
            </Link>
          </button>
          <button
            form="others"
            type="submit"
            style={{
              color: "white",
              border: "none",
              backgroundColor: "#1E1E1E",
            }}
          >
            Submit
          </button>
        </div>
      </div>
    </>
  );
}

export default Others;
