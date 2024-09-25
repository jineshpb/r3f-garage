import {
  AccumulativeShadows,
  ContactShadows,
  Environment,
  Lightformer,
  OrbitControls,
  PerspectiveCamera,
  RandomizedLight,
  Sphere,
  useGLTF,
} from "@react-three/drei";

import * as THREE from "three";

import React, { useEffect } from "react";
import { DEG2RAD } from "three/src/math/MathUtils";

import AmbassadorMaterials from "./AmbassadorMaterials";
import VWPoloMaterials from "./VWPoloMaterials";
import SuzukiSwiftMaterials from "./SuzukiSwiftMaterials";
import { Avatar } from "./Avatar";

export const Scene = ({ mainColor, path, ...props }) => {
  const { nodes, materials, scene } = useGLTF(path);

  const ratioScale = Math.min(1.2, Math.max(0.5, window.innerWidth / 1920));

  const renderModelComponent = () => {
    console.log("props", props);
    switch (props.name) {
      case "Ambassador":
        return <AmbassadorMaterials scene={scene} />;
      case "VW Polo":
        return <VWPoloMaterials scene={scene} />;
      case "Suzuki Swift":
        return <SuzukiSwiftMaterials scene={scene} materials={materials} />;
      default:
        return <primitive object={scene} scale={ratioScale} />;
    }
  };

  return (
    <>
      <color attach="background" args={[mainColor]} />
      <Environment preset="city" background={false} />

      {/* Large sphere to create a seamless background */}
      <Sphere args={[50, 64, 64]} scale={[1, 1, 1]}>
        <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
      </Sphere>

      {/* Your scene content */}
      <group {...props} dispose={null}>
        <PerspectiveCamera makeDefault position={[3, 3, 8]} near={0.5} />
        <OrbitControls
          autoRotate
          enablePan={false}
          maxPolarAngle={DEG2RAD * 75}
          minDistance={6}
          maxDistance={10}
          autoRotateSpeed={0.5}
        />
        <ambientLight intensity={0.1} color={mainColor} />
        <Avatar position={[1.5, 0, 0]} ratioScale={ratioScale} />

        {renderModelComponent()}

        <AccumulativeShadows
          temporal
          frames={30}
          color={mainColor}
          colorBlend={2}
          opacity={1}
          toneMapped={true}
          alphaTest={0.75}
          scale={10}
        >
          {/* <RandomizedLight
            amount={4}
            radius={9}
            intensity={4}
            ambient={0}
            position={[10, 15, 15]}
          /> */}
          <RandomizedLight
            amount={4}
            radius={9}
            intensity={4}
            position={[-5, 5, 15]}
            bias={0.01}
          />
        </AccumulativeShadows>
        <ContactShadows
          renderOrder={2}
          frames={1}
          resolution={1024}
          scale={120}
          blur={2}
          opacity={0.6}
          far={100}
        />

        {/* <Environment blur={0.8} background>
          <Sphere scale={15}>
            <meshBasicMaterial color={mainColor} side={THREE.BackSide} />
          </Sphere>
          <Lightformer
            position={[5, 0, -5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="red" // (optional = white)
            scale={[3, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
            visible={false} // Add this line
          />

          <Lightformer
            position={[-5, 0, 1]}
            form="circle" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="green" // (optional = white)
            scale={[2, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />

          <Lightformer
            position={[0, 5, -2]}
            form="ring" // circle | ring | rect (optional, default = rect)
            intensity={0.5} // power level (optional = 1)
            color="orange" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
          <Lightformer
            position={[0, 0, 5]}
            form="rect" // circle | ring | rect (optional, default = rect)
            intensity={1} // power level (optional = 1)
            color="purple" // (optional = white)
            scale={[10, 5]} // Scale it any way you prefer (optional = [1, 1])
            target={[0, 0, 0]}
          />
        </Environment> */}
      </group>

      {/* Transparent plane to blend with the background */}
    </>
  );
};

useGLTF.preload("/models/ambassador-minimal_04.glb");
useGLTF.preload("/models/VW_polo.glb");
