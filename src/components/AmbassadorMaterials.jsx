import React, { useEffect } from "react";
import * as THREE from "three";

const AmbassadorMaterials = ({ scene, scale }) => {
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        // Apply materials specific to Ambassador model
        if (child.name === "Body") {
          child.material = new THREE.MeshStandardMaterial({
            color: "red",
            metalness: 0.8,
            roughness: 0.2,
          });
        } else if (child.name === "Windows") {
          child.material = new THREE.MeshPhysicalMaterial({
            color: "skyblue",
            transmission: 0.9,
            opacity: 0.3,
            metalness: 0.2,
            roughness: 0,
            ior: 1.5,
          });
        }
        // Add more conditions for other parts of the Ambassador model
      }
    });
  }, [scene]);

  return <primitive object={scene} scale={scale} />;
};

export default AmbassadorMaterials;
