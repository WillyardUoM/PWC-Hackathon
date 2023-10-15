import styles from "./newcomers.module.css";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className={styles.login}>
        <h1>Login your account</h1>
        <span>Let's get you back on track</span>
        <button>
          <img src="images/google.png" height={"25"} alt="" />
          Login with Google
        </button>
        <span>or</span>
        <form>
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
              />
            </label>
          </div>
          <div>
            <span style={{ marginLeft: "10px" }}>
              Password <span style={{ color: "#f85500" }}>*</span>
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
        <button
          style={{
            backgroundColor: "black",
            color: "white",
            marginBottom: "0px",
          }}
        >
          Login
        </button>
        <p style={{ fontSize: "14px" }}>
          Don't have an account?{" "}
          <Link to="/Register" style={{ color: "#f85500", textDecoration: "none" }}>
            Sign Up
          </Link>
        </p>
      </div>
    </>
  );
}

export default Login;
