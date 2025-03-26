import React, { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaDotCircle } from "react-icons/fa";

interface SlidingImgProps {
  slides: string[];
}

const SlidingImg: React.FC<SlidingImgProps> = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? "100%" : "-100%",
      opacity: 1,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? "-100%" : "100%",
      opacity: 1,
      transition: { duration: 0.5 },
    }),
  };

  const cooldownRef = useRef<boolean>(false);


  

  const goToPrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const goToNext = useCallback(() => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  }, [slides.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!cooldownRef.current) {
        cooldownRef.current = true;
        goToNext(); // ✅ Correct usage (not calling it in dependencies)
  
        setTimeout(() => {
          cooldownRef.current = false;
        }, 2500);
      }
    }, 2500);
  
    return () => clearInterval(interval);
  }, [goToNext]); // ✅ Dependency should be the function reference, not a call

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/*<FaArrowAltCircleLeft
        className="absolute top-1/2 left-5 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
        onClick={goToPrevious}
      />

      <FaArrowAltCircleRight
        className="absolute top-1/2 right-5 transform -translate-y-1/2 text-white text-3xl cursor-pointer z-10"
        onClick={goToNext}
      />*/}
      
      <div className="relative w-full h-full">
        <AnimatePresence custom={direction} mode="sync">
          <motion.div
            key={currentIndex}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            className="absolute w-[100%] h-[100vh] bg-cover bg-center object-contain"
            style={{ backgroundImage: `url(${slides[currentIndex]})`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}
          />
        </AnimatePresence>
      </div>

      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <FaDotCircle
            key={index}
            onClick={() => {
              setDirection(index > currentIndex ? 1 : -1);
              setCurrentIndex(index);
            }}
            className={`cursor-pointer text-lg ${
              index === currentIndex ? "text-white" : "text-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default SlidingImg;
