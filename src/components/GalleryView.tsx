import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BASE_DIR = "/images/Mom-photos";

const heartfeltMessages = [
  "I love you, Mom – more than words can ever say. You've been my rock, my light, my everything. Happy Birthday to the woman who made my world so beautiful. 💖",
  "To the heart that beats in all of us: Thank you for every hug, every laugh, every lesson wrapped in love. You're our forever home. Happy Birthday, Mom! 🌸",
  "Mom, every good thing in me comes from you. Today we celebrate the most incredible woman we know. I love you endlessly. 🎂❤️",
  "Happy Birthday to my first best friend, my biggest cheerleader, and the queen of our family. Your love made us who we are. Forever grateful. 💕",
  "You didn't just give me life – you taught me how to live it with kindness, strength, and so much joy. I love you, Mom. Always. 🌷",
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
    setMemories(["Abby", "Husband", "Milimani family", "Springs kids", "friends", "son"]);
  }, []);

  // Auto-cycle every 12 seconds
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

  const message = heartfeltMessages[currentIndex % heartfeltMessages.length];

  const handleNext = () => {
    onComplete();
  };

  // Fluid animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.35,
        delayChildren: 0.5,
      },
    },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 40, scale: 0.98 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 1.4,
        ease: [0.4, 0, 0.2, 1],
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#E0F7FA] via-[#80DEEA] to-[#40E0D0] flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 xl:p-12 overflow-hidden relative">
      {/* Wave pattern */}
      <div className="absolute inset-0 pointer-events-none opacity-10 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPjxwYXRoIGQ9Ik0wIDUwQzEyNSAwIDI3NSAxMDAgNDAwIDUwQzUyNSAwIDY3NSAxMDAgODAwIDUwIiBmaWxsPSJub25lIiBzdHJva2U9IiMwMDgwODAiIHN0cm9rZS13aWR0aD0iNCIvPjwvc3ZnPg==')] bg-repeat animate-wave-slow" />

      {/* Falling flowers and dogs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-35 sm:opacity-45">
        {[...Array(12)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            initial={{ y: "-30vh", x: `${Math.random() * 100}vw`, rotate: Math.random() * 360 - 180, opacity: 0.7 }}
            animate={{
              y: "130vh",
              rotate: Math.random() * 720 - 360,
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 35 + Math.random() * 20,
              repeat: Infinity,
              delay: i * 2.5,
              ease: "linear",
            }}
          >
            {i % 3 === 0 ? "🌸" : i % 2 === 0 ? "🌷" : "🐶"}
          </motion.div>
        ))}
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center z-10"
      >
        {/* Smaller header to save space */}
        <motion.div variants={childVariants} className="text-center mb-3 sm:mb-4 lg:mb-5 xl:mb-6">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-serif text-[#004D40] drop-shadow-md">
            Happy Birthday
          </h1>
        </motion.div>

        {/* Main content */}
        <motion.div variants={childVariants} className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 lg:gap-14 xl:gap-16 w-full">
          {/* Left side photo */}
          <motion.div
            className="hidden md:block w-96 lg:w-[28rem] xl:w-[34rem] 2xl:w-[38rem] h-[26rem] lg:h-[30rem] xl:h-[34rem] 2xl:h-[38rem] bg-white/92 rounded-3xl shadow-2xl overflow-hidden border-[12px] lg:border-[14px] xl:border-[16px] border-[#26C6DA]/70 border-double relative rotate-[-4deg]"
            initial={{ opacity: 0, x: -120, rotate: -10, scale: 0.97 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: -4, scale: 1 }}
            transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1], type: "spring", stiffness: 70, damping: 18 }}
          >
            <img src={sidePhoto1} alt="Memory" className="w-full h-full object-contain p-2" onError={(e) => (e.target as HTMLImageElement).src = "/images/placeholder.jpg"} />
            <div className="absolute top-6 left-6 text-5xl xl:text-6xl opacity-80">🌹</div>
            <div className="absolute bottom-6 right-6 text-5xl xl:text-6xl opacity-80 rotate-180">🌹</div>
          </motion.div>

          {/* Central photo – tighter height cap */}
          <motion.div
            className="relative w-full max-w-[80vw] sm:max-w-[70vw] md:max-w-[48vw] lg:max-w-[45vw] xl:max-w-[42vw] 2xl:max-w-[40vw] aspect-[3/4] md:aspect-auto max-h-[45vh] sm:max-h-[48vh] md:max-h-[45vh] lg:max-h-[50vh] xl:max-h-[52vh] 2xl:max-h-[55vh] mx-auto z-20 overflow-hidden"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1] }}
          >
            <div className="relative h-full bg-white/92 backdrop-blur-sm rounded-4xl shadow-2xl overflow-hidden border-[10px] lg:border-[14px] xl:border-[16px] border-[#26C6DA]/70 border-double p-4 md:p-6 xl:p-8">
              <AnimatePresence mode="wait">
                <motion.img
                  key={currentIndex}
                  src={mainPhoto}
                  alt="Cherished memory"
                  className="w-full h-full object-contain rounded-3xl"
                  initial={{ opacity: 0, scale: 1.015 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 1.015 }}
                  transition={{ duration: 1.2, ease: [0.4, 0, 0.2, 1] }}
                  onError={(e) => (e.target as HTMLImageElement).src = "/images/placeholder.jpg"}
                />
              </AnimatePresence>
            </div>
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 w-4/5 h-4 bg-gradient-to-r from-transparent via-[#004D40]/60 to-transparent rounded-full blur-md opacity-70 xl:opacity-80" />
          </motion.div>

          {/* Right side photo */}
          <motion.div
            className="hidden md:block w-96 lg:w-[28rem] xl:w-[34rem] 2xl:w-[38rem] h-[26rem] lg:h-[30rem] xl:h-[34rem] 2xl:h-[38rem] bg-white/92 rounded-3xl shadow-2xl overflow-hidden border-[12px] lg:border-[14px] xl:border-[16px] border-[#26C6DA]/70 border-double relative rotate-[4deg]"
            initial={{ opacity: 0, x: 120, rotate: 10, scale: 0.97 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: 4, scale: 1 }}
            transition={{ duration: 2.0, ease: [0.4, 0, 0.2, 1], type: "spring", stiffness: 70, damping: 18 }}
          >
            <img src={sidePhoto2} alt="Memory" className="w-full h-full object-contain p-2" onError={(e) => (e.target as HTMLImageElement).src = "/images/placeholder.jpg"} />
            <div className="absolute top-6 right-6 text-5xl xl:text-6xl opacity-80">🎀</div>
            <div className="absolute bottom-6 left-6 text-5xl xl:text-6xl opacity-80 rotate-180">🎀</div>
          </motion.div>
        </motion.div>

        {/* Mobile collage */}
        <motion.div variants={childVariants} className="flex md:hidden justify-center gap-8 mt-5 mb-4 z-10">
          <motion.div
            className="w-48 h-64 bg-white/92 rounded-2xl shadow-xl overflow-hidden border-8 border-[#26C6DA]/70 border-double rotate-[-6deg]"
            initial={{ opacity: 0, scale: 0.85, rotate: -12 }}
            animate={{ opacity: 1, scale: 1, rotate: -6 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], type: "spring", stiffness: 70, damping: 18 }}
          >
            <img src={sidePhoto1} alt="Memory" className="w-full h-full object-contain p-3" />
          </motion.div>
          <motion.div
            className="w-48 h-64 bg-white/92 rounded-2xl shadow-xl overflow-hidden border-8 border-[#26C6DA]/70 border-double rotate-[6deg]"
            initial={{ opacity: 0, scale: 0.85, rotate: 12 }}
            animate={{ opacity: 1, scale: 1, rotate: 6 }}
            transition={{ duration: 1.5, ease: [0.4, 0, 0.2, 1], type: "spring", stiffness: 70, damping: 18 }}
          >
            <img src={sidePhoto2} alt="Memory" className="w-full h-full object-contain p-3" />
          </motion.div>
        </motion.div>

        {/* Message */}
        <motion.div variants={childVariants} className="w-full max-w-3xl bg-white/70 backdrop-blur-md rounded-2xl p-5 md:p-8 shadow-xl border border-[#26C6DA]/40 text-center z-10 mt-4 md:mt-5 lg:mt-6">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl font-serif text-[#004D40] leading-relaxed italic">
            {message}
          </p>
        </motion.div>

        {/* Button */}
        <motion.div variants={childVariants} className="mt-6 md:mt-8">
          <button
            onClick={handleNext}
            className="bg-gradient-to-r from-[#26C6DA] to-[#00BCD4] text-white px-8 py-4 md:px-10 md:py-5 rounded-full shadow-2xl text-lg md:text-xl lg:text-2xl font-medium hover:brightness-110 transition-all flex items-center gap-2 border-2 border-white/30"
          >
            More Love Awaits <span className="text-2xl">💕</span>
          </button>
        </motion.div>
      </motion.div>

      {/* Background music */}
      <audio autoPlay loop className="hidden">
        <source src="https://www.bensound.com/bensound-music/bensound-tenderness.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <style jsx global>{`
        @keyframes wave-slow {
          0% { background-position: 0 0; }
          100% { background-position: 200px 200px; }
        }
        .animate-wave-slow { animation: wave-slow 60s linear infinite; }
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.12; }
          50% { opacity: 0.28; }
        }
        .animate-pulse-slow { animation: pulse-slow 16s infinite ease-in-out; }
      `}</style>
    </div>
  );
}