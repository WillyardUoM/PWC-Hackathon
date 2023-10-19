import NewComers from "./newcomers/newcomers";
import { HashRouter } from 'react-router-dom';
import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';
import Academy from "./Academy/Academy";

function App() {
  return (
    <>
      <HashRouter>
        <Academy />
      </HashRouter>
    </>
  );
}

export default App;
