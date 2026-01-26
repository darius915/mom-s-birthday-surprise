import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_DIR = `${import.meta.env.BASE_URL}images/Mom-photos`;

/**
 * Folder-based sweet messages
 */
const folderMessages: Record<string, { left: string; main: string; right: string }> = {
  Abby: {
    left: "Abby is one of life’s sweetest gifts 🌸",
    main: "Abby always brings joy into your heart 💖",
    right: "Her smile lights up every room you share together ✨",
  },
  Husband: {
    left: "A loving, steady partner ❤️",
    main: "Together, you’ve built a life full of laughter and support 💕",
    right: "Every moment shared is a memory to cherish 🌟",
  },
  "Milimani family": {
    left: "Family moments filled with warmth 🌷",
    main: "Being surrounded by them makes your heart full 💛",
    right: "They remind you how deeply you are loved 💝",
  },
  "Springs kids": {
    left: "Beautiful memories shaped by your love 💖",
    main: "Their laughter is your sweetest reward 😍",
    right: "Every hug is a reflection of your care 🌟",
  },
  friends: {
    left: "Friends who feel like family 💕",
    main: "They treasure the joy you bring into their lives ✨",
    right: "Moments together create lasting happiness 🌸",
  },
  son: {
    left: "A son who reflects your love 🌟",
    main: "Every little gesture from him shows your guidance ❤️",
    right: "He carries your kindness into the world 💛",
  },
};

export default function GalleryView({ onComplete }: { onComplete: () => void }) {
  const [folders, setFolders] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFolders(["Abby", "Husband", "Milimani family", "Springs kids", "friends", "son"]);
  }, []);

  // Auto-switch cottages every 12 seconds
  useEffect(() => {
    if (!folders.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % folders.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [folders]);

  // Slight delay before fade-in animations
  useEffect(() => {
    setTimeout(() => setReady(true), 800);
  }, []);

  if (!folders.length) return null;

  const folder = folders[currentIndex];
  const mainPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const leftPhoto = `${BASE_DIR}/${folder}/2.jpg`;
  const rightPhoto = `${BASE_DIR}/${folder}/3.jpg`;
  const messages = folderMessages[folder];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#FFE0B2] to-[#FFCC80] flex items-center justify-center px-6 py-10 overflow-hidden">
      {/* Background music */}
      <audio src={`${import.meta.env.BASE_URL}audio/soft-piano.mp3`} autoPlay loop />

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

          {/* CENTER CARD */}
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
                key={currentIndex}
                src={mainPhoto}
                alt=""
                className="w-full h-full object-contain rounded-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2 }} // slower fade for nostalgia
              />
            </AnimatePresence>

            {/* CENTER MESSAGE */}
            <div
              className="absolute bottom-4 left-1/2 -translate-x-1/2
                         bg-white/85 backdrop-blur-md
                         px-6 py-3 rounded-xl shadow-md
                         text-center text-lg font-semibold text-gray-800"
            >
              {messages.main}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
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

        {/* MOBILE SIDE IMAGES */}
        <div className="md:hidden flex gap-6">
          {[leftPhoto, rightPhoto].map((img, i) => (
            <div
              key={i}
              className="w-44 h-64 bg-white rounded-2xl shadow-lg border-4 border-gray-200 p-2"
            >
              <img src={img} className="w-full h-full object-contain rounded-xl" />
              <p className="text-center mt-2 text-sm font-medium text-gray-700">
                {i === 0 ? messages.left : messages.right}
              </p>
            </div>
          ))}
        </div>

        {/* CONTINUE */}
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
