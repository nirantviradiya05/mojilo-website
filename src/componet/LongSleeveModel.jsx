import { Center, Decal, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export function LongSleeveModel({
  tshirtColor = "#ffffff",
  designTexture,
  designTextureBack,
  onViewChange,
}) {
  const { nodes } = useGLTF("/3Dmodels/long_sleeve_t-_shirt.glb");
  const [frontTexture, setFrontTexture] = useState(null);
  const [backTexture, setBackTexture] = useState(null);

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

  const meshNodes = Object.values(nodes).filter(
    (node) => node.type === "Mesh"
  );

  useEffect(() => {
    meshNodes.forEach((node) => {
      if (node.geometry) {
        node.geometry.computeVertexNormals();
      }
    });
  }, [meshNodes]);

  const handleClick = (view) => {
    onViewChange?.(view);
  };

  return (
    <Center>
      <group dispose={null} scale={0.07}>
        {meshNodes.map((node, index) => {
          const isFrontMesh = node.name.toLowerCase().includes("front") || 
                              node.material?.name?.toLowerCase().includes("front");
          const isBackMesh = node.name.toLowerCase().includes("material2868") || 
                             node.material?.name?.toLowerCase().includes("material2868");

          return (
            <mesh
              key={index}
              geometry={node.geometry}
              castShadow
              receiveShadow
            >
              <meshStandardMaterial
                color={tshirtColor}
                side={THREE.DoubleSide}
                roughness={0.9}
                metalness={0}
              />

              {isFrontMesh && frontTexture && (
                <Decal
                  position={[0, 125, 12]}
                  rotation={[0, 0, 0]}
                  scale={[55, 65, 20]}
                  onClick={() => handleClick("front")}
                >
                  <meshStandardMaterial
                    map={frontTexture}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-10}
                  />
                </Decal>
              )}

              {isBackMesh && backTexture && (
                <Decal
                  position={[0, 125, -12]}
                  rotation={[0, Math.PI, 0]}
                  scale={[55, 65, 20]}
                  onClick={() => handleClick("back")}
                >
                  <meshStandardMaterial
                    map={backTexture}
                    transparent
                    polygonOffset
                    polygonOffsetFactor={-10}
                  />
                </Decal>
              )}
            </mesh>
          );
        })}
      </group>
    </Center>
  );
}

useGLTF.preload("/3Dmodels/long_sleeve_t-_shirt.glb");