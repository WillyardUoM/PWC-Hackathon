import { useEffect, useState } from "react";
import Calendar from "./components/Scheduler";
import Toolbar from "./components/Toolbar";
import MessageArea from "./components/MessageArea";
import "./App2.css";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
//firebase
import { auth, db } from "../src/FirebaseComponent/Firebase";
import { collection, doc, getDoc } from "firebase/firestore";

function CalendarApp() {
  const [currentTimeFormatState, setCurrentTimeFormatState] = useState(true);
  const [messages, setMessages] = useState([]);

  // db
  // eslint-disable-next-line no-unused-vars
  const [user, setUser] = useState(null);
  const [APIData, setAPIData] = useState({
    freeLearningCourses: null,
  });
  const [documentId, setDocumentId] = useState(null);
  const [courseArray, setCourseArray] = useState([]);

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
  };

  const logDataUpdate = (action, ev, id) => {
    const text = ev && ev.text ? ` (${ev.text})` : "";
    const message = `Event ${action}: ${id} ${text}`;
    addMessage(message);
  };

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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [documentId]);

  const getDocumentData = (documentId) => {
    const usersCollection = collection(db, "Accounts");
    const docRef = doc(usersCollection, documentId);

    getDoc(docRef)
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();

          setAPIData({
            freeLearningCourses: data.freeLearningCourses
              ? data.freeLearningCourses
              : null,
          });

          const courseRetrieved =
            APIData.freeLearningCourses.learningroadmap.map((course) => ({
              course: course.course,
              totalDuration: course.durationInHours,
            }));
          setCourseArray(courseRetrieved);

          console.log(courseArray);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document: " + error);
      });
  };

 /*  const courses = [
    {
      name: "Course A",
      timePerDay: 2, // Amount of hours allocated per day for Course A
      totalDuration: 10, // Total duration of Course A in days
    },
    {
      name: "Course B",
      timePerDay: 3, // Amount of hours allocated per day for Course B
      totalDuration: 20, // Total duration of Course B in days
    },
  ]; */

  const data = [];
  let currentDate = new Date();
  let i = 1;

  for (const course of courseArray) {
    for (
      let countDuration = course.timePerDay;
      countDuration <= course.totalDuration;

    ) {
      const startDate = new Date(currentDate);
      startDate.setHours(6, 0, 0, 0); // Set the start time to 06:00

      const endDate = new Date(startDate);
      endDate.setHours(startDate.getHours() + course.timePerDay);

      data.push({
        start_date: startDate.toISOString().slice(0, 19).replace("T", " "), // Format as '2023-11-20 6:00'
        end_date: endDate.toISOString().slice(0, 19).replace("T", " "), // Format as '2023-11-20 8:00'
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
      <div className="calendarDiv">
        <div className="tool-bar">
          <Toolbar
            timeFormatState={currentTimeFormatState}
            onTimeFormatStateChange={setCurrentTimeFormatState}
          />
        </div>
        <div className="scheduler-container">
          <Calendar
            events={data}
            timeFormatState={currentTimeFormatState}
            onDataUpdated={logDataUpdate}
          />
        </div>
        <DataTable
          value={dataTableData}
          style={{ width: "50rem", marginTop: "20px" }}
        >
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
