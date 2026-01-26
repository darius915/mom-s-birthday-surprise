import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";

const BASE_DIR = "/images/Mom-photos";

// Folder-based sweet messages
const folderMessages: Record<string, { left: string; center: string; right: string }> = {
  Abby: {
    left: "Abby brings joy and laughter to your heart 🌸",
    center: "Cherished memories of Abby remind you of love and happiness 💖",
    right: "Every moment with Abby is a blessing 💕",
  },
  Husband: {
    left: "A partner who always stands by you ❤️",
    center: "Your loving husband fills your life with care and warmth 💛",
    right: "Moments together make your bond stronger 🌹",
  },
  "Milimani family": {
    left: "Family laughter and togetherness 🌷",
    center: "Your family reminds you of belonging and warmth 💖",
    right: "Cherished bonds that light up your heart 🌟",
  },
  "Springs kids": {
    left: "Your love shapes these little hearts 💕",
    center: "Every smile reflects the care you’ve given 🌸",
    right: "Beautiful memories of guidance and patience 💖",
  },
  friends: {
    left: "Friends who feel like family 💛",
    center: "They remind you that you are loved and valued 💕",
    right: "Shared moments of joy and support 🌷",
  },
  son: {
    left: "A reflection of your heart and strength 🌟",
    center: "Your son reminds you of your endless love 💖",
    right: "Every hug and laugh is a treasure 💕",
  },
};

export default function GalleryView({ onComplete }: { onComplete: () => void }) {
  const [folders, setFolders] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFolders(["Abby", "Husband", "Milimani family", "Springs kids", "friends", "son"]);
  }, []);

  // Slower, nostalgic rotation
  useEffect(() => {
    if (!folders.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % folders.length);
    }, 18000); // 18s for nostalgic pace
    return () => clearInterval(interval);
  }, [folders]);

  useEffect(() => {
    setTimeout(() => setReady(true), 800);
  }, []);

  if (!folders.length) return null;

  const folder = folders[currentIndex];
  const leftPhoto = `${BASE_DIR}/${folder}/2.jpg`;
  const centerPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const rightPhoto = `${BASE_DIR}/${folder}/3.jpg`;
  const messages = folderMessages[folder] || {
    left: "",
    center: "",
    right: "",
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#FFE0B2] to-[#FFCC80] flex items-center justify-center px-6 py-10 overflow-hidden">
      {/* Music */}
      <audio src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3" autoPlay loop className="hidden" />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10">
        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-serif text-[#004D40] text-center"
        >
          A Life Surrounded by Love
        </motion.h1>

        {/* Collage */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">

          {/* Left Card */}
          <motion.div
            className="hidden md:flex flex-col items-center w-[34rem] h-[38rem]
                       bg-gradient-to-br from-pink-50 to-pink-100
                       rounded-3xl shadow-2xl border-8 border-pink-300 p-4"
            initial={{ opacity: 0, x: -120, rotate: -6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: -2 }}
            transition={{ duration: 1.6 }}
          >
            <img src={leftPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">{messages.left}</p>
          </motion.div>

          {/* Center Card */}
          <motion.div
            className="relative w-full max-w-[50rem] h-[60vh]
                       bg-gradient-to-br from-yellow-50 via-white to-yellow-100
                       rounded-3xl shadow-2xl border-10 border-yellow-300 p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex} // key keeps the image, not the text
                src={centerPhoto}
                alt=""
                className="w-full h-full object-contain rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.0 }} // slow nostalgic fade
              />
            </AnimatePresence>

            {/* Center message - STATIC */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2
                            bg-white/85 backdrop-blur-md
                            px-6 py-3 rounded-xl shadow-md
                            text-center text-lg font-semibold text-gray-800">
              {messages.center}
            </div>
          </motion.div>

          {/* Right Card */}
          <motion.div
            className="hidden md:flex flex-col items-center w-[34rem] h-[38rem]
                       bg-gradient-to-br from-purple-50 to-purple-100
                       rounded-3xl shadow-2xl border-8 border-purple-300 p-4"
            initial={{ opacity: 0, x: 120, rotate: 6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: 2 }}
            transition={{ duration: 1.6 }}
          >
            <img src={rightPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">{messages.right}</p>
          </motion.div>
        </div>

        {/* Mobile side images */}
        <div className="md:hidden flex flex-col gap-6">
          {[leftPhoto, rightPhoto].map((img, i) => (
            <div key={i} className="w-44 h-64 bg-white rounded-2xl shadow-lg border-4 border-gray-200 p-2">
              <img src={img} className="w-full h-full object-contain rounded-xl" />
              <p className="mt-2 text-center text-sm text-gray-700 font-medium">
                {i === 0 ? messages.left : messages.right}
              </p>
            </div>
          ))}
        </div>

        {/* Continue Button */}
        <button
          onClick={onComplete}
          className="mt-6 bg-gradient-to-r from-[#26C6DA] to-[#00BCD4]
                     text-white px-10 py-4 rounded-full text-xl shadow-xl
                     hover:brightness-110 transition"
        >
          Continue 💕
        </button>
      </div>
    </div>
  );
}
