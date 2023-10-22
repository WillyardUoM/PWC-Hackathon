/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import styles from "./newcomers.module.css";
import { Link, useNavigate } from "react-router-dom";

//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseComponent/Firebase";

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  let navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform login using Firebase Authentication
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //alert("User with email " + user.email + " has logged in successfully");
        navigate("/Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorCode + " " + errorMessage);
      });
  };

  return (
    <>
      {user ? (
        navigate("/Dashboard")
      ) : (
        <div className={styles.login}>
          <h1>Login your account</h1>
          <span>Let's get you back on track</span>
          <button className={styles.googleBtn}>
            <img src="images/google.png" height={"25"} alt="" />
            Login with Google
          </button>
          <span>or</span>
          <form onSubmit={handleSubmit}>
            <div>
              <span style={{ marginLeft: "10px" }}>
                Email <span style={{ color: "#f85500" }}>*</span>
              </span>
              <label htmlFor="email">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your name"
                  required
                  value={email}
                  onChange={handleEmailChange}
                />
              </label>
            </div>
            <div style={{ marginBottom: "40px" }}>
              <span style={{ marginLeft: "10px" }}>
                Password <span style={{ color: "#f85500" }}>*</span>
              </span>
              <label htmlFor="password">
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  required
                  value={password}
                  onChange={handlePasswordChange}
                />
                <i className="fa-regular fa-eye"></i>
              </label>
            </div>
            <button
              style={{
                backgroundColor: "#1E1E1E",
                color: "white",
                marginBottom: "0px",
              }}
            >
              Login
            </button>
          </form>
          <p style={{ fontSize: "14px" }}>
            Don't have an account?{" "}
            <Link
              to="/Register"
              style={{ color: "#f85500", textDecoration: "none" }}
            >
              Sign Up
            </Link>
          </p>
        </div>
      )}
    </>
  );
}

export default Login;
