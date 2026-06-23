import { Center, Decal, useGLTF } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export function OversizedModel({
  tshirtColor,
  designTexture,
  designTextureBack,
  onViewChange,
}) {
  const { nodes, materials } = useGLTF("/3Dmodels/oversized_t-shirt.glb");
  const [frontTexture, setFrontTexture] = useState(null);
  const [backTexture, setBackTexture] = useState(null);
  const meshesRef = useRef([]);

  useEffect(() => {
    let active = true;
    let loadedTexture = null;

    if (designTexture) {
      const loader = new THREE.TextureLoader();
      loader.load(designTexture, (tex) => {
        if (!active) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        setFrontTexture(tex);
        loadedTexture = tex;
      });
    } else {
      setFrontTexture(null);
    }

    return () => {
      active = false;
      if (loadedTexture) {
        loadedTexture.dispose();
      }
    };
  }, [designTexture]);

  useEffect(() => {
    let active = true;
    let loadedTexture = null;

    if (designTextureBack) {
      const loader = new THREE.TextureLoader();
      loader.load(designTextureBack, (tex) => {
        if (!active) {
          tex.dispose();
          return;
        }
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        setBackTexture(tex);
        loadedTexture = tex;
      });
    } else {
      setBackTexture(null);
    }

    return () => {
      active = false;
      if (loadedTexture) {
        loadedTexture.dispose();
      }
    };
  }, [designTextureBack]);

  // 🎨 DYNAMIC FABRIC COLORING MATRIX
  useEffect(() => {
    meshesRef.current.forEach((mesh) => {
      if (mesh && mesh.material) {
        mesh.material.color.set(tshirtColor);
        // Allows texture mapping on both outer panels and inner sleeve folds smoothly
        mesh.material.side = THREE.DoubleSide;
      }
    });
  }, [tshirtColor, nodes]);

  const handleClick = (view) => {
    onViewChange?.(view);
  };

  // Automatically extract structural canvas nodes to avoid hardcoded layer-name traps
  const structuralMeshes = Object.keys(nodes)
    .map((key) => nodes[key])
    .filter((node) => node && node.type === "Mesh" && node.geometry);

  return (
    /* 🟢 AUTO-FIT BOUNDS: Calculates spatial metrics to keep the whole shirt in perspective on load */
    <Center precise cacheKey={tshirtColor} fit>
      <group dispose={null}>
        
        {/* 🟢 FIXED SPACE TRANSFORMS: Stands the model straight up vertically and handles initial scale box sizes */}
        <group scale={35} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
          
          {/* APPAREL MESH LOOPER COMPONENT */}
          {structuralMeshes.map((meshNode, index) => {
            const originalMaterial = meshNode.material || Object.values(materials)[0];
            const isTorsoMesh = meshNode.name === "Object_1" || meshNode.name === "Object_2";

            return (
              <mesh
                key={meshNode.name || index}
                ref={(el) => (meshesRef.current[index] = el)}
                castShadow
                receiveShadow
                geometry={meshNode.geometry}
                material={originalMaterial}
              >
                {isTorsoMesh && (
                  <>
                    {/* 👕 FRONT ASPECT DECAL PROJECTION */}
                    {frontTexture && (
                      <Decal
                        position={[0, 0.15, 1.28]} // Y=0.15 (front surface), Z=1.28 (chest height)
                        rotation={[-Math.PI / 2, 0, 0]} // Rotate so local Z projects along mesh Y axis
                        scale={[0.58, 0.65, 0.4]}
                        onClick={() => handleClick("front")}
                      >
                        <meshStandardMaterial
                          map={frontTexture}
                          toneMapped={false}
                          transparent
                          roughness={1}
                          polygonOffset
                          polygonOffsetFactor={-10}
                        />
                      </Decal>
                    )}

                    {/* 👕 BACK ASPECT DECAL PROJECTION */}
                    {backTexture && (
                      <Decal
                        position={[0, -0.15, 1.28]} // Y=-0.15 (back surface), Z=1.28 (chest height)
                        rotation={[Math.PI / 2, 0, Math.PI]} // Rotate so local Z projects along mesh Y axis
                        scale={[0.58, 0.65, 0.4]}
                        onClick={() => handleClick("back")}
                      >
                        <meshStandardMaterial
                          map={backTexture}
                          toneMapped={false}
                          transparent
                          roughness={1}
                          polygonOffset
                          polygonOffsetFactor={-10}
                        />
                      </Decal>
                    )}
                  </>
                )}
              </mesh>
            );
          })}

        </group>
      </group>
    </Center>
  );
}

// Preload the component resource bundle safely
useGLTF.preload("/3Dmodels/oversized_t-shirt.glb");