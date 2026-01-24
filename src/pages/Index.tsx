import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import SurpriseReveal from "@/components/SurpriseReveal";
import FloatingDecorations from "@/components/FloatingDecorations";
import GalleryView from "@/components/GalleryView";

type Screen =
  | "welcome"
  | "q1-feeling"
  | "reassurance-text"
  | "reassurance-gallery"
  | "affirmation"
  | "final-closure"
  | "video"
  | "surprise";

const affirmationLines = [
  "You don’t need to be anything other than yourself.",
  "",
  "The way you love, the way you care, the way you notice the little things —",
  "those are gifts that have shaped the people around you.",
  "",
  "You are appreciated more than words can say.",
  "Not for what you’ve done — but for who you are.",
  "",
  "And you are never alone.",
];

const floatingWords = ["Love", "Strength", "Home", "Always", "Peace"];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [feelingBefore, setFeelingBefore] = useState<string | null>(null);
  const [feelingAfter, setFeelingAfter] = useState<string | null>(null);
  const [playMusic, setPlayMusic] = useState(false);
  const [worriedCount, setWorriedCount] = useState(0);
  const [videoToPlay, setVideoToPlay] = useState(1);

  const feelingOptions = ["Good 😊", "A bit worried 😟"];
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [currentScreen]);

  // Automatically handle music
  useEffect(() => {
    setPlayMusic(currentScreen === "affirmation" || currentScreen === "video");
  }, [currentScreen]);

  const handleStart = () => setCurrentScreen("q1-feeling");

  const handleAnswerQ1 = (option: string) => {
    setFeelingBefore(option);

    if (option === "A bit worried 😟") {
      setVideoToPlay(1); // start with video 1
      setWorriedCount((prev) => prev + 1);
      setTimeout(() => setCurrentScreen("video"), 600);
    } else {
      setTimeout(() => setCurrentScreen("reassurance-text"), 600);
    }
  };

  const handleVideoEnd = () => {
    // If multiple videos, switch to next
    if (videoToPlay < 2) {
      setVideoToPlay(videoToPlay + 1);
    } else {
      // Move to reassurance gallery after last video
      setCurrentScreen("reassurance-gallery");
    }
  };

  const handleFinalYes = () => setTimeout(() => setCurrentScreen("surprise"), 600);

  const handleRestart = () => {
    setCurrentScreen("welcome");
    setFeelingBefore(null);
    setFeelingAfter(null);
    setPlayMusic(false);
    setWorriedCount(0);
    setVideoToPlay(1);
  };

  const getReassuranceContent = () => {
    if (feelingBefore === "Good 😊") {
      return {
        title: "That makes me smile so much 🤍",
        subtitle:
          "Some feelings don’t need fixing — they just deserve to be held gently.",
        body:
          "There’s something beautiful about feeling steady and at peace.\n\nYou bring that calm into the lives around you more than you realize. Being near you has always felt like being somewhere safe.",
        showGalleryImmediately: true,
        nextButtonText: "Hold onto this… let’s remember ✨",
      };
    }

    return {
      title: "I hear you 💛",
      subtitle: "When things feel heavy, you don’t have to carry them alone.",
      body:
        "Whatever is sitting in your heart right now — uncertainty, tiredness, quiet worries — it’s okay.\n\nI want to show you a little something to lift your spirits 💛",
      showGalleryImmediately: false,
      galleryButtonText: "Show me →",
    };
  };

  const content = getReassuranceContent();

  return (
    <div className="min-h-screen bg-muted relative overflow-hidden" role="main" aria-live="polite">
      <FloatingDecorations />

      {/* Background music */}
      {playMusic && (
        <audio src={`${import.meta.env.BASE_URL}audio/soft-piano.mp3`} autoPlay loop />
      )}

      <AnimatePresence mode="wait">
        {/* Welcome */}
        {currentScreen === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {/* Q1 Feeling */}
        {currentScreen === "q1-feeling" && (
          <motion.div key="q1" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -50 }} className="min-h-screen flex items-center justify-center py-12 px-4">
            <QuestionCard
              question="Mum, when you pause for a moment and check in with your heart — how does it feel right now?"
              options={feelingOptions}
              selectedOption={feelingBefore}
              onSelect={handleAnswerQ1}
              questionNumber={1}
              totalQuestions={3}
            />
          </motion.div>
        )}

        {/* Reassurance text */}
        {currentScreen === "reassurance-text" && (
          <motion.div key="reassurance-text" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center justify-center text-center px-4 py-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-6">{content.title}</h1>
            <p className="text-xl text-muted-foreground mb-6 whitespace-pre-line">{content.subtitle}</p>
            <p className="text-lg text-muted-foreground mb-12 max-w-2xl whitespace-pre-line">{content.body}</p>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen("reassurance-gallery")}
              className={`${content.showGalleryImmediately ? "bg-primary text-primary-foreground" : "bg-accent/10 border-2 border-accent text-accent"} text-xl font-medium py-5 px-12 rounded-full shadow-md`}
            >
              {content.showGalleryImmediately ? content.nextButtonText : content.galleryButtonText}
            </motion.button>
          </motion.div>
        )}

        {/* Gallery */}
        {currentScreen === "reassurance-gallery" && (
          <GalleryView onComplete={() => setCurrentScreen("affirmation")} />
        )}

        {/* Affirmation */}
        {currentScreen === "affirmation" && feelingBefore !== "A bit worried 😟" && (
          <motion.div key="affirmation" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center justify-center text-center px-6 py-12 relative">
            <div className="absolute inset-0 pointer-events-none overflow-hidden">
              {floatingWords.map((word, i) => (
                <motion.span
                  key={word}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 0.15, y: -220 }}
                  transition={{ delay: i * 1.2, duration: 14, repeat: Infinity }}
                  className="absolute text-3xl font-semibold text-primary"
                  style={{ left: `${15 + i * 15}%`, bottom: "-10%" }}
                >
                  {word}
                </motion.span>
              ))}
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-8">Just one gentle reminder 🤍</h1>
            <div className="space-y-3 mb-12">
              {affirmationLines.map((line, i) => (
                <motion.p key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.4 }} className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto whitespace-pre-line">
                  {line}
                </motion.p>
              ))}
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentScreen("final-closure")} className="bg-primary text-primary-foreground text-xl font-medium py-5 px-12 rounded-full shadow-md">
              Next
            </motion.button>
          </motion.div>
        )}

        {/* Video Screen */}
        {currentScreen === "video" && (
          <motion.div key="video" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 py-12">
            <div className="w-full md:w-4/5 max-w-5xl p-1 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 rounded-3xl shadow-2xl mx-auto">
              <div className="bg-muted rounded-3xl overflow-hidden aspect-video">
                <video
                  ref={videoRef}
                  src={`${import.meta.env.BASE_URL}videos/video${videoToPlay}.mp4`}
                  className="w-full h-full object-contain bg-black rounded-3xl"
                  controls
                  autoPlay
                  onEnded={handleVideoEnd}
                />
              </div>
            </div>

            <div className="flex flex-col items-center mt-6 space-y-4 text-center">
              <h2 className="text-2xl md:text-3xl font-bold text-primary">Do you remember this moment?</h2>
              <p className="text-lg text-muted-foreground max-w-2xl">Take your time to recall the feelings, the warmth, the memories. 💛</p>
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setCurrentScreen("q1-feeling")} className="bg-primary text-primary-foreground text-xl font-medium py-4 px-10 rounded-full shadow-md">
                I remember 💛
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Final Closure */}
        {currentScreen === "final-closure" && (
          <motion.div key="final" initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="min-h-screen flex items-center justify-center py-12 px-4">
            <QuestionCard question="Are you ready for a suprise?" options={["Yes 💕"]} selectedOption={null} onSelect={handleFinalYes} questionNumber={3} totalQuestions={3} />
          </motion.div>
        )}

        {/* Surprise */}
        {currentScreen === "surprise" && (
          <motion.div key="surprise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SurpriseReveal onRestart={handleRestart} feelingBefore={feelingBefore} feelingAfter={feelingAfter} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
