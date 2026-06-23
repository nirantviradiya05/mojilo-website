import { Center, Decal, useGLTF } from "@react-three/drei";
import { useEffect, useState } from "react";
import * as THREE from "three";

export function HoodieModel({
  tshirtColor = "#ffffff",
  designTexture,
  designTextureBack,
  onViewChange,
}) {
  const { nodes } = useGLTF("/3Dmodels/hoodie.glb");
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
    <Center position={[0, -0.8, 0]}>
      <group dispose={null}>
        <group rotation={[0, -1, 0]}>
          {meshNodes.map((node, index) => {
            const isBodyMesh = node.material?.name?.includes("Force_Fleece") || 
                               node.name.toLowerCase().includes("force_fleece");

            return (
              <mesh
                key={index}
                geometry={node.geometry}
                scale={7.2}
                position={[0, 0, 1.8]}
                castShadow
                receiveShadow
              >
                <meshStandardMaterial
                  color={tshirtColor}
                  side={THREE.DoubleSide}
                  roughness={0.9}
                  metalness={0}
                />

                {isBodyMesh && (
                  <>
                    {frontTexture && (
                      <Decal
                        position={[0, 1.2, 0.18]}
                        rotation={[0, 0, 0]}
                        scale={[0.6, 0.55, 0.4]}
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

                    {backTexture && (
                      <Decal
                        position={[0, 1.2, -0.18]}
                        rotation={[0, Math.PI, 0]}
                        scale={[0.6, 0.55, 0.4]}
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

useGLTF.preload("/3Dmodels/hoodie.glb");