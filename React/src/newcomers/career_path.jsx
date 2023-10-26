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

function CareerPath() {
  const navigate = useNavigate();
  //db
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [currentPos, setCurrentPos] = useState("");
  const [careerAspiration, setCareerAspiration] = useState("");

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

  const handleCurrentPosChange = (e) => {
    setCurrentPos(e.target.value);
  };

  const handleCareerAspirationChange = (e) => {
    setCareerAspiration(e.target.value);
  };

  function saveToDB() {
    const usersCollection = collection(db, "Accounts");
    const docRef = doc(usersCollection, documentId);

    updateDoc(docRef, {
      currentPosition: currentPos,
      careerAspiration: careerAspiration,
    })
      .then(() => {
        navigate("/Course_Completed");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Career Path</h1>
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
              <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
            </div>

            <div id="careerPath" className={prodStyles.eduList}>
              <div className={prodStyles.fields}>
                <div>
                  <span style={{ marginLeft: "10px" }}>
                    Current Position <span style={{ color: "#f85500" }}>*</span>
                  </span>
                  <label htmlFor="currentPos">
                    <input
                      type="text"
                      name="currentPos"
                      id="currentPos"
                      placeholder="Enter your current position"
                      required
                      value={currentPos}
                      onChange={handleCurrentPosChange}
                    />
                  </label>
                </div>
                <div>
                  <span style={{ marginLeft: "10px" }}>
                    Career Aspiration
                    <span style={{ color: "#f85500" }}>*</span>
                  </span>
                  <label htmlFor="careerAspiration">
                    <input
                      type="text"
                      name="careerAspiration"
                      id="careerAspiration"
                      placeholder="Enter your career aspiration"
                      required
                      value={careerAspiration}
                      onChange={handleCareerAspirationChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/Interest" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                form="careerPath"
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

export default CareerPath;
