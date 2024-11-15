import React from "react";
import { motion } from "framer-motion";

const TypingWithCursor = ({text}:{text:string}) => {
  const sentence = text;
  
  const typingEffect = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: {
        delay: 0.5,
        staggerChildren: 0.05,
      },
    },
  };

  const letterEffect = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        fontFamily: "monospace",
        fontSize: "1.5rem",
      }}
    >
      <motion.div
        initial="hidden"
        animate="visible"
        variants={typingEffect}
        style={{ whiteSpace: "pre-wrap" }}
      >
        {sentence.split("").map((char, index) => (
          <motion.span key={index} variants={letterEffect}>
            {char}
          </motion.span>
        ))}
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: [1, 0, 1] }}
        transition={{
          repeat: Infinity,
          duration: 0.5,
          delay: 0.5 + (sentence.length * 0.05),
        }}
        style={{ fontSize: "1.5rem", marginLeft: "5px" }}
      >
        |
      </motion.div>
    </div>
  );
};

export default TypingWithCursor;
