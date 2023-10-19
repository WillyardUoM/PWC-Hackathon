import '@fortawesome/fontawesome-free/css/all.min.css';
import { useState } from "react";
import { SpeedDial } from "primereact/speeddial";
import AcademyHeader from "./academy_header";
import StageList from "./academy_stages";
import CourseDetail from "./course_detail";
import styles from "./css/academy.module.css";

function Academy() {
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  
  const [timelineStyle, settimelineStyle] = useState({});
  const [searchStyle, setSearchStyle] = useState({});

  const items = [
    {
      label: "Progress",
      icon: "fa-solid fa-list-check",
      command: () => {
        showTimeline();
      },
    },
    {
      label: "Search",
      icon: "pi pi-search",
      command: () => {
        showSearch();
      },
    },
  ];

  const showSearch = () => {
    if (isSearchOpen) {
      setSearchOpen(false);
      setSearchStyle({ visibility: "hidden",opacity: 0});
    } else {
      setSearchOpen(true);
      if (isTimelineOpen) {
        showTimeline();
      }
      setSearchStyle({ visibility: "visible",opacity: 1});
    }
  };

  const showTimeline = () => {
    if (isTimelineOpen) {
      setTimelineOpen(false);
      settimelineStyle({ left: "-100%" });
    } else {
      setTimelineOpen(true);
      if (isSearchOpen) {
        showSearch();
      }
      settimelineStyle({ left: "0%" });
    }
  };

  return (
    <>
      <div className={styles.academy}>
        <AcademyHeader isOpen={isSearchOpen} />
        <div className={styles.row}>
          <StageList style={timelineStyle} />
          <CourseDetail />
        </div>
        <div className={styles.actionButton}>
          <SpeedDial
            model={items}
            radius={100}
            type="quarter-circle"
            direction="up-left"
            style={{ right: 0, bottom: 0 }}
            buttonClassName="p-button-help"
          />
        </div>
      </div>
    </>
  );
}

export default Academy;
