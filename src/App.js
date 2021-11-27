import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Description from "./components/Description";
import Sign from "./components/Sign";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import UserPage from "./components/UserPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/description/:id" element={<Description />} />
        <Route exact path="/Sign" element={<Sign />} />
        <Route exact path="/SignIn" element={<SignIn />} />
        <Route exact path="/SignUp" element={<SignUp />} />
        <Route exact path="/UserPage" element={<UserPage />} />
      </Routes>
    </div>
  );
}

export default App;
