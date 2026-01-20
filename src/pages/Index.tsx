import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import WelcomeScreen from "@/components/WelcomeScreen";
import QuestionCard from "@/components/QuestionCard";
import SurpriseReveal from "@/components/SurpriseReveal";
import FloatingDecorations from "@/components/FloatingDecorations";

type Screen = "welcome" | "questions" | "surprise";

interface Question {
  question: string;
  options: string[];
}

const questions: Question[] = [
  {
    question: "What's Mom's favorite thing to do on weekends?",
    options: ["Cooking delicious meals", "Relaxing with a good book", "Spending time with family", "Gardening in the backyard"],
  },
  {
    question: "What makes Mom smile the most?",
    options: ["A warm hug from loved ones", "Seeing her family happy", "Receiving heartfelt messages", "Quality time together"],
  },
  {
    question: "How would you describe Mom in one word?",
    options: ["Amazing", "Wonderful", "Irreplaceable", "Superhero"],
  },
  {
    question: "What does Mom deserve on her special day?",
    options: ["All the love in the world", "A day of pampering", "Endless appreciation", "All of the above! 💖"],
  },
];

const Index = () => {
  const [currentScreen, setCurrentScreen] = useState<Screen>("welcome");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);

  const handleStart = () => {
    setCurrentScreen("questions");
  };

  const handleSelectOption = (option: string) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestion] = option;
    setSelectedAnswers(newAnswers);

    // Auto-advance after a short delay
    setTimeout(() => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(currentQuestion + 1);
      } else {
        setCurrentScreen("surprise");
      }
    }, 500);
  };

  const handleRestart = () => {
    setCurrentScreen("welcome");
    setCurrentQuestion(0);
    setSelectedAnswers([]);
  };

  return (
    <div className="min-h-screen bg-background relative">
      <FloatingDecorations />
      
      <AnimatePresence mode="wait">
        {currentScreen === "welcome" && (
          <motion.div
            key="welcome"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <WelcomeScreen onStart={handleStart} />
          </motion.div>
        )}

        {currentScreen === "questions" && (
          <motion.div
            key={`question-${currentQuestion}`}
            className="min-h-screen flex items-center justify-center py-12"
          >
            <QuestionCard
              question={questions[currentQuestion].question}
              options={questions[currentQuestion].options}
              selectedOption={selectedAnswers[currentQuestion] || null}
              onSelect={handleSelectOption}
              questionNumber={currentQuestion + 1}
              totalQuestions={questions.length}
            />
          </motion.div>
        )}

        {currentScreen === "surprise" && (
          <motion.div
            key="surprise"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <SurpriseReveal onRestart={handleRestart} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Index;
