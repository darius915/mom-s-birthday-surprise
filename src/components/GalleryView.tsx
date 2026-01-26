import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Audio import from public folder
import nostalgicPiano from "/audio/nostalgic-piano.mp3";

const BASE_DIR = "/images/Mom-photos";

const folderMessages: Record<
  string,
  { left: string; center: string; right: string }
> = {
  Abby: {
    left: "Abby is one of life’s sweetest gifts — a constant reminder of love and joy 🌸",
    center: "Abby brings warmth and laughter into your life every single day 💖",
    right: "Moments with Abby are treasures that light up your heart ✨",
  },
  Husband: {
    left: "A loving, steady partner who always walks beside you ❤️",
    center: "Your bond is filled with love, patience, and shared memories 💕",
    right: "Together you two make every ordinary day extraordinary 🌟",
  },
  "Milimani family": {
    left: "Family moments filled with laughter and a deep sense of belonging 🌷",
    center: "Every hug and smile reminds you how much love surrounds you 💛",
    right: "These memories bring joy and warmth to your heart 🌼",
  },
  "Springs kids": {
    left: "Beautiful memories shaped by kindness, patience, and love 💖",
    center: "Your children’s laughter is a reflection of your care 🌟",
    right: "They make every day brighter just by being themselves ✨",
  },
  friends: {
    left: "Friends who feel like family, walking through life’s seasons 💕",
    center: "Their support brings happiness and light to your days 🌈",
    right: "Cherished bonds that always lift your spirit 🌸",
  },
  son: {
    left: "A son who reflects your strength, heart, and everything you’ve poured into him 🌟",
    center: "His joy and growth are a testament to your love 💛",
    right: "Moments shared with him are priceless memories 💖",
  },
};

export default function GalleryView({ onComplete }: { onComplete: () => void }) {
  const [folders, setFolders] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setFolders([
      "Abby",
      "Husband",
      "Milimani family",
      "Springs kids",
      "friends",
      "son",
    ]);
  }, []);

  useEffect(() => {
    if (!folders.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((i) => (i + 1) % folders.length);
    }, 12000); // 12 seconds per memory
    return () => clearInterval(interval);
  }, [folders]);

  useEffect(() => {
    setTimeout(() => setReady(true), 800);
  }, []);

  if (!folders.length) return null;

  const folder = folders[currentIndex];
  const leftPhoto = `${BASE_DIR}/${folder}/2.jpg`;
  const mainPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const rightPhoto = `${BASE_DIR}/${folder}/3.jpg`;
  const messages = folderMessages[folder];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#FFE0B2] to-[#FFCC80] flex items-center justify-center px-6 py-10 overflow-hidden">
      {/* Music */}
      <audio src={nostalgicPiano} autoPlay loop />

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
            className="hidden md:flex flex-col items-center w-full max-w-[28rem] h-[38rem]
                       bg-gradient-to-br from-pink-50 to-pink-100
                       rounded-3xl shadow-2xl border-8 border-pink-300 p-4"
            initial={{ opacity: 0, x: -120, rotate: -6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: -2 }}
            transition={{ duration: 1.6 }}
          >
            <img
              src={leftPhoto}
              alt=""
              className="w-full h-full object-contain rounded-2xl"
            />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">
              {messages.left}
            </p>
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
                transition={{ duration: 1.5 }} // slower fade
              />
            </AnimatePresence>

            {/* CENTER MESSAGE */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2
                            bg-white/85 backdrop-blur-md
                            px-6 py-3 rounded-xl shadow-md
                            text-center text-lg font-semibold text-gray-800">
              {messages.center}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            className="hidden md:flex flex-col items-center w-full max-w-[28rem] h-[38rem]
                       bg-gradient-to-br from-purple-50 to-purple-100
                       rounded-3xl shadow-2xl border-8 border-purple-300 p-4"
            initial={{ opacity: 0, x: 120, rotate: 6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: 2 }}
            transition={{ duration: 1.6 }}
          >
            <img
              src={rightPhoto}
              alt=""
              className="w-full h-full object-contain rounded-2xl"
            />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">
              {messages.right}
            </p>
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
              <p className="mt-2 text-center text-sm text-gray-700 font-medium">
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
