import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import DailyProgress from "./components/DailyProgress/DailyProgress";
import Home from "./pages/Home";
import Profile from "./pages/Profile";

function App() {
  return (
    <>
      <Navbar />
      <div className="tw-p-4 tw-bg-gray-100 tw-min-h-screen">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/profile" element={<Profile />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
