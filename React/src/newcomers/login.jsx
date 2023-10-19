import styles from "./newcomers.module.css";
import { Outlet, Link } from "react-router-dom";

function Login() {
  return (
    <>
      <div className={styles.login}>
        <h1>Login your account</h1>
        <span>Let's get you back on track</span>
        <button className={styles.googleBtn}>
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
                required
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
    </>
  );
}

export default Login;
