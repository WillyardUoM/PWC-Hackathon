import "@fortawesome/fontawesome-free/css/all.min.css";
import { useState, useEffect } from "react";
import { SpeedDial } from "primereact/speeddial";
import AcademyHeader from "./academy_header";
import StageList from "./academy_stages";
import CourseDetail from "./course_detail";
import styles from "./css/academy.module.css";
import Youtube from "./youtube";

function Academy(props) {
  const [isTimelineOpen, setTimelineOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);

  const [timelineStyle, settimelineStyle] = useState({});

  const [videoDetails, setVideoDetails] = useState([]);

  const[currentLink, setCurrentLink] = useState("zhpcgpqWc1Q");

  const topics = [
    "Learn Javascript beginner",
    "Learn javascript advanced",
    "Learn javascript testing",
  ];

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
    } else {
      setSearchOpen(true);
      if (isTimelineOpen) {
        showTimeline();
      }
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

  const retrieveVideoID =(id) =>{
    setCurrentLink(id);
  };

  const youtube = new Youtube();

  // Define a function to search for videos using the Youtube class
  const searchPlayList = async () => {
    try {
      const playListID = await Promise.all(
        topics.map(async (topic) => {
          const data = await youtube.searchPlayList(topic);
          return data.data[0].playlistId;
        })
      );
      const videoDataArray = await Promise.all(
        playListID.map(async (playlist) => {
          const response = await youtube.getVideosFromPlaylist(playlist);
          return {
            playlist: response.meta.title,
            videos: response.data,
          };
        })
      );
      setVideoDetails(videoDataArray);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    searchPlayList();
  }, []);

  useEffect(() => {
    // This useEffect will run whenever playListID or videoDetails change
    console.log("Updated videoDetails:", videoDetails);
  }, [videoDetails]);

  return (
    <>
      <div className={styles.academy}>
        <AcademyHeader isOpen={isSearchOpen} />
        <div className={styles.row}>
          <StageList style={timelineStyle} playlist={videoDetails} link={retrieveVideoID}/>
          <CourseDetail link={currentLink} setLink={retrieveVideoID}/>
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
