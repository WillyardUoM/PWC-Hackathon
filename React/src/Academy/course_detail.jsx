import { useEffect, useState } from "react";
import RelatedCourse from "./Widgets/related_course";
import styles from "./css/academy.module.css";
import YoutubeRelatedVideos from "./relatedVideo";

function CourseDetail(props) {
  const [videos, setRelatedVideos] = useState([]);

  const youtube = new YoutubeRelatedVideos();

  const searchPlayList = async () => {
    try {
      const relatedVideos = await youtube.findRelatedVideo(props.link);
      setRelatedVideos(relatedVideos);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
    searchPlayList();
  },[props.link]);

  useEffect(() => {
    // This useEffect will run whenever playListID or videoDetails change
    console.log("Updated related video:", videos);
  }, [videos]);

  return (
    <>
      <div className={styles.course}>
        <iframe src={"https://www.youtube.com/embed/" + props.link}></iframe>
        <h5>Description</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          ultrices elit ac odio iaculis, sed pretium diam maximus. dapibus erat
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          ultrices elit ac odio iaculis, sed pretium diam maximus. dapibus erat{" "}
        </p>
        <h5>Related Courses</h5>
        <div className={styles.courseList}>
            {videos.slice(0,5).map((data, index) => (
                <RelatedCourse key={index} link={props.link} content={data} setLink={props.setLink}/>
            ))}
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
