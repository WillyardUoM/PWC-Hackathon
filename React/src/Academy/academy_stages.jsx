import styles from "./css/academy.module.css";
import Stage from "./Widgets/stage";

function StageList(props) {
  const playlist = props.playlist;

  return (
    <>
      <div style={props.style} className={styles.stageList}>
      {playlist.map((data,index) => (
        <Stage key={index} playlist={data} link={props.link} count={index}/>
      ))}
      </div>
    </>
  );
}

export default StageList;
