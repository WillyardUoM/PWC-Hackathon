import React, { Component } from 'react';
import Calendar from './components/Scheduler';
import Toolbar from './components/Toolbar';
import MessageArea from './components/MessageArea';
import './App2.css';

class CalendarApp extends Component {
    state = {
        currentTimeFormatState: true,
        messages: [],
    };

    addMessage(message) {
        const maxLogLength = 5;
        const newMessage = { message };
        const messages = [newMessage, ...this.state.messages];

        if (messages.length > maxLogLength) {
            messages.length = maxLogLength;
        }
        this.setState({ messages });
    }

    logDataUpdate = (action, ev, id) => {
        const text = ev && ev.text ? ` (${ev.text})` : '';
        const message = `Event ${action}: ${id} ${text}`;
        this.addMessage(message);
    }

    handleTimeFormatStateChange = (state) => {
        this.setState({
            currentTimeFormatState: state,
        });
    }

    render() {
        const { currentTimeFormatState, messages } = this.state;

        // Define course parameters
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

        // Generate events for all courses
        const data = [];
        let currentDate = new Date();
        let i = 1;

        for (const course of courses) {
            for (let countDuration = course.timePerDay; countDuration <= course.totalDuration;) {
                const startDate = new Date(currentDate);
                startDate.setHours(6, 0, 0, 0); // Set the start time to 06:00
                console.log(startDate);

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

        return (
            <div className='calendarDiv'>
                <div className="tool-bar">
                    <Toolbar
                        timeFormatState={currentTimeFormatState}
                        onTimeFormatStateChange={this.handleTimeFormatStateChange}
                    />
                </div>
                <div className='scheduler-container'>
                    <Calendar
                        events={data}
                        timeFormatState={currentTimeFormatState}
                        onDataUpdated={this.logDataUpdate}
                    />
                </div>
                <MessageArea
                    messages={messages}
                />
            </div>
        );
    }
}

export default CalendarApp;
