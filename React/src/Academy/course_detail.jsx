import RelatedCourse from "./Widgets/related_course";
import styles from "./css/academy.module.css";

function CourseDetail() {
  const course = ["", "", "", ""];

  return (
    <>
      <div className={styles.course}>
        <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY"></iframe>
        <h5>Description</h5>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          ultrices elit ac odio iaculis, sed pretium diam maximus. dapibus erat
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
          ultrices elit ac odio iaculis, sed pretium diam maximus. dapibus erat{" "}
        </p>
        <h5>Related Courses</h5>
        <div className={styles.courseList}>
            {course.map((data, index) => (
                <RelatedCourse key={index}/>
            ))}
        </div>
      </div>
    </>
  );
}

export default CourseDetail;
