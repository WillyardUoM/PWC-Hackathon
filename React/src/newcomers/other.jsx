/* eslint-disable no-unused-vars */
import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import "./primereactMod.css";
import styles from "./newcomers.module.css";
import SlideShow from "./slideshow";
//firebase
import { auth } from "../FirebaseComponent/Firebase";
import { db } from "../FirebaseComponent/Firebase";
import { collection, doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";

function Others() {
  const navigate = useNavigate();
  //db
  const [user, setUser] = useState(null);
  const [documentId, setDocumentId] = useState(null);
  const [motivation, setMotivation] = useState("");
  const [challenges, setChallenges] = useState("");
  const [comments, setComments] = useState("");

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

  const handleMotivationChange = (e) => {
    setMotivation(e.target.value);
  };

  const handleChallengesChange = (e) => {
    setChallenges(e.target.value);
  };

  const handleCommentsChange = (e) => {
    setComments(e.target.value);
  };

  function saveToDB() {
    const usersCollection = collection(db, "Accounts");
    const docRef = doc(usersCollection, documentId);

    updateDoc(docRef, {
      motivation: motivation,
      challenges: challenges,
      comments: comments,
    })
      .then(() => {
        console.log("Other datas saved to Firestore!");
        navigate("/Dashboard");
      })
      .catch((error) => {
        console.error("Error saving other data:", error);
      });
  }

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Others</h1>
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

            <div id="others" className={prodStyles.eduList}>
              <div className={prodStyles.fields}>
                <div>
                  <span>
                    <b>Motivation and Commitment</b>
                  </span>
                  <label htmlFor="motiv">
                    <textarea
                      name="motiv"
                      id="motiv"
                      rows={3}
                      style={{ width: "100%" }}
                      required
                      placeholder="Why do you want to pursue this career path?&#10;What are your short-term and long-term goals?"
                      value={motivation}
                      onChange={handleMotivationChange}
                    ></textarea>
                  </label>
                </div>
                <div style={{ flex: "100%" }}>
                  <span>
                    <b>Challenges and Concerns</b>
                  </span>
                  <label htmlFor="challenge">
                    <textarea
                      name="challenge"
                      id="challenge"
                      rows={3}
                      style={{ width: "100%" }}
                      required
                      placeholder="Any specific challenges, concerns, or obstacles that should be considered in the plan"
                      value={challenges}
                      onChange={handleChallengesChange}
                    ></textarea>
                  </label>
                </div>
                <div>
                  <span>
                    <b>Additional Comments or Preferences</b>
                  </span>
                  <label htmlFor="additional">
                    <textarea
                      name="additional"
                      id="additional"
                      rows={3}
                      style={{ width: "100%" }}
                      placeholder="Any other information or specific preferences the user want to provide"
                      value={comments}
                      onChange={handleCommentsChange}
                    ></textarea>
                  </label>
                </div>
              </div>
            </div>

            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/Career_Goals" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                form="others"
                type="submit"
                style={{
                  color: "white",
                  border: "none",
                  backgroundColor: "#1E1E1E",
                }}
                onClick={saveToDB}
              >
                Submit
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

export default Others;
