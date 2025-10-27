import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { fetchAsteroids } from "./nasa.js";

export default function Track() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadAsteroids = async () => {
      try {
        setLoading(true);
        const rawAsteroids = await fetchAsteroids();

        // Flatten and sort asteroids by their close approach date
        const sortedAsteroids = rawAsteroids.sort((a, b) => {
          const dateA = new Date(a.close_approach_data[0].close_approach_date_full);
          const dateB = new Date(b.close_approach_data[0].close_approach_date_full);
          return dateA - dateB;
        });
        
        setAsteroids(sortedAsteroids);
        setError(null);
      } catch (err) {
        setError(
          "Could not fetch data from NASA. The demo key might be over its rate limit."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAsteroids();
  }, []);

  const styles = {
    container: {
      minHeight: "100vh",
      width: "100vw",
      background: "linear-gradient(to bottom, #000, #1a1a2e, #000)",
      color: "white",
      padding: "20px 40px",
      fontFamily: "Arial, sans-serif",
      boxSizing: "border-box",
    },
    header: {
        textAlign: 'center',
        marginBottom: '30px'
    },
    title: {
      fontSize: "32px",
      fontWeight: "bold",
      color: "#4ea4ff",
      marginBottom: '5px',
    },
    subtitle: {
        color: '#ccc',
        fontSize: '16px',
    },
    backLink: {
      color: "#4ea4ff",
      cursor: "pointer",
      position: 'absolute',
      top: '20px',
      left: '40px',
      fontSize: "14px",
    },
    tableContainer: {
        background: 'rgba(255, 255, 255, 0.05)',
        border: '1px solid rgba(255, 255, 255, 0.1)',
        borderRadius: '10px',
        padding: '20px',
        maxHeight: '75vh',
        overflowY: 'auto',
    },
    table: {
      width: "100%",
      borderCollapse: "collapse",
      textAlign: "left",
    },
    th: {
      padding: "12px 15px",
      borderBottom: "1px solid #4ea4ff",
      color: "#4ea4ff",
    },
    td: {
      padding: "12px 15px",
      borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    },
    tr: {
      transition: 'background-color 0.2s ease',
    },
    hazard: {
        color: '#ff4d4d',
        fontWeight: 'bold',
    },
    safe: {
        color: '#44ff44',
    },
    loadingText: {
        fontSize: '24px',
        textAlign: 'center',
        padding: '50px'
    }
  };

  const handleRowHover = (e) => e.currentTarget.style.backgroundColor = 'rgba(78, 164, 255, 0.1)';
  const handleRowLeave = (e) => e.currentTarget.style.backgroundColor = 'transparent';

  return (
    <div style={styles.container}>
      <div style={styles.backLink} onClick={() => navigate('/space')}>
        &larr; Back to Space View
      </div>
      
      <div style={styles.header}>
        <h1 style={styles.title}>Near-Earth Object Tracking</h1>
        <p style={styles.subtitle}>Live feed of asteroids passing near Earth in the next 7 days</p>
      </div>

      <div style={styles.tableContainer}>
        {loading && <div style={styles.loadingText}>Loading Asteroid Data...</div>}
        {error && <div style={{...styles.loadingText, color: 'red'}}>{error}</div>}
        
        {!loading && !error && (
            <table style={styles.table}>
            <thead>
              <tr>
                <th style={styles.th}>Name</th>
                <th style={styles.th}>Close Approach</th>
                <th style={styles.th}>Diameter (meters)</th>
                <th style={styles.th}>Velocity (km/s)</th>
                <th style={styles.th}>Miss Distance (km)</th>
                <th style={styles.th}>Hazardous?</th>
              </tr>
            </thead>
            <tbody>
              {asteroids.map((roid) => {
                  const approach = roid.close_approach_data[0];
                  const diameter = Math.round((roid.estimated_diameter.meters.estimated_diameter_min + roid.estimated_diameter.meters.estimated_diameter_max) / 2);
                  return (
                      <tr key={roid.id} style={styles.tr} onMouseEnter={handleRowHover} onMouseLeave={handleRowLeave}>
                          <td style={styles.td}>{roid.name.replace(/[()]/g, "")}</td>
                          <td style={styles.td}>{approach.close_approach_date_full}</td>
                          <td style={styles.td}>{diameter}</td>
                          <td style={styles.td}>{parseFloat(approach.relative_velocity.kilometers_per_second).toFixed(2)}</td>
                          <td style={styles.td}>{parseFloat(approach.miss_distance.kilometers).toLocaleString()}</td>
                          <td style={{...styles.td, ...(roid.is_potentially_hazardous_asteroid ? styles.hazard : styles.safe)}}>
                              {roid.is_potentially_hazardous_asteroid ? "Yes" : "No"}
                          </td>
                      </tr>
                  );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}