import React, { useEffect, useState } from "react";
import { CANVAS_CONFIG } from "../constants/designConstants";
import { useTshirtCanvas } from "../hooks/useTshirtCanvas";

const TshirtCanvasFront = ({ rawSvg }) => {
  const [inlineXml, setInlineXml] = useState("");
  
  const { canvasRef, tshirtColor } = useTshirtCanvas({
    svgPath: rawSvg, 
    inlineXml: inlineXml,
    view: "front",
  });

  useEffect(() => {
    if (!rawSvg || typeof rawSvg !== "string") return;

    if (rawSvg.trim().startsWith("<svg")) {
      setInlineXml(rawSvg);
    } else {
      fetch(rawSvg)
        .then((res) => res.text())
        .then((text) => setInlineXml(text))
        .catch((err) => console.error("Error loading clothing SVG:", err));
    }
  }, [rawSvg]);

  // 🎨 STYLING MACRO: Clear background color fill with sharp, deep black outlines
  const svgStyleOverride = `
    .mojilo-svg-container svg {
      width: 100%;
      height: 100%;
      background-color: transparent;
      border-radius: 16px;
    }
    .mojilo-svg-container svg #path12 {
      stroke: none !important;
      fill: none !important;
      display: none !important;
    }
    .mojilo-svg-container svg path[style*="fill:#ffffff"],
    .mojilo-svg-container svg path[style*="fill:#FFFFFF"],
    .mojilo-svg-container svg path[style*="fill:#dcdcdc"],
    .mojilo-svg-container svg path[style*="fill:#DCDCDC"],
    .mojilo-svg-container svg path[fill="#ffffff"],
    .mojilo-svg-container svg path[fill="#FFFFFF"],
    .mojilo-svg-container svg path[fill="#dcdcdc"],
    .mojilo-svg-container svg path[fill="#DCDCDC"] {
      fill: ${tshirtColor || "#ffffff"} !important;
      transition: fill 0.3s ease;
    }
    .mojilo-svg-container svg path, 
    .mojilo-svg-container svg vector,
    .mojilo-svg-container svg polygon,
    .mojilo-svg-container svg circle,
    .mojilo-svg-container svg rect,
    .mojilo-svg-container svg line,
    .mojilo-svg-container svg polyline,
    .mojilo-svg-container svg g {
      stroke: #000000 !important;
      stroke-width: 1.5px !important;
      stroke-opacity: 1 !important;
    }
  `;

  return (
    <div className="relative" style={{ width: CANVAS_CONFIG.width, height: CANVAS_CONFIG.height }}>
      <style>{svgStyleOverride}</style>

      {/* DYNAMIC RAW INJECTION DOCK */}
      <div 
        className="mojilo-svg-container absolute inset-0 pointer-events-none flex items-center justify-center opacity-95"
        dangerouslySetInnerHTML={{ __html: inlineXml || "<svg></svg>" }}
      />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 z-10"
        width={CANVAS_CONFIG.width}
        height={CANVAS_CONFIG.height}
      />
    </div>
  );
};

export default TshirtCanvasFront;