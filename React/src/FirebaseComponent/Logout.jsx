import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseComponent/Firebase";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await auth.signOut();
        navigate("/Login");
      } catch (error) {
        console.error("Error during sign-out:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  return <></>;
}

export default Logout;
