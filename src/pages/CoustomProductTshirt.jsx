import React, { Suspense } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom"; // 🟢 Added to detect clothing type from URL
import { Canvas } from "@react-three/fiber";
import { Environment, Loader, OrbitControls } from "@react-three/drei";
import { Eye, Layers } from "lucide-react";

// Components
import DesignArea from "../componet/DesignArea";
import ToolsSidebar from "../componet/ToolsSidebar";

// Centralized Configuration Map Layer
import { apparelConfig } from "../utils/apparelConfig.js"; // 🟢 Added configuration bridge

// Hooks & Store Actions
import { useCanvas, CanvasProvider } from "../context/CanvasContext";
import { useCanvasTextureSync } from "../hooks/useCanvasTextureSync";
import { setSelectedView } from "../features/tshirtSlice";

function Header() {
  return <header></header>;
}

// ... keep all your existing imports the same ...

function CustomizerContent() {
  const { apparelId } = useParams();
  const currentApparel = apparelConfig[apparelId] || apparelConfig["half-sleeve"];

  const tshirtColor = useSelector((state) => state.tshirt.tshirtColor);
  const selectedView = useSelector((state) => state.tshirt.selectedView);
  const dispatch = useDispatch();

  const { frontCanvas, backCanvas, activeCanvas } = useCanvas();

  const { designTextureFront, designTextureBack, manualTriggerSync } =
    useCanvasTextureSync({
      frontCanvas,
      backCanvas,
      selectedView,
    });

  const manualSync = () => {
    manualTriggerSync(selectedView);
  };

  const handleViewChange = (nextView) => {
    if (nextView === selectedView) return;
    dispatch(setSelectedView(nextView));
  };

  const ActiveModelMesh = currentApparel.modelComponent;

  return (
    <div className="h-screen flex flex-col bg-slate-50 font-sans antialiased overflow-hidden">
      <Header />

      <div className="flex-1 flex relative overflow-hidden z-10">
        <div className="shrink-0 relative z-40 h-full">
          <ToolsSidebar manualSync={manualSync} />
        </div>

        <main className="flex-1 overflow-y-auto lg:overflow-hidden p-4 lg:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">

          {/* LEFT 3D VIEWER */}
          <section className="lg:col-span-5 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col min-h-[400px] lg:min-h-0 overflow-hidden relative z-10">
            <div className="p-4 border-b border-gray-100 flex items-center justify-between bg-slate-50/50">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Eye className="h-3.5 w-3.5 text-gray-400" />
                Live 3D Preview
              </span>
              <div className="flex gap-2">
                <span className="text-[11px] font-bold text-indigo-600 bg-indigo-50 border border-indigo-100 px-2 py-0.5 rounded-md uppercase tracking-wider">
                  {currentApparel.name}
                </span>
                <span
                  className="text-[11px] font-medium capitalize px-2 py-0.5 rounded-md border"
                  style={{
                    color: "#936A3A",
                    backgroundColor: "rgba(147, 106, 58, 0.08)",
                    borderColor: "rgba(147, 106, 58, 0.2)"
                  }}
                >
                  {selectedView} Aspect
                </span>
              </div>
            </div>

            <div className="absolute inset-0 w-full h-full">
  <Canvas
    camera={{
      position: [0, -20, 14],
      fov: 45,
    }}
  >
    <OrbitControls
      target={[0, 0, 0]}
      maxPolarAngle={Math.PI / 2}
      minPolarAngle={Math.PI / 2}
      enableZoom={true}
      enablePan={false}
    />

    <Suspense fallback={null}>
      <group position={[0, -1.5, 0]}>
        <ActiveModelMesh
          tshirtColor={tshirtColor}
          onViewChange={handleViewChange}
          designTexture={designTextureFront}
          designTextureBack={designTextureBack}
        />
      </group>

      <Environment preset="sunset" />
    </Suspense>
  </Canvas>
</div>
          </section>

          {/* RIGHT 2D CANVAS CONTAINER */}
          <section className="lg:col-span-7 bg-white rounded-2xl border border-gray-200/80 shadow-sm flex flex-col overflow-hidden relative z-10">
            <div className="p-4 border-b border-gray-100 bg-slate-50/50">
              <span className="text-xs font-bold uppercase tracking-wider text-gray-400 flex items-center gap-1.5">
                <Layers className="h-3.5 w-3.5 text-gray-400" />
                Vector Graphics Workspace
              </span>
            </div>

            <div className="flex-1 p-6 flex items-center justify-center overflow-auto bg-slate-100/40">
              {/* 🟢 FIXED: Forwarding dynamic parameters and active path definitions straight to DesignArea */}
              <DesignArea 
                onViewChange={handleViewChange} 
                currentApparel={currentApparel} 
                selectedView={selectedView}
              />
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}

// ... keep CustomizerProduct instantiation wrapper identically down here ...

function CoustomProductTshirt() {
  return (
    <CanvasProvider>
      <CustomizerContent />
    </CanvasProvider>
  );
}

export default CoustomProductTshirt;