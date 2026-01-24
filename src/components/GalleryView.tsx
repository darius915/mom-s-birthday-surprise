import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_DIR = "/images/Mom-photos";

const memoryMessages: Record<string, string> = {
  "Abby": "Look at Abby! What a joy and blessing she’s been in your life 🌸",
  "Husband": "You have a wonderful and supportive husband, always by your side ❤️",
  "Milimani family": "Your Milimani family surrounds you with love, laughter, and warmth 🌷",
  "Springs kids": "These moments with your kids are priceless – your love shines through them 🎂",
  "friends": "Friends that feel like family – they’ve made your journey brighter 💕",
  "son": "Your son carries your strength, kindness, and love everywhere 💖",
};

export default function GalleryView({ onComplete }: { onComplete: () => void }) {
  const [memories, setMemories] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  useEffect(() => {
    setMemories(["Abby", "Husband", "Milimani family", "Springs kids", "friends", "son"]);
  }, []);

  useEffect(() => {
    if (!memories.length) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 12000);
    return () => clearInterval(interval);
  }, [memories]);

  useEffect(() => {
    setTimeout(() => setImagesLoaded(true), 1200);
  }, []);

  if (!memories.length) {
    return (
      <div className="min-h-screen flex items-center justify-center text-3xl font-serif text-[#004D40] px-4 text-center">
        Preparing a gentle moment just for you, Mom… 💌
      </div>
    );
  }

  const folder = memories[currentIndex];
  const mainPhoto = `${BASE_DIR}/${folder}/1.jpg`;
  const sidePhoto1 = `${BASE_DIR}/${folder}/2.jpg`;
  const sidePhoto2 = `${BASE_DIR}/${folder}/3.jpg`;

  const message = memoryMessages[folder] || "Cherished moments and endless love 💛";

  const handleNext = () => onComplete();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.35, delayChildren: 0.5 } },
  };
  const childVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: { opacity: 1, y: 0, scale: 1, transition: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFF8E1] via-[#FFE0B2] to-[#FFCC80] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 overflow-hidden relative">

      {/* Floating emojis */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-25 sm:opacity-35">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ y: "-30vh", x: `${Math.random() * 100}vw`, rotate: Math.random() * 360 - 180, opacity: 0.7 }}
            animate={{ y: "130vh", rotate: Math.random() * 720 - 360, opacity: [0.7, 1, 0.7] }}
            transition={{ duration: 35 + Math.random() * 20, repeat: Infinity, delay: i * 2.5, ease: "linear" }}
          >
            {i % 3 === 0 ? "🌸" : i % 2 === 0 ? "🌷" : "🐶"}
          </motion.div>
        ))}
      </div>

      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10">

        {/* Header */}
        <motion.div variants={childVariants} className="text-center mb-3 sm:mb-4 lg:mb-5 xl:mb-6">
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif text-[#004D40] drop-shadow-md">
            Happy Birthday
          </h1>
        </motion.div>

        {/* Main content */}
        <motion.div variants={childVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 lg:gap-12 w-full">

          {/* Left side photo */}
          <motion.div
            className="hidden md:block w-96 lg:w-[32rem] xl:w-[36rem] 2xl:w-[38rem] h-80 lg:h-[34rem] xl:h-[38rem] 2xl:h-[40rem]
                       bg-gradient-to-br from-pink-50 via-pink-100 to-pink-200 rounded-3xl shadow-2xl overflow-hidden border-10 border-pink-300 relative rotate-[-2deg] p-2"
            initial={{ opacity: 0, x: -120, rotate: -10, scale: 0.97 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: -2, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], type: "spring", stiffness: 70, damping: 18 }}
          >
            <img src={sidePhoto1} alt="Memory" className="w-full h-full object-contain rounded-2xl" />
          </motion.div>

          {/* Central photo */}
          <motion.div
            className="relative w-full max-w-[85vw] sm:max-w-[75vw] md:max-w-[52vw] lg:max-w-[50vw] xl:max-w-[48vw] 2xl:max-w-[45vw]
                       aspect-[3/4] md:aspect-auto max-h-[55vh] sm:max-h-[58vh] md:max-h-[52vh] lg:max-h-[57vh] xl:max-h-[60vh] 2xl:max-h-[65vh]
                       mx-auto z-20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative h-full bg-gradient-to-tr from-yellow-100 via-white to-yellow-50
                            rounded-3xl shadow-2xl overflow-hidden border-6 lg:border-8 xl:border-10 border-yellow-300 p-3 md:p-5 xl:p-6">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={mainPhoto}
                  alt="Cherished memory"
                  className="w-full h-full object-cover rounded-2xl"
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.015 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                />
              </AnimatePresence>

              {/* Overlay message */}
              <motion.div
                key={`msg-${currentIndex}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute bottom-3 left-1/2 -translate-x-1/2 w-4/5 bg-white/80 backdrop-blur-sm text-center rounded-md p-3 text-sm sm:text-base md:text-lg font-semibold text-gray-800 shadow-md"
              >
                {message}
              </motion.div>
            </div>
          </motion.div>

          {/* Right side photo */}
          <motion.div
            className="hidden md:block w-96 lg:w-[32rem] xl:w-[36rem] 2xl:w-[38rem] h-80 lg:h-[34rem] xl:h-[38rem] 2xl:h-[40rem]
                       bg-gradient-to-br from-purple-50 via-purple-100 to-purple-200 rounded-3xl shadow-2xl overflow-hidden border-10 border-purple-300 relative rotate-[2deg] p-2"
            initial={{ opacity: 0, x: 120, rotate: 10, scale: 0.97 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: 2, scale: 1 }}
            transition={{ duration: 1.8, ease: [0.4, 0, 0.2, 1], type: "spring", stiffness: 70, damping: 18 }}
          >
            <img src={sidePhoto2} alt="Memory" className="w-full h-full object-contain rounded-2xl" />
          </motion.div>
        </motion.div>

        {/* Mobile collage */}
        <motion.div variants={childVariants} className="flex md:hidden justify-center gap-6 mt-4 mb-4 z-10">
          {[sidePhoto1, sidePhoto2].map((img, idx) => (
            <motion.div
              key={idx}
              className={`w-44 h-64 bg-gradient-to-br from-white via-gray-100 to-gray-200 rounded-2xl shadow-lg overflow-hidden border-6 border-gray-300 p-2 rotate-[${idx === 0 ? -3 : 3}deg]`}
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1] }}
            >
              <img src={img} alt="Memory" className="w-full h-full object-contain rounded-xl" />
            </motion.div>
          ))}
        </motion.div>

        {/* Button */}
        <motion.div variants={childVariants} className="mt-4 md:mt-6">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-[#26C6DA] to-[#00BCD4] text-white px-6 py-3 md:px-10 md:py-5 rounded-full shadow-2xl text-lg md:text-xl font-medium hover:brightness-110 transition-all flex items-center gap-2 border-2 border-white/30"
          >
            More Love Awaits <span className="text-2xl">💕</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Background music */}
      <audio autoPlay loop className="hidden">
        <source src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
}
