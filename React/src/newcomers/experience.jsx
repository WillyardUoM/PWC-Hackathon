import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Outlet, Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import "./primereactMod.css";

function Experience() {
  const [workCode, setWorkCode] = useState([]);
  const [count, setCount] = useState(2);

  const addWorkExp = () => {
    setCount((prevCount) => prevCount + 1);
    const newWorkExp = (
      <div className="item" key={count}>
        <div className={prodStyles.eduHead}>
          <h4>Work Experinece {count}</h4>
        </div>
        <div className={prodStyles.fields}>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Job Title <span style={{ color: "#f85500" }}>*</span>
            </span>
            <label htmlFor="jobTitle">
              <input
                type="text"
                name="jobTitle"
                id="jobTitle"
                placeholder="Enter your job title"
                required
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Company <span style={{ color: "#f85500" }}>*</span>
            </span>
            <label htmlFor="company">
              <input
                type="text"
                name="company"
                id="company"
                placeholder="Enter your company name"
                required
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Experience <span style={{ color: "#f85500" }}>*</span>
            </span>
            <label htmlFor="exp">
              <input
                type="number"
                name="exp"
                id="exp"
                placeholder="Enter experience in years"
                required
              />
            </label>
          </div>
        </div>
        <div>
          <label htmlFor="enroll">
            <input type="checkbox" name="enroll" id="enroll" />
            <span>I currently work here</span>
          </label>
        </div>
      </div>
    );
    setWorkCode([...workCode, newWorkExp]);
  };

  const deleteWorkExperience = () => {
    const workExpList = document.getElementsByClassName("item");
    if (workExpList.length == 0) {
      return;
    }
    setCount(count - 1);
    workExpList[workExpList.length - 1].remove();
  };

  return (
    <>
      <div className={prodStyles.proceed}>
        <h1>Work Experience</h1>
        <p style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
        </p>
        <div className={prodStyles.progressBar}>
          <span style={{ color: "gray", fontSize: "14px" }}>80% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
        </div>

        <form id="experience" className={prodStyles.eduList}>
          <div>
            <div className={prodStyles.eduHead}>
              <h4>Work Experinece 1</h4>
            </div>
            <div className={prodStyles.fields}>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Job Title <span style={{ color: "#f85500" }}>*</span>
                </span>
                <label htmlFor="jobTitle">
                  <input
                    type="text"
                    name="jobTitle"
                    id="jobTitle"
                    placeholder="Enter your job title"
                    required
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Company <span style={{ color: "#f85500" }}>*</span>
                </span>
                <label htmlFor="company">
                  <input
                    type="text"
                    name="company"
                    id="company"
                    placeholder="Enter your company name"
                    required
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Experience <span style={{ color: "#f85500" }}>*</span>
                </span>
                <label htmlFor="exp">
                  <input
                    type="number"
                    name="exp"
                    id="exp"
                    placeholder="Enter experience in years"
                    required
                  />
                </label>
              </div>
            </div>
            <div>
              <label htmlFor="enroll">
                <input type="checkbox" name="enroll" id="enroll" />
                <span>I currently work here</span>
              </label>
            </div>
          </div>
          {workCode}
        </form>

        <div className={prodStyles.BackNextBtn}>
          <button style={{ border: "2px solid lightgray" }}>
            <Link to="/proceed" style={{ textDecoration: "none" }}>
              Go Back
            </Link>
          </button>
          <button
            onClick={deleteWorkExperience}
            style={{ color: "#F85500", border: "2px solid #F85500" }}
          >
            Delete Work EXP
          </button>
          <button onClick={addWorkExp}>Add Another</button>
          <button
            form="experience"
            type="submit"
            style={{
              color: "white",
              border: "none",
              backgroundColor: "#1E1E1E",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default Experience;
