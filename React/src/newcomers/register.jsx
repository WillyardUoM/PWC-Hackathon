import styles from "./newcomers.module.css";
import regStyle from "./register.module.css";
import "./primereactMod.css";
import { Outlet, Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

function Register() {
  const [selectedGender, setSelectedGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const gender = [
    { name: "Male", value: "male" },
    { name: "Female", value: "female" },
  ];
  const country = [
    { name: "Mauritius", value: "MU" },
    { name: "Rodrigues", value: "ROD" },
  ];

  return (
    <div className={regStyle.register}>
      <div className={styles.login}>
        <h1>Create your account</h1>
        <span>Let's get started today for free</span>
        <button className={styles.googleBtn}>
          <img src="images/google.png" height={"25"} alt="" />
          Login with Google
        </button>
        <span>or</span>
        <form className={regStyle.regForm}>
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
                placeholder="Enter your name"
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
                onChange={(e) => {
                  setSelectedGender(e.value);
                  console.log(selectedGender);
                }}
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
                onChange={(e) => setSelectedCountry(e.value)}
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
            </span>
            <label htmlFor="age">
              <input
                type="number"
                name="age"
                required
                id="age"
                placeholder="Enter your age"
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Password <span style={{ color: "#F85500" }}>*</span>
            </span>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                required
                id="password"
                placeholder="Enter your password"
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
            Register
          </button>
        </form>
        <p style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <Link to="/" style={{ color: "#F85500", textDecoration: "none" }}>
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
