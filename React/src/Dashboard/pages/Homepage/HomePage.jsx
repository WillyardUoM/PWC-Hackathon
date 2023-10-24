
import React, { useState, useRef, useEffect } from 'react';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import '../Style/App.css'
import TaskList from '../TaskList';
import Sts from '../Homepage/progress'
import { Dialog } from 'primereact/dialog';
import { SLayout, SMain } from "../../components/Layout/styles";
import { ThemeProvider } from "styled-components";
import PalmAI from "../../../Api/palm";
import { darkTheme, lightTheme } from "../../styles/theme";
import Sidebar from "../../components/Sidebar/Sidebar";
export const ThemeContext = React.createContext(null);
import { Chart } from 'primereact/chart';
import StackedBar from './due';
import { Dropdown } from 'primereact/dropdown';
import { Skeleton } from 'primereact/skeleton';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import DetailsCourse from './coursesInfo';

function formatJSONString(jsonString) {

    // Remove leading and trailing spaces if present
    jsonString = jsonString.trim();

    // If the jsonString doesn't start with '{', add it
    if (jsonString.startsWith('```json')) {
        jsonString = jsonString.replace(/^```json/, '').replace(/```$/, '');
    }

    else if (jsonString.startsWith('```')) {
        jsonString = jsonString.replace(/^```/, '').replace(/```$/, '');

    }
    return jsonString;
}


const promptString = `
keep progress 0
based on the about information above i want use to accurately output a a learning roadmap in phases by order for the user he can do in json format. You should only output the JSON, nothing more. You shoud use your knowledge and filling the json accurately based on the information provided. Also note that the title in the JSON will be used for searching courses on youtube so that the user get revelant videos, so much sure to provide a meanful title. The learning roadmap should only contain learning phrases and not anything outside that.
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
An example is shown:
{
    "courses": [
      {
        "platform": "Coursera",
        "name": "JavaScript: The Definitive Guide",
        "phaseName": "Fundamentals"
      },
      {
        "platform": "Udemy",
        "name": "The Complete JavaScript Course (2023)",
        "phaseName": "Fundamentals"
      },
      {
        "platform": "Frontend Masters",
        "name": "JavaScript for React Developers",
        "phaseName": "Intermediate"
      },
      {
        "platform": "Egghead.io",
        "name": "Learn JavaScript: The Good Parts",
        "phaseName": "Intermediate"
      },
      {
        "platform": "Pluralsight",
        "name": "Node.js: Advanced Concepts",
        "phaseName": "Advanced"
      },
      {
        "platform": "Educative.io",
        "name": "JavaScript Design Patterns",
        "phaseName": "Advanced"
      }
    ]
  }  
`;

const HomePage = () => {

    const [apiResponse, setApiResponse] = useState([]);
    const [apiResponse2, setApiResponse2] = useState([]);

    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});
    const [visible2, setVisible2] = useState(false);
    const [theme] = useState("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;
    const [selectedCity, setSelectedCity] = useState(null);
    const cities = [
        { name: 'Premium Learning', code: 'PL' },
        { name: 'Free Learning', code: 'FL' },

    ];
    useEffect(() => {
        // Reset selectedCity to the default value when the component mounts (page reload)
        setSelectedCity(cities[0]);
    }, []);
    const toast = useRef(null);

    const palm = new PalmAI();

    const runAPICall = async (userInput) => {
        let content = userInput + promptString;

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
    };
    const retrieveFromDB = () => {
        //retrieve appropriate data from db and return
        return "UI/UX";
    };

    useEffect(() => {
        const storedValue = retrieveFromDB();
        runAPICall(storedValue);
    }, []);

    useEffect(() => {
        const storedValue = retrieveFromDB();
        runAPICall2(storedValue);
    }, []);
    useEffect(() => {
        const documentStyle = getComputedStyle(document.documentElement);
        const data = {
            labels: ['A', 'B', 'C'],
            datasets: [
                {
                    data: [300, 50, 100],
                    backgroundColor: [
                        documentStyle.getPropertyValue('--blue-500'),
                        documentStyle.getPropertyValue('--yellow-500'),
                        documentStyle.getPropertyValue('--green-500')
                    ],
                    hoverBackgroundColor: [
                        documentStyle.getPropertyValue('--blue-400'),
                        documentStyle.getPropertyValue('--yellow-400'),
                        documentStyle.getPropertyValue('--green-400')
                    ]
                }
            ]
        };
        const options = {
            cutout: '60%'
        };

        setChartData(data);
        setChartOptions(options);
    }, []);

    const items = Array.from({ length: 5 }, (v, i) => i);

    const bodyTemplate = () => {
        return <Skeleton></Skeleton>
    }

    const selectedCityName = selectedCity ? selectedCity.name : null;

    return (
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
                                        <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                                    </div>
                                    <div className="boxContainer">

                                    </div>
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
                                        <Dropdown value={selectedCity} onChange={(e) => setSelectedCity(e.value)} options={cities} optionLabel="name"
                                            placeholder="Premium Learning" className="drop" />
                                        <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible2(true)} />
                                    </div>
                                </div>
                                <Dialog header="Header" visible={visible2} style={{ width: '70vw' }} onHide={() => setVisible2(false)}>

                                    <div className="app">
                                        {apiResponse?.learningroadmap && apiResponse.learningroadmap.length > 0 ? (
                                            <TaskList apiResponse={apiResponse} />
                                        ) : (
                                            <div className="empty">
                                                <h2>No tasks available</h2>
                                            </div>
                                        )}
                                    </div>
                                </Dialog>
                                {selectedCityName === 'Free Learning' ? (
                                    <div className="app">
                                        {apiResponse?.learningroadmap && apiResponse.learningroadmap.length > 0 ? (
                                            <TaskList apiResponse={apiResponse} />
                                        ) : (
                                            <div className="empty">
                                                <DataTable value={items} tableStyle={{ minWidth: '50rem' }}>
                                                    <Column field="phase" header="Phase" sortable style={{ width: '10%' }} body={bodyTemplate}></Column>
                                                    <Column field="course" header="Course" style={{ width: '50%' }} body={bodyTemplate}></Column>
                                                    <Column field="progress" header="Progress" sortable style={{ width: '25%' }} body={bodyTemplate}></Column>

                                                </DataTable>
                                            </div>
                                        )}
                                    </div>
                                ) :
                                    (
                                      <div className="">
                                        {apiResponse2?.courses && apiResponse2.courses.length > 0 ? (
                                            <DetailsCourse apiResponse2={apiResponse2} />
                                        ) : (
                                            <div className="empty">
                                                <DataTable value={items} tableStyle={{ minWidth: '50rem' }}>
                                                    <Column field="phase" header="Phase" sortable style={{ width: '10%' }} body={bodyTemplate}></Column>
                                                    <Column field="course" header="Course" style={{ width: '50%' }} body={bodyTemplate}></Column>
                                                    <Column field="progress" header="Progress" sortable style={{ width: '25%' }} body={bodyTemplate}></Column>

                                                </DataTable>
                                            </div>
                                        )}
                                      </div>
  
                                    )
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </SLayout>
        </ThemeProvider>
    )
}

export default HomePage;
