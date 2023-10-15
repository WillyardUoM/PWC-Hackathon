import styles from "./newcomers.module.css";
import regStyle from "./register.module.css";
import "./other.css";
import { Outlet, Link } from "react-router-dom";
import { Dropdown } from "primereact/dropdown";
import { useState } from "react";

function Register() {
  const [selectedGender, setSelectedGender] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(0);
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
        <button>
          <img src="images/google.png" height={"25"} alt="" />
          Login with Google
        </button>
        <span>or</span>
        <form className={regStyle.regForm}>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Full Name <span style={{ color: "orange" }}>*</span>
            </span>
            <label htmlFor="fname">
              <input
                type="text"
                name="fname"
                id="fname"
                placeholder="Enter your name"
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Email <span style={{ color: "orange" }}>*</span>
            </span>
            <label htmlFor="email">
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your name"
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Gender <span style={{ color: "orange" }}>*</span>
            </span>
            <label htmlFor="gender">
              <Dropdown
                value={selectedGender}
                onChange={(e) => setSelectedGender(e.value)}
                options={gender}
                optionLabel="name"
                placeholder="Select your gender"
                className={styles.dropdown}
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Country <span style={{ color: "orange" }}>*</span>
            </span>
            <label htmlFor="country">
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
              Age <span style={{ color: "orange" }}>*</span>
            </span>
            <label htmlFor="age">
              <input
                type="number"
                name="age"
                id="age"
                placeholder="Enter your age"
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Password <span style={{ color: "orange" }}>*</span>
            </span>
            <label htmlFor="password">
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
              />
              <i className="fa-regular fa-eye"></i>
            </label>
          </div>
        </form>
        <input type="button" value={"Register"} />
        <p style={{ fontSize: "14px" }}>
          Already have an account?{" "}
          <Link
            to="/"
            style={{ color: "orange", textDecoration: "none" }}
          >
            Log In
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Register;
