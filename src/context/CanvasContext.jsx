import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the Context
const CanvasContext = createContext(null);

// Create the Provider Component
export const CanvasProvider = ({ children }) => {
  // 👕 All 4 core Fabric Canvas instances managed gracefully in memory
  const [frontCanvas, setFrontCanvas] = useState(null);
  const [backCanvas, setBackCanvas] = useState(null);
  const [leftCanvas, setLeftCanvas] = useState(null);   // 👈 Added Left Sleeve
  const [rightCanvas, setRightCanvas] = useState(null); // 👈 Added Right Sleeve
  
  // Track which canvas view is currently active/visible in editing ("front", "back", "left", "right")
  const [activeCanvas, setActiveCanvas] = useState(null);
  
  // Track currently clicked/highlighted object on the active workspace
  const [selectedObject, setSelectedObject] = useState(null);

  // 📑 Dynamic state array tracking layers list for the active view viewport
  const [canvasLayers, setCanvasLayers] = useState([]);

  // Utility hook helper to automatically refresh layers array whenever canvas modifications execute
  useEffect(() => {
    if (!activeCanvas) {
      setCanvasLayers([]);
      return;
    }

    const refreshLayersList = () => {
      // Get all objects inside the active canvas workspace and reverse the array 
      // so that the visually "Top" item sits at the top of our layers sidebar panel UI
      const objects = activeCanvas.getObjects ? activeCanvas.getObjects() : [];
      setCanvasLayers([...objects].reverse());
    };

    // Bind reactive canvas structural listeners to trigger dynamic state refreshes
    activeCanvas.on("object:added", refreshLayersList);
    activeCanvas.on("object:removed", refreshLayersList);
    activeCanvas.on("object:modified", refreshLayersList);
    activeCanvas.on("selection:created", refreshLayersList);
    activeCanvas.on("selection:cleared", refreshLayersList);

    // Run a baseline load check
    refreshLayersList();

    return () => {
      activeCanvas.off("object:added", refreshLayersList);
      activeCanvas.off("object:removed", refreshLayersList);
      activeCanvas.off("object:modified", refreshLayersList);
      activeCanvas.off("selection:created", refreshLayersList);
      activeCanvas.off("selection:cleared", refreshLayersList);
    };
  }, [activeCanvas]);

  // 🎛️ Dynamic Stack Ordering Layer Manipulators
  const moveLayerUp = (fabricObject) => {
    if (!activeCanvas || !fabricObject) return;
    fabricObject.bringForward();
    activeCanvas.renderAll();
    activeCanvas.fire("object:modified"); // Force re-render of layout nodes
  };

  const moveLayerDown = (fabricObject) => {
    if (!activeCanvas || !fabricObject) return;
    fabricObject.sendBackward();
    activeCanvas.renderAll();
    activeCanvas.fire("object:modified");
  };

  const bringLayerToFront = (fabricObject) => {
    if (!activeCanvas || !fabricObject) return;
    fabricObject.bringToFront();
    activeCanvas.renderAll();
    activeCanvas.fire("object:modified");
  };

  const sendLayerToBack = (fabricObject) => {
    if (!activeCanvas || !fabricObject) return;
    fabricObject.sendToBack();
    activeCanvas.renderAll();
    activeCanvas.fire("object:modified");
  };

  const deleteLayer = (fabricObject) => {
    if (!activeCanvas || !fabricObject) return;
    activeCanvas.remove(fabricObject);
    activeCanvas.discardActiveObject();
    activeCanvas.renderAll();
    setSelectedObject(null);
  };

  // Helper utility to safely clear configurations across all four view frames
  const resetCanvases = () => {
    if (frontCanvas) frontCanvas.clear?.();
    if (backCanvas) backCanvas.clear?.();
    if (leftCanvas) leftCanvas.clear?.();
    if (rightCanvas) rightCanvas.clear?.();
    setActiveCanvas(null);
    setSelectedObject(null);
    setCanvasLayers([]);
  };

  return (
    <CanvasContext.Provider 
      value={{ 
        frontCanvas, 
        setFrontCanvas, 
        backCanvas, 
        setBackCanvas,
        leftCanvas,       // 👈 Exported Left Canvas instance
        setLeftCanvas,
        rightCanvas,      // 👈 Exported Right Canvas instance
        setRightCanvas,
        activeCanvas,
        setActiveCanvas,
        selectedObject,
        setSelectedObject,
        canvasLayers,     // 👈 Exported real-time layers array
        moveLayerUp,      // 👈 Layer tools context accessors
        moveLayerDown,
        bringLayerToFront,
        sendLayerToBack,
        deleteLayer,
        resetCanvases
      }}
    >
      {children}
    </CanvasContext.Provider>
  );
};

// Custom Hook for clean consumption
export const useCanvas = () => {
  const context = useContext(CanvasContext);
  
  if (!context) {
    throw new Error('useCanvas must be used within a CanvasProvider');
  }
  
  return context;
};