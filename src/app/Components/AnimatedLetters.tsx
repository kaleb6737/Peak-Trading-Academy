// src/app/Components/AnimatedLetters.tsx

import React, { useEffect, useState } from "react";

interface AnimatedLettersProps {
  letterClass: string;
  strArray: string[];
  delay?: number;
}

const AnimatedLetters: React.FC<AnimatedLettersProps> = ({
  letterClass,
  strArray,
  delay = 50, // Default delay between letters
}) => {
  const [animatedClass, setAnimatedClass] = useState(Array(strArray.length).fill("opacity-0"));

  useEffect(() => {
    const timeoutIds: NodeJS.Timeout[] = [];
    
    strArray.forEach((_, i) => {
      const timeoutId = setTimeout(() => {
        setAnimatedClass((prev) =>
          prev.map((className, index) => (index <= i ? "opacity-100 transition-opacity duration-500 ease-in" : className))
        );
      }, i * delay);
      timeoutIds.push(timeoutId);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [strArray, delay]);

  return (
    <span className="inline-flex space-x-1">
      {strArray.map((char, i) => (
        <span key={i} className={`${letterClass} ${animatedClass[i]}`}>
          {char}
        </span>
      ))}
    </span>
  );
};

export default AnimatedLetters;
