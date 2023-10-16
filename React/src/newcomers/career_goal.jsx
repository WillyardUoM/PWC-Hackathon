import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Outlet, Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { useState } from "react";
import "./primereactMod.css";

function CareerGoal() {
  const [range, setRange] = useState([40000, 60000]);

  return (
    <>
      <div className={prodStyles.proceed}>
        <h1>Career Goals</h1>
        <p style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
        </p>
        <div className={prodStyles.progressBar}>
          <span style={{ color: "gray", fontSize: "14px" }}>80% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
        </div>

        <form id="goals" className={prodStyles.eduList}>
          <div className={prodStyles.fields}>
            <div>
              <span style={{ marginLeft: "10px" }}>
                Desired job title / Career path{" "}
                <span style={{ color: "#f85500" }}>*</span>
              </span>
              <label htmlFor="desiredTitle">
                <input
                  type="text"
                  name="desiredTitle"
                  id="desiredTitle"
                  placeholder="Enter your desired job title"
                  required
                />
              </label>
            </div>
            <div>
              <span style={{ marginLeft: "10px" }}>
                Time to be allocated <span style={{ color: "#f85500" }}>*</span>
              </span>
              <label htmlFor="timeAllocated">
                <input
                  type="text"
                  name="timeAllocated"
                  id="timeAllocated"
                  placeholder="Enter time in months"
                  required
                />
              </label>
            </div>
            <div style={{ margin: "5px 0 15px 0", flex: "100%" }}>
              <span style={{ width: "100%" }}>Expected salary range</span>
              <br />
              <input
                name="expectSalary"
                id="expectSalary"
                style={{
                  color: "gray",
                  fontSize: "14px",
                  marginBottom: "10px",
                  backgroundColor: "transparent",
                }}
                disabled
                value={"Rs " + range[0] + " - Rs " + range[1]}
              />
              <Slider
                max={200000}
                value={range}
                onChange={(e) => setRange(e.value)}
                style={{ width: "100%" }}
                range
                step={1000}
              />
            </div>
            <div>
              <span>Long-term career aspiration</span>
              <label htmlFor="salaryRange">
                <textarea
                  name="salaryRange"
                  id="salaryRange"
                  rows={3}
                  style={{ width: "100%" }}
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
            form="goals"
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

export default CareerGoal;
