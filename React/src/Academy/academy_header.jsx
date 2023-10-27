import styles from "./css/academy.module.css";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import React, { useState, useRef } from "react";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { MegaMenu } from "primereact/megamenu";

import { Dialog } from "primereact/dialog";
import CertificateIt from "./Certificate/Certificate";
function AcademyHeader(props) {
  const [loading, setLoading] = useState(false);

  const toast = useRef(null);

  const accept = () => {
    toast.current.show({
      severity: "info",
      summary: "Confirmed",
      detail: "You have accepted",
      life: 3000,
    });
  };

  const reject = () => {
    toast.current.show({
      severity: "warn",
      summary: "Rejected",
      detail: "You have rejected",
      life: 3000,
    });
  };

  const confirm1 = () => {
    confirmDialog({
      message: "Have your completed the course?",
      header: "Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept,
      reject,
    });
  };
  const [visible, setVisible] = useState(false);
  const footerContent = (
    <div>
      <Button
        label="No"
        icon="pi pi-times"
        onClick={() => setVisible(false)}
        className="p-button-text"
      />
      <Button
        label="Yes"
        icon="pi pi-check"
        onClick={() => setVisible(false)}
        autoFocus
      />
    </div>
  );
  const items = [
    {
      label: "Videos",
      icon: "pi pi-fw pi-video",
      items: [
        [
          {
            label: "Video 1",
            items: [{ label: "Video 1.1" }, { label: "Video 1.2" }],
          },
          {
            label: "Video 2",
            items: [{ label: "Video 2.1" }, { label: "Video 2.2" }],
          },
        ],
        [
          {
            label: "Video 3",
            items: [{ label: "Video 3.1" }, { label: "Video 3.2" }],
          },
          {
            label: "Video 4",
            items: [{ label: "Video 4.1" }, { label: "Video 4.2" }],
          },
        ],
      ],
    },
    {
      label: "Users",
      icon: "pi pi-fw pi-users",
      items: [
        [
          {
            label: "User 1",
            items: [{ label: "User 1.1" }, { label: "User 1.2" }],
          },
          {
            label: "User 2",
            items: [{ label: "User 2.1" }, { label: "User 2.2" }],
          },
        ],
        [
          {
            label: "User 3",
            items: [{ label: "User 3.1" }, { label: "User 3.2" }],
          },
          {
            label: "User 4",
            items: [{ label: "User 4.1" }, { label: "User 4.2" }],
          },
        ],
        [
          {
            label: "User 5",
            items: [{ label: "User 5.1" }, { label: "User 5.2" }],
          },
          {
            label: "User 6",
            items: [{ label: "User 6.1" }, { label: "User 6.2" }],
          },
        ],
      ],
    },
    {
      label: "Events",
      icon: "pi pi-fw pi-calendar",
      items: [
        [
          {
            label: "Event 1",
            items: [{ label: "Event 1.1" }, { label: "Event 1.2" }],
          },
          {
            label: "Event 2",
            items: [{ label: "Event 2.1" }, { label: "Event 2.2" }],
          },
        ],
        [
          {
            label: "Event 3",
            items: [{ label: "Event 3.1" }, { label: "Event 3.2" }],
          },
          {
            label: "Event 4",
            items: [{ label: "Event 4.1" }, { label: "Event 4.2" }],
          },
        ],
      ],
    },
    {
      label: "Settings",
      icon: "pi pi-fw pi-cog",
      items: [
        [
          {
            label: "Setting 1",
            items: [{ label: "Setting 1.1" }, { label: "Setting 1.2" }],
          },
          {
            label: "Setting 2",
            items: [{ label: "Setting 2.1" }, { label: "Setting 2.2" }],
          },
          {
            label: "Setting 3",
            items: [{ label: "Setting 3.1" }, { label: "Setting 3.2" }],
          },
        ],
        [
          {
            label: "Technology 4",
            items: [{ label: "Setting 4.1" }, { label: "Setting 4.2" }],
          },
        ],
      ],
    },
  ];

  return (
    <>
      <Dialog
        header="What's your name?"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={() => setVisible(false)}
      >
        <CertificateIt />
      </Dialog>
      <div className={styles.header}>
        <div className={styles.logos}>
          <img src="/images/logo.png" height={"27px"} alt="" />
          <h2>Academy + </h2>
          <img src="/images/youtube logo.png" height={"15px"} alt="" />
        </div>
        <div
          className={props.isOpen ? styles.functions : styles.functionsHidden}
        >
          <div>
            <Button
              label="Generate Your Certificate"
              loading={loading}
              onClick={() => setVisible(true)}
              style={{ backgroundColor: "#1E1E1E" }}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default AcademyHeader;
