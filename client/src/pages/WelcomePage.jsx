import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";

const WelcomePage = () => {
  const emojis = ["🛍️", "✨", "🔥", "💙", "🎉"];
  const [emojiIndex, setEmojiIndex] = useState(0);

  const cycleEmoji = () => {
    setEmojiIndex((prev) => (prev + 1) % emojis.length);
  };

  return (
    <main className="container">
      <motion.section
        className="welcome-card vibe"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.45 }}
      >
        <span className="welcome-badge">New Season Drop</span>
        <h1>Welcome to ShopX</h1>
        <motion.button
          type="button"
          className="emoji-switcher"
          whileHover={{ scale: 1.08, rotate: 3 }}
          whileTap={{ scale: 0.94 }}
          onMouseEnter={cycleEmoji}
          onClick={cycleEmoji}
          aria-label="Change vibe emoji"
        >
          {emojis[emojiIndex]}
        </motion.button>
        <h3 className="shopping-statement">
          Cart it. Love it. Repeat. <span>{emojis[emojiIndex]}</span>
        </h3>
        <p>New here? Register. Already with us? Login.</p>

        <div className="welcome-actions">
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link to="/register" className="btn">Create Account</Link>
          </motion.div>
          <motion.div whileHover={{ y: -3 }} whileTap={{ scale: 0.97 }}>
            <Link to="/login" className="btn secondary">Login</Link>
          </motion.div>
        </div>

        <div className="welcome-points">
          <span>Flash deals</span>
          <span>Fast checkout</span>
          <span>Fresh arrivals</span>
        </div>
      </motion.section>
    </main>
  );
};

export default WelcomePage;
