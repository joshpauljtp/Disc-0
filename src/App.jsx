import { BrowserRouter } from "react-router";
import "./App.css";
import MainLogic from "./MainLogic";

function App() {
  return (
    <BrowserRouter>
      <MainLogic />
    </BrowserRouter>
  );
}

export default App;
