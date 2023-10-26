import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useRef, useState } from "react";
import "./primereactMod.css";
import styles from "./newcomers.module.css";
import SlideShow from "./slideshow";
import axios from "axios";

function UploadResume() {
  const navigate = useNavigate();

  function goTo() {
    navigate("/Dashboard");
  }

  // eslint-disable-next-line no-unused-vars
  const [resumeData, setResumeData] = useState({});

  const toast = useRef(null);

  const onUpload = async (event) => {
    const file = event.files[0];

    const formData = new FormData();
    formData.append("file", file);

    console.log(file, "FormData");

    const options = {
      method: "POST",
      url: "https://ai-resume-parser-extractor.p.rapidapi.com/pdf-upload",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "a1376b7c03msh53f300bfc2733d3p11a42bjsn5d4f352a32a8",
        "X-RapidAPI-Host": "ai-resume-parser-extractor.p.rapidapi.com",
      },
      data: formData,
    };

    try {
      const response = await axios.request(options);

      const responseData = response.data;

      const education = responseData.education || [];
      const experience = responseData.experience || [];
      const skills = responseData.skills || [];

      const resumeData = {
        skills,
        education,
        experience,
      };

      setResumeData(resumeData);

      console.log(response.data, "hi");
      console.log(resumeData, "hello");

      toast.current.show({
        severity: "info",
        summary: "Success",
        detail: "Resume parsed",
      });
    } catch (error) {
      console.error(error);
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Failed to parse resume",
      });
    }
  };

  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Upload Your Resume</h1>
            <p
              style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}
            >
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
              nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
            </p>
            <div className={prodStyles.progressBar}>
              <span style={{ color: "gray", fontSize: "14px" }}>
                90% Completed
              </span>
              <ProgressBar style={{ height: "15px" }} value={90}></ProgressBar>
            </div>

            <div style={{ width: "100%" }}>
              <Toast ref={toast}></Toast>
              <FileUpload
                name="demo[]"
                accept="pdf/*"
                maxFileSize={1000000}
                customUpload={true}
                uploadHandler={onUpload}
                emptyTemplate={
                  <div className={prodStyles.upload_region}>
                    <i className="fa-regular fa-file-pdf"></i>
                    <p>
                      Drag & Drop or{" "}
                      <span style={{ color: "#F85500" }}>Choose file</span> to
                      upload
                    </p>
                    <span style={{ color: "gray" }}>PDF Max 10MB</span>
                  </div>
                }
              />
            </div>
            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/proceed" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                style={{
                  color: "white",
                  border: "none",
                  backgroundColor: "#1E1E1E",
                }}
                onClick={goTo}
              >
                Next
              </button>
            </div>
          </div>
        </div>
        <div className={styles.right_side}>
          <SlideShow />
        </div>
      </div>
    </>
  );
}

export default UploadResume;
