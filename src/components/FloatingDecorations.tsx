import { motion } from "framer-motion";

const FloatingDecorations = () => {
  const decorations = [
    { emoji: "🎈", size: "text-3xl", top: "10%", left: "5%", delay: 0 },
    { emoji: "✨", size: "text-2xl", top: "20%", right: "10%", delay: 0.5 },
    { emoji: "🎂", size: "text-3xl", bottom: "15%", left: "8%", delay: 1 },
    { emoji: "🎁", size: "text-2xl", top: "40%", right: "5%", delay: 1.5 },
    { emoji: "💝", size: "text-xl", bottom: "30%", right: "12%", delay: 2 },
    { emoji: "🎉", size: "text-2xl", top: "60%", left: "3%", delay: 0.8 },
    { emoji: "⭐", size: "text-xl", bottom: "40%", left: "15%", delay: 1.2 },
    { emoji: "🌸", size: "text-2xl", top: "75%", right: "8%", delay: 0.3 },
  ];

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {decorations.map((decoration, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.6, scale: 1 }}
          transition={{ delay: decoration.delay, duration: 0.5 }}
          className={`absolute ${decoration.size}`}
          style={{
            top: decoration.top,
            left: decoration.left,
            right: decoration.right,
            bottom: decoration.bottom,
          }}
        >
          <motion.span
            animate={{
              y: [0, -15, 0],
              rotate: [0, 5, -5, 0],
            }}
            transition={{
              duration: 4 + index * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="inline-block"
          >
            {decoration.emoji}
          </motion.span>
        </motion.div>
      ))}

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl" />
    </div>
  );
};

export default FloatingDecorations;
