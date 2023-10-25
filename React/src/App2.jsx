import React, { useState, useEffect } from 'react';
import Calendar from './components/Scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App2.css';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';


function CalendarApp() {
    const [currentTimeFormatState, setCurrentTimeFormatState] = useState(true);
    const [messages, setMessages] = useState([]);

    const addMessage = (message) => {
        const maxLogLength = 5;
        const newMessage = { message };
        setMessages((prevMessages) => {
            const messages = [newMessage, ...prevMessages];
            if (messages.length > maxLogLength) {
                messages.length = maxLogLength;
            }
            return messages;
        });
    }

    const logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? ` (${ev.text})` : '';
        const message = `Event ${action}: ${id} ${text}`;
        addMessage(message);
    }

    const courses = [
        {
            name: 'Course A',
            timePerDay: 2, // Amount of hours allocated per day for Course A
            totalDuration: 10, // Total duration of Course A in days
        },
        {
            name: 'Course B',
            timePerDay: 3, // Amount of hours allocated per day for Course B
            totalDuration: 20, // Total duration of Course B in days
        },
    ];

    const data = [];
    let currentDate = new Date();
    let i = 1;

    for (const course of courses) {
        for (let countDuration = course.timePerDay; countDuration <= course.totalDuration;) {
            const startDate = new Date(currentDate);
            startDate.setHours(6, 0, 0, 0); // Set the start time to 06:00

            const endDate = new Date(startDate);
            endDate.setHours(startDate.getHours() + course.timePerDay);

            data.push({
                start_date: startDate.toISOString().slice(0, 19).replace('T', ' '), // Format as '2023-11-20 6:00'
                end_date: endDate.toISOString().slice(0, 19).replace('T', ' '), // Format as '2023-11-20 8:00'
                text: course.name,
                id: i,
            });

            currentDate.setDate(currentDate.getDate() + 1); // Move to the next day

            i++;
            countDuration += course.timePerDay;
        }
    }
    const dataTableData = data.map((event) => ({
        id: event.id,
        start_date: event.start_date,
        end_date: event.end_date,
        text: event.text,
    }));
    return (
        <div className="mainCalendar">
            <div className='calendarDiv'>
                <div className="tool-bar">
                    <Toolbar
                        timeFormatState={currentTimeFormatState}
                        onTimeFormatStateChange={setCurrentTimeFormatState}
                    />
                </div>
                <div className='scheduler-container'>
                    <Calendar
                        events={data}
                        timeFormatState={currentTimeFormatState}
                        onDataUpdated={logDataUpdate}
                    />
                </div>
                <DataTable value={dataTableData} style={{ width: '50rem', marginTop: '20px'}}>
                <Column field="id" header="ID" />
                <Column field="start_date" header="Start Date" />
                <Column field="end_date" header="End Date" />
                <Column field="text" header="Course Name" />
                <Column field="text" header="Course Name" />

            </DataTable>
                <MessageArea messages={messages} />
            </div>

        </div>
    );
}

export default CalendarApp;
