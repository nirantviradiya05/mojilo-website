import { canvasSyncManager } from "../utils/canvasSyncManager";
import { useCallback, useEffect, useState } from "react";

export const useCanvasTextureSync = (options = {}) => {
  const { frontCanvas, backCanvas, selectedView = "front" } = options;

  const [designTextureFront, setDesignTextureFront] = useState(null);
  const [designTextureBack, setDesignTextureBack] = useState(null);

  useEffect(() => {
    const canvasMap = {
      front: { canvas: frontCanvas, setter: setDesignTextureFront },
      back: { canvas: backCanvas, setter: setDesignTextureBack },
    };

    // 🟢 FIXED: Expanded tracking events to catch scaling, movement, and text editing input actions
    const criticalEvents = [
      "object:modified",
      "object:added",
      "object:removed",
      "object:scaling",
      "object:moving",
      "after:render"
    ];

    const updateTexture = async (view) => {
      const { canvas, setter } = canvasMap[view];
      if (!canvas) return;

      try {
        const hasActiveObjects = canvas.getObjects().length > 0;
        
        // 🟢 FIXED: Removed the hard 'return' block. 
        // If a canvas is empty, we deliberately pass a blank transparent frame 
        // down to clear out any previous layout remnants safely.
        if (!hasActiveObjects) {
          setter(null);
          return;
        }

        const texture = canvasSyncManager.getCanvasTexture(canvas);

        setter((prevTexture) =>
          prevTexture !== texture ? texture : prevTexture
        );
      } catch (error) {
        console.error(`${view} canvas texture update failed:`, error);
      }
    };

    const debouncedUpdateFront = canvasSyncManager.debounce(
      () => updateTexture("front"),
      100
    );
    const debouncedUpdateBack = canvasSyncManager.debounce(
      () => updateTexture("back"),
      100
    );

    // Setup events for front canvas
    if (frontCanvas) {
      criticalEvents.forEach((event) => {
        frontCanvas.on(event, debouncedUpdateFront);
      });
    }

    // Setup events for back canvas
    if (backCanvas) {
      criticalEvents.forEach((event) => {
        backCanvas.on(event, debouncedUpdateBack);
      });
    }

    // 🟢 FIXED: Wrapped initial updates in a minor timeout buffer 
    // to give Fabric.js a split second to finish calculations on initial load
    const initialTimeout = setTimeout(() => {
      updateTexture("front");
      updateTexture("back");
    }, 150);

    // Cleanup
    return () => {
      clearTimeout(initialTimeout);
      if (frontCanvas) {
        criticalEvents.forEach((event) => {
          frontCanvas.off(event, debouncedUpdateFront);
        });
      }
      if (backCanvas) {
        criticalEvents.forEach((event) => {
          backCanvas.off(event, debouncedUpdateBack);
        });
      }
    };
  }, [frontCanvas, backCanvas, selectedView]);

  const manualTriggerSync = useCallback(
    async (view = "front") => {
      const canvasMap = {
        front: { canvas: frontCanvas, setter: setDesignTextureFront },
        back: { canvas: backCanvas, setter: setDesignTextureBack },
      };

      const { canvas, setter } = canvasMap[view];

      if (!canvas) {
        console.warn(
          `manualTriggerSync failed: No canvas available for ${view}`
        );
        return;
      }

      try {
        const texture = await canvasSyncManager.getCanvasTexture(canvas);

        if (!texture) {
          console.warn(`No texture received for ${view}`);
          return;
        }

        setter(texture);
      } catch (error) {
        console.error(`Manual ${view} canvas texture update failed:`, error);
      }
    },
    [frontCanvas, backCanvas]
  );

  return {
    designTextureFront,
    designTextureBack,
    manualTriggerSync,
  };
};