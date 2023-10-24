/* eslint-disable no-unused-vars */
import { useContext, useRef, useState } from "react";
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
  AiOutlineHome,
  AiOutlineCalendar,
  AiOutlineFieldTime,
  AiOutlineLeft,
  AiOutlineSetting,
  AiOutlineRobot,
} from "react-icons/ai";

import { MdOutlineSchool } from "react-icons/md";
import { MdLogout, MdOutlineAnalytics } from "react-icons/md";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Toast } from "primereact/toast";

import { useLocation } from "react-router-dom";

const Sidebar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <SSidebar isOpen={sidebarOpen}>
      <>
        <SSidebarButton
          isOpen={sidebarOpen}
          onClick={() => setSidebarOpen((p) => !p)}
        >
          <AiOutlineLeft />
        </SSidebarButton>
      </>
      <SLogo>
        <img src="/images/pwc-logo.png" alt="" />
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
      {thirdLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
            <SLinkIcon>{icon}</SLinkIcon>
            {sidebarOpen && <SLinkLabel>{label}</SLinkLabel>}
          </SLink>
        </SLinkContainer>
      ))}
      <SDivider />

      {secondaryLinksArray.map(({ icon, label, to }) => (
        <SLinkContainer key={label} isActive={pathname === to}>
          <SLink to={to} style={!sidebarOpen ? { width: `fit-content` } : {}}>
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
    label: "Training Plan",
    icon: <AiOutlineCalendar />,
    to: "/calendar",
  },
];
const thirdLinksArray = [
  {
    label: "Academy",
    icon: <MdOutlineSchool />,
    to: "/Academy",
  },
  {
    label: "AI Tutor",
    icon: <AiOutlineRobot />,
    to: "/chatbox",
  },
];
const secondaryLinksArray = [
  {
    label: "Settings",
    icon: <AiOutlineSetting />,
    to: "/Profile",
  },
  {
    label: "Logout",
    icon: <MdLogout />,
    to: "/Logout",
  },
];

export default Sidebar;
