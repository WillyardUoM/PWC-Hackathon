import prodStyles from "./proceed.module.css";
import { Link } from "react-router-dom";
import { ProgressBar } from "primereact/progressbar";
import "./primereactMod.css";
import { useState } from "react";
import axios from "axios";
import SlideShow from "./slideshow";
import styles from "./newcomers.module.css";

const API_URL = "http://www.omdbapi.com/?apikey=27943250";

function LinkedInURL() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [profileInfo, setProfileInfo] = useState(""); // Initialize a state variable to store the concatenated information.

  const runAPICall = async (userInput) => {
    const response = await fetch(`${API_URL}&s=${userInput}`);
    const data = await response.json();

    setMovies(data.Search);
    const options = {
      method: "GET",
      url: "https://fresh-linkedin-profile-data.p.rapidapi.com/get-linkedin-profile",
      params: {
        linkedin_url: userInput,
      },
      headers: {
        "X-RapidAPI-Key": "917764ec1emsh1c602718b368486p144617jsnbae6f6724aaf",
        "X-RapidAPI-Host": "fresh-linkedin-profile-data.p.rapidapi.com",
      },
    };

    try {
      const response = await axios.request(options);
      const profileData = response.data.data;

      const concatenatedInfo = `
        Education: ${profileData.educations
          .map((education) => `${education.school} (${education.date_range})`)
          .join(", ")}
        Job Details: ${profileData.experiences
          .map(
            (experience) =>
              `${experience.title} at ${experience.company} (${experience.date_range})`
          )
          .join(", ")}
        Skills: ${profileData.skills || "N/A"}
      `;

      setProfileInfo(concatenatedInfo);

      // If movies data is available, navigate to '/dash'
      history.push("/dash");

      console.log(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className={styles.main}>
        <div className={styles.left_side}>
          <img className={styles.logo} src="images/pwc-logo.png" alt="" />
          <div className={prodStyles.proceed}>
            <h1>Insert your LinkedIn URL</h1>
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

            <form id="linkedin" className={prodStyles.eduList}>
              <div className={prodStyles.fields}>
                <div>
                  <span style={{ marginLeft: "10px" }}>
                    LinkedIn URL <span style={{ color: "#f85500" }}>*</span>
                  </span>
                  <label htmlFor="linkedinURL">
                    <input
                      type="url"
                      name="linkedinURL"
                      id="linkedinURL"
                      placeholder="Enter your LinkedIn Profile URL"
                      required
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                </div>
              </div>
            </form>
            {movies?.length > 0 ? (
              <p>{profileInfo}</p>
            ) : (
              <div className="empty">
                <p>{profileInfo}</p>
              </div>
            )}
            <div className={prodStyles.BackNextBtn}>
              <button style={{ border: "2px solid lightgray" }}>
                <Link to="/proceed" style={{ textDecoration: "none" }}>
                  Go Back
                </Link>
              </button>
              <button
                form="others"
                type="submit"
                onClick={() => runAPICall(search)}
                style={{
                  color: "white",
                  border: "none",
                  backgroundColor: "#1E1E1E",
                }}
              >
                Submit
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

export default LinkedInURL;
