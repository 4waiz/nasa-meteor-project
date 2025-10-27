import React, { useRef, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Stars, useTexture } from "@react-three/drei";
import { useNavigate } from "react-router-dom";
import { fetchAsteroids } from "./nasa.js";

function Earth() {
  const meshRef = useRef(null);
  const [earthMap, earthBump, earthSpec] = useTexture([
    "/textures/earth-map.jpg",
    "/textures/earth-bump.jpg",
    "/textures/earth-spec.jpg",
  ]);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.2 * delta;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[1.5, 32, 32]} />
      <meshPhongMaterial
        map={earthMap}
        bumpMap={earthBump}
        bumpScale={0.5}
        specularMap={earthSpec}
        specular={0.5}
        shininess={10}
      />
    </mesh>
  );
}

function Asteroid({
  position,
  size = 0.3,
  texturePath,
  asteroidData,
  onAsteroidClick,
  isSelected,
  onHover,
}) {
  const meshRef = useRef(null);
  const asteroidTexture = useTexture(texturePath);
  const [isHovered, setIsHovered] = useState(false);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.5 * delta;
      meshRef.current.rotation.y += 0.3 * delta;

      if (!isHovered && !isSelected) {
        const time = Date.now() * 0.0001; // Slower orbit
        const orbitRadius = 4 + position * 0.4;
        meshRef.current.position.x = Math.cos(time + position) * orbitRadius;
        meshRef.current.position.z = Math.sin(time + position) * orbitRadius;
        meshRef.current.position.y = Math.sin(time + position) * 0.5; // Add some y-axis movement
      }
    }
  });

  const handleClick = () => {
    onAsteroidClick(asteroidData);
  };

  const handlePointerEnter = () => {
    setIsHovered(true);
    onHover(true);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    onHover(false);
  };

  return (
    <mesh
      ref={meshRef}
      position={[0, 0, 0]}
      onClick={handleClick}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      scale={isSelected ? 1.5 : isHovered ? 1.2 : 1}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial
        map={asteroidTexture}
        roughness={0.8}
        emissive={
          isSelected ? "#ff4444" : isHovered ? "#ffaa00" : "#000000"
        }
        emissiveIntensity={isSelected ? 0.3 : isHovered ? 0.2 : 0}
      />
    </mesh>
  );
}

