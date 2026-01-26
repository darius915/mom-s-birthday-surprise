import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_DIR = import.meta.env.BASE_URL + "images/Mom-photos";

const folderMessages: Record<string, { center: string; left: string; right: string }> = {
  Abby: {
    center: "Abby brings endless joy and warmth to your heart 🌸",
    left: "A gift of love and smiles from Abby 💖",
    right: "Moments with Abby are pure happiness 🌷",
  },
  Husband: {
    center: "Your partner's love has always been steady and kind ❤️",
    left: "Together, you built a home filled with laughter 🏡",
    right: "A life shared with him is a life cherished 💕",
  },
  "Milimani family": {
    center: "Family moments full of laughter and togetherness 🌷",
    left: "Memories with family are treasures 💛",
    right: "Love grows stronger with each gathering 💕",
  },
  "Springs kids": {
    center: "Beautiful memories shaped by your endless love 💖",
    left: "They reflect the heart you've poured into them 🌟",
    right: "Every smile is a reward for your care 💛",
  },
  friends: {
    center: "Friends who feel like family bring joy and warmth 💕",
    left: "Shared laughter and comfort in every moment 🌸",
    right: "Friendship is a treasure you nurture daily 🌷",
  },
  son: {
    center: "A son who reflects your strength and heart 🌟",
    left: "He carries your love in every step 💛",
    right: "Moments together are precious and bright 💖",
  },
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
    const interval = setInterval(() => setCurrentIndex((i) => (i + 1) % folders.length), 12000);
    return () => clearInterval(interval);
  }, [folders]);

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
      {/* Background music – muted so it can autoplay */}
      <audio
        src={import.meta.env.BASE_URL + "audio/nostalgic-piano.mp3"}
        autoPlay
        loop
        preload="auto"
        muted
      />

      <div className="w-full max-w-7xl mx-auto flex flex-col items-center gap-8 md:gap-10">
        <motion.h1
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-4xl md:text-5xl font-serif text-[#004D40] text-center"
        >
          A Life Surrounded by Love
        </motion.h1>

        {/* Play Music button – placed near the top */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.6 }}
          className="text-center"
        >
          <button
            onClick={() => {
              const audio = document.querySelector('audio') as HTMLAudioElement | null;
              if (audio) {
                audio.muted = false;
                // Optional: ensure it starts if it was paused
                if (audio.paused) audio.play().catch(() => {});
              }
            }}
            className="bg-gradient-to-r from-pink-300 to-purple-300 text-white px-8 py-4 rounded-full text-lg md:text-xl font-semibold shadow-lg hover:brightness-110 hover:scale-105 transition-all duration-300 flex items-center gap-2 mx-auto"
          >
            <span>🎶 Play gentle music</span>
            <span className="text-xl">💕</span>
          </button>
          <p className="mt-2 text-sm md:text-base text-gray-600 font-medium">
            to make the memories even more special 🌸
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row items-center justify-center gap-10 w-full mt-4 md:mt-8">
          {/* LEFT CARD */}
          <motion.div
            className="hidden md:flex flex-col items-center w-[34rem] h-[38rem] bg-gradient-to-br from-pink-50 to-pink-100 rounded-3xl shadow-2xl border-[8px] border-pink-300 p-4"
            initial={{ opacity: 0, x: -120, rotate: -6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: -2 }}
            transition={{ duration: 1.6 }}
          >
            <img src={leftPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">{messages.left}</p>
          </motion.div>

          {/* CENTER CARD */}
          <motion.div
            className="relative w-full max-w-[50rem] h-[60vh] bg-gradient-to-br from-yellow-50 via-white to-yellow-100 rounded-3xl shadow-2xl border-[10px] border-yellow-300 p-6"
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
                transition={{ duration: 1.2 }}
              />
            </AnimatePresence>

            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/85 backdrop-blur-md px-6 py-3 rounded-xl shadow-md text-center text-lg font-semibold text-gray-800">
              {messages.center}
            </div>
          </motion.div>

          {/* RIGHT CARD */}
          <motion.div
            className="hidden md:flex flex-col items-center w-[34rem] h-[38rem] bg-gradient-to-br from-purple-50 to-purple-100 rounded-3xl shadow-2xl border-[8px] border-purple-300 p-4"
            initial={{ opacity: 0, x: 120, rotate: 6 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: 2 }}
            transition={{ duration: 1.6 }}
          >
            <img src={rightPhoto} alt="" className="w-full h-full object-contain rounded-2xl" />
            <p className="mt-4 text-center text-lg text-gray-700 font-medium">{messages.right}</p>
          </motion.div>
        </div>

        {/* MOBILE SIDE IMAGES */}
        <div className="md:hidden flex gap-6 mt-6">
          {[leftPhoto, rightPhoto].map((img, i) => (
            <div key={i} className="w-44 h-64 bg-white rounded-2xl shadow-lg border-4 border-gray-200 p-2">
              <img src={img} className="w-full h-full object-contain rounded-xl" />
              <p className="mt-2 text-center text-sm text-gray-700 font-medium">
                {i === 0 ? messages.left : messages.right}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={onComplete}
          className="mt-8 bg-gradient-to-r from-[#26C6DA] to-[#00BCD4] text-white px-10 py-4 rounded-full text-xl shadow-xl hover:brightness-110 transition"
        >
          Continue 💕
        </button>
      </div>
    </div>
  );
}