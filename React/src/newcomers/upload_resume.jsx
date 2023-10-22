import prodStyles from "./proceed.module.css";
import { Link, useNavigate } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import { useRef } from "react";
import "./primereactMod.css";

function UploadResume() {
  let navigate = useNavigate();

  function goTo() {
    navigate("/Education");
  }

  const toast = useRef(null);

  const onUpload = () => {
    console.log("ge");
    toast.current.show({
      severity: "info",
      summary: "Success",
      detail: "File Uploaded",
    });
  };
  return (
    <>
      <div className={prodStyles.proceed}>
        <h1>Upload Your Resume</h1>
        <p style={{ color: "gray", margin: "0px 0 20px", fontSize: "14px" }}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat
          nobis, aliquid quia, quasi totam eligendi debitis itaque eaque
        </p>
        <div className={prodStyles.progressBar}>
          <span style={{ color: "gray", fontSize: "14px" }}>80% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
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
    </>
  );
}

export default UploadResume;
