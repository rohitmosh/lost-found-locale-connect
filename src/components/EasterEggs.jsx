import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Star, Sparkles, Coffee, Music, Zap, Gift, Crown, Rocket } from 'lucide-react';

// Konami Code Easter Egg
export const KonamiCode = ({ onActivate }) => {
  const [sequence, setSequence] = useState([]);
  const konamiCode = [
    'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
    'KeyB', 'KeyA'
  ];

  useEffect(() => {
    const handleKeyPress = (event) => {
      const newSequence = [...sequence, event.code].slice(-konamiCode.length);
      setSequence(newSequence);

      if (newSequence.join(',') === konamiCode.join(',')) {
        onActivate();
        setSequence([]);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [sequence, onActivate]);

  return null;
};

// Click Counter Easter Egg
export const ClickCounter = ({ children, threshold = 10, onThresholdReached }) => {
  const [clicks, setClicks] = useState(0);
  const [showCounter, setShowCounter] = useState(false);

  const handleClick = () => {
    const newClicks = clicks + 1;
    setClicks(newClicks);
    setShowCounter(true);

    if (newClicks >= threshold) {
      onThresholdReached();
      setClicks(0);
    }

    setTimeout(() => setShowCounter(false), 2000);
  };

  return (
    <div onClick={handleClick} className="relative">
      {children}
      <AnimatePresence>
        {showCounter && (
          <motion.div
            initial={{ opacity: 0, scale: 0, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: -20 }}
            className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-purple-600 text-white px-2 py-1 rounded-full text-xs font-bold z-50"
          >
            {clicks}/{threshold}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Floating Hearts Animation
export const FloatingHearts = ({ isActive, duration = 3000 }) => {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    if (isActive) {
      const heartCount = 15;
      const newHearts = Array.from({ length: heartCount }, (_, i) => ({
        id: i,
        x: Math.random() * window.innerWidth,
        delay: Math.random() * 2,
        size: Math.random() * 20 + 15,
        color: ['text-red-500', 'text-pink-500', 'text-purple-500', 'text-indigo-500'][Math.floor(Math.random() * 4)]
      }));
      
      setHearts(newHearts);
      
      setTimeout(() => setHearts([]), duration);
    }
  }, [isActive, duration]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      <AnimatePresence>
        {hearts.map((heart) => (
          <motion.div
            key={heart.id}
            initial={{ 
              x: heart.x, 
              y: window.innerHeight + 50,
              opacity: 0,
              scale: 0
            }}
            animate={{ 
              y: -50, 
              opacity: [0, 1, 1, 0],
              scale: [0, 1, 1, 0],
              rotate: [0, 360]
            }}
            transition={{ 
              duration: 3, 
              delay: heart.delay,
              ease: "easeOut"
            }}
            className={`absolute ${heart.color}`}
            style={{ fontSize: heart.size }}
          >
            <Heart className="fill-current" />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

// Secret Developer Mode
export const DeveloperMode = ({ isActive }) => {
  if (!isActive) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-4 left-4 bg-black/90 text-green-400 p-4 rounded-lg font-mono text-sm z-50 max-w-xs"
    >
      <div className="flex items-center mb-2">
        <Crown className="w-4 h-4 mr-2 text-yellow-400" />
        <span className="text-yellow-400 font-bold">DEVELOPER MODE</span>
      </div>
      <div className="space-y-1 text-xs">
        <div>🚀 Built with React + Vite</div>
        <div>💜 Styled with Tailwind CSS</div>
        <div>✨ Animated with Framer Motion</div>
        <div>🗄️ Powered by Supabase</div>
        <div>🎨 Made with ❤️ by FindIt Team</div>
      </div>
    </motion.div>
  );
};

// Time-based Greetings
export const TimeBasedGreeting = ({ userName = "Friend" }) => {
  const [greeting, setGreeting] = useState("");
  const [emoji, setEmoji] = useState("");

  useEffect(() => {
    const hour = new Date().getHours();
    
    if (hour < 6) {
      setGreeting("Working late");
      setEmoji("🌙");
    } else if (hour < 12) {
      setGreeting("Good morning");
      setEmoji("🌅");
    } else if (hour < 17) {
      setGreeting("Good afternoon");
      setEmoji("☀️");
    } else if (hour < 21) {
      setGreeting("Good evening");
      setEmoji("🌆");
    } else {
      setGreeting("Good night");
      setEmoji("🌃");
    }
  }, []);

  return (
    <motion.span
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="inline-flex items-center"
    >
      <motion.span
        animate={{ rotate: [0, 10, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        className="mr-2"
      >
        {emoji}
      </motion.span>
      {greeting}, {userName}!
    </motion.span>
  );
};

// Random Motivational Messages
export const MotivationalMessage = ({ trigger }) => {
  const messages = [
    { text: "You're making a difference! 🌟", icon: Star },
    { text: "Keep up the great work! 💪", icon: Zap },
    { text: "You're awesome! ✨", icon: Sparkles },
    { text: "Community hero! 🦸‍♀️", icon: Heart },
    { text: "You rock! 🎸", icon: Music },
    { text: "Fantastic job! 🎉", icon: Gift },
    { text: "You're a star! ⭐", icon: Crown },
    { text: "Amazing work! 🚀", icon: Rocket }
  ];

  const [currentMessage, setCurrentMessage] = useState(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (trigger) {
      const randomMessage = messages[Math.floor(Math.random() * messages.length)];
      setCurrentMessage(randomMessage);
      setShow(true);
      
      setTimeout(() => setShow(false), 3000);
    }
  }, [trigger]);

  return (
    <AnimatePresence>
      {show && currentMessage && (
        <motion.div
          initial={{ opacity: 0, scale: 0, y: 50 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0, y: 50 }}
          className="fixed bottom-20 right-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-2xl shadow-2xl z-50 max-w-xs"
        >
          <div className="flex items-center space-x-2">
            <currentMessage.icon className="w-5 h-5" />
            <span className="font-medium">{currentMessage.text}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// Coffee Break Reminder
export const CoffeeBreakReminder = () => {
  const [showReminder, setShowReminder] = useState(false);

  useEffect(() => {
    // Show reminder every 30 minutes
    const interval = setInterval(() => {
      setShowReminder(true);
      setTimeout(() => setShowReminder(false), 5000);
    }, 30 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {showReminder && (
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 300 }}
          className="fixed top-20 right-4 bg-amber-100 dark:bg-amber-900/30 border border-amber-300 dark:border-amber-700 p-4 rounded-2xl shadow-lg z-50 max-w-xs"
        >
          <div className="flex items-center space-x-3">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <Coffee className="w-6 h-6 text-amber-600 dark:text-amber-400" />
            </motion.div>
            <div>
              <h4 className="font-semibold text-amber-800 dark:text-amber-200">Time for a break!</h4>
              <p className="text-sm text-amber-600 dark:text-amber-300">Grab some coffee ☕</p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default {
  KonamiCode,
  ClickCounter,
  FloatingHearts,
  DeveloperMode,
  TimeBasedGreeting,
  MotivationalMessage,
  CoffeeBreakReminder
};
