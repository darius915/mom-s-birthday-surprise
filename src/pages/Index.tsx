import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import SurpriseReveal from "@/components/SurpriseReveal";
import FloatingDecorations from "@/components/FloatingDecorations";
import GalleryView from "@/components/GalleryView"; // ← updated alias import

type Screen =
  | "welcome"
  | "q1-feeling"
  | "reassurance-text"
  | "reassurance-gallery"
  | "q2-feeling"
  | "final-closure"
  | "surprise";

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [feelingBefore, setFeelingBefore] = useState<string | null>(null);
  const [feelingAfter, setFeelingAfter] = useState<string | null>(null);

  const feelingOptions = ["Good 😊", "Neutral 🤔", "A bit worried 😟"];

  const handleStart = () => {
    setCurrentScreen("q1-feeling");
  };

  const handleAnswerQ1 = (option: string) => {
    setFeelingBefore(option);
    setTimeout(() => {
      setCurrentScreen("reassurance-text");
    }, 600);
  };

  const handleAnswerQ2 = (option: string) => {
    setFeelingAfter(option);
    setTimeout(() => {
      setCurrentScreen("final-closure");
    }, 800);
  };

  const handleFinalYes = () => {
    setTimeout(() => {
      setCurrentScreen("surprise");
    }, 600);
  };

  const handleRestart = () => {
    setCurrentScreen("welcome");
    setFeelingBefore(null);
    setFeelingAfter(null);
  };

  const getReassuranceContent = () => {
    if (feelingBefore === "Good 😊") {
      return {
        title: "That makes my heart so happy ❤️",
        subtitle: "Turning 60 isn’t just a number — it’s 60 years of strength, love, and impact.",
        body: "You’ve lived six decades of stories, sacrifices, laughter, and lessons — and every one of them made us who we are today.",
        showGalleryImmediately: true,
        nextButtonText: "Keep this feeling? How about now? ✨",
      };
    }

    if (feelingBefore === "Neutral 🤔") {
      return {
        title: "That’s okay.",
        subtitle: "Big milestones can feel… complicated 🤍",
        body: "There’s no right or wrong way to feel about turning 60.\n\nBut if we pause for a moment… 60 also means experience, wisdom, and a life that truly mattered.",
        showGalleryImmediately: false,
        galleryButtonText: "See some of those beautiful moments →",
        nextButtonText: "Feeling a little different now? 💭",
      };
    }

    return {
      title: "I understand 💛",
      subtitle: "Birthdays like this can bring a lot of thoughts and worries.",
      body: "About time, about the future, about change.\n\nBut Mum… nothing about who you are has faded. If anything, you’ve only grown stronger and more beautiful in ways that truly matter.\n\nAnd you’re not walking into this chapter alone — we’re right here with you.",
      showGalleryImmediately: false,
      galleryButtonText: "Look at these memories with me →",
      nextButtonText: "Mum… how do you feel now? We're here 💕",
    };
  };

  const content = getReassuranceContent();

  return (
    <div className="min-h-screen bg-muted relative overflow-hidden">
      <FloatingDecorations />

      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <motion.div key="welcome" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentScreen === "q1-feeling" && (
          <motion.div
            key="q1"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="min-h-screen flex items-center justify-center py-12 px-4"
          >
            <QuestionCard
              question="Mum, you’re turning 60 on January 25th… when you think about that right now, how does it feel in your heart?"
              options={feelingOptions}
              selectedOption={feelingBefore}
              onSelect={handleAnswerQ1}
              questionNumber={1}
              totalQuestions={3}
            />
          </motion.div>
        )}

        {currentScreen === "reassurance-text" && (
          <motion.div
            key="reassurance-text"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col items-center justify-center py-8 px-4 sm:px-6 text-center overflow-y-auto"
          >
            <motion.h1
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-4xl sm:text-5xl md:text-6xl font-bold text-primary mb-6"
            >
              {content.title}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl sm:text-2xl text-muted-foreground mb-6 leading-relaxed whitespace-pre-line"
            >
              {content.subtitle}
            </motion.p>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground mb-12 leading-relaxed whitespace-pre-line max-w-2xl"
            >
              {content.body}
            </motion.p>

            <motion.button
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentScreen("reassurance-gallery")}
              className={`${
                content.showGalleryImmediately
                  ? "bg-primary text-primary-foreground"
                  : "bg-accent/10 border-2 border-accent text-accent hover:bg-accent/20"
              } text-xl font-medium py-5 px-12 rounded-full shadow-md transition-all`}
            >
              {content.showGalleryImmediately ? content.nextButtonText : content.galleryButtonText}
            </motion.button>
          </motion.div>
        )}

        {currentScreen === "reassurance-gallery" && (
          <GalleryView onComplete={() => setCurrentScreen("q2-feeling")} />
        )}

        {currentScreen === "q2-feeling" && (
          <motion.div
            key="q2"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="min-h-screen flex items-center justify-center py-12 px-4"
          >
            <QuestionCard
              question="After remembering those moments… how does turning 60 feel in your heart now?"
              options={feelingOptions}
              selectedOption={feelingAfter}
              onSelect={handleAnswerQ2}
              questionNumber={2}
              totalQuestions={3}
            />
          </motion.div>
        )}

        {currentScreen === "final-closure" && (
          <motion.div
            key="final"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex items-center justify-center py-12 px-4"
          >
            <QuestionCard
              question="Before we go on… can I remind you of one more thing?"
              options={["Yes 💕"]}
              selectedOption={null}
              onSelect={handleFinalYes}
              questionNumber={3}
              totalQuestions={3}
            />
          </motion.div>
        )}

        {currentScreen === "surprise" && (
          <motion.div key="surprise" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <SurpriseReveal
              onRestart={handleRestart}
              feelingBefore={feelingBefore}
              feelingAfter={feelingAfter}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;