import { motion } from "framer-motion";
import { Heart, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStart: () => void;
}

const WelcomeScreen = ({ onStart }: WelcomeScreenProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center"
    >
      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        className="mb-8"
      >
        <div className="relative">
          <Sparkles className="w-16 h-16 text-accent floating" />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-4"
          >
            <div className="w-2 h-2 bg-accent rounded-full absolute top-0 left-1/2" />
            <div className="w-1.5 h-1.5 bg-primary rounded-full absolute bottom-0 right-0" />
            <div className="w-1 h-1 bg-gold rounded-full absolute top-1/2 left-0" />
          </motion.div>
        </div>
      </motion.div>

      {/* Main heading */}
      <motion.h1
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.6 }}
        className="font-display text-5xl md:text-7xl font-bold celebration-text mb-4"
      >
        Happy Birthday
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="mb-8"
      >
        <p className="text-xl md:text-2xl text-muted-foreground font-body">
          Dear Mom, we have something special for you!
        </p>
      </motion.div>

      {/* Decorative hearts */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
        className="flex gap-3 mb-8"
      >
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            animate={{ y: [0, -8, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              delay: i * 0.2,
              ease: "easeInOut",
            }}
          >
            <Heart
              className={`w-6 h-6 ${
                i === 1 ? "text-primary fill-primary" : "text-rose-light"
              }`}
              fill={i === 1 ? "currentColor" : "none"}
            />
          </motion.div>
        ))}
      </motion.div>

      {/* Start button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.9, type: "spring" }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={onStart}
        className="relative px-10 py-4 rounded-full bg-primary text-primary-foreground font-display text-lg font-medium shadow-soft hover:shadow-glow transition-all duration-300 overflow-hidden group"
      >
        <span className="relative z-10">Let's Begin ✨</span>
        <motion.div
          className="absolute inset-0 bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          initial={false}
        />
      </motion.button>

      {/* Bottom decoration */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.2 }}
        className="mt-16 text-sm text-muted-foreground"
      >
        Answer a few questions to unlock your surprise
      </motion.p>
    </motion.div>
  );
};

export default WelcomeScreen;
