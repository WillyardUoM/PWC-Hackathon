import React, { useState, useRef } from 'react';
import '../pages/Style/App.css'
import { SLayout, SMain } from "../components/Layout/styles";
import { ThemeProvider } from "styled-components";
import { darkTheme, lightTheme } from "../styles/theme";
import Sidebar from "../components/Sidebar/Sidebar";
export const ThemeContext = React.createContext(null);
import { Button } from 'primereact/button';
import { InputText } from "primereact/inputtext";
import { Password } from 'primereact/password';


function Profile() {
    const [loading, setLoading] = useState(false);
    const [value, setValue] = useState('');
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
                <div className='main'>
        
                    <div className="containerInfo">
                    <div className="headerProfile">
                        <h1>Change Setting</h1>
                        <Button label="Save" icon="pi pi-check" loading={loading} onClick={load} />
                    </div>
                        <p className='title'>Personal Details</p>
                        <div className="group">
                            <div className="textBox">
                                <label htmlFor="username">Email</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="textBox">
                                <label htmlFor="Email">Password</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </div>
                        <div className="group">
                            <div className="textBox">
                                <label htmlFor="username">Email</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="textBox">
                                <label htmlFor="Email">Username</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </div>
                        <p className='title'>Add New Education/Certification</p>
                        <div className="group">
                            <div className="textBox">
                                <label htmlFor="username">Email</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="textBox">
                                <label htmlFor="Email">Password</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </div>
                        <div className="group">
                            <div className="textBox">
                                <label htmlFor="username">Email</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="textBox">
                                <label htmlFor="Email">Username</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </div>
                        <p className='title'>Add New Experience</p>
                        <div className="group">
                            <div className="textBox">
                                <label htmlFor="username">Email</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="textBox">
                                <label htmlFor="Email">Password</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </div>
                        <div className="group">
                            <div className="textBox">
                                <label htmlFor="username">Email</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                            <div className="textBox">
                                <label htmlFor="Email">Username</label>
                                <InputText id="username" aria-describedby="username-help" />
                                <small id="username-help">
                                    Enter your username to reset your password.
                                </small>
                            </div>
                        </div>


                    </div>
                </div>
            </SLayout>
        </ThemeProvider>
    );
}

export default Profile;