// src/config/apparelConfig.js

// Import the 3D Canvas models from your exact folder spelling
import { TshirtModel } from '../components/TshirtModel';
import { LongSleeveModel } from '../components/LongSleeveModel'; 
import { HoodieModel } from '../components/HoodieModel';       
import { OversizedModel } from '../components/OversizedModel'; 

// Import your TWO universal canvas outline components
import TshirtCanvasFront from '../components/TshirtCanvasFront';
import TshirtCanvasBack from '../components/TshirtCanvasBack';

// Import the SVG path data variables from your centralized constants file
import { SVG_PATHS } from '../constants/svgPaths';

export const apparelConfig = {
  'half-sleeve': {
    name: 'Half Sleeve T-Shirt',
    modelComponent: TshirtModel,
    canvasFront: TshirtCanvasFront,
    canvasBack: TshirtCanvasBack,
    // Using optional chaining (?.) so the app won't crash if a property is briefly missing during development
    svgPathFront: SVG_PATHS['half-sleeve']?.front || '',
    svgPathBack: SVG_PATHS['half-sleeve']?.back || '',
  },
  'long-sleeve': {
    name: 'Long Sleeve T-Shirt',
    modelComponent: LongSleeveModel, 
    canvasFront: TshirtCanvasFront, 
    canvasBack: TshirtCanvasBack,
    svgPathFront: SVG_PATHS['long-sleeve']?.front || '', 
    svgPathBack: SVG_PATHS['long-sleeve']?.back || '',
  },
  'hoodie': {
    name: 'Hoodie',
    modelComponent: HoodieModel, 
    canvasFront: TshirtCanvasFront,
    canvasBack: TshirtCanvasBack,
    svgPathFront: SVG_PATHS['hoodie']?.front || '',
    svgPathBack: SVG_PATHS['hoodie']?.back || '',
  },
  'oversized': {
    name: 'Oversized T-Shirt',
    modelComponent: OversizedModel, 
    canvasFront: TshirtCanvasFront,
    canvasBack: TshirtCanvasBack,
    svgPathFront: SVG_PATHS['oversized']?.front || '',
    svgPathBack: SVG_PATHS['oversized']?.back || '',
  }
};