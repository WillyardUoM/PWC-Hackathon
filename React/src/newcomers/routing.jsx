import styles from "./newcomers.module.css";
import SlideShow from "./slideshow";
function routing() {
    return (

          <div className={styles.main}>
            <div className={styles.left_side}>
              <img className={styles.logo} src="images/pwc-logo.png" alt="" />

            </div>
            <div className={styles.right_side}>
              <SlideShow />
            </div>
          </div>
  


    );
  }
  
  export default routing;
  