function AsteroidCard({ asteroid, onClose, onSimulate }) {
    // ... This component's code remains unchanged from your original file
  const cardStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "400px",
    background: "rgba(255, 255, 255, 0.1)",
    backdropFilter: "blur(20px)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "20px",
    padding: "30px",
    color: "white",
    fontFamily: "Arial, sans-serif",
    zIndex: 1000,
    boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
    borderTop: "1px solid rgba(255, 255, 255, 0.3)",
    borderLeft: "1px solid rgba(255, 255, 255, 0.2)",
    animation: "fadeIn 0.3s ease-out",
  };

  const headerStyles = {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
  };

  const titleStyles = {
    fontSize: "24px",
    fontWeight: "bold",
    color: "#fff",
    margin: 0,
  };

  const closeButtonStyles = {
    background: "rgba(255, 255, 255, 0.1)",
    border: "1px solid rgba(255, 255, 255, 0.3)",
    borderRadius: "50%",
    width: "30px",
    height: "30px",
    color: "white",
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "16px",
    transition: "all 0.3s ease",
  };

  const infoGridStyles = {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "15px",
    marginBottom: "25px",
  };

  const infoItemStyles = {
    background: "rgba(255, 255, 255, 0.05)",
    padding: "12px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    transition: "all 0.3s ease",
  };

  const labelStyles = {
    fontSize: "12px",
    color: "#ccc",
    marginBottom: "5px",
  };

  const valueStyles = {
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
  };

  const descriptionStyles = {
    fontSize: "14px",
    lineHeight: "1.5",
    color: "#ddd",
    marginBottom: "25px",
    background: "rgba(255, 255, 255, 0.05)",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid rgba(255, 255, 255, 0.1)",
  };

  const buttonStyles = {
    width: "100%",
    padding: "15px",
    background: "linear-gradient(135deg, #ff6b6b, #ff3333)",
    border: "none",
    borderRadius: "12px",
    color: "white",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 15px rgba(255, 107, 107, 0.3)",
  };

  // Add CSS animation
  const styleSheet = document.styleSheets[0];
  const keyframes = `
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translate(-50%, -50%) scale(0.8);
      }
      to {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }
    }
  `;
  
  // Check if the style already exists before adding
  if (!document.querySelector('style[data-asteroid-animation]')) {
    const style = document.createElement('style');
    style.setAttribute('data-asteroid-animation', 'true');
    style.textContent = keyframes;
    document.head.appendChild(style);
  }

  return (
    <div style={cardStyles}>
      <div style={headerStyles}>
        <h2 style={titleStyles}>{asteroid.name}</h2>
        <button 
          style={closeButtonStyles} 
          onClick={onClose}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.2)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.3)";
          }}
        >
          ×
        </button>
      </div>

      <div style={infoGridStyles}>
        <div style={infoItemStyles}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
          }}
        >
          <div style={labelStyles}>Diameter</div>
          <div style={valueStyles}>{asteroid.diameter} meters</div>
        </div>
        <div style={infoItemStyles}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
          }}
        >
          <div style={labelStyles}>Velocity</div>
          <div style={valueStyles}>{asteroid.velocity} km/s</div>
        </div>
        <div style={infoItemStyles}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
          }}
        >
          <div style={labelStyles}>Distance</div>
          <div style={valueStyles}>{asteroid.distance}</div>
        </div>
        <div style={infoItemStyles}
          onMouseEnter={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.1)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.2)";
          }}
          onMouseLeave={(e) => {
            e.target.style.background = "rgba(255, 255, 255, 0.05)";
            e.target.style.border = "1px solid rgba(255, 255, 255, 0.1)";
          }}
        >
          <div style={labelStyles}>Risk Level</div>
          <div style={{...valueStyles, color: asteroid.riskColor}}>
            {asteroid.riskLevel}
          </div>
        </div>
      </div>

      <div style={descriptionStyles}>
        {asteroid.description}
      </div>

      <button
        style={buttonStyles}
        onClick={onSimulate}
        onMouseOver={(e) => {
          e.target.style.transform = "translateY(-2px)";
          e.target.style.boxShadow = "0 6px 20px rgba(255, 107, 107, 0.4)";
        }}
        onMouseOut={(e) => {
          e.target.style.transform = "translateY(0)";
          e.target.style.boxShadow = "0 4px 15px rgba(255, 107, 107, 0.3)";
        }}
      >
        Simulate Impact
      </button>
    </div>
  );
}

function ControlButtons() {
    // ... This component's code remains unchanged from your original file
  const [activeButton, setActiveButton] = useState(null);
  const navigate = useNavigate();

  const buttons = [
    { id: "track", label: "Track Meteor", path: "/track" },
    { id: "simulate", label: "Simulate Impact", path: "/impact" },
    { id: "register", label: "Register", path: "/registration" }
  ];

  const handleButtonClick = (buttonId, path) => {
    setActiveButton(buttonId);
    console.log(`Navigating to: ${path}`);
    navigate(path);
  };

  return (
    <div style={{
      position: "absolute",
      bottom: "40px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "20px",
      zIndex: 1000
    }}>
      {buttons.map((button) => (
        <button
          key={button.id}
          onClick={() => handleButtonClick(button.id, button.path)}
          style={{
            padding: "12px 24px",
            backgroundColor: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(10px)",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            borderRadius: "12px",
            color: "white",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            transition: "all 0.3s ease",
            boxShadow: "0 4px 15px rgba(0, 0, 0, 0.2)",
            ...(activeButton === button.id && {
              backgroundColor: "rgba(255, 255, 255, 0.2)",
              border: "1px solid rgba(255, 255, 255, 0.4)",
              transform: "scale(1.05)"
            })
          }}
          onMouseEnter={(e) => {
            if (activeButton !== button.id) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.15)";
              e.target.style.border = "1px solid rgba(255, 255, 255, 0.3)";
            }
          }}
          onMouseLeave={(e) => {
            if (activeButton !== button.id) {
              e.target.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
              e.target.style.border = "1px solid rgba(255, 255, 255, 0.2)";
            }
          }}
        >
          {button.label}
        </button>
      ))}
    </div>
  );
}

