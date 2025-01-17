import { useState } from "react";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import DailyProgress from "./components/DailyProgress/DailyProgress";

function App() {
  return (
    <>
      <Navbar />
      <DailyProgress goal={100} progress={30} />
      <h1>Welcome to Fitlog</h1>
    </>
  );
}

export default App;
