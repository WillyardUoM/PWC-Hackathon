
import React, { useState, useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import './Style/App.css'
import TaskList from './TaskList';
import { Knob } from 'primereact/knob';
import { Dialog } from 'primereact/dialog';


import { InputText } from 'primereact/inputtext';

const API_URL = 'http://www.omdbapi.com/?apikey=27943250';

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
    const [movies, setMovies] = useState([]);
    const [search, setSearch] = useState('');
    const [apiResponse, setApiResponse] = useState([]);
    const [value, setValue] = useState(60);

    const runAPICall = async (userInput) => {
        const response = await fetch(`${API_URL}&s=${userInput}`);
        const data = await response.json();

        setMovies(data.Search);

        let content;
        content = userInput + promptString;

        fetch('http://localhost:9000/testAPI/send-message', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content }),
        })
            .then((res) => res.text())
            .then(() => {
                fetch('http://localhost:9000/testAPI')
                    .then((res) => res.text())
                    .then((res) => {
                        console.log(formatJSONString(res));
                        setApiResponse(JSON.parse(formatJSONString(res)));
                    });
            }
            )
            .catch((error) => {
                console.error(error);
            });
    };
    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);

    const toast = useRef(null);

    const accept = () => {
        toast.current.show({ severity: 'info', summary: 'Confirmed', detail: 'You have accepted', life: 3000 });
    }

    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    }

    return (
        <div className="main">

            <div className="sec1">
                <div className="part1">
                    <div className="header">
                        <h3>Your Result</h3>
                        <Toast ref={toast} />
                        <ConfirmDialog className='confirmDialog' visible={visible} onHide={() => setVisible(false)} message="Are you sure you want to proceed?"
                            header="Confirmation" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                        <div className="card flex justify-content-center">
                            <Button className='btn' icon="pi pi-check" onClick={() => setVisible(true)} label="Confirm" />
                        </div>
                    </div>
                    <div className="boxes">
                        <div className="box"></div>
                        <div className="box"></div>
                        <div className="box"></div>

                    </div>
                </div>
                <div className="part2">
                    <div className="card flex justify-content-center">
                        <Knob value={value} onChange={(e) => setValue(e.value)} size={200} />
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
                <div className="part2">

                </div>
            </div>

        </div>
    )
}

export default HomePage;
