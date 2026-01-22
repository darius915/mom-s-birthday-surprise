import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Heart, Gift, Cake, Star, PartyPopper } from "lucide-react";

interface SurpriseRevealProps {
  onRestart: () => void;
  feelingBefore: string | null;
  feelingAfter: string | null;
}

const SurpriseReveal = ({ onRestart, feelingBefore, feelingAfter }: SurpriseRevealProps) => {
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const duration = 5000;
    const end = Date.now() + duration;

    const colors = ["#03f7c4", "#e94b5f", "#fbbf24", "#40f9d4", "#ff69b4"];

    const frame = () => {
      confetti({ particleCount: 4, angle: 60, spread: 60, origin: { x: 0 }, colors });
      confetti({ particleCount: 4, angle: 120, spread: 60, origin: { x: 1 }, colors });
      if (Date.now() < end) requestAnimationFrame(frame);
    };

    frame();

    const timer = setTimeout(() => setShowMessage(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const floatingIcons = [
    { Icon: Heart, delay: 0, x: -120 },
    { Icon: Star, delay: 0.3, x: 120 },
    { Icon: Cake, delay: 0.6, x: -60 },
    { Icon: Gift, delay: 0.9, x: 90 },
    { Icon: PartyPopper, delay: 1.2, x: -90 },
  ];

  const getMainMessage = () => {
    if (feelingAfter?.includes("Good")) {
      return "See, Mum? 60 looks absolutely radiant on you! 🎂✨";
    }
    if (feelingAfter?.includes("Neutral") || feelingAfter?.includes("worried")) {
      return "It's okay to feel a little unsure — but look how far you've come, and how loved you are. 60 is your time to shine even brighter ❤️";
    }
    return "Happy 60th Birthday, Mum — you're more incredible with every year!";
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col items-center justify-center min-h-screen px-5 sm:px-8 text-center relative overflow-hidden"
    >
      {floatingIcons.map(({ Icon, delay, x }, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 120, x }}
          animate={{ opacity: 0.25, y: -120 }}
          transition={{ duration: 4, delay, repeat: Infinity, repeatType: "loop" }}
          className="absolute text-accent"
          style={{ left: `${15 + index * 18}%`, top: "75%" }}
        >
          <Icon className="w-10 h-10" />
        </motion.div>
      ))}

      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 180, delay: 0.4 }}
        className="mb-8"
      >
        <div className="w-28 h-28 rounded-full bg-primary flex items-center justify-center shadow-2xl">
          <Cake className="w-14 h-14 text-primary-foreground" />
        </div>
      </motion.div>

      {showMessage && (
        <>
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold text-primary mb-6 drop-shadow-lg"
          >
            Happy 60th Birthday, Mum! 🎂❤️
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-6 max-w-3xl"
          >
            {getMainMessage()}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="max-w-2xl mb-10 text-xl sm:text-2xl text-muted-foreground leading-relaxed font-body"
          >
            Every milestone you've reached has made you wiser, stronger, kinder, and even more beautiful inside and out.  
            January 25, 2026 isn't just a number — it's proof of a life full of love, laughter, and unbreakable spirit.  
            We are so proud to celebrate YOU today and every day.
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="bg-card rounded-3xl p-8 shadow-xl border border-muted max-w-lg mb-12"
          >
            <p className="text-3xl font-display font-bold text-primary mb-4">
              You deserve all the joy in the world
            </p>
            <p className="text-lg text-muted-foreground">
              Because a woman who has given so much love, raised a family with heart, and still lights up every room — deserves to feel celebrated, cherished, and fearless at 60 and beyond.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex flex-col items-center gap-6"
          >
            <motion.button
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                confetti({
                  particleCount: 150,
                  spread: 80,
                  origin: { y: 0.6 },
                  colors: ["#03f7c4", "#e94b5f", "#fbbf24", "#40f9d4"],
                });
              }}
              className="px-10 py-5 rounded-full bg-primary text-primary-foreground font-display text-xl font-semibold shadow-lg hover:shadow-glow transition-all"
            >
              🎈 More Love & Confetti! 🎈
            </motion.button>

            <button
              onClick={onRestart}
              className="text-muted-foreground hover:text-primary transition-colors font-medium underline underline-offset-4"
            >
              Play Again
            </button>
          </motion.div>
        </>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6 text-base text-muted-foreground font-body"
      >
        Forever your biggest fan — made with endless love 💕
      </motion.p>
    </motion.div>
  );
};

export default SurpriseReveal;