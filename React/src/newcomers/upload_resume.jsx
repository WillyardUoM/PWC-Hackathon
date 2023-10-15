import styles from "./newcomers.module.css";
import prodStyles from "./proceed.module.css";
import { Outlet, Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import { FileUpload } from "primereact/fileupload";
import { Toast } from "primereact/toast";
import React, { useRef } from "react";
import "./other.css";

function UploadResume() {
  const toast = useRef(null);

  const onUpload = () => {
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
          <span style={{ color: "gray" }}>80% Completed</span>
          <ProgressBar style={{ height: "15px" }} value={80}></ProgressBar>
        </div>

        <div style={{ width: "100%" }}>
          <FileUpload
            name="demo[]"
            url={"/api/upload"}
            accept="image/*"
            maxFileSize={1000000}
            onUpload={onUpload}
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
          <button style={{ border: "2px solid lightgray" }}><Link to="/proceed" style={{textDecoration:"none"}}>Go Back</Link></button>
          <button
            style={{
              color: "white",
              border: "none",
              backgroundColor: "#1E1E1E",
            }}
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
}

export default UploadResume;
