import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DailyProgress from "./components/DailyProgress/DailyProgress";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <Home />
      <h1>Welcome to Fitlog</h1>
    </>
  );
}

export default App;
