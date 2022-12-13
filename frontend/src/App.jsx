import { Outlet } from "react-router-dom";

// Components
import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";

// Styles
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <ToastContainer />
      <Navbar />
      <Outlet />
    </div>
  );
}

export default App;
