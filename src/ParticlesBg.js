import React from "react";
import Particles from "react-tsparticles";

function ParticlesBg({ darkMode }) {
  return (
    <Particles
      options={{
        background: { color: darkMode ? "#1f2937" : "#f0f9ff" },
        fpsLimit: 60,
        interactivity: { events: { onHover: { enable: true, mode: "repulse" }, resize: true } },
        particles: {
          color: { value: darkMode ? "#ffffff" : "#3b82f6" },
          links: { enable: false },
          collisions: { enable: false },
          move: { direction: "none", enable: true, outModes: "bounce", speed: 0.8 },
          number: { value: 40 },
          opacity: { value: 0.3 },
          shape: { type: "circle" },
          size: { value: { min: 2, max: 5 } },
        },
        detectRetina: true,
      }}
    />
  );
}

export default ParticlesBg;
