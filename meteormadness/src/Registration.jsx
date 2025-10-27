import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    teamName: "",
    projectIdea: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real application, you'd send this data to a server.
    // For now, we'll just log it to the console.
    console.log("Hackathon Registration Data:", formData);
    setIsSubmitted(true);
    // Reset form after a delay
    setTimeout(() => {
        setIsSubmitted(false);
        setFormData({ fullName: "", email: "", teamName: "", projectIdea: "" });
    }, 3000);
  };

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: "linear-gradient(to bottom, #000, #1a1a2e, #000)",
      color: "white",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    backLink: {
      color: "#4ea4ff",
      cursor: "pointer",
      position: 'absolute',
      top: '20px',
      left: '40px',
      fontSize: "14px",
    },
    registrationBox: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '15px',
        padding: '40px',
        width: '100%',
        maxWidth: '500px',
        textAlign: 'center',
    },
    title: {
      fontSize: "28px",
      fontWeight: "bold",
      color: "#4ea4ff",
      marginBottom: '5px',
    },
    subtitle: {
        color: '#ccc',
        marginBottom: '10px',
    },
    eventDetails: {
        color: '#aaa',
        marginBottom: '30px',
        fontSize: '14px',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        gap: '15px',
    },
    input: {
      width: '100%',
      padding: '12px',
      background: 'rgba(0, 0, 0, 0.3)',
      border: '1px solid #555',
      borderRadius: '6px',
      color: 'white',
      boxSizing: 'border-box',
    },
    textarea: {
        resize: 'vertical',
        minHeight: '80px',
    },
    button: {
      padding: '12px',
      background: 'linear-gradient(135deg, #007bff, #4ea4ff)',
      border: 'none',
      borderRadius: '6px',
      fontWeight: 'bold',
      color: 'white',
      cursor: 'pointer',
      fontSize: '16px',
    },
    successMessage: {
        color: '#28a745',
        fontWeight: 'bold',
        marginTop: '20px',
    }
  };

  return (
    <div style={styles.container}>
       <div style={styles.backLink} onClick={() => navigate('/space')}>
        &larr; Back to Space View
      </div>

      <div style={styles.registrationBox}>
        <h1 style={styles.title}>NASA Space Apps Challenge</h1>
        <p style={styles.subtitle}>2025 Hackathon Registration</p>
        <p style={styles.eventDetails}>October 3-4 | University of Dubai</p>

        {isSubmitted ? (
             <div style={styles.successMessage}>
                Thank you for registering! Your team is ready for liftoff.
             </div>
        ) : (
            <form onSubmit={handleSubmit} style={styles.form}>
                <input
                type="text"
                name="fullName"
                placeholder="Full Name"
                value={formData.fullName}
                onChange={handleChange}
                required
                style={styles.input}
                />
                <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                required
                style={styles.input}
                />
                <input
                type="text"
                name="teamName"
                placeholder="Team Name (Optional)"
                value={formData.teamName}
                onChange={handleChange}
                style={styles.input}
                />
                <textarea
                name="projectIdea"
                placeholder="Briefly describe your project idea (Optional)"
                value={formData.projectIdea}
                onChange={handleChange}
                style={{...styles.input, ...styles.textarea}}
                />
                <button type="submit" style={styles.button}>
                Register for Hackathon
                </button>
          </form>
        )}
      </div>
    </div>
  );
}