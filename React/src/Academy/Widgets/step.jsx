import styles from "../css/academy.module.css";

function Steps(props) {
  const handleClick = () =>{
    props.link(props.video.videoId);
  }
  return (
    <div className={styles.stage} style={{width:"100%",border:"none",padding:"0px", cursor:"pointer"}} onClick={handleClick}>
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
          {props.video.title}
        </div>
        <span style={{fontSize:"12px"}}>{props.video.lengthText}</span>
      </div>
  );
}

export default Steps;