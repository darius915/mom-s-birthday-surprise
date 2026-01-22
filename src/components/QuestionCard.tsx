import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface QuestionCardProps {
  question: string;
  options: string[];
  selectedOption: string | null;
  onSelect: (option: string) => void;
  questionNumber: number;
  totalQuestions: number;
}

const QuestionCard = ({
  question,
  options,
  selectedOption,
  onSelect,
  questionNumber,
  totalQuestions,
}: QuestionCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.4 }}
      className="w-full max-w-3xl mx-auto px-4 sm:px-6"
    >
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground font-body">
            Question {questionNumber} of {totalQuestions}
          </span>
          <span className="text-sm font-medium text-accent">
            {Math.round((questionNumber / totalQuestions) * 100)}%
          </span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: `${((questionNumber - 1) / totalQuestions) * 100}%` }}
            animate={{ width: `${(questionNumber / totalQuestions) * 100}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="h-full bg-accent rounded-full"
          />
        </div>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="font-display text-3xl sm:text-4xl md:text-5xl font-semibold text-foreground mb-10 text-center leading-tight"
      >
        {question}
      </motion.h2>

      <div className="space-y-5">
        {options.map((option, index) => (
          <motion.button
            key={option}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.12 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(option)}
            className={`w-full min-h-[80px] p-6 rounded-2xl border-2 text-left transition-all duration-300 flex items-center justify-between group text-lg sm:text-xl ${
              selectedOption === option
                ? "border-accent bg-accent/10 shadow-lg"
                : "border-muted bg-card hover:border-accent/30 hover:bg-accent/5"
            }`}
          >
            <span className="font-medium text-foreground">{option}</span>
            <div
              className={`w-8 h-8 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
                selectedOption === option
                  ? "border-accent bg-accent"
                  : "border-muted-foreground/40 group-hover:border-accent/60"
              }`}
            >
              {selectedOption === option && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  <Check className="w-5 h-5 text-primary-foreground" />
                </motion.div>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default QuestionCard;