export default function Space() {
  const [asteroids, setAsteroids] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedAsteroid, setSelectedAsteroid] = useState(null);
  const navigate = useNavigate();

  const asteroidTextures = [
    "/textures/asteroid1.jpg",
    "/textures/asteroid2.jpg",
    "/textures/asteroid3.jpg",
    "/textures/asteroid4.jpg",
    "/textures/asteroid5.jpg",
  ];

  useEffect(() => {
    const loadAsteroids = async () => {
      try {
        setLoading(true);
        const rawAsteroids = await fetchAsteroids();

        const formattedAsteroids = rawAsteroids.map((raw, index) => {
          const closeApproach = raw.close_approach_data[0];
          const diameterMeters =
            (raw.estimated_diameter.meters.estimated_diameter_min +
              raw.estimated_diameter.meters.estimated_diameter_max) /
            2;

          let riskLevel = "None";
          let riskColor = "#8888ff";

          if (raw.is_potentially_hazardous_asteroid) {
            riskLevel = "Medium";
            riskColor = "#ffaa00";
            if (
              diameterMeters > 500 &&
              parseFloat(closeApproach.miss_distance.astronomical) < 0.05
            ) {
              riskLevel = "High";
              riskColor = "#ff4444";
            } else if (diameterMeters < 100) {
              riskLevel = "Low";
              riskColor = "#44ff44";
            }
          }

          return {
            id: raw.id,
            position: index * 1.2,
            size: 0.15 + Math.random() * 0.15,
            texture: asteroidTextures[index % asteroidTextures.length],
            name: raw.name.replace(/[()]/g, ""),
            diameter: Math.round(diameterMeters),
            velocity: Math.round(
              parseFloat(closeApproach.relative_velocity.kilometers_per_second)
            ),
            distance: `${parseFloat(
              closeApproach.miss_distance.astronomical
            ).toFixed(3)} AU`,
            riskLevel,
            riskColor,
            description: `This asteroid, known as ${
              raw.name
            }, is approximately ${Math.round(
              diameterMeters
            )} meters in diameter. Its closest approach to Earth is on ${
              closeApproach.close_approach_date_full
            }. It is${
              raw.is_potentially_hazardous_asteroid ? "" : " not"
            } considered potentially hazardous.`,
          };
        });

        setAsteroids(formattedAsteroids);
        setError(null);
      } catch (err) {
        setError(
          "Could not fetch data from NASA. The demo key might be over its rate limit. Please add your own API key to the .env file and try again."
        );
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadAsteroids();
  }, []);

  const handleAsteroidClick = (asteroid) => {
    setSelectedAsteroid(asteroid);
  };

  const handleCloseCard = () => {
    setSelectedAsteroid(null);
  };

  const handleSimulateImpact = () => {
    if (selectedAsteroid) {
      navigate("/impact", {
        state: {
          diameter: selectedAsteroid.diameter,
          velocity: selectedAsteroid.velocity,
        },
      });
    }
  };

  if (loading) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "black",
          color: "white",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "2rem",
          fontFamily: "Arial, sans-serif",
        }}
      >
        Loading Celestial Data...
      </div>
    );
  }

  if (error) {
    return (
      <div
        style={{
          width: "100vw",
          height: "100vh",
          background: "black",
          color: "red",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: "1.5rem",
          padding: "2rem",
          textAlign: "center",
          fontFamily: "Arial, sans-serif",
        }}
      >
        {error}
      </div>
    );
  }

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      <Canvas
        style={{ width: "100%", height: "100%", background: "black" }}
        camera={{ position: [8, 5, 8], fov: 60 }}
      >
        <Stars
          radius={100}
          depth={50}
          count={6000}
          factor={4}
          saturation={0}
          fade
        />
        <ambientLight intensity={2.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />

        <Earth />

        {asteroids.map((asteroid) => (
          <Asteroid
            key={asteroid.id}
            position={asteroid.position}
            size={asteroid.size}
            texturePath={asteroid.texture}
            asteroidData={asteroid}
            onAsteroidClick={handleAsteroidClick}
            onHover={() => {}}
            isSelected={selectedAsteroid?.id === asteroid.id}
          />
        ))}

        <OrbitControls />
      </Canvas>

      <ControlButtons />

      {selectedAsteroid && (
        <AsteroidCard
          asteroid={selectedAsteroid}
          onClose={handleCloseCard}
          onSimulate={handleSimulateImpact}
        />
      )}
    </div>
  );
}