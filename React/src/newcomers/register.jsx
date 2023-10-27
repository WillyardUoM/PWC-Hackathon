/* eslint-disable react/no-unescaped-entities */
import styles from "./newcomers.module.css";
import regStyle from "./register.module.css";
import "./primereactMod.css";
import { Link, useNavigate } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import SlideShow from "./slideshow";
//firebase
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../FirebaseComponent/Firebase";
import { collection, doc, setDoc } from "firebase/firestore";

function Register() {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [selectedGender, setSelectedGender] = useState("");
  const gender = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];
  const [selectedCountry, setSelectedCountry] = useState("");
  const country = [
    { name: "Mauritius", value: "MU" },
    { name: "Rodrigues", value: "ROD" },
  ];
  const [age, setAge] = useState("");
  const [password, setPassword] = useState("");
  const [ageError, setAgeError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();

  const handleFullNameChange = (e) => {
    setFullName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
  };

  const handleCountryChange = (e) => {
    setSelectedCountry(e.target.value);
  };

  const handleAgeChange = (e) => {
    setAge(e.target.value);
    setAgeError("");
  };

  const isPasswordValid = (password) => {
    const passwordPattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$!%^&*?])[A-Za-z\d@#$!%^&*?]{8,}$/;
    return passwordPattern.test(password);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (age < 0) {
      setAgeError("Age cannot be negative");
    } else if (age == 0) {
      setAgeError("Age cannot be zero");
    } else if (!isPasswordValid(password)) {
      setPasswordError("Use a strong password");
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // eslint-disable-next-line no-unused-vars
          const user = userCredential.user;
          saveData();
          navigate("/Proceed");
        })
        .catch((error) => {
          const errorCode = error.code;
          //const errorMessage = error.message;
          setErrorMessage(errorCode);
          setTimeout(() => {
            setErrorMessage("");
          }, 3000);
        });
    }
  };

  function saveData() {
    try {
      const usersCollection = collection(db, "Accounts");
      const userData = doc(usersCollection, email);

      setDoc(userData, {
        fullName: fullname,
        email: email,
        gender: selectedGender,
        country: selectedCountry,
        age: parseInt(age),
        educations: [],
        experiences: [],
        skills: [],
        projects: [],
        interests: [],
        currentPosition: "",
        careerAspiration: "",
        courses: [],
        freeLearningCourses: null,
      });
    } catch (e) {
      console.log("Error adding document: " + e);
    }

    setFullName("");
    setEmail("");
    setAge("");
    setSelectedGender("");
    setSelectedCountry("");
    setPassword("");
    setAgeError("");
    setPasswordError("");
  }

  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className={styles.main}>
      <div className={styles.left_side}>
        <img className={styles.logo} src="images/logo.png" alt="" />
        <div className={regStyle.register}>
          <div className={styles.login}>
            <h1>Create your account</h1>
            <span>Let's get started today for free</span>
            <form className={regStyle.regForm} onSubmit={handleSubmit}>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Full Name <span style={{ color: "#F85500" }}>*</span>
                </span>
                <label htmlFor="fname">
                  <input
                    type="text"
                    name="fname"
                    required
                    id="fname"
                    placeholder="Enter your name"
                    value={fullname}
                    onChange={handleFullNameChange}
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Email <span style={{ color: "#F85500" }}>*</span>
                </span>
                <label htmlFor="email">
                  <input
                    type="email"
                    name="email"
                    required
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Gender <span style={{ color: "#F85500" }}>*</span>
                </span>
                <label htmlFor="">
                  <input
                    type="text"
                    value={selectedGender}
                    required
                    name="gender"
                    id="gender"
                  />
                  <Dropdown
                    value={selectedGender}
                    onChange={handleGenderChange}
                    options={gender}
                    optionLabel="name"
                    placeholder="Select your gender"
                    className={styles.dropdown}
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Country <span style={{ color: "#F85500" }}>*</span>
                </span>
                <label htmlFor="">
                  <input
                    required
                    type="text"
                    name="country"
                    id="country"
                    value={selectedCountry}
                  />
                  <Dropdown
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    options={country}
                    optionLabel="name"
                    placeholder="Select your country"
                    className={styles.dropdown}
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Age <span style={{ color: "#F85500" }}>*</span>
                </span>{" "}
                <p
                  className="error-message"
                  style={{
                    color: "red",
                    margin: "0px 0px 0px 10px",
                    fontSize: "10px",
                  }}
                >
                  {ageError}
                </p>
                <label htmlFor="age">
                  <input
                    type="number"
                    name="age"
                    required
                    id="age"
                    placeholder="Enter your age"
                    value={age}
                    onChange={handleAgeChange}
                  />
                </label>
              </div>
              <div>
                <span style={{ marginLeft: "10px" }}>
                  Password <span style={{ color: "#F85500" }}>*</span>
                </span>
                <p
                  className="error-message"
                  style={{
                    color: "red",
                    margin: "0px 0px 0px 10px",
                    fontSize: "10px",
                  }}
                >
                  {passwordError}
                </p>
                <label htmlFor="password">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    required
                    id="password"
                    placeholder="Enter your password"
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
                Register
              </button>
            </form>
            <p style={{ fontSize: "14px" }}>
              Already have an account?{" "}
              <Link
                to="/Login"
                style={{ color: "#F85500", textDecoration: "none" }}
              >
                Log In
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className={styles.right_side}>
        <SlideShow />
      </div>
    </div>
  );
}

export default Register;
