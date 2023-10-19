import styles from "../css/academy.module.css";

function Steps() {
  return (
    <div className={styles.stage} style={{width:"100%",border:"none",padding:"0px"}}>
        <i
          className="fa-solid fa-check"
          style={{
            fontSize: "12px",
            backgroundColor: "#FF613F",
            borderRadius: "50%",
            padding: "5px 7px",
            color: "white",
          }}
        ></i>
        <div className={styles.stageTitle}>
          Introduction to Javascript
        </div>
        <span style={{fontSize:"12px"}}>1:25</span>
      </div>
  );
}

export default Steps;