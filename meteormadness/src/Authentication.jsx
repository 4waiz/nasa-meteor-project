import { useState } from "react";
import { SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import Space from "./Space";

export default function AuthPage() {
  const [isSignIn, setIsSignIn] = useState(true);

  return (
    <div style={styles.container}>
      <SignedOut>
        <div style={styles.authBox}>
          <h1 style={styles.title}>Meteor Madness</h1>

          {/* Toggle buttons */}
          <div style={styles.toggleButtons}>
            <button
              onClick={() => setIsSignIn(true)}
              style={{
                ...styles.toggleBtn,
                ...(isSignIn ? styles.activeToggleBtn : {}),
              }}
            >
              Sign In
            </button>
            <button
              onClick={() => setIsSignIn(false)}
              style={{
                ...styles.toggleBtn,
                ...(!isSignIn ? styles.activeToggleBtn : {}),
              }}
            >
              Sign Up
            </button>
          </div>

          {/* Auth forms */}
          <div style={styles.formContainer}>
            {isSignIn ? (
              <SignIn
                appearance={{
                  elements: {
                    formButtonPrimary: "clerk-primary-btn", // custom class name
                  },
                }}
                redirectUrl="/space"
              />
            ) : (
              <SignUp
                appearance={{
                  elements: {
                    formButtonPrimary: "clerk-primary-btn",
                  },
                }}
                redirectUrl="/space"
              />
            )}
          </div>

          <button
            onClick={() => setIsSignIn(!isSignIn)}
            style={styles.switchText}
          >
            {isSignIn
              ? "Don't have an account? Sign up"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </SignedOut>

      <SignedIn>
        <Space />
      </SignedIn>

      {/* Inline CSS for Clerk’s injected button */}
      <style>{`
        .clerk-primary-btn {
          background-color: #007bff !important;
          color: white !important;
          border-radius: 6px !important;
          padding: 10px !important;
          font-weight: bold !important;
          border: none !important;
          width: 100% !important;
          cursor: pointer !important;
        }
        .clerk-primary-btn:hover {
          background-color: #0056b3 !important;
        }
      `}</style>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f5f5f5",
    fontFamily: "Arial, sans-serif",
  },

  title: {
    marginBottom: "1.5rem",
    color: "#333",
    fontSize: "1.5rem",
    fontWeight: "bold",
  
  },
  toggleButtons: {
    display: "flex",
    marginBottom: "1.5rem",
    borderRadius: "6px",
    padding: "4px",
  },
  toggleBtn: {
    flex: 1,
    padding: "0.5rem",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "0.95rem",
    transition: "all 0.2s ease-in-out",
  },
  activeToggleBtn: {
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
    fontWeight: "bold",
  },
  formContainer: {
    marginBottom: "1rem",
  },
  switchText: {
    background: "none",
    border: "none",
    color: "#007bff",
    cursor: "pointer",
    fontSize: "0.9rem",
    marginTop: "0.5rem",
    textDecoration: "underline",
  },
};
