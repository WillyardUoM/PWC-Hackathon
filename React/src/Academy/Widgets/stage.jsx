import styles from "../css/academy.module.css";
import { useState } from "react";
import Steps from "./step";



function Stage(props) {
  const [isOpen, setOpen] = useState(false);

  const videos = props.playlist.videos;


  const show = (event) => {
    if (isOpen) {
      setOpen(false);
      event.target.style.transform = "rotate(0deg)";
    } else {
      setOpen(true);
      event.target.style.transform = "rotate(180deg)";
    }
  };

  return (
    <div className={styles.stageMain}>
      <div className={styles.stage} style={isOpen?{backgroundColor:"lightgray"}:{backgroundColor:"white"}}>
        <i
          className="fa-solid fa-check"
          style={{
            fontSize: "24px",
            backgroundColor: "#FF613F",
            borderRadius: "50%",
            padding: "5px 7px",
            color: "white",
          }}
        ></i>
        <div className={styles.stageTitle}>
          <span
            style={{ marginBottom: "2px", color: "#515151", display: "block" }}
          >
            Stage {props.count + 1}
          </span>
          <b>{props.playlist.playlist}</b>
        </div>
        <i
          className="fa-solid fa-angle-down"
          style={{
            cursor: "pointer",
            fontSize: "12px",
            transition: "transform linear 0.1s ",
          }}
          onClick={show}
        ></i>
      </div>
      <div className={styles.stepList} style={isOpen? {maxHeight:"100vh",paddingTop:"45px"}:{maxHeight:"0px",paddingTop:"0px", transition:"padding 0.2s ease"}}>
        {videos.map((data,index) =>(
          <Steps key={index} video={data} link={props.link}/>
        ))}
      </div>
    </div>
  );
}

export default Stage;
