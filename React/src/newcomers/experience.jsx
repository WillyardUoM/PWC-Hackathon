import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { collection, doc, updateDoc } from "firebase/firestore";
import { auth, db } from "../FirebaseComponent/Firebase";
import prodStyles from "./proceed.module.css";
import styles from "./newcomers.module.css";
import SlideShow from "./slideshow";

function Experience() {
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
      experiences: experienceArray,
    })
      .then(() => {
        navigate("/Skill");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const [experienceArray, setExperienceArray] = useState([
    {
      id: 1,
      jobTitle: "",
      company: "",
      exp: "",
      isCurrent: false,
    },
  ]);

  const [count, setCount] = useState(2);

  useEffect(() => {
    if (experienceArray.length === 0) {
      setExperienceArray([
        {
          id: 1,
          jobTitle: "",
          company: "",
          exp: "",
          isCurrent: false,
        },
      ]);
    }
  }, [experienceArray]);

  const addWorkExp = () => {
    setCount((prevCount) => prevCount + 1);
    const newExp = {
      id: count,
      jobTitle: "",
      company: "",
      exp: "",
      isCurrent: false,
    };
    setCount(count + 1);
    setExperienceArray([...experienceArray, newExp]);
  };

  const deleteWorkExp = () => {
    if (experienceArray.length === 0) {
      return;
    }
    setCount(count - 1);
    const updatedExperienceArray = [...experienceArray];
    updatedExperienceArray.pop();
    setExperienceArray(updatedExperienceArray);
  };

  const handleInputChange = (id, field, value) => {
    const updatedExperienceArray = experienceArray.map((experience) => {
      if (experience.id === id) {
        return { ...experience, [field]: value };
      }
      return experience;
    });
    setExperienceArray(updatedExperienceArray);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Work Experience</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                40% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={40}></ProgressBar>
            </div>

            <div id="experience" className={prodStyles.eduList}>
              <div>
                {experienceArray.map((experience) => (
                  <div className="item" key={experience.id}>
                    <div className={prodStyles.eduHead}>
                      <h4>Work Experience {experience.id}</h4>
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
                            onChange={(e) =>
                              handleInputChange(
                                experience.id,
                                "jobTitle",
                                e.target.value
                              )
                            }
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
                            onChange={(e) =>
                              handleInputChange(
                                experience.id,
                                "company",
                                e.target.value
                              )
                            }
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
                            onChange={(e) =>
                              handleInputChange(
                                experience.id,
                                "exp",
                                e.target.value
                              )
                            }
                          />
                        </label>
                      </div>
                    </div>
                    <div>
                      <label htmlFor={`enroll-${experience.id}`}>
                        <input
                          type="checkbox"
                          name={`enroll-${experience.id}`}
                          id={`enroll-${experience.id}`}
                          checked={experience.isCurrent}
                          onChange={(e) =>
                            handleInputChange(
                              experience.id,
                              "isCurrent",
                              e.target.checked
                            )
                          }
                        />
                        <span>I currently work here</span>
                      </label>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/Education" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                onClick={deleteWorkExp}
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

export default Experience;
