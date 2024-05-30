import React, { useState } from "react";
import Login from "./components/login";
import SignUp from "./components/signup";
import Tasks from "./components/tasks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />}></Route>
          <Route path="/Signup" element={   <SignUp />}></Route>
          <Route path="/Tasks" element={   <Tasks />}></Route>
          </Routes>
      </Router>
    </div>
  );
};

export default App;
