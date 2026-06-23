import React from "react";
import { useSelector } from "react-redux";
import TshirtCanvasFront from "./TshirtCanvasFront";
import TshirtCanvasBack from "./TshirtCanvasBack";
import { useCanvas } from "../context/CanvasContext";
import { SVG_PATHS } from "../constants/svgPaths";

const DesignArea = ({ onViewChange, currentApparel, selectedView }) => {
  const { activeCanvas, setSelectedObject } = useCanvas();
  
  // Fallback type checker from Redux slice state
  const reduxSelectedType = useSelector((state) => state.tshirt?.selectedType || "half-sleeve");

  const getRawSvg = (view) => {
    if (currentApparel) {
      const dynamicRaw = view === "front" ? currentApparel.svgPathFront : currentApparel.svgPathBack;
      if (dynamicRaw) return dynamicRaw;
    }

    const activeKey = currentApparel?.id || reduxSelectedType;
    const assetsGroup = SVG_PATHS[activeKey] || SVG_PATHS["half-sleeve"];
    
    return view === "front" ? assetsGroup.front : assetsGroup.back;
  };

  const handleLocalViewChange = (view) => {
    if (view !== selectedView) {
      if (activeCanvas) {
        try {
          // Clear active selections cleanly
          activeCanvas.discardActiveObject();
          
          // 🛡️ Safety Check: Only redraw if the active canvas has valid layout dimensions
          if (activeCanvas.width > 0 && activeCanvas.height > 0) {
            activeCanvas.renderAll();
          }
        } catch (error) {
          console.warn("Fabric.js redraw bypassed during transition to prevent layout crash:", error);
        }
      }
      
      setSelectedObject(null);
      
      if (onViewChange) {
        onViewChange(view);
      }
    }
  };

  return (
    <div className="flex flex-col items-center w-full">
      {/* Aspect Views Switch Tabs */}
      <div className="flex gap-2.5 mb-5 p-1 bg-slate-100 rounded-xl border border-slate-200/60">
        <button
          type="button"
          onClick={() => handleLocalViewChange("front")}
          className={`px-5 h-9 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
            selectedView === "front"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-slate-50"
          }`}
        >
          Front Aspect
        </button>
        <button
          type="button"
          onClick={() => handleLocalViewChange("back")}
          className={`px-5 h-9 rounded-lg text-xs font-semibold tracking-wide transition-all duration-200 ${
            selectedView === "back"
              ? "bg-slate-900 text-white shadow-sm"
              : "bg-white border border-gray-200 text-gray-600 hover:bg-slate-50"
          }`}
        >
          Back Aspect
        </button>
      </div>

      {/* Render Structural Slots with CSS Visibility Toggle */}
      <div className="flex justify-center w-full relative">
        <div className={`w-full flex justify-center ${selectedView === "front" ? "" : "hidden"}`}>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
            <TshirtCanvasFront rawSvg={getRawSvg("front")} />
          </div>
        </div>

        <div className={`w-full flex justify-center ${selectedView === "back" ? "" : "hidden"}`}>
          <div className="rounded-2xl border border-gray-200 bg-white shadow-sm p-6">
            <TshirtCanvasBack rawSvg={getRawSvg("back")} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DesignArea;