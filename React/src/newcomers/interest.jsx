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

function Interest() {
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
      interests: interestArray,
    })
      .then(() => {
        navigate("/Career_Path");
      })
      .catch((error) => {
        console.error("Error: ", error);
      });
  }

  const [interestArray, setInterestArray] = useState([
    {
      id: 1,
      interestName: "",
    },
  ]);

  const [count, setCount] = useState(2);

  useEffect(() => {
    if (interestArray.length === 0) {
      setInterestArray([
        {
          id: 1,
          interestName: "",
        },
      ]);
    }
  }, [interestArray]);

  const addInterest = () => {
    const newInterest = {
      id: count,
      interestName: "",
    };
    setCount(count + 1);
    setInterestArray([...interestArray, newInterest]);
  };

  const deleteInterest = () => {
    if (interestArray.length === 0) {
      return;
    }
    setCount(count - 1);
    const updatedInterestArray = [...interestArray];
    updatedInterestArray.pop();
    setInterestArray(updatedInterestArray);
  };

  const handleInputChange = (id, field, value) => {
    const updatedInterestArray = interestArray.map((interest) => {
      if (interest.id === id) {
        return { ...interest, [field]: value };
      }
      return interest;
    });
    setInterestArray(updatedInterestArray);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Interests and Passions</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                70% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={70}></ProgressBar>
            </div>

            <div id="interest" className={prodStyles.eduList}>
              {interestArray.map((interest) => (
                <div
                  className="item"
                  key={interest.id}
                  style={{ marginBottom: "20px" }}
                >
                  <div className={prodStyles.eduHead}>
                    <h4>Interest and Passion {interest.id}</h4>
                  </div>
                  <div className={prodStyles.fields}>
                    <div>
                      <span style={{ marginLeft: "10px" }}>
                        Interests and Passions{" "}
                        <span style={{ color: "#f85500" }}>*</span>
                      </span>
                      <label htmlFor="interest">
                        <input
                          type="text"
                          name="interest"
                          id="interest"
                          placeholder="Enter interest and passion"
                          required
                          onChange={(e) =>
                            handleInputChange(
                              interest.id,
                              "interestName",
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
                <Link
                  to="/Project_Completed"
                  style={{ textDecoration: "none" }}
                >
                  Go Back
                </Link>
              </button>
              <button
                onClick={deleteInterest}
                style={{ color: "#F85500", border: "2px solid #F85500" }}
              >
                Delete Interest
              </button>
              <button onClick={addInterest}>Add Another</button>
              <button
                form="interests"
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

export default Interest;
