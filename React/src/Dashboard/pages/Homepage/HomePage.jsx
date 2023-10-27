import React, { useState, useRef, useEffect } from "react";
import { Button } from "primereact/button";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "../Style/App.css";
import TaskList from "../TaskList";
import Sts from "../Homepage/progress";
import { Dialog } from "primereact/dialog";
import { SLayout } from "../../components/Layout/styles";
import { ThemeProvider } from "styled-components";
import PalmAI from "../../../Api/palm";
import { darkTheme, lightTheme } from "../../styles/theme";
import Sidebar from "../../components/Sidebar/Sidebar";
export const ThemeContext = React.createContext(null);
import { Chart } from "primereact/chart";
import StackedBar from "./due";
import { Dropdown } from "primereact/dropdown";
import { Skeleton } from "primereact/skeleton";
import { Column } from "primereact/column";
import { DataTable } from "primereact/datatable";
import DetailsCourse from "./coursesInfo";
//firebase
import { auth, db } from "../../../FirebaseComponent/Firebase";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";

function formatJSONString(jsonString) {
  // Remove leading and trailing spaces if present
  jsonString = jsonString.trim();

  // If the jsonString doesn't start with '{', add it
  if (jsonString.startsWith("```json")) {
    jsonString = jsonString.replace(/^```json/, "").replace(/```$/, "");
  } else if (jsonString.startsWith("```")) {
    jsonString = jsonString.replace(/^```/, "").replace(/```$/, "");
  }
  return jsonString;
}

const promptString = `
keep progress 0
based on the about information above i want use to accurately output a a learning roadmap in phases by order for the user he can do in json format. 
You should only output the JSON, nothing more. You shoud use your knowledge and filling the json accurately based on the information provided. 
Also note that the title in the JSON will be used for searching courses on youtube so that the user get revelant videos, so make sure to provide a meanful title. The learning roadmap should only contain learning phrases and not anything outside that.
Your response should mostly be based on the "careerAspiration" from the above json data output, to know what job the user is trying to get. use the rest of the data as supporting information

An example is shown:
{
 "learningroadmap": [
  {
   "phase": 1,
   "course": "Foundations of Data Structures and Algorithms",
   "progress": 0
  },
  {
   "phase": 2,
   "course": "UI/UX Design Fundamentals",
   "progress": 0
  },
  {
   "phase": 3,
   "course": "Integrating UI/UX Design with Software Engineering",
   "progress": 0
  },
  {
   "phase": 4,
   "course": "Creating a UI/UX Design Portfolio",
   "progress": 0
  },
  {
   "phase": 5,
   "course": "Networking and Job Search Strategies for UI/UX Designers",
   "progress": 0
  },
  {
   "phase": 6,
   "course": "Advanced Leadership and Event Management",
   "progress": 0
  }
 ]
}
`;

const promptString2 = `
based on the about information above i want use to accurately output a a learning roadmap in phases by order for the user he can do in json format. The learning roadmap should contain courses available that user can follow online on platform such as coursera, udemy... You should only output the JSON, nothing more. You shoud use your knowledge and filling the json accurately based on the information provided. The learning roadmap should only contain learning phrases and not anything outside that.
Your response should mostly be based on the "careerPath" from the above json data output, to know what job the user is trying to get. use the rest of the data as supporting information
An example is shown:
{
  "learningroadmap": [
    {
      "phase": "Beginner",
      "platform": "Coursera",
      "course": "Introduction to React",
      "durationInHours": 20,
      "url": "www.coursera.org/react-intro"
    },

    {
      "phase": "Amateur",
      "platform": "Coursera",
      "course": "Advanced React and Redux",
      "durationInHours": 30,
      "url": "www.coursera.org/advanced-react-redux"
    },

    {
      "phase": "Intermediate",
      "platform": "Coursera",
      "course": "Testing React Applications",
      "durationInHours": 15,
      "url": "www.coursera.org/testing-react"
    },
    {
      "phase": "Intermediate",
      "platform": "Udemy",
      "course": "GraphQL with React: The Complete Developer's Guide",
      "durationInHours": 25,
      "url": "www.udemy.com/graphql-with-react"
    },

    {
      "phase": "Advanced",
      "platform": "Udemy",
      "course": "React Native - The Practical Guide",
      "durationInHours": 30,
      "url": "www.udemy.com/react-native-practical-guide"
    }
  ]
}
`;

