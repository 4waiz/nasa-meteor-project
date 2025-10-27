import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AlertModal = ({ phone, diameter, onClose }) => {
  const modalStyles = {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(10, 0, 0, 0.8)',
    backdropFilter: 'blur(10px)',
    border: '1px solid #ff4d4d',
    borderRadius: '15px',
    padding: '30px',
    zIndex: 2000,
    color: 'white',
    width: '450px',
    textAlign: 'center',
    boxShadow: '0 0 30px rgba(255, 77, 77, 0.5)',
    animation: 'pulse 1.5s infinite',
  };

  const titleStyles = {
    color: '#ff4d4d',
    fontSize: '24px',
    marginBottom: '15px',
    fontWeight: 'bold',
  };

  const messageStyles = {
    fontSize: '16px',
    lineHeight: '1.6',
    marginBottom: '25px',
  };
  
  const closeButtonStyles = {
    padding: "10px 20px",
    background: "#ff4d4d",
    border: "none",
    borderRadius: "8px",
    color: "white",
    cursor: "pointer",
    fontWeight: 'bold',
  }

  return (
    <>
      <style>{`
        @keyframes pulse {
          0% { box-shadow: 0 0 20px rgba(255, 77, 77, 0.3); }
          50% { box-shadow: 0 0 40px rgba(255, 77, 77, 0.7); }
          100% { box-shadow: 0 0 20px rgba(255, 77, 77, 0.3); }
        }
      `}</style>
      <div style={modalStyles}>
        <h2 style={titleStyles}>CATASTROPHIC EVENT ALERT</h2>
        <p style={messageStyles}>
          Simulated SMS sent to: <strong>{phone}</strong><br />
          Message: "Planetary Defense Alert: A {diameter}m object is on a collision course. Impact imminent. Seek immediate shelter. This is not a drill."
        </p>
        <button style={closeButtonStyles} onClick={onClose}>Acknowledge</button>
      </div>
    </>
  );
};


