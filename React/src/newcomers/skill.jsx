import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { useEffect, useState } from "react";
import "./primereactMod.css";
import SlideShow from "./slideshow";
//firebase
import { auth } from "../FirebaseComponent/Firebase";
import { db } from "../FirebaseComponent/Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

function Skill() {
  const navigate = useNavigate();
  //db
  // eslint-disable-next-line no-unused-vars
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
      skill: skillArray,
    })
      .then(() => {
        navigate("/Project_Completed");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const [skillArray, setSkillArray] = useState([
    {
      id: 1,
      softSkill: "",
      techSkill: "",
    },
  ]);

  const [count, setCount] = useState(2);

  useEffect(() => {
    if (skillArray.length === 0) {
      setSkillArray([
        {
          id: 1,
          softSkill: "",
          techSkill: "",
        },
      ]);
    }
  }, [skillArray]);

  const addSkill = () => {
    const newSkill = {
      id: count,
      softSkill: "",
      techSkill: "",
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
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Skill Assessment</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                50% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={50}></ProgressBar>
            </div>

            <div id="skill" className={prodStyles.eduList}>
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
                        Soft Skill Name{" "}
                        <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="softSkill">
                        <input
                          type="text"
                          name="softSkill"
                          id="softSkill"
                          placeholder="Enter soft skill name"
                          required
                          onChange={(e) =>
                            handleInputChange(
                              skill.id,
                              "softSkill",
                              e.target.value
                            )
                          }
                        />
                      </label>
                    </div>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        Technical Skill Name{" "}
                        <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="techSkill">
                        <input
                          type="text"
                          name="techSkill"
                          id="techSkill"
                          placeholder="Enter technical skill name"
                          required
                          onChange={(e) =>
                            handleInputChange(
                              skill.id,
                              "techSkill",
                              e.target.value
                            )
                          }
                        />
                      </label>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/Experience" style={{ textDecoration: "none" }}>
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
                form="skill"
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
        </div>
        <div className={styles.right_side}>
          <SlideShow />
        </div>
      </div>
    </>
  );
}

export default Skill;
