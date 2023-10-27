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

function CourseCompleted() {
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
      courses: courseArray,
    })
      .then(() => {
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const [courseArray, setCourseArray] = useState([
    {
      id: 1,
      courseName: "",
    },
  ]);

  const [count, setCount] = useState(2);

  useEffect(() => {
    if (courseArray.length === 0) {
      setCourseArray([
        {
          id: 1,
          courseName: "",
        },
      ]);
    }
  }, [courseArray]);

  const addCourse = () => {
    const newCourse = {
      id: count,
      courseName: "",
    };
    setCount(count + 1);
    setCourseArray([...courseArray, newCourse]);
  };

  const deleteCourse = () => {
    if (courseArray.length === 0) {
      return;
    }
    setCount(count - 1);
    const updatedCourserray = [...courseArray];
    updatedCourserray.pop();
    setCourseArray(updatedCourserray);
  };

  const handleInputChange = (id, field, value) => {
    const updatedCourserray = courseArray.map((course) => {
      if (course.id === id) {
        return { ...course, [field]: value };
      }
      return course;
    });
    setCourseArray(updatedCourserray);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Courses Completed</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                90% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={90}></ProgressBar>
            </div>

            <div id="courses" className={prodStyles.eduList}>
              {courseArray.map((course) => (
                <div
                  className="item"
                  key={course.id}
                  style={{ marginBottom: "20px" }}
                >
                  <div className={prodStyles.eduHead}>
                    <h4>Course {course.id}</h4>
                  </div>
                  <div className={prodStyles.fields}>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        Course Name <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="course">
                        <input
                          type="text"
                          name="course"
                          id="course"
                          placeholder="Enter course name"
                          required
                          onChange={(e) =>
                            handleInputChange(
                              course.id,
                              "courseName",
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
                <Link to="/Career_Path" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                onClick={deleteCourse}
                style={{ color: "#F85500", border: "2px solid #F85500" }}
              >
                Delete Course
              </button>
              <button onClick={addCourse}>Add Another</button>
              <button
                form="courses"
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

export default CourseCompleted;
