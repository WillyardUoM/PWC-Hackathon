import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../FirebaseComponent/Firebase";

function Logout() {
  const navigate = useNavigate();

  useEffect(() => {
    // Use an effect to handle the sign-out process when the component mounts.
    const handleLogout = async () => {
      try {
        await auth.signOut();
        navigate("/");
      } catch (error) {
        // Handle any errors here, e.g., display an error message.
        console.error("Error during sign-out:", error);
      }
    };

    handleLogout();
  }, [navigate]);

  // You can return null or a loading message here.
  return (
    <>
      <h2>Loading...</h2>
    </>
  );
}

export default Logout;
