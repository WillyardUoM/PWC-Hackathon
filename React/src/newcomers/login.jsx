/* eslint-disable react/no-unescaped-entities */
import { useEffect, useState } from "react";
import styles from "./newcomers.module.css";
import { Link, useNavigate } from "react-router-dom";
import SlideShow from "./slideshow";
//firebase
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseComponent/Firebase";

function Login() {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

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

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // eslint-disable-next-line no-unused-vars
        const user = userCredential.user;
        navigate("/Dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        // const errorMessage = error.message;
        setErrorMessage(errorCode);
        setTimeout(() => {
          setErrorMessage("");
        }, 3000);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          {user ? (
            navigate("/Dashboard")
          ) : (
            <div className={styles.login}>
              <h1>Login your account</h1>
              <span>Let's get you back on track</span>
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
                      placeholder="Enter your email"
                      required
                      value={email}
                      onChange={handleEmailChange}
                    />
                  </label>
                </div>
                <div style={{ marginBottom: "10px" }}>
                  <span style={{ marginLeft: "10px" }}>
                    Password <span style={{ color: "#f85500" }}>*</span>
                  </span>
                  <label htmlFor="password">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      id="password"
                      placeholder="Enter your password"
                      required
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    <i
                      className={
                        showPassword
                          ? "fa-regular fa-eye-slash"
                          : "fa-regular fa-eye"
                      }
                      onClick={togglePasswordVisibility}
                    ></i>
                  </label>
                </div>
                <p
                  className="error-message"
                  style={{
                    color: "red",
                    margin: "0px 0px 10px 5px",
                    fontSize: "15px",
                  }}
                >
                  {errorMessage}
                </p>
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
        </div>
        <div className={styles.right_side}>
          <SlideShow />
        </div>
      </div>
    </>
  );
}

export default Login;
