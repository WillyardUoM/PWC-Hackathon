
import React, { useState, useRef, useEffect } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
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
import { InputText } from 'primereact/inputtext';
import StackedBar from './due';


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


const HomePage = () => {

    const [search, setSearch] = useState("");
    const [apiResponse, setApiResponse] = useState([]);
    const [chartData, setChartData] = useState({});
    const [chartOptions, setChartOptions] = useState({});

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [theme] = useState("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;

    const toast = useRef(null);

    const palm = new PalmAI();

    const runAPICall = async (userInput) => {
        let content = userInput + promptString;

        const response = await palm.getResponse(content);

        const jsonData = JSON.parse(formatJSONString(response));
        setApiResponse(jsonData);
        console.log(jsonData);
        localStorage.setItem("playlist", `${formatJSONString(response)}`);
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
    const accept = () => {
        toast.current.show({
            severity: "info",
            summary: "Confirmed",
            detail: "You have accepted",
            life: 300000,
        });
    };

    const reject = () => {
        toast.current.show({
            severity: "warn",
            summary: "Rejected",
            detail: "You have rejected",
            life: 300000,
        });
    };

    return (
        <ThemeProvider theme={themeStyle}>
            <SLayout>
                <Sidebar />
                <div className="main">
                    <div className="containerInfo">
                        <div className="sec1">
                            <div className="part1">
                                <div className="header">
                                    <h3>Your Progress</h3>

                                </div>
                                <div className="boxes">
                                    <div className="box">
                                        
                                        <Chart type="doughnut" data={chartData} options={chartOptions} className="w-full md:w-30rem" />
                                    </div>
                                    <div className="box">
                                        <Sts />
                                    </div>

                                    <div className="box">
                                        <StackedBar />
                                    </div>


                                </div>
                            </div>

                        </div>
                        <div className="sec2">
                            <div className="part1">
                                <div className="popup">
                                    <span className="p-input-icon-left">
                                        <i className="pi pi-search" onClick={() => runAPICall(search)} />
                                        <InputText placeholder="Search" value={search}
                                            onChange={(e) => setSearch(e.target.value)} />
                                    </span>
                                    <Button label="Show" icon="pi pi-external-link" onClick={() => setVisible2(true)} />
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
                                <div className="app">


                                    {apiResponse?.learningroadmap && apiResponse.learningroadmap.length > 0 ? (
                                        <TaskList apiResponse={apiResponse} />
                                    ) : (
                                        <div className="empty">
                                            <h2>No tasks available</h2>
                                        </div>
                                    )}
                                </div>
                                
                            </div>

                        </div>
                    </div>
                </div>
            </SLayout>
        </ThemeProvider>
    )
}

export default HomePage;
