import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_DIR = "/images/Mom-photos";

const reminderTexts = [
  "We love you. Always have. Always will.",
  "You mean more to us than words.",
  "This moment mattered. You matter.",
  "Thank you for being you.",
  "You are deeply loved.",
];

export default function GalleryView({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const [memories, setMemories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setMemories([
      "Abby",
      "Husband",
      "Milimani family",
      "Springs kids",
      "friends",
      "son",
    ]);
  }, []);

  useEffect(() => {
    if (!memories.length) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 9000); // Slightly slower for more savoring

    const timeout = setTimeout(
      () => onComplete(),
      memories.length * 9000 + 8000
    );

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [memories, onComplete]);

  useEffect(() => {
    setTimeout(() => setImagesLoaded(true), 1000);
  }, []);

  if (!memories.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl text-[#D43F52] font-serif">
        Wrapping your memories in love… 🌸
      </div>
    );
  }

  const folder = memories[currentIndex];
  const text = reminderTexts[currentIndex % reminderTexts.length];

  const mainPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const leftPhoto = `${BASE_DIR}/${folder}/2.jpg`;
  const rightPhoto = `${BASE_DIR}/${folder}/3.jpg`;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF0F5] via-[#FCE4EC] to-[#FAD0E0] flex flex-col items-center justify-center p-6 sm:p-8 md:p-12 lg:p-16 overflow-hidden relative">
      {/* Warm glowing overlay + floating petals */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,182,193,0.15),transparent_60%)] animate-pulse-slow" />
        <motion.div
          className="absolute inset-0 opacity-30"
          animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
          transition={{ duration: 30, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          style={{
            backgroundImage: "url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%2240%22 height=%2240%22 viewBox=%220 0 40 40%22%3E%3Cpath d=%22M20 0 L26 14 L40 20 L26 26 L20 40 L14 26 L0 20 L14 14 Z%22 fill=%22%23FFB6C1%22 opacity=%220.3%22/%3E%3C/svg%3E')",
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* Floating rose petals */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 select-none">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-4xl md:text-6xl"
            initial={{ y: "-10vh", x: `${Math.random() * 100}vw`, rotate: Math.random() * 360 }}
            animate={{
              y: "110vh",
              rotate: Math.random() * 720 - 360,
              transition: {
                duration: 15 + Math.random() * 10,
                repeat: Infinity,
                delay: i * 1.5,
                ease: "linear",
              },
            }}
          >
            {Math.random() > 0.5 ? "🌸" : "🌷"}
          </motion.div>
        ))}
      </div>

      {/* Main tribute container */}
      <div className="relative w-full max-w-5xl mx-auto text-center z-10">
        {/* Warm header with sparkle */}
        <motion.div
          className="relative inline-block mb-10 md:mb-16"
          initial={{ opacity: 0, y: -60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          <h1 className="text-5xl md:text-7xl font-serif text-[#C71585] drop-shadow-[0_4px_12px_rgba(199,21,133,0.4)]">
            To the Heart of Our Home
          </h1>
          <motion.p
            className="text-3xl md:text-5xl font-serif text-[#D43F52] mt-2 italic"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            Happy Birthday, Mom 💖
          </motion.p>
          <div className="absolute -top-6 -right-8 text-6xl animate-twinkle">✨</div>
        </motion.div>

        {/* Creative warm photo trio: Wrapped in love ribbons + soft glow */}
        <div className="relative flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 mb-12">
          {/* Left memory – soft tilted frame with lace edge */}
          <motion.div
            className="relative w-48 h-60 md:w-64 md:h-80 bg-gradient-to-br from-white to-[#FFF5F8] rounded-2xl shadow-2xl overflow-hidden border-[6px] border-[#FFB6C1] border-double rotate-[-4deg] p-3"
            initial={{ opacity: 0, x: -120, rotate: -10 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: -4 }}
            transition={{ duration: 1.8, delay: 0.4, type: "spring", stiffness: 90, damping: 14 }}
          >
            <img
              src={leftPhoto}
              alt="Cherished memory"
              className="w-full h-full object-cover rounded-xl shadow-inner"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00000040] to-transparent opacity-30" />
            <div className="absolute bottom-3 left-3 text-3xl drop-shadow-md">🌹</div>
          </motion.div>

          {/* Central heart of it all – glowing main photo with candle aura */}
          <motion.div
            className="relative w-72 h-96 md:w-96 md:h-[28rem] bg-white rounded-3xl shadow-2xl overflow-hidden border-8 border-[#E94B5F] border-double p-4 transform scale-110 z-10"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.6, ease: "backOut" }}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={currentIndex}
                src={mainPhoto}
                alt="Most precious memory"
                className="w-full h-full object-cover rounded-2xl"
                initial={{ opacity: 0, scale: 1.08 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.08 }}
                transition={{ duration: 1.4 }}
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
              />
            </AnimatePresence>
            {/* Soft inner glow + floating sparkles */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#FFD70022]" />
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-10 h-16 bg-gradient-to-t from-yellow-300 to-transparent rounded-full opacity-60 blur-md animate-flicker-glow" />
            <motion.div className="absolute inset-0 pointer-events-none" animate={{ opacity: [0.4, 0.7, 0.4] }} transition={{ duration: 6, repeat: Infinity }}>
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-yellow-200 rounded-full"
                  style={{
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                    animation: `sparkle ${3 + Math.random() * 3}s infinite ${i * 0.5}s`,
                  }}
                />
              ))}
            </motion.div>
          </motion.div>

          {/* Right memory – matching tilted frame with heart accent */}
          <motion.div
            className="relative w-48 h-60 md:w-64 md:h-80 bg-gradient-to-br from-white to-[#FFF5F8] rounded-2xl shadow-2xl overflow-hidden border-[6px] border-[#FFB6C1] border-double rotate-[4deg] p-3"
            initial={{ opacity: 0, x: 120, rotate: 10 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: 4 }}
            transition={{ duration: 1.8, delay: 0.6, type: "spring", stiffness: 90, damping: 14 }}
          >
            <img
              src={rightPhoto}
              alt="Cherished memory"
              className="w-full h-full object-cover rounded-xl shadow-inner"
              onError={(e) => { (e.target as HTMLImageElement).src = "/images/placeholder.jpg"; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#00000040] to-transparent opacity-30" />
            <div className="absolute top-3 right-3 text-3xl drop-shadow-md">💕</div>
          </motion.div>

          {/* Delicate ribbon wrapping the trio */}
          <div className="absolute inset-x-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-[#D43F52] to-transparent opacity-60 -translate-y-1/2 md:block hidden" />
        </div>

        {/* Heartfelt message – handwritten feel */}
        <motion.div
          className="max-w-3xl mx-auto bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 shadow-xl border border-[#FFB6C1]/50"
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, delay: 1 }}
        >
          <p className="text-2xl md:text-3xl font-serif text-[#6B2C45] leading-relaxed italic drop-shadow-md">
            {text}
          </p>
          <p className="mt-6 text-xl md:text-2xl text-[#C71585] font-medium">
            Forever your biggest fans 💐
          </p>
        </motion.div>
      </div>

      {/* Gentle continue button with heart pulse */}
      <motion.button
        onClick={onComplete}
        className="absolute bottom-10 right-10 md:bottom-16 md:right-20 bg-gradient-to-r from-[#FF69B4] to-[#DB7093] text-white px-12 py-6 rounded-full shadow-2xl font-serif text-xl md:text-2xl z-30 hover:brightness-110 transition-all flex items-center gap-3 border-2 border-white/30"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2.5 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.95 }}
      >
        See More Memories <span className="text-2xl animate-pulse">💖</span>
      </motion.button>

      {/* Global warm animations */}
      <style jsx global>{`
        @keyframes flicker-glow {
          0%, 100% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0.9; transform: scale(1.15); }
        }
        .animate-flicker-glow {
          animation: flicker-glow 3s infinite ease-in-out;
        }
        @keyframes sparkle {
          0%, 100% { opacity: 0; transform: scale(0); }
          50% { opacity: 1; transform: scale(1.5); }
        }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.15; }
          50% { opacity: 0.3; }
        }
        .animate-pulse-slow {
          animation: pulse-slow 12s infinite ease-in-out;
        }
      `}</style>
    </div>
  );
}