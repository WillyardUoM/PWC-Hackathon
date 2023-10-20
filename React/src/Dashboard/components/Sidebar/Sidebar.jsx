import React, { useContext, useRef, useState } from "react";
import {
    SDivider,
    SLink,
    SLinkContainer,
    SLinkIcon,
    SLinkLabel,

    SLogo,
    SSidebar,
    SSidebarButton,

} from "./styles";

import {
    AiOutlineApartment,
    AiOutlineHome,
    AiOutlineLeft,
    AiOutlineSetting,
} from "react-icons/ai";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { BsPeople } from "react-icons/bs";


import { useLocation } from "react-router-dom";

const Sidebar = () => {
  
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { pathname } = useLocation();


    return (
        <SSidebar isOpen={sidebarOpen}>
            <>
                <SSidebarButton isOpen={sidebarOpen} onClick={() => setSidebarOpen((p) => !p)}>
                    <AiOutlineLeft />
                </SSidebarButton>
            </>
            <SLogo>
            <img src="/images/pwc-logo.png"  alt="" />

            </SLogo>

            <SDivider />
            {linksArray.map(({ icon, label, to }) => (
                <SLinkContainer key={label} isActive={pathname === to}>
                    <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && (
                            <>
                                <SLinkLabel>{label}</SLinkLabel>

                            </>
                        )}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />
            {secondaryLinksArray.map(({ icon, label }) => (
                <SLinkContainer key={label}>
                    <SLink to="/" style={!sidebarOpen ? { width: `fit-content` } : {}}>
                        <SLinkIcon>{icon}</SLinkIcon>
                        {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
                    </SLink>
                </SLinkContainer>
            ))}
            <SDivider />

        </SSidebar>
    );
};

const linksArray = [
    {
        label: "Home",
        icon: <AiOutlineHome />,
        to: "/",

    },
    {
        label: "Statistics",
        icon: <MdOutlineAnalytics />,
        to: "/statistics",

    },
    {
        label: "Customers",
        icon: <BsPeople />,
        to: "/customers",

    },
    {
        label: "Diagrams",
        icon: <AiOutlineApartment />,


    },
];

const secondaryLinksArray = [
    {
        label: "Settings",
        icon: <AiOutlineSetting />,
    },
    {
        label: "Logout",
        icon: <MdLogout />,
    },
];

export default Sidebar;