export default function Impact() {
  const location = useLocation();
  const navigate = useNavigate();

  const [diameter, setDiameter] = useState(location.state?.diameter || 500);
  const [velocity, setVelocity] = useState(location.state?.velocity || 30);

  const [simulationResult, setSimulationResult] = useState(null);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  
  const handleBackLink = () => navigate('/space');

  const runSimulation = () => {
    // These calculations are for demonstration purposes
    const energy = Math.pow(diameter, 3) * Math.pow(velocity, 2) * 0.0005;
    const crater = diameter * 20;
    const blastRadius = diameter * 50;
    let severity = "Low";
    let severityColor = "#44ff44";

    if (energy > 50000) { severity = "Regional"; severityColor = "#ffaa00"; }
    if (energy > 10000000) { severity = "Global"; severityColor = "orange"; }
    if (energy > 500000000) { severity = "Catastrophic"; severityColor = "#ff4d4d"; }

    const result = { energy, crater, blastRadius, severity, severityColor };
    setSimulationResult(result);

    if (isSubscribed && result.severity === "Catastrophic" && phoneNumber.trim()) {
      setShowAlert(true);
    }
  };

  useEffect(() => {
    runSimulation();
  }, [diameter, velocity, isSubscribed, phoneNumber]); // Re-run simulation when parameters change

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(to bottom, #000, #111, #000)",
      color: "white",
      padding: "20px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    backLink: {
      color: "#4ea4ff",
      cursor: "pointer",
      marginBottom: "20px",
      fontSize: "14px",
      textAlign: 'left',
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#ff4d4d",
      marginBottom: "5px",
    },
    subtitle: { color: "#ccc", marginBottom: "30px" },
    mainGrid: {
        display: "grid",
        gridTemplateColumns: "2fr 1fr",
        gap: "20px",
    },
    leftColumn: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    panel: {
      background: "rgba(0,0,0,0.5)",
      border: "1px solid #222",
      borderRadius: "10px",
      padding: "20px",
    },
    panelTitle: { fontSize: "20px", marginBottom: "5px" },
    panelSubtitle: { color: "#aaa", fontSize: "14px", marginBottom: "20px" },
    sliderContainer: { marginBottom: "20px" },
    label: { display: "block", margin: "10px 0 5px" },
    slider: { width: "100%", cursor: 'pointer' },
    sliderLabels: { display: "flex", justifyContent: "space-between", color: "#888", fontSize: "12px", marginTop: "5px" },
    result: { margin: "10px 0", fontSize: '16px' },
    input: {
      width: "calc(100% - 20px)", padding: "10px", background: "black",
      border: "1px solid #555", borderRadius: "6px", color: "white", marginBottom: '10px'
    },
    button: {
      width: "100%", padding: "12px", background: "#ff3333", border: "none",
      borderRadius: "6px", fontWeight: "bold", color: "white", cursor: "pointer",
    },
    subscribeButton: {
       width: "100%", padding: "12px", background: "#007bff", border: "none",
      borderRadius: "6px", fontWeight: "bold", color: "white", cursor: "pointer",
    },
    // ... other original styles ...
  };
  
  return (
    <div style={styles.container}>
      {showAlert && <AlertModal phone={phoneNumber} diameter={diameter} onClose={() => setShowAlert(false)} />}
      
      <div style={styles.backLink} onClick={handleBackLink}>&larr; Back to Space View</div>
      <h1 style={styles.title}>Impact Simulator</h1>
      <p style={styles.subtitle}>Simulate asteroid impacts and understand their potential effects on Earth.</p>
      
      <div style={styles.mainGrid}>
        <div style={styles.leftColumn}>
            {/* Parameters Panel */}
            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Impact Parameters</h2>
              <p style={styles.panelSubtitle}>Adjust asteroid characteristics</p>
              <div style={styles.sliderContainer}>
                <label style={styles.label}>Asteroid Diameter: {diameter} meters</label>
                <input type="range" min="10" max="5000" step="10" value={diameter} onChange={(e) => setDiameter(Number(e.target.value))} style={styles.slider}/>
                <div style={styles.sliderLabels}><span>10m</span><span>2500m</span><span>5000m</span></div>
              </div>
              <div style={styles.sliderContainer}>
                <label style={styles.label}>Impact Velocity: {velocity} km/s</label>
                <input type="range" min="1" max="100" step="1" value={velocity} onChange={(e) => setVelocity(Number(e.target.value))} style={styles.slider}/>
                <div style={styles.sliderLabels}><span>1 km/s</span><span>50 km/s</span><span>100 km/s</span></div>
              </div>
            </div>

            {/* Results Panel */}
            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Impact Results</h2>
              <p style={styles.panelSubtitle}>Estimated effects of the impact</p>
              {simulationResult && (
                <div>
                  <div style={styles.result}><strong>Impact Energy:</strong> {simulationResult.energy} Megatons TNT</div>
                  <div style={styles.result}><strong>Crater Diameter:</strong> {simulationResult.crater} meters</div>
                  <div style={styles.result}><strong>Blast Radius:</strong> {simulationResult.blastRadius} km</div>
                  <div style={styles.result}>
                    <strong>Severity Level:</strong>{" "}
                    <span style={{ color: simulationResult.severityColor, fontWeight: 'bold' }}>{simulationResult.severity}</span>
                  </div>
                </div>
              )}
            </div>
        </div>

        {/* Right Column for Alerts and Methods */}
        <div>
            {/* SMS Alert Panel */}
            <div style={styles.panel}>
              <h2 style={styles.panelTitle}>Hazard Alert System</h2>
              <p style={styles.panelSubtitle}>Simulate emergency notifications</p>
              <input 
                type="tel"
                placeholder="Enter phone number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                style={styles.input}
              />
              <button 
                onClick={() => setIsSubscribed(!isSubscribed)}
                style={{...styles.subscribeButton, background: isSubscribed ? '#28a745' : '#007bff'}}
              >
                {isSubscribed ? `Subscribed (${phoneNumber})` : 'Subscribe to Alerts'}
              </button>
            </div>
        </div>
      </div>
    </div>
  );
}