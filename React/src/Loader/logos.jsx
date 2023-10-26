import { useState, useEffect } from "react";
import pwcLogo from "../assets/Loader/PricewaterhouseCoopers_Logo.svg";
import "./logo.css";
import { useNavigate } from "react-router-dom";

function Loading() {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      navigate("/Login");
    }, 3000);
  }, [navigate]);

  return (
    <div className="overlayContent">
      {loading && (
        <div className="loader">
          <div className="inner">
            <img src={pwcLogo} className="logo" alt="Pwc logo" />
          </div>
        </div>
      )}
    </div>
  );
}

export default Loading;
