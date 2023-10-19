import styles from "./css/academy.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { useState } from "react";

function AcademyHeader({ isOpen }) {
  const [loading, setLoading] = useState(false);

  const load = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
    }, 2000);
  };
  return (
    <>
      <div className={styles.header}>
        <div className={styles.logos}>
          <img src="/images/pwc-logo.png" height={"27px"} alt="" />
          <h2>Academy + </h2>
          <img src="/images/youtube logo.png" height={"15px"} alt="" />
        </div>
        <div className={isOpen ? styles.functions : styles.functionsHidden}>
          <div>
            <span className="p-input-icon-right">
              <i className="pi pi-search" />
              <InputText
                placeholder="Wanna learn something else?"
                height={"100%"}
                width={"100%"}
              />
            </span>
            <Button
              label="Submit"
              loading={loading}
              onClick={load}
              style={{ backgroundColor: "#1E1E1E" }}
            />
            <Button label="Default" style={{ backgroundColor: "#FF613F" }} />
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademyHeader;
