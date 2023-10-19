import styles from "./css/academy.module.css";
import Stage from "./Widgets/stage";

function StageList({style}) {
  const dataArray = ["One", "Two", "Three", "Four", "Five"];

  
  return (
    <>
      <div style={style} className={styles.stageList}>
      {dataArray.map((data,index) => (
        <Stage key={index}/>
      ))}
      </div>
    </>
  );
}

export default StageList;
