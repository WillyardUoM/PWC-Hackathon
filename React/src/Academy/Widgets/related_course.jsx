import styles from "../css/academy.module.css";

function RelatedCourse(props) {
  const handleClick = () =>{
    props.setLink(props.content.id.videoId);
  }
  return (
    <>
      <div className={styles.relatedCourse} onClick={handleClick}>
        <img
          src={props.content.snippet.thumbnails.medium? props.content.snippet.thumbnails.medium.url: ""}
          alt=""
        />
        <b>{props.content.snippet.title}</b>
        <span>{props.content.snippet.channelTitle}</span>
      </div>
    </>
  );
}

export default RelatedCourse;
