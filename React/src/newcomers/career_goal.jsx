/* eslint-disable no-unused-vars */
import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { useEffect, useState } from "react";
import "./primereactMod.css";

//firebase
import { auth } from "../FirebaseComponent/Firebase";
import { db } from "../FirebaseComponent/Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

function CareerGoal() {
  let navigate = useNavigate();
  //db
  const [user, setUser] = useState(null);
  const [documentId, setDocumentId] = useState(null);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDocumentId(user.email);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  function saveToDB() {
    const usersCollection = collection(db, "Accounts");
    const docRef = doc(usersCollection, documentId);

    updateDoc(docRef, {
      careerGoals: careerGoalsArray,
    })
      .then(() => {
        console.log("Career Goals data saved to Firestore!");
        navigate("/Others");
      })
      .catch((error) => {
        console.error("Error saving career goals data:", error);
      });
  }

  const [careerGoalsArray, setCareerGoalsArray] = useState([
    {
      careerPath: "",
      timeAllocate: "",
      expSalary: [40000, 60000],
      aspiration: "",
    },
  ]);

  const [range, setRange] = useState([40000, 60000]);

  const handleInputChange = (id, field, value) => {
    const updatedCareerGoalsArray = careerGoalsArray.map((goals) => {
      if (goals.id === id) {
        return { ...goals, [field]: value };
      }
      return goals;
    });
    setCareerGoalsArray(updatedCareerGoalsArray);
  };

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

        <div id="goals" className={prodStyles.eduList}>
          {careerGoalsArray.map((goals) => (
            <div className="item" key={goals.id}>
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
                      onChange={(e) =>
                        handleInputChange(
                          goals.id,
                          "careerPath",
                          e.target.value
                        )
                      }
                    />
                  </label>
                </div>
                <div>
                  <span style={{ marginLeft: "10px" }}>
                    Time to be allocated{" "}
                    <span style={{ color: "#f85500" }}>*</span>
                  </span>
                  <label htmlFor="timeAllocated">
                    <input
                      type="text"
                      name="timeAllocated"
                      id="timeAllocated"
                      placeholder="Enter time in months"
                      required
                      onChange={(e) =>
                        handleInputChange(
                          goals.id,
                          "timeAllocate",
                          e.target.value
                        )
                      }
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
                    onChange={(e) => {
                      setRange(e.value);
                      handleInputChange(goals.id, "expSalary", e.value);
                    }}
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
                      onChange={(e) =>
                        handleInputChange(
                          goals.id,
                          "aspiration",
                          e.target.value
                        )
                      }
                    ></textarea>
                  </label>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={prodStyles.BackNextBtn}>
          <button style={{ border: "2px solid lightgray" }}>
            <Link to="/Skill_Assessment" style={{ textDecoration: "none" }}>
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
            onClick={saveToDB}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default CareerGoal;
