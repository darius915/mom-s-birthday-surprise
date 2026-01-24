import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// ✅ Base path works for local & GitHub Pages
const BASE_DIR = `${import.meta.env.BASE_URL}images/Mom-photos`;

const folderMessages: Record<string, [string, string, string]> = {
  Abby: [
    "Abby is one of life’s sweetest gifts 🌸",
    "Her smile brightens every moment 💖",
    "Moments with Abby fill your heart with joy 💕",
  ],
  Husband: [
    "A loving, steady partner by your side ❤️",
    "His support has made life beautiful 🌟",
    "Every memory together is a treasure 💛",
  ],
  "Milimani family": [
    "Family moments filled with laughter 🌷",
    "Their warmth surrounds you always 💕",
    "Cherishing these memories makes life richer 🌼",
  ],
  "Springs kids": [
    "Beautiful memories shaped by love 💖",
    "Your patience and kindness shine through 🌸",
    "They carry your lessons with joy 🌟",
  ],
  friends: [
    "Friends who feel like family 💕",
    "Walking with you through life’s seasons 🌷",
    "Sharing laughter and support always 💛",
  ],
  son: [
    "A son reflecting your love and strength 🌟",
    "He carries your heart in every action 💖",
    "Your bond is a beautiful journey 💕",
  ],
};

export default function GalleryView({ onComplete }: { onComplete: () => void }) {
  const [folders, setFolders] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFolders(["Abby", "Husband", "Milimani family", "Springs kids", "friends", "son"]);
  }, []);

  useEffect(() => {
    if (!folders.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % folders.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [folders]);

  useEffect(() => {
    setTimeout(() => setReady(true), 800);
  }, []);

  if (!folders.length) return null;

  const folder = folders[currentIndex];
  const [mainMsg, leftMsg, rightMsg] = folderMessages[folder] || [
    "A beautiful reminder of love 💛",
    "Cherish this moment 🌸",
    "Joy surrounds you 💖",
  ];

  const mainPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const leftPhoto = `${BASE_DIR}/${folder}/2.jpg`;
  const rightPhoto = `${BASE_DIR}/${folder}/3.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#FFE0B2] to-[#FFCC80] flex flex-col items-center justify-center px-6 py-10 overflow-hidden relative">
      {/* Background Music */}
      <audio autoPlay loop className="hidden">
        <source src={`${import.meta.env.BASE_URL}music/birthday-music.mp3`} type="audio/mpeg" />
      </audio>

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-10">
        {/* TITLE */}
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-serif text-[#004D40] text-center"
        >
          A Life Surrounded by Love
        </motion.h1>

        {/* COLLAGE */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full">
          {/* LEFT CARD */}
          <motion.div
            className="hidden md:flex flex-col items-center w-[38rem] h-[40rem]
                       bg-gradient-to-br from-pink-50 to-pink-100
                       rounded-3xl shadow-2xl border-12 border-pink-300 p-4"
            initial={{ opacity: 0, x: -120, rotate: -6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: -2 }}
            transition={{ duration: 1.6 }}
          >
            <img src={leftPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">{leftMsg}</p>
          </motion.div>

          {/* CENTER CARD */}
          <motion.div
            className="relative w-full max-w-[50rem] h-[60vh]
                       bg-gradient-to-br from-yellow-50 via-white to-yellow-100
                       rounded-3xl shadow-2xl border-12 border-yellow-300 p-6"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.4 }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={mainPhoto}
                alt=""
                className="w-full h-full object-contain rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              />
            </AnimatePresence>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2
                            bg-white/85 backdrop-blur-md px-6 py-3 rounded-xl shadow-md
                            text-center text-lg font-semibold text-gray-800">
              {mainMsg}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            className="hidden md:flex flex-col items-center w-[38rem] h-[40rem]
                       bg-gradient-to-br from-purple-50 to-purple-100
                       rounded-3xl shadow-2xl border-12 border-purple-300 p-4"
            initial={{ opacity: 0, x: 120, rotate: 6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: 2 }}
            transition={{ duration: 1.6 }}
          >
            <img src={rightPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">{rightMsg}</p>
          </motion.div>
        </div>

        {/* MOBILE SIDE IMAGES */}
        <div className="md:hidden flex flex-col gap-6">
          {[leftPhoto, rightPhoto].map((img, i) => (
            <div key={i} className="w-full h-64 bg-white rounded-2xl shadow-lg border-4 border-gray-200 p-2">
              <img src={img} className="w-full h-full object-contain rounded-xl" />
              <p className="mt-2 text-center text-gray-700 font-medium">
                {i === 0 ? leftMsg : rightMsg}
              </p>
            </div>
          ))}
        </div>

        {/* CONTINUE BUTTON */}
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
