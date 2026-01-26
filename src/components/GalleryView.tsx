import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import cameraImage from "/images/camera-pink.png";

// Base path (GitHub Pages safe)
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
    }, 12000);
    return () => clearInterval(interval);
  }, [folders]);

  useEffect(() => {
    setTimeout(() => setReady(true), 800);
  }, []);

  if (!folders.length) return null;

  const folder = folders[currentIndex];
  const [mainMsg, leftMsg, rightMsg] = folderMessages[folder];

  const mainPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const leftPhoto = `${BASE_DIR}/${folder}/2.jpg`;
  const rightPhoto = `${BASE_DIR}/${folder}/3.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#FFE0B2] to-[#FFCC80] flex items-center justify-center overflow-hidden relative">

      {/* 🎵 Background Music (RESTORED) */}
      <audio autoPlay loop className="hidden">
        <source
          src={`${import.meta.env.BASE_URL}music/birthday-music.mp3`}
          type="audio/mpeg"
        />
      </audio>

      {/* CAMERA SCALE WRAPPER */}
      <div className="scale-[0.9] md:scale-[0.75] origin-center">

        <div className="relative w-full max-w-[760px] mx-auto">

          {/* CAMERA IMAGE */}
          <img
            src={cameraImage}
            alt="Camera"
            className="w-full h-auto drop-shadow-2xl select-none"
            draggable={false}
          />

          {/* CAMERA SCREEN */}
          <div
            className="absolute rounded-[6%] overflow-hidden bg-black"
            style={{
              top: "11%",
              left: "10%",
              right: "10%",
              bottom: "22%",
            }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                className="relative w-full h-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1 }}
              >
                <img
                  src={mainPhoto}
                  className="w-full h-full object-cover"
                />

                {/* MAIN TEXT OVERLAY */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/55 backdrop-blur-md text-white px-4 py-2 rounded-xl text-sm md:text-base text-center max-w-[90%]">
                  {mainMsg}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* LEFT PHOTO */}
          <motion.div
            className="absolute"
            style={{ top: "14%", left: "-6%", width: "26%", height: "54%" }}
            initial={{ opacity: 0, x: -60, rotate: -14 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: -10 }}
            transition={{ duration: 1.3 }}
          >
            <div className="relative w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
              <img src={leftPhoto} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/55 text-white text-xs px-3 py-1 rounded-lg text-center">
                {leftMsg}
              </div>
            </div>
          </motion.div>

          {/* RIGHT PHOTO */}
          <motion.div
            className="absolute"
            style={{ top: "14%", right: "-6%", width: "26%", height: "54%" }}
            initial={{ opacity: 0, x: 60, rotate: 14 }}
            animate={{ opacity: ready ? 1 : 0, x: 0, rotate: 10 }}
            transition={{ duration: 1.3 }}
          >
            <div className="relative w-full h-full bg-white rounded-xl shadow-xl overflow-hidden">
              <img src={rightPhoto} className="w-full h-full object-cover" />
              <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-black/55 text-white text-xs px-3 py-1 rounded-lg text-center">
                {rightMsg}
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* CONTINUE */}
      <button
        onClick={onComplete}
        className="absolute bottom-8 right-8 bg-gradient-to-r from-[#26C6DA] to-[#00BCD4] text-white px-8 py-3 rounded-full text-lg shadow-xl hover:brightness-110 transition"
      >
        Continue 💕
      </button>
    </div>
  );
}
