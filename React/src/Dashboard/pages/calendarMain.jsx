import React, { useState, useRef } from 'react';
import '../pages/Style/App.css'
import { SLayout, SMain } from "../components/Layout/styles";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import Sidebar from "../components/Sidebar/Sidebar";
export const ThemeContext = React.createContext(null);
import CalendarApp from '../../App2'


function CalendarMain() {

    const [theme] = useState("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;
    return (
        <ThemeProvider theme={themeStyle}>
            <SLayout>
                <Sidebar />
<CalendarApp/>
            </SLayout>
        </ThemeProvider>
    );
}

export default CalendarMain;