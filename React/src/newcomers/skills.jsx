import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Outlet, Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { useState } from "react";
import "./primereactMod.css";
import Skill_slider from "./skill_slider";

function SkillsAssessment() {
  const [range, setRange] = useState(0);
  const [count, setCount] = useState(2);
  const [skillCode, setSkillCode] = useState([]);

  const addSkill = () => {
    setCount((prevCount) => prevCount + 1);
    const newSkill = (
      <div className="item" style={{ marginBottom: "20px" }}>
        <div className={prodStyles.eduHead}>
          <h4>Skill {count}</h4>
        </div>
        <div className={prodStyles.fields}>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Skill name <span style={{ color: "#f85500" }}>*</span>
            </span>
            <label htmlFor="skill">
              <input
                type="text"
                name="skill"
                id="skill"
                placeholder="Enter the skill name"
                required
              />
            </label>
          </div>
          <div style={{ flex: "100%" }}>
            <span>
              <b>Rate your Skill</b>
            </span>
            <Skill_slider />
          </div>
        </div>
      </div>
    );
    setSkillCode([...skillCode, newSkill]);
  };

  const deleteSkill = () => {
    const skillList = document.getElementsByClassName("item");
    if (skillList.length == 0) {
      return;
    }
    setCount(count - 1);
    skillList[skillList.length - 1].remove();
  };

  return (
    <>
      <div className={prodStyles.proceed}>
        <h1>Skill Assessment</h1>
        <p style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
        </p>
        <div className={prodStyles.progressBar}>
          <span style={{ color: "gray", fontSize: "14px" }}>80% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
        </div>

        <form id="skills" className={prodStyles.eduList}>
          <div style={{ marginBottom: "20px" }}>
            <div className={prodStyles.eduHead}>
              <h4>Skill 1</h4>
            </div>
            <div className={prodStyles.fields}>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Skill name <span style={{ color: "#f85500" }}>*</span>
                </span>
                <label htmlFor="skill">
                  <input
                    type="text"
                    name="skill"
                    id="skill"
                    placeholder="Enter the skill name"
                    required
                  />
                </label>
              </div>
              <div style={{ flex: "100%" }}>
                <span>
                  <b>Rate your Skill</b>
                </span>
                <Skill_slider />
              </div>
            </div>
          </div>
          {skillCode}
        </form>

        <div className={prodStyles.BackNextBtn}>
          <button style={{ border: "2px solid lightgray" }}>
            <Link to="/proceed" style={{ textDecoration: "none" }}>
              Go Back
            </Link>
          </button>
          <button
            onClick={deleteSkill}
            style={{ color: "#F85500", border: "2px solid #F85500" }}
          >
            Delete Skill
          </button>
          <button onClick={addSkill}>Add Another</button>
          <button
            form="skills"
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

export default SkillsAssessment;
