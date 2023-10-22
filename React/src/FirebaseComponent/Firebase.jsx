import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC7VsVEeswzvqCvqlxCVG1TgroI4IlKLGI",
  authDomain: "pwc-hackathon-befad.firebaseapp.com",
  projectId: "pwc-hackathon-befad",
  storageBucket: "pwc-hackathon-befad.appspot.com",
  messagingSenderId: "32499821888",
  appId: "1:32499821888:web:1f9417db923085ca321ea5",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
