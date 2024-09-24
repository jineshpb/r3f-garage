import { useEffect } from "react";

const ApplyMaterials = ({ scene, materials, scale }) => {
  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Apply materials to the child
        child.material = materials[child.name] || child.material;
      }
    });
  }, [scene, materials]);

  return null;
};

export default ApplyMaterials;
