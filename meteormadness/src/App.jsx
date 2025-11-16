import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Space from "./Space";
import Track from "./Track";
import Impact from "./Impact";
import Registration from "./Registration";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Space />} />
        <Route path="/space" element={<Space />} />
        <Route path="/track" element={<Track />} />
        <Route path="/impact" element={<Impact />} />
        <Route path="/registration" element={<Registration />} />
      </Routes>
    </Router>
  );
}