const HomePage = () => {
  const [apiResponse, setApiResponse] = useState([]);
  const [apiResponse2, setApiResponse2] = useState([]);
  const [apiResponseDB, setApiResponseDB] = useState([]);

  const [chartData, setChartData] = useState({});
  const [chartOptions, setChartOptions] = useState({});
  const [visible2, setVisible2] = useState(false);
  const [theme] = useState("light");
  const themeStyle = theme === "light" ? lightTheme : darkTheme;
  const [selectedCity, setSelectedCity] = useState(null);
  const [course, setCourse] = useState("");
  const cities = [
    { name: "Premium Learning", code: "PL" },
    { name: "Free Learning", code: "FL" },
  ];

  // db
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [userData, setUserData] = useState({
    careerAspiration: null,
    courseArray: null,
    currentPos: null,
    educationArray: null,
    experienceArray: null,
    interestArray: null,
    projectArray: null,
    skillArray: null,
    freeLearningCourses: null,
  });
  const [APIData, setAPIData] = useState({
    freeLearningCourses: null,
  });
  const [documentId, setDocumentId] = useState(null);
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const [userDataString, setUserDataString] = useState("");

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setDocumentId(user.email);
        getDocumentData(documentId);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, [documentId]);

  const getDocumentData = (documentId) => {
    const usersCollection = collection(db, "Accounts");
    const docRef = doc(usersCollection, documentId);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          setUserData({
            careerAspiration: data.careerAspiration,
            courseArray: data.courses
              ? data.courses.map((course) => ({
                  courseName: course.courseName,
                }))
              : null,
            currentPos: data.currentPosition,
            educationArray: data.educations
              ? data.educations.map((edu) => ({
                  university: edu.university,
                  degree: edu.degree,
                  fieldOfStudy: edu.field,
                  cpa: edu.cpa,
                }))
              : null,
            experienceArray: data.experiences
              ? data.experiences.map((experience) => ({
                  jobTitle: experience.jobTitle,
                  yearsOfExperience: experience.exp,
                }))
              : null,
            interestArray: data.interests
              ? data.interests.map((interest) => ({
                  interestName: interest.interestName,
                }))
              : null,
            projectArray: data.projects
              ? data.projects.map((project) => ({
                  projectName: project.projectName,
                }))
              : null,
            skillArray: data.skills
              ? data.skills.map((skill) => ({
                  softSkill: skill.softSkill,
                  technicalSkill: skill.techSkill,
                }))
              : null,
          });
          setAPIData({
            freeLearningCourses: data.freeLearningCourses
              ? data.freeLearningCourses
              : null,
          });
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document: " + error);
      });
  };

  function saveAPI2Response(jsonData) {
    try {
      const usersCollection = collection(db, "Accounts");
      const userData = doc(usersCollection, documentId);

      updateDoc(userData, {
        freeLearningCourses: jsonData,
      });
      console.log("Saved in Free Learning");
    } catch (e) {
      console.log("Error adding document: " + e);
    }
  }

  const convertObjectToString = (data) => {
    if (!data) return "null";
    return Object.entries(data)
      .map(([key, value]) => {
        if (value === null || value === undefined) {
          return `"${key}": null`;
        }
        if (Array.isArray(value)) {
          return `"${key}": [${value
            .map((item) => JSON.stringify(item))
            .join(", ")}]`;
        }
        return `"${key}": ${JSON.stringify(value)}`;
      })
      .join(", ");
  };
  useEffect( () => {
    const listCourse = fetchData("Data Science");
    setCourse(listCourse);
  },[])

  useEffect(() => {
    console.log(convertObjectToString(userData));
    console.log(course)
    if (userDataString !== "null") {
<<<<<<< HEAD
      runAPICall2(convertObjectToString(course));
      runAPICall(convertObjectToString(course));
=======
      if (APIData.freeLearningCourses === null) {
        console.log("Running API");
        runAPICall2(convertObjectToString(userData));
      } else {
        console.log(APIData);
        setApiResponseDB(APIData.freeLearningCourses);
      }
      runAPICall(convertObjectToString(userData));
>>>>>>> 1d52658e681c6ceb093b2d36f107b1e6bc13e38c
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [course]);

  useEffect(() => {
    // Reset selectedCity to the default value when the component mounts (page reload)
    setSelectedCity(cities[0]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  // eslint-disable-next-line no-unused-vars

  const fetchData = async (prompt) => {
    try {
      const response = await axios.get('http://127.0.0.1:5000/predict', {
        params: {
          prompt: prompt,
        },
      });
      return response.data;
 // Assuming the response is an array of members
    } catch (error) {
      console.error(error);
    }
  };

  const toast = useRef(null);

  const palm = new PalmAI();

  const runAPICall = async (userInput) => {
    let content = userInput + promptString;
    console.log("content:" + content);
    const response = await palm.getResponse(content);

    const jsonData = JSON.parse(formatJSONString(response));
    setApiResponse(jsonData);
    localStorage.setItem("playlist", `${formatJSONString(response)}`);
  };

  const runAPICall2 = async (userInput) => {
    let content = userInput + promptString2;

    const response = await palm.getResponse(content);

    const jsonData = JSON.parse(formatJSONString(response));
    setApiResponse2(jsonData);
    console.log(jsonData);
    saveAPI2Response(jsonData);
  };

  useEffect(() => {
    const documentStyle = getComputedStyle(document.documentElement);
    const data = {
      labels: ["A", "B", "C"],
      datasets: [
        {
          data: [300, 50, 100],
          backgroundColor: [
            documentStyle.getPropertyValue("--blue-500"),
            documentStyle.getPropertyValue("--yellow-500"),
            documentStyle.getPropertyValue("--green-500"),
          ],
          hoverBackgroundColor: [
            documentStyle.getPropertyValue("--blue-400"),
            documentStyle.getPropertyValue("--yellow-400"),
            documentStyle.getPropertyValue("--green-400"),
          ],
        },
      ],
    };
    const options = {
      cutout: "60%",
    };

    setChartData(data);
    setChartOptions(options);
  }, []);

  const items = Array.from({ length: 5 }, (v, i) => i);

  const bodyTemplate = () => {
    return <Skeleton></Skeleton>;
  };

  const selectedCityName = selectedCity ? selectedCity.name : null;

  return user ? (
    <ThemeProvider theme={themeStyle}>
      <SLayout>
        <Sidebar />
        <div className="main">
          <div className="containerInfo">
            <div className="sec1">
              <div className="part1">
                <div className="header">
                  <h3>Your Progress Tracker</h3>
                </div>
                <div className="border"></div>
                <div className="titles">
                  <small>Courses Remaining</small>
                  <small>Course Progress</small>
                  <small>Courses Status</small>
                </div>
                <div className="boxes">
                  <div className="box">
                    <Chart
                      type="doughnut"
                      data={chartData}
                      options={chartOptions}
                      className="w-full md:w-30rem"
                    />
                  </div>
                  <div className="boxContainer"></div>
                  <div className="box">
                    <Sts />
                  </div>

                  <div className="box">
                    <StackedBar />
                  </div>
                </div>
                <div className="border"></div>
              </div>
            </div>
            <div className="sec2">
              <div className="part1">
                <div className="header">
                  <h3>Your Learning Journey</h3>
                  <div className="popup">
                    <Dropdown
                      value={selectedCity}
                      onChange={(e) => setSelectedCity(e.value)}
                      options={cities}
                      optionLabel="name"
                      placeholder="Premium Learning"
                      className="drop"
                    />
                    <Button
                      label="Show"
                      icon="pi pi-external-link"
                      onClick={() => setVisible2(true)}
                    />
                  </div>
                </div>
                <Dialog
                  header="Header"
                  visible={visible2}
                  style={{ width: "70vw" }}
                  onHide={() => setVisible2(false)}
                >
                  <div className="app">
                    {apiResponse?.learningroadmap &&
                    apiResponse.learningroadmap.length > 0 ? (
                      <TaskList apiResponse={apiResponse} />
                    ) : (
                      <div className="empty">
                        <h2>No tasks available</h2>
                      </div>
                    )}
                  </div>
                </Dialog>
                {selectedCityName === "Free Learning" ? (
                  <div className="app">
                    {apiResponse?.learningroadmap &&
                    apiResponse.learningroadmap.length > 0 ? (
                      <TaskList apiResponse={apiResponse} />
                    ) : (
                      <div className="empty">
                        <DataTable
                          value={items}
                          tableStyle={{ minWidth: "50rem" }}
                        >
                          <Column
                            field="phase"
                            header="Phase"
                            sortable
                            style={{ width: "10%" }}
                            body={bodyTemplate}
                          ></Column>
                          <Column
                            field="course"
                            header="Course"
                            style={{ width: "50%" }}
                            body={bodyTemplate}
                          ></Column>
                          <Column
                            field="progress"
                            header="Progress"
                            sortable
                            style={{ width: "25%" }}
                            body={bodyTemplate}
                          ></Column>
                        </DataTable>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="">
                    {apiResponseDB?.learningroadmap &&
                    apiResponseDB.learningroadmap.length > 0 ? (
                      <DetailsCourse apiResponse2={apiResponseDB} />
                    ) : apiResponse2?.learningroadmap &&
                      apiResponse2.learningroadmap.length > 0 ? (
                      <DetailsCourse apiResponse2={apiResponse2} />
                    ) : (
                      <div className="empty">
                        <DataTable
                          value={items}
                          tableStyle={{ minWidth: "50rem" }}
                        >
                          <Column
                            field="phase"
                            header="Phase"
                            sortable
                            style={{ width: "10%" }}
                            body={bodyTemplate}
                          ></Column>
                          <Column
                            field="course"
                            header="Course"
                            style={{ width: "50%" }}
                            body={bodyTemplate}
                          ></Column>
                          <Column
                            field="progress"
                            header="Progress"
                            sortable
                            style={{ width: "25%" }}
                            body={bodyTemplate}
                          ></Column>
                        </DataTable>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </SLayout>
    </ThemeProvider>
  ) : (
    navigate("/")
  );
};

export default HomePage;
