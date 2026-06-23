import * as fabric from "fabric";
import { useCanvas } from "../context/CanvasContext";

const STICKER_TEMPLATES = [
  // Original Assets
  { id: "star", name: "Retro Star", url: "https://img.icons8.com/fluency/96/star--v1.png" },
  { id: "heart", name: "Love Badge", url: "https://img.icons8.com/fluency/96/hearts.png" },
  { id: "smile", name: "Happy Face", url: "https://img.icons8.com/fluency/96/smiling-mouth.png" },
  { id: "lightning", name: "Energy Bolt", url: "https://img.icons8.com/fluency/96/flash-on.png" },
  { id: "rocket", name: "Space Bound", url: "https://img.icons8.com/fluency/96/rocket.png" },

  // Pop Culture & Cool Vibes (FIXED ALIEN & GHOST SERVERS)
  { id: "fire", name: "Flame", url: "https://img.icons8.com/fluency/96/fire-element.png" },
  { id: "cool_face", name: "Sunglasses Face", url: "https://img.icons8.com/fluency/96/cool.png" },
  { id: "skull", name: "Retro Skull", url: "https://img.icons8.com/fluency/96/skull.png" },
  { id: "crown", name: "King Crown", url: "https://img.icons8.com/fluency/96/crown.png" },

  // Food & Munchies
  { id: "pizza", name: "Pizza Slice", url: "https://img.icons8.com/fluency/96/pizza.png" },
  { id: "donut", name: "Glazed Donut", url: "https://img.icons8.com/fluency/96/doughnut.png" },
  { id: "burger", name: "Fast Burger", url: "https://img.icons8.com/fluency/96/hamburger.png" },
  { id: "fries", name: "French Fries", url: "https://img.icons8.com/fluency/96/french-fries.png" },
  { id: "ice_cream", name: "Soft Serve", url: "https://img.icons8.com/fluency/96/ice-cream-cone.png" },
  { id: "avocado", name: "Avo Half", url: "https://img.icons8.com/fluency/96/avocado.png" },

  // Nature, Gaming & Retro Geek
  { id: "rainbow", name: "Rainbow", url: "https://img.icons8.com/fluency/96/rainbow.png" },
  { id: "cloud_rain", name: "Stormy Cloud", url: "https://img.icons8.com/fluency/96/cloud-lighting.png" },
  { id: "dice", name: "Lucky Dice", url: "https://img.icons8.com/fluency/96/dice.png" },

  // Animals & Cute Things
  { id: "cat", name: "Neko Face", url: "https://img.icons8.com/fluency/96/cat.png" },
  { id: "dog", name: "Puppy Face", url: "https://img.icons8.com/fluency/96/dog.png" },
  { id: "panda", name: "Panda Bear", url: "https://img.icons8.com/fluency/96/panda.png" },
  { id: "unicorn", name: "Magical Unicorn", url: "https://img.icons8.com/fluency/96/unicorn.png" },
  { id: "teddy", name: "Cuddly Bear", url: "https://img.icons8.com/fluency/96/teddy-bear.png" },
  { id: "butterfly", name: "Monarch", url: "https://img.icons8.com/fluency/96/butterfly.png" },

  // Random Aesthetics
  { id: "cactus", name: "Desert Cactus", url: "https://img.icons8.com/fluency/96/cactus.png" },
  { id: "music_note", name: "Melody Note", url: "https://img.icons8.com/fluency/96/musical-notes.png" },
  { id: "cherries", name: "Sweet Cherries", url: "https://img.icons8.com/fluency/96/cherry.png" },
  { id: "clover", name: "Four Leaf Clover", url: "https://img.icons8.com/fluency/96/clover.png" }
];

export default function StickersPanel({ manualSync }) {
  const { activeCanvas } = useCanvas();

  const handleAddSticker = (imgUrl) => {
    if (!activeCanvas) return;

    // Use native JavaScript Image instantiation to preserve canvas context binding safely
    const imgElement = new Image();
    imgElement.crossOrigin = "anonymous";
    imgElement.src = imgUrl;

    imgElement.onload = () => {
      const fabricImg = new fabric.Image(imgElement, {
        left: activeCanvas.width / 2,
        top: activeCanvas.height / 2,
        originX: "center",
        originY: "center",
      });

      fabricImg.scaleToWidth(100);

      activeCanvas.add(fabricImg);
      activeCanvas.setActiveObject(fabricImg);
      activeCanvas.renderAll();

      if (manualSync) manualSync();
    };

    imgElement.onerror = () => {
      console.error("Failed loading asset vector stream from secure origin source.");
    };
  };

  return (
    <div>
      <p className="text-[11px] text-gray-400 font-medium mb-3">Popular Graphics</p>
      <div className="grid grid-cols-2 gap-2.5">
        {STICKER_TEMPLATES.map((sticker) => (
          <button
            key={sticker.id}
            onClick={() => handleAddSticker(sticker.url)}
            className="p-3 bg-slate-50 border border-slate-100 rounded-xl flex flex-col items-center justify-center gap-2 hover:bg-violet-50/30 hover:border-violet-100 group transition-all duration-200 active:scale-95"
          >
            <img
              src={sticker.url}
              alt={sticker.name}
              className="w-12 h-12 object-contain group-hover:scale-110 transition-transform duration-200"
            />
            <span className="text-[10px] font-medium text-gray-500 group-hover:text-violet-600">
              {sticker.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}