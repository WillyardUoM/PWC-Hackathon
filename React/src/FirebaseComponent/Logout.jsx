import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseComponent/Firebase";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        await auth.signOut();
        navigate("/");
      } catch (error) {
        console.error("Error during sign-out:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  // Return null or a loading message here.
  return (
    <>
      <h2>Loading...</h2>
    </>
  );
}

export default Logout;
