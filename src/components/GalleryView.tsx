"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Base path — only this is fixed, everything else is dynamic
const BASE_DIR = "/images/mom-photos";

// Reminder texts (cycles through them)
const reminderTexts = [
  "We love you. Always have. Always will.",
  "You mean more to us than words.",
  "This moment mattered. You matter.",
  "Thank you for being you.",
  "You are deeply loved.",
];

export default function GalleryView({ onComplete }: { onComplete: () => void }) {
  const [memories, setMemories] = useState<string[]>([]); // list of folder names
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState(false);

  // In a real app you'd fetch folder structure at build time or via API.
  // Since this is a static Next.js site, we hard-code or assume folders.
  // For true dynamic behavior in production, consider:
  // 1. Build-time generation (getStaticPaths / getStaticProps)
  // 2. Or place a manifest.json in public/ with folder list
  // For now — add your real folder names here (only once!)
  useEffect(() => {
    // REPLACE THESE with your ACTUAL subfolder names inside mom-photos
    const realFolders = [
      "family-picnic-2015",
      "first-birthday",
      "mombasa-trip",
      "christmas-2020",
      "graduation-day",
      // ... add every subfolder name that exists
    ];

    setMemories(realFolders);
  }, []);

  // Auto-cycle memories
  useEffect(() => {
    if (memories.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % memories.length);
    }, 9000);

    const timeout = setTimeout(() => {
      onComplete();
    }, 45000); // auto-next after ~45s — adjust as needed

    return () => {
      clearInterval(interval);
      clearTimeout(timeout);
    };
  }, [memories.length, onComplete]);

  useEffect(() => {
    const timer = setTimeout(() => setImagesLoaded(true), 800);
    return () => clearTimeout(timer);
  }, []);

  if (memories.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-2xl text-muted-foreground">
        Loading memories...
      </div>
    );
  }

  const currentFolder = memories[currentIndex];
  const currentText = reminderTexts[currentIndex % reminderTexts.length];

  // Dynamically construct paths — no hard-coded filenames!
  // Assumes each folder has at least 3 images, sorted alphabetically
  const screenPhoto = `${BASE_DIR}/${currentFolder}/1.jpg`;   // first image → screen
  const leftFilmPhoto = `${BASE_DIR}/${currentFolder}/2.jpg`;   // second → left film
  const rightFilmPhoto = `${BASE_DIR}/${currentFolder}/3.jpg`;  // third → right film

  // Optional: if you want to load ALL images in folder and pick randomly/first 3/etc.
  // That would require a manifest or build-time scanning (more advanced)

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FFF5F8] to-[#FCE1EC] flex items-center justify-center p-4 md:p-8 overflow-hidden">
      <div className="relative max-w-5xl w-full aspect-[4/3] md:aspect-[5/3] flex items-center justify-center">
        {/* Camera container */}
        <div className="relative w-[90%] max-w-[800px]">
          <Image
            src="/images/camera-pink.png"
            alt="Pink Sony camera"
            width={1200}
            height={900}
            className="w-full h-auto drop-shadow-2xl"
            priority
          />

          {/* Screen – main memory photo */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden rounded-[8%]">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentIndex}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.92 }}
                transition={{ duration: 1.8, ease: "easeInOut" }}
                className="w-[78%] h-[58%] relative"
              >
                <Image
                  src={screenPhoto}
                  alt="Memory on screen"
                  fill
                  className="object-cover rounded-lg"
                  onError={(e) => {
                    e.currentTarget.src = "/images/placeholder.jpg"; // fallback
                  }}
                />
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Left film */}
          <motion.div
            className="absolute left-[8%] top-[22%] w-[22%] h-[40%] -rotate-[4deg] origin-bottom-left shadow-xl"
            initial={{ opacity: 0, x: -40, rotate: -10 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: -4 }}
            transition={{ duration: 1.4, delay: 0.6, ease: "easeOut" }}
          >
            <Image
              src={leftFilmPhoto}
              alt="Left memory"
              fill
              className="object-cover rounded-sm border border-[#D8A1B3]/40 shadow-inner"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
            />
          </motion.div>

          {/* Right film */}
          <motion.div
            className="absolute right-[8%] top-[22%] w-[22%] h-[40%] rotate-[3deg] origin-bottom-right shadow-xl"
            initial={{ opacity: 0, x: 40, rotate: 10 }}
            animate={{ opacity: imagesLoaded ? 1 : 0, x: 0, rotate: 3 }}
            transition={{ duration: 1.4, delay: 0.8, ease: "easeOut" }}
          >
            <Image
              src={rightFilmPhoto}
              alt="Right memory"
              fill
              className="object-cover rounded-sm border border-[#D8A1B3]/40 shadow-inner"
              onError={(e) => {
                e.currentTarget.src = "/images/placeholder.jpg";
              }}
            />
          </motion.div>
        </div>

        {/* Left vertical text */}
        <motion.div
          className="absolute left-0 top-1/4 -translate-x-1/3 w-48 md:w-64 text-[#7A2E4A] font-display text-xl md:text-2xl leading-tight tracking-wide"
          style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: imagesLoaded ? 1 : 0, x: 0 }}
          transition={{ duration: 1.2, delay: 1.4 }}
        >
          {currentText}
        </motion.div>

        {/* Right vertical text */}
        <motion.div
          className="absolute right-0 top-1/4 translate-x-1/3 w-48 md:w-64 text-[#7A2E4A] font-display text-xl md:text-2xl leading-tight tracking-wide"
          style={{ writingMode: "vertical-lr", textOrientation: "mixed" }}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: imagesLoaded ? 1 : 0, x: 0 }}
          transition={{ duration: 1.2, delay: 1.6 }}
        >
          {currentText}
        </motion.div>

        {/* Subtle glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#D8A1B3]/10 to-transparent blur-3xl" />
        </div>

        {/* Next button */}
        <motion.button
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onComplete}
          className="absolute bottom-8 right-8 bg-[#e94b5f] text-white px-8 py-4 rounded-full shadow-lg hover:bg-[#d43f52] transition-colors font-medium text-lg"
        >
          Next →
        </motion.button>
      </div>
    </div>
  );
}