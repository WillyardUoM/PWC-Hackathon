/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { Dropdown } from "primereact/dropdown";
import "./primereactMod.css";
import SlideShow from "./slideshow";
//firebase
import { auth } from "../FirebaseComponent/Firebase";
import { db } from "../FirebaseComponent/Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";

function Education() {
  const navigate = useNavigate();
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
      educations: educationArray,
    })
      .then(() => {
        console.log("Education data saved to Firestore!");
        navigate("/Experience");
      })
      .catch((error) => {
        console.error("Error saving education data:", error);
      });
  }

  //const [selectedDegree, setSelectedDegree] = useState("");
  const [educationArray, setEducationArray] = useState([
    {
      id: 1,
      university: "",
      degree: "",
      field: "",
      cpa: "",
      isEnrolled: false,
    },
  ]);

  const [count, setCount] = useState(2);

  const degreeOptions = [
    { label: "Undergraduate", value: "Bachelor" },
    { label: "Masters", value: "Master" },
  ];

  useEffect(() => {
    if (educationArray.length === 0) {
      // Initialize with one form if the array is empty
      setEducationArray([
        {
          id: 1,
          university: "",
          degree: "",
          field: "",
          cpa: "",
          isEnrolled: false,
        },
      ]);
    }
  }, [educationArray]);

  const addEducation = () => {
    const newEducation = {
      id: count,
      university: "",
      degree: "",
      field: "",
      cpa: "",
      isEnrolled: false,
    };
    setCount(count + 1);
    setEducationArray([...educationArray, newEducation]);
  };

  const deleteEducation = () => {
    if (educationArray.length === 0) {
      return;
    }
    setCount(count - 1);
    const updatedEducationArray = [...educationArray];
    updatedEducationArray.pop();
    setEducationArray(updatedEducationArray);
  };

  const handleInputChange = (id, field, value) => {
    const updatedEducationArray = educationArray.map((education) => {
      if (education.id === id) {
        return { ...education, [field]: value };
      }
      return education;
    });
    setEducationArray(updatedEducationArray);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Educational Background</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                80% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={80} />
            </div>

            <div id="education" className={prodStyles.eduList}>
              {educationArray.map((education) => (
                <div className="item" key={education.id}>
                  <div className={prodStyles.eduHead}>
                    <h4>Education {education.id}</h4>
                  </div>
                  <div className={prodStyles.fields}>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        School or University{" "}
                        <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="school">
                        <input
                          type="text"
                          name="school"
                          id="school"
                          placeholder="Enter your school name"
                          value={education.school}
                          onChange={(e) =>
                            handleInputChange(
                              education.id,
                              "university",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                    </div>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        Degree <span style={{ color: "#F85500" }}>*</span>
                      </span>
                      <label htmlFor="degree">
                        <Dropdown
                          value={education.degree}
                          onChange={(e) =>
                            handleInputChange(education.id, "degree", e.value)
                          }
                          options={degreeOptions}
                          optionLabel="label"
                          placeholder="Select your Degree/Certification"
                          className={styles.dropdown}
                        />
                      </label>
                    </div>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        Field of Study{" "}
                        <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="field">
                        <input
                          type="text"
                          name="field"
                          id="field"
                          placeholder="Enter Study field"
                          value={education.field}
                          onChange={(e) =>
                            handleInputChange(
                              education.id,
                              "field",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                    </div>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        CPA <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="cpa">
                        <input
                          type="number"
                          name="cpa"
                          id="cpa"
                          placeholder="Enter your CPA"
                          value={education.cpa}
                          onChange={(e) =>
                            handleInputChange(
                              education.id,
                              "cpa",
                              e.target.value
                            )
                          }
                          required
                        />
                      </label>
                    </div>
                  </div>
                  <div>
                    <label htmlFor={`enroll-${education.id}`}>
                      <input
                        type="checkbox"
                        name={`enroll-${education.id}`}
                        id={`enroll-${education.id}`}
                        checked={education.isEnrolled}
                        onChange={(e) =>
                          handleInputChange(
                            education.id,
                            "isEnrolled",
                            e.target.checked
                          )
                        }
                      />
                      <span>I am currently enrolled in this course</span>
                    </label>
                  </div>
                </div>
              ))}
            </div>

            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/upload_resume" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                onClick={deleteEducation}
                style={{ color: "#F85500", border: "2px solid #F85500" }}
              >
                Delete Education
              </button>
              <button onClick={addEducation}>Add Another</button>
              <button
                form="education"
                type="submit"
                onClick={saveToDB}
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
        </div>
        <div className={styles.right_side}>
          <SlideShow />
        </div>
      </div>
    </>
  );
}

export default Education;
