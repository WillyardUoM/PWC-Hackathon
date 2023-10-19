import NewComers from "./newcomers/newcomers";
import { HashRouter } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Academy from "./Academy/Academy";
import Dash from "./Dashboard/Dashboard";

function App() {
  return (
    <>
      <HashRouter>
        <Dash />
      </HashRouter>
    </>
  );
}

export default App;
