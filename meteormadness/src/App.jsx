import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Space from "./Space";
import Track from "./Track";
import Impact from "./Impact";
import Registration from "./Registration";
import AuthPage from "./Authentication";
import { ClerkProvider } from "@clerk/clerk-react";
export default function App() {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
      <Router>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/space" element={<Space />} />
          <Route path="/track" element={<Track />} />
          <Route path="/impact" element={<Impact />} />
          <Route path="/registration" element={<Registration />} />
        </Routes>
      </Router>
    </ClerkProvider>
  );
}
