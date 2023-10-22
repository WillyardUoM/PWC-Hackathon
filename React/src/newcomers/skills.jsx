/* eslint-disable no-unused-vars */
import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Slider } from "primereact/slider";
import { useEffect, useState } from "react";
import "./primereactMod.css";
import Skill_slider from "./skill_slider";

//firebase
import { auth } from "../FirebaseComponent/Firebase";
import { db } from "../FirebaseComponent/Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

function SkillsAssessment() {
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
      Skills: skillArray,
    })
      .then(() => {
        console.log("Education data saved to Firestore!");
        navigate("/Career_Goals");
      })
      .catch((error) => {
        console.error("Error saving education data:", error);
      });
  }

  const [skillArray, setSkillArray] = useState([
    {
      id: 1,
      skill: "",
      rate: "",
    },
  ]);

  const [range, setRange] = useState(0);
  const [count, setCount] = useState(2);
  const [skillCode, setSkillCode] = useState([]);

  useEffect(() => {
    if (skillArray.length === 0) {
      // Initialize with one form if the array is empty
      setSkillArray([
        {
          id: 1,
          skill: "",
          rate: "",
        },
      ]);
    }
  }, [skillArray]);

  const addSkill = () => {
    const newSkill = {
      id: count,
      skill: "",
      rate: "",
    };
    setCount(count + 1);
    setSkillArray([...skillArray, newSkill]);
  };

  const deleteSkill = () => {
    if (skillArray.length === 0) {
      return;
    }
    setCount(count - 1);
    const updatedSkillArray = [...skillArray];
    updatedSkillArray.pop();
    setSkillArray(updatedSkillArray);
  };

  const handleInputChange = (id, field, value) => {
    const updatedSkillArray = skillArray.map((skill) => {
      if (skill.id === id) {
        return { ...skill, [field]: value };
      }
      return skill;
    });
    setSkillArray(updatedSkillArray);
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

        <div id="skills" className={prodStyles.eduList}>
          {skillArray.map((skill) => (
            <div
              className="item"
              key={skill.id}
              style={{ marginBottom: "20px" }}
            >
              <div className={prodStyles.eduHead}>
                <h4>Skill {skill.id}</h4>
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
                      onChange={(e) =>
                        handleInputChange(skill.id, "skill", e.target.value)
                      }
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
          ))}
        </div>

        <div className={prodStyles.BackNextBtn}>
          <button style={{ border: "2px solid lightgray" }}>
            <Link to="/experience" style={{ textDecoration: "none" }}>
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
            onClick={saveToDB}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default SkillsAssessment;
