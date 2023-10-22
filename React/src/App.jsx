import NewComers from "./newcomers/newcomers";
import { HashRouter } from "react-router-dom";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primeicons/primeicons.css";

function App() {
  return (
    <>
      <HashRouter>
        <NewComers />
      </HashRouter>
    </>
  );
}

export default App;
