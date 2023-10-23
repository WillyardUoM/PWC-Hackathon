import React, { useState, useRef } from 'react';
import './Style/App.css'
import { SLayout, SMain } from "../components/Layout/styles";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import Sidebar from "../components/Sidebar/Sidebar";
export const ThemeContext = React.createContext(null);
import { Button } from 'primereact/button';

function Profile() {
    const [loading, setLoading] = useState(false);

    const load = () => {
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
        }, 2000);
    };

    const [theme] = useState("light");
    const themeStyle = theme === "light" ? lightTheme : darkTheme;
    return (
        <ThemeProvider theme={themeStyle}>
            <SLayout>
                <Sidebar />
                <div>
                    <div className="header">
                        <h1>Change Setting</h1>

                        <Button label="Save" icon="pi pi-check" loading={loading} onClick={load} />
                    </div>
                </div>
            </SLayout>
        </ThemeProvider>
    );
}

export default Profile;