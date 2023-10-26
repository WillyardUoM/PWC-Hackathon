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

function ProjectCompleted() {
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
      projects: projectArray,
    })
      .then(() => {
        navigate("/Interest");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const [projectArray, setProjectArray] = useState([
    {
      id: 1,
      projectName: "",
    },
  ]);

  const [count, setCount] = useState(2);

  useEffect(() => {
    if (projectArray.length === 0) {
      setProjectArray([
        {
          id: 1,
          projectName: "",
        },
      ]);
    }
  }, [projectArray]);

  const addProject = () => {
    const newProject = {
      id: count,
      projectName: "",
    };
    setCount(count + 1);
    setProjectArray([...projectArray, newProject]);
  };

  const deleteProject = () => {
    if (projectArray.length === 0) {
      return;
    }
    setCount(count - 1);
    const updatedProjectArray = [...projectArray];
    updatedProjectArray.pop();
    setProjectArray(updatedProjectArray);
  };

  const handleInputChange = (id, field, value) => {
    const updatedProjectArray = projectArray.map((project) => {
      if (project.id === id) {
        return { ...project, [field]: value };
      }
      return project;
    });
    setProjectArray(updatedProjectArray);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Projects Completed</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                60% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={60}></ProgressBar>
            </div>

            <div id="projects" className={prodStyles.eduList}>
              {projectArray.map((project) => (
                <div
                  className="item"
                  key={project.id}
                  style={{ marginBottom: "20px" }}
                >
                  <div className={prodStyles.eduHead}>
                    <h4>Project {project.id}</h4>
                  </div>
                  <div className={prodStyles.fields}>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        Project Name <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="project">
                        <input
                          type="text"
                          name="project"
                          id="project"
                          placeholder="Enter project name"
                          required
                          onChange={(e) =>
                            handleInputChange(
                              project.id,
                              "projectName",
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
                <Link to="/Skill" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                onClick={deleteProject}
                style={{ color: "#F85500", border: "2px solid #F85500" }}
              >
                Delete Project
              </button>
              <button onClick={addProject}>Add Another</button>
              <button
                form="projects"
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

export default ProjectCompleted;
