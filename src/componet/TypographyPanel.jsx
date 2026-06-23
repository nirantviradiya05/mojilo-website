import { useState, useEffect } from "react";
import * as fabric from "fabric";
import { useCanvas } from "../context/CanvasContext";
import { DEFAULT_TEXT_CONFIG } from "../constants/designConstants";
import { 
  Bold, 
  Italic, 
  Underline, 
  AlignLeft, 
  AlignCenter, 
  AlignRight, 
  Type, 
  ArrowUp, 
  ArrowDown,
  Check
} from "lucide-react";

const FONT_FAMILIES = [
  { name: "Sans-Serif", value: "sans-serif" },
  { name: "Serif", value: "serif" },
  { name: "Monospace", value: "monospace" },
  { name: "Impact (Bold Pop)", value: "Impact" },
  { name: "Comic Sans", value: "Comic Sans MS" },
  { name: "Playfair", value: "Georgia" }
];

export default function TypographyPanel({ manualSync }) {
  const { activeCanvas } = useCanvas();
  const [selectedTextObject, setSelectedTextObject] = useState(null);

  // Staging local states (User modifies freely inside 2D Workspace)
  const [textColor, setTextColor] = useState("#000000");
  const [fontSize, setFontSize] = useState(34);
  const [fontFamily, setFontFamily] = useState("sans-serif");
  const [textAlign, setTextAlign] = useState("left");
  
  // Style toggles
  const [isBold, setIsBold] = useState(false);
  const [isItalic, setIsItalic] = useState(false);
  const [isUnderline, setIsUnderline] = useState(false);

  // Advanced effects states
  const [strokeColor, setStrokeColor] = useState("#000000");
  const [strokeWidth, setStrokeWidth] = useState(0);
  const [glowColor, setGlowColor] = useState("#a855f7");
  const [glowIntensity, setGlowIntensity] = useState(0);
  
  // Curve settings states
  const [curveRadius, setCurveRadius] = useState(0);
  const [curveDirection, setCurveDirection] = useState("up"); 

  // Tracking canvas element updates safely
  useEffect(() => {
    if (!activeCanvas) return;

    const updatePanelControls = (targetObject) => {
      if (targetObject && (targetObject.type === "textbox" || targetObject.type === "text")) {
        setSelectedTextObject(targetObject);
        setTextColor(targetObject.get("fill") || "#000000");
        setFontSize(targetObject.get("fontSize") || 24);
        setFontFamily(targetObject.get("fontFamily") || "sans-serif");
        setTextAlign(targetObject.get("textAlign") || "left");
        setIsBold(targetObject.get("fontWeight") === "bold");
        setIsItalic(targetObject.get("fontStyle") === "italic");
        setIsUnderline(targetObject.get("underline") || false);
        setStrokeColor(targetObject.get("stroke") || "#000000");
        setStrokeWidth(targetObject.get("strokeWidth") || 0);
        
        // Restore curve references safely
        const savedRadius = targetObject.get("curveRadius") || 0;
        setCurveRadius(savedRadius);
        setCurveDirection(targetObject.get("curveDirection") || "up");

        // Restore shadow/glow reference mapping if available
        const currentShadow = targetObject.get("shadow");
        if (currentShadow) {
          setGlowIntensity(currentShadow.blur || 0);
          setGlowColor(currentShadow.color || "#a855f7");
        } else {
          setGlowIntensity(0);
        }
      } else {
        setSelectedTextObject(null);
      }
    };

    const handleSelectionCreated = (e) => {
      const selected = e.selected?.[0] || activeCanvas.getActiveObject();
      updatePanelControls(selected);
    };

    const handleSelectionCleared = () => {
      setSelectedTextObject(null);
    };

    activeCanvas.on("selection:created", handleSelectionCreated);
    activeCanvas.on("selection:updated", handleSelectionCreated);
    activeCanvas.on("selection:cleared", handleSelectionCleared);
    activeCanvas.on("canvas:cleared", handleSelectionCleared);

    const currentActive = activeCanvas.getActiveObject();
    if (currentActive) updatePanelControls(currentActive);

    return () => {
      activeCanvas.off("selection:created", handleSelectionCreated);
      activeCanvas.off("selection:updated", handleSelectionCreated);
      activeCanvas.off("selection:cleared", handleSelectionCleared);
      activeCanvas.off("canvas:cleared", handleSelectionCleared);
    };
  }, [activeCanvas]);

  // 📝 Adds Text Only to 2D Canvas Workspace
  const addTextPreset = (sizeStyle) => {
    if (!activeCanvas) return;
    let textProps = { ...DEFAULT_TEXT_CONFIG };

    switch (sizeStyle) {
      case "heading":
        textProps = { ...textProps, fontSize: 34, fontWeight: "bold", text: "Heading Text" };
        break;
      case "subheading":
        textProps = { ...textProps, fontSize: 22, fontWeight: "600", text: "Subheading Text" };
        break;
      default:
        textProps = { ...textProps, fontSize: 14, fontWeight: "normal", text: "Body paragraph text" };
    }

    const textbox = new fabric.Textbox(textProps.text, {
      ...textProps,
      left: activeCanvas.width / 2,
      top: activeCanvas.height / 2,
      width: 250,
      originX: "center",
      originY: "center",
      editable: true,
    });

    activeCanvas.add(textbox);
    activeCanvas.setActiveObject(textbox);
    activeCanvas.renderAll();
    setSelectedTextObject(textbox);
  };

  // ⚡ INSTANT 2D CANVAS WORKSPACE PREVIEW MODIFIER
  const updateLiveProp = (property, value) => {
    if (!selectedTextObject || !activeCanvas) return;
    selectedTextObject.set(property, value);
    activeCanvas.requestRenderAll();
  };

  const applyLiveGlow = (intensity, color) => {
    if (!selectedTextObject || !activeCanvas) return;
    if (intensity === 0) {
      selectedTextObject.set("shadow", null);
    } else {
      selectedTextObject.set("shadow", new fabric.Shadow({ color, blur: intensity, offsetX: 0, offsetY: 0 }));
    }
    activeCanvas.requestRenderAll();
  };

  // Path creators for curvature matrix
  const applyUpwardCurve = (radius, totalTextWidth, textStr) => {
    const totalAngle = totalTextWidth / radius;
    const startAngle = -totalAngle / 2;

    const pathStrings = [];
    for (let i = 0; i < textStr.length; i++) {
      const charAngle = startAngle + (i / (textStr.length - 1 || 1)) * totalAngle;
      const x = radius * Math.sin(charAngle);
      const y = radius * (1 - Math.cos(charAngle));
      
      if (i === 0) {
        pathStrings.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`);
      } else {
        pathStrings.push(`A ${radius} ${radius} 0 0 1 ${x.toFixed(2)} ${y.toFixed(2)}`);
      }
    }
    return pathStrings.join(" ");
  };

  const applyDownwardCurve = (radius, totalTextWidth, textStr) => {
    const totalAngle = totalTextWidth / radius;
    const startAngle = -totalAngle / 2;

    const pathStrings = [];
    for (let i = 0; i < textStr.length; i++) {
      const charAngle = startAngle + (i / (textStr.length - 1 || 1)) * totalAngle;
      const x = radius * Math.sin(charAngle);
      const y = -radius * (1 - Math.cos(charAngle));
      
      if (i === 0) {
        pathStrings.push(`M ${x.toFixed(2)} ${y.toFixed(2)}`);
      } else {
        pathStrings.push(`A ${radius} ${radius} 0 0 0 ${x.toFixed(2)} ${y.toFixed(2)}`);
      }
    }
    return pathStrings.join(" ");
  };

  const handleLiveCurveChange = (radiusValue, direction = curveDirection) => {
    if (!selectedTextObject || !activeCanvas) return;

    setCurveRadius(radiusValue);
    setCurveDirection(direction);
    
    selectedTextObject.set("curveRadius", radiusValue);
    selectedTextObject.set("curveDirection", direction);

    if (radiusValue === 0) {
      selectedTextObject.set({ path: null });
      activeCanvas.requestRenderAll();
      return;
    }

    try {
      const textStr = selectedTextObject.text || "";
      if (!textStr) return;

      const currentFontSize = selectedTextObject.fontSize || 24;
      const estimatedCharWidth = currentFontSize * 0.55; 
      const totalTextWidth = textStr.length * estimatedCharWidth;

      let integratedPathData = "";

      if (direction === "up") {
        integratedPathData = applyUpwardCurve(radiusValue, totalTextWidth, textStr);
      } else {
        integratedPathData = applyDownwardCurve(radiusValue, totalTextWidth, textStr);
      }

      selectedTextObject.set({
        path: new fabric.Path(integratedPathData, { visible: false, strokeWidth: 0 }),
        textAlign: "center"
      });

      activeCanvas.requestRenderAll();
    } catch (e) {
      console.error("Curve execution pipeline exception:", e);
    }
  };

  // 👕 3D MODEL WORKSPACE EMITTER COUPLING (RELOADED)
  const handleApplyTypographyChanges = () => {
    if (!selectedTextObject || !activeCanvas) return;
    
    // 1. Force state changes to drop cache bindings
    selectedTextObject.setCoords();
    
    // 2. Clear out selections handles entirely so bounding boxes don't print on the 3D texture
    const currentActive = activeCanvas.getActiveObject();
    activeCanvas.discardActiveObject();
    
    // 3. 🚨 CRITICAL: Fire core Fabric canvas events that background sync systems rely on
    activeCanvas.fire("object:modified", { target: selectedTextObject });
    selectedTextObject.fire("modified");
    
    // 4. Force global canvas synchronization render passes
    activeCanvas.renderAll();

    // 5. Fire your explicit 3D sync function override loop 
    if (manualSync) {
      manualSync();
    }

    // 6. Return active user selection highlights
    if (currentActive) {
      activeCanvas.setActiveObject(currentActive);
      activeCanvas.renderAll();
    }
  };

  return (
    <div className="space-y-5 h-full overflow-y-auto pr-1 max-h-[75vh]">
      {/* SECTION 1: PRESETS */}
      <div className="space-y-2">
        <p className="text-[11px] text-gray-400 font-bold uppercase tracking-wider">Click to add text</p>
        <button onClick={() => addTextPreset("heading")} className="w-full text-left p-3 border border-gray-100 rounded-xl hover:border-violet-200 bg-white shadow-sm font-bold text-xl cursor-pointer">Add Heading</button>
        <button onClick={() => addTextPreset("subheading")} className="w-full text-left p-3 border border-gray-100 rounded-xl hover:border-violet-200 bg-white shadow-sm font-semibold text-base text-gray-700 cursor-pointer">Add Subheading</button>
      </div>

      {/* SECTION 2: LIVE DESIGNS EDITOR */}
      {selectedTextObject ? (
        <div className="pt-4 border-t border-gray-200/80 space-y-4">
          <p className="text-[11px] text-violet-600 font-bold uppercase tracking-wider">Text Customizer</p>

          {/* Font Family */}
          <div className="space-y-1.5">
            <label className="text-xs font-medium text-gray-600 flex items-center gap-1"><Type className="h-3 w-3" /> Font Style</label>
            <select
              value={fontFamily}
              onChange={(e) => { setFontFamily(e.target.value); updateLiveProp("fontFamily", e.target.value); }}
              className="w-full text-xs p-2.5 border border-gray-200 rounded-xl bg-white focus:ring-1 focus:ring-violet-500 outline-none cursor-pointer"
            >
              {FONT_FAMILIES.map(f => <option key={f.value} value={f.value}>{f.name}</option>)}
            </select>
          </div>

          {/* Colors & Sizes */}
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Text Color</label>
              <div className="flex items-center gap-2 border border-gray-200 rounded-xl p-1.5 bg-white">
                <input 
                  type="color" 
                  value={textColor} 
                  onInput={(e) => { setTextColor(e.target.value); updateLiveProp("fill", e.target.value); }}
                  onChange={(e) => { setTextColor(e.target.value); updateLiveProp("fill", e.target.value); }} 
                  className="w-7 h-7 rounded-md cursor-pointer border-0 bg-transparent" 
                />
                <span className="text-[11px] font-mono uppercase tracking-tight">{textColor}</span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium text-gray-600">Size ({fontSize}px)</label>
              <input 
                type="range" 
                min="12" 
                max="100" 
                value={fontSize} 
                onInput={(e) => { const val = parseInt(e.target.value); setFontSize(val); updateLiveProp("fontSize", val); if(curveRadius > 0) handleLiveCurveChange(curveRadius); }}
                onChange={(e) => { const val = parseInt(e.target.value); setFontSize(val); updateLiveProp("fontSize", val); if(curveRadius > 0) handleLiveCurveChange(curveRadius); }} 
                className="w-full h-8 accent-violet-600 cursor-pointer" 
              />
            </div>
          </div>

          {/* Typography Formatting */}
          <div className="space-y-2">
            <label className="text-xs font-medium text-gray-600">Formatting</label>
            <div className="flex flex-wrap gap-1 bg-slate-50 p-1.5 rounded-xl border border-gray-100">
              <button onClick={() => { setIsBold(!isBold); updateLiveProp("fontWeight", !isBold ? "bold" : "normal"); }} className={`p-2 rounded-lg transition-colors cursor-pointer ${isBold ? 'bg-violet-600 text-white' : 'hover:bg-slate-200 text-gray-600'}`}><Bold className="h-4 w-4" /></button>
              <button onClick={() => { setIsItalic(!isItalic); updateLiveProp("fontStyle", !isItalic ? "italic" : "normal"); }} className={`p-2 rounded-lg transition-colors cursor-pointer ${isItalic ? 'bg-violet-600 text-white' : 'hover:bg-slate-200 text-gray-600'}`}><Italic className="h-4 w-4" /></button>
              <button onClick={() => { setIsUnderline(!isUnderline); updateLiveProp("underline", !isUnderline); }} className={`p-2 rounded-lg transition-colors cursor-pointer ${isUnderline ? 'bg-violet-600 text-white' : 'hover:bg-slate-200 text-gray-600'}`}><Underline className="h-4 w-4" /></button>
              
              <div className="h-6 w-[1px] bg-gray-200 mx-2 self-center"></div>

              <button onClick={() => { setTextAlign("left"); updateLiveProp("textAlign", "left"); }} className={`p-2 rounded-lg transition-colors cursor-pointer ${textAlign === "left" ? 'bg-violet-100 text-violet-700' : 'text-gray-500'}`}><AlignLeft className="h-4 w-4" /></button>
              <button onClick={() => { setTextAlign("center"); updateLiveProp("textAlign", "center"); }} className={`p-2 rounded-lg transition-colors cursor-pointer ${textAlign === "center" ? 'bg-violet-100 text-violet-700' : 'text-gray-500'}`}><AlignCenter className="h-4 w-4" /></button>
              <button onClick={() => { setTextAlign("right"); updateLiveProp("textAlign", "right"); }} className={`p-2 rounded-lg transition-colors cursor-pointer ${textAlign === "right" ? 'bg-violet-100 text-violet-700' : 'text-gray-500'}`}><AlignRight className="h-4 w-4" /></button>
            </div>
          </div>

          {/* Stroke Outline */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <label className="text-xs font-medium text-gray-600">Outline Width</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0" 
                max="8" 
                step="0.5" 
                value={strokeWidth} 
                onInput={(e) => { const val = parseFloat(e.target.value); setStrokeWidth(val); updateLiveProp("strokeWidth", val); }}
                onChange={(e) => { const val = parseFloat(e.target.value); setStrokeWidth(val); updateLiveProp("strokeWidth", val); }} 
                className="flex-1 accent-violet-600 cursor-pointer" 
              />
              <input type="color" value={strokeColor} onChange={(e) => { setStrokeColor(e.target.value); updateLiveProp("stroke", e.target.value); }} className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent" />
            </div>
          </div>

          {/* Glow Effect */}
          <div className="space-y-1.5 border-t border-slate-100 pt-3">
            <label className="text-xs font-medium text-gray-600">Glow / Neon Light Effect</label>
            <div className="flex items-center gap-3">
              <input 
                type="range" 
                min="0" 
                max="30" 
                value={glowIntensity} 
                onInput={(e) => { const val = parseInt(e.target.value); setGlowIntensity(val); applyLiveGlow(val, glowColor); }}
                onChange={(e) => { const val = parseInt(e.target.value); setGlowIntensity(val); applyLiveGlow(val, glowColor); }} 
                className="flex-1 accent-violet-600 cursor-pointer" 
              />
              <input type="color" value={glowColor} onChange={(e) => { setGlowColor(e.target.value); applyLiveGlow(glowIntensity, e.target.value); }} className="w-6 h-6 rounded-md cursor-pointer border-0 bg-transparent" />
            </div>
          </div>

          {/* TEXT ARC PANEL */}
          <div className="space-y-2 border-t border-slate-100 pt-3">
            <div className="flex justify-between items-center">
              <label className="text-xs font-medium text-gray-600">Curve Radius / Text Arc</label>
              <span className="text-[10px] font-bold text-violet-600 uppercase">
                {curveRadius === 0 ? "Straight" : `${curveRadius}r (${curveDirection})`}
              </span>
            </div>

            {/* Direction Selectors */}
            <div className="grid grid-cols-2 gap-2 bg-slate-100 p-1 rounded-xl">
              <button
                type="button"
                onClick={() => handleLiveCurveChange(curveRadius, "up")}
                className={`flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  curveDirection === "up" ? "bg-white text-violet-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <ArrowUp className="h-3.5 w-3.5" /> Curve Up
              </button>
              <button
                type="button"
                onClick={() => handleLiveCurveChange(curveRadius, "down")}
                className={`flex items-center justify-center gap-1.5 text-xs py-1.5 rounded-lg font-medium transition-all cursor-pointer ${
                  curveDirection === "down" ? "bg-white text-violet-600 shadow-sm" : "text-gray-500 hover:text-gray-900"
                }`}
              >
                <ArrowDown className="h-3.5 w-3.5" /> Curve Down
              </button>
            </div>

            {/* Arc Slider Scale */}
            <input 
              type="range" 
              min="0" 
              max="500" 
              step="10" 
              value={curveRadius} 
              onInput={(e) => handleLiveCurveChange(parseInt(e.target.value))}
              onChange={(e) => handleLiveCurveChange(parseInt(e.target.value))} 
              className="w-full accent-violet-600 cursor-pointer mt-1" 
            />
          </div>

          {/* 👕 THE "APPLY CHANGES TO T-SHIRT MODEL" BUTTON */}
          <button
            type="button"
            onClick={handleApplyTypographyChanges}
            className="w-full mt-2 flex items-center justify-center gap-2 py-2.5 bg-violet-600 hover:bg-violet-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all active:scale-95 cursor-pointer"
          >
            <Check className="h-4 w-4" /> Apply to T-Shirt Model
          </button>

        </div>
      ) : (
        <div className="pt-6 text-center border-t border-gray-100">
          <p className="text-xs text-gray-400 italic">Select text workspace elements to reveal properties</p>
        </div>
      )}
    </div>
  );
}