import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Gift, Cake, Star, PartyPopper } from "lucide-react";

interface SurpriseRevealProps {
  onRestart: () => void;
}

const SurpriseReveal = ({ onRestart }: SurpriseRevealProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    // Fire confetti on mount
    const duration = 3000;
    const end = Date.now() + duration;

    const colors = ["#db7093", "#daa520", "#ff6b6b", "#ffd700", "#ff69b4"];

    const frame = () => {
      confetti({
        particleCount: 3,
        angle: 60,
        spread: 55,
        origin: { x: 0 },
        colors: colors,
      });
      confetti({
        particleCount: 3,
        angle: 120,
        spread: 55,
        origin: { x: 1 },
        colors: colors,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    // Show message after confetti starts
    const timer = setTimeout(() => setShowMessage(true), 500);
    return () => clearTimeout(timer);
  }, []);

  const floatingIcons = [
    { Icon: Heart, delay: 0, x: -100 },
    { Icon: Star, delay: 0.2, x: 100 },
    { Icon: Cake, delay: 0.4, x: -50 },
    { Icon: Gift, delay: 0.6, x: 80 },
    { Icon: PartyPopper, delay: 0.8, x: -80 },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-6 text-center relative overflow-hidden"
    >
      {/* Floating icons */}
      {floatingIcons.map(({ Icon, delay, x }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 100, x }}
          animate={{ opacity: 0.2, y: -100 }}
          transition={{
            duration: 3,
            delay,
            repeat: Infinity,
            repeatType: "loop",
          }}
          className="absolute text-primary"
          style={{ left: `${20 + index * 15}%`, top: "80%" }}
        >
          <Icon className="w-8 h-8" />
        </motion.div>
      ))}

      {/* Main celebration content */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
        className="mb-6"
      >
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-glow">
          <Gift className="w-12 h-12 text-primary-foreground" />
        </div>
      </motion.div>

      {showMessage && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-display text-5xl md:text-7xl font-bold celebration-text mb-6"
          >
            Surprise! 🎉
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="max-w-lg mb-8"
          >
            <p className="text-xl md:text-2xl text-muted-foreground font-body leading-relaxed">
              Happy Birthday, Mom! You mean the world to us. Your love, warmth, and
              endless support make every day brighter.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="bg-card rounded-3xl p-8 shadow-card border border-border max-w-md mb-10"
          >
            <div className="flex justify-center mb-4">
              {[...Array(5)].map((_, i) => (
                <motion.div
                  key={i}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{
                    duration: 0.6,
                    delay: 0.8 + i * 0.1,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                >
                  <Star className="w-6 h-6 text-accent fill-accent" />
                </motion.div>
              ))}
            </div>
            <p className="font-display text-2xl md:text-3xl text-foreground mb-2">
              Your Gift Awaits!
            </p>
            <p className="text-muted-foreground font-body">
              We've planned something special just for you. Check your messages for
              the full surprise! 💝
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="flex flex-col items-center gap-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                confetti({
                  particleCount: 100,
                  spread: 70,
                  origin: { y: 0.6 },
                  colors: ["#db7093", "#daa520", "#ff6b6b", "#ffd700"],
                });
              }}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-display text-lg font-medium shadow-soft hover:shadow-glow transition-all duration-300"
            >
              🎊 Celebrate More! 🎊
            </motion.button>

            <button
              onClick={onRestart}
              className="text-muted-foreground hover:text-foreground transition-colors font-body underline underline-offset-4"
            >
              Start Over
            </button>
          </motion.div>
        </>
      )}

      {/* Bottom decorative text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.5 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 text-sm text-muted-foreground font-body"
      >
        Made with 💖 just for you
      </motion.p>
    </motion.div>
  );
};

export default SurpriseReveal;
