// PremiumLoadingExperience.tsx
'use client';

import React, { useState, useEffect, useRef } from 'react';
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
} from 'framer-motion';

interface PremiumLoadingExperienceProps {
  onLoadComplete?: () => void;
  loadingTime?: number;
  accentColor?: string;
}

const PremiumLoadingExperience: React.FC<PremiumLoadingExperienceProps> = ({
  onLoadComplete,
  loadingTime = 1000,
  accentColor = '#ec5e95',
}) => {
  const [progress, setProgress] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [cursorVariant, setCursorVariant] = useState('default');

  // Create a progress motion value
  const progressMotion = useMotionValue(0);

  // For mouse follow effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // For parallax effect
  const rotateX = useTransform(y, [-300, 300], [10, -10]);
  const rotateY = useTransform(x, [-300, 300], [-10, 10]);

  // For dynamic color effect based on progress
  const progressColor = useTransform(
    progressMotion,
    [0, 25, 50, 75, 100],
    [accentColor, '#36e2ec', '#ff6e6e', '#ffcf4d', '#ec5e95'],
  );

  // Update the motion value when progress changes
  useEffect(() => {
    progressMotion.set(progress);
  }, [progress, progressMotion]);

  useEffect(() => {
    // Handle mouse movement for cursor and parallax
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;

      if (containerRef.current) {
        const { left, top, width, height } =
          containerRef.current.getBoundingClientRect();
        const centerX = left + width / 2;
        const centerY = top + height / 2;

        // For parallax effect
        x.set(clientX - centerX);
        y.set(clientY - centerY);

        // For custom cursor
        setMousePosition({ x: clientX, y: clientY });
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [x, y]);

  useEffect(() => {
    // Progress animation
    const interval = 16; // ~60fps
    const increment = (interval / loadingTime) * 100;
    let currentProgress = 0;

    const timer = setInterval(() => {
      currentProgress += increment;

      if (currentProgress >= 100) {
        clearInterval(timer);
        setProgress(100);

        setTimeout(() => {
          setIsComplete(true);
          if (onLoadComplete) {
            onLoadComplete();
          }
        }, 1000);
      } else {
        setProgress(currentProgress);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [loadingTime, onLoadComplete]);

  // Format progress for display
  const displayProgress = Math.floor(progress);

  // Loading message based on progress
  const getLoadingMessage = () => {
    if (progress < 25) return 'Initializing Experience';
    if (progress < 50) return 'Building Visuals';
    if (progress < 75) return 'Optimizing Interface';
    if (progress < 95) return 'Almost Ready';
    return 'Launching Experience';
  };

  // Dynamic shapes for the background
  const shapes = Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: Math.random() * 100 + 50,
    x: Math.random() * 100,
    y: Math.random() * 100,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 5,
  }));

  // Get current color value for elements that can't use motion values directly
  const [currentColor, setCurrentColor] = useState(accentColor);

  useEffect(() => {
    // Subscribe to color changes
    const unsubscribe = progressColor.onChange((latest) => {
      setCurrentColor(latest);
    });

    return () => unsubscribe();
  }, [progressColor]);

  return (
    <div className="h-screen bg-gray-950">
      <AnimatePresence>
        {!isComplete && (
          <motion.div
            className="fixed inset-0 bg-black overflow-hidden z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{
              opacity: 0,
              transition: { duration: 1, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            {/* Custom Cursor */}
            <motion.div
              ref={cursorRef}
              className="fixed w-12 h-12 rounded-full pointer-events-none z-50 mix-blend-difference"
              style={{
                left: mousePosition.x - 24,
                top: mousePosition.y - 24,
                backgroundColor: currentColor,
                boxShadow: `0 0 20px 5px ${currentColor}`,
              }}
              animate={{
                scale: cursorVariant === 'hover' ? 1.5 : 1,
              }}
              transition={{ type: 'spring', stiffness: 500, damping: 28 }}
            />
            {/* Animated Background Shapes */}
            <div className="absolute inset-0 overflow-hidden opacity-20">
              {shapes.map((shape) => (
                <motion.div
                  key={shape.id}
                  className="absolute rounded-full blur-3xl"
                  style={{
                    background: `radial-gradient(circle at center, ${accentColor}, transparent 70%)`,
                    width: shape.size,
                    height: shape.size,
                    x: `${shape.x}vw`,
                    y: `${shape.y}vh`,
                  }}
                  animate={{
                    x: [
                      `${shape.x}vw`,
                      `${(shape.x + 20) % 100}vw`,
                      `${shape.x}vw`,
                    ],
                    y: [
                      `${shape.y}vh`,
                      `${(shape.y + 20) % 100}vh`,
                      `${shape.y}vh`,
                    ],
                    scale: [1, 1.2, 1],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: shape.duration,
                    ease: 'easeInOut',
                    delay: shape.delay,
                  }}
                />
              ))}
            </div>
            {/* Main 3D Container with Parallax Effect */}
            <motion.div
              ref={containerRef}
              className="flex items-center justify-center h-screen w-full"
              style={{
                perspective: 1000,
              }}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
            >
              <motion.div
                className="relative flex flex-col items-center justify-center w-full max-w-2xl p-12"
                style={{
                  rotateX,
                  rotateY,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Top Floating Element */}
                <motion.div
                  className="absolute -top-10 left-1/4 w-40 h-40 rounded-full opacity-30 blur-xl"
                  style={{ backgroundColor: currentColor }}
                  animate={{
                    y: [0, -20, 0],
                    x: [0, 10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 8,
                    ease: 'easeInOut',
                  }}
                />
                {/* Main Counter Display */}
                <motion.div
                  className="mb-12 relative z-10"
                  initial={{ y: 30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 1 }}
                >
                  <div className="text-center relative">
                    <motion.div
                      className="text-[150px] md:text-[180px] font-black leading-none tracking-tighter"
                      style={{
                        color: '#ffffff',
                        WebkitTextStroke: `2px ${currentColor}`,
                        textShadow: `0 0 15px ${currentColor}60`,
                      }}
                    >
                      {displayProgress}
                    </motion.div>
                    <motion.div
                      className="absolute -right-12 top-4 text-6xl font-bold"
                      style={{ color: currentColor }}
                      animate={{
                        opacity: [0.5, 1, 0.5],
                        scale: [0.95, 1, 0.95],
                      }}
                      transition={{
                        repeat: Infinity,
                        duration: 3,
                        ease: 'easeInOut',
                      }}
                    >
                      %
                    </motion.div>
                  </div>
                </motion.div>
                {/* Progressive Loading Bar */}
                <motion.div
                  className="w-full relative h-1 mb-8 overflow-hidden backdrop-blur-sm"
                  style={{
                    backgroundColor: '#ffffff10',
                    borderRadius: '10px',
                    boxShadow: '0 0 10px 1px rgba(0,0,0,0.2)',
                  }}
                  initial={{ opacity: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  <motion.div
                    className="absolute top-0 left-0 h-full rounded-full"
                    style={{ backgroundColor: currentColor }}
                    initial={{ width: '0%' }}
                    animate={{ width: `${progress}%` }}
                    transition={{ ease: 'easeInOut' }}
                  />
                  {/* Loading Bar Glow Effect */}
                  <motion.div
                    className="absolute top-0 left-0 w-20 h-full"
                    style={{
                      background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)`,
                      transform: `translateX(${progress}%)`,
                    }}
                    animate={{
                      opacity: [0, 1, 0],
                    }}
                    transition={{
                      repeat: Infinity,
                      duration: 1.5,
                      ease: 'easeInOut',
                    }}
                  />
                </motion.div>
                {/* Dynamic Loading Message */}
                <motion.div
                  className="h-10 text-sm md:text-base text-center"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <motion.p
                    key={getLoadingMessage()}
                    className="uppercase tracking-widest font-light"
                    style={{ color: currentColor }}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    {getLoadingMessage()}
                  </motion.p>
                </motion.div>
                {/* Decorative Lines */}
                <div className="absolute -z-10 inset-0">
                  <motion.div
                    className="absolute top-0 left-0 w-full h-px"
                    style={{ backgroundColor: currentColor, opacity: 0.2 }}
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      scaleX: [0.8, 1, 0.8],
                    }}
                    transition={{ repeat: Infinity, duration: 5 }}
                  />
                  <motion.div
                    className="absolute bottom-0 left-0 w-full h-px"
                    style={{ backgroundColor: currentColor, opacity: 0.2 }}
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      scaleX: [0.8, 1, 0.8],
                    }}
                    transition={{ repeat: Infinity, duration: 5, delay: 1.5 }}
                  />
                  <motion.div
                    className="absolute top-0 left-0 h-full w-px"
                    style={{ backgroundColor: currentColor, opacity: 0.2 }}
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      scaleY: [0.8, 1, 0.8],
                    }}
                    transition={{ repeat: Infinity, duration: 5, delay: 0.5 }}
                  />
                  <motion.div
                    className="absolute top-0 right-0 h-full w-px"
                    style={{ backgroundColor: currentColor, opacity: 0.2 }}
                    animate={{
                      opacity: [0.1, 0.4, 0.1],
                      scaleY: [0.8, 1, 0.8],
                    }}
                    transition={{ repeat: Infinity, duration: 5, delay: 2 }}
                  />
                </div>
                {/* Bottom Decorative Element */}
                <motion.div
                  className="absolute -bottom-20 right-1/4 w-32 h-32 rounded-full opacity-30 blur-xl"
                  style={{ backgroundColor: currentColor }}
                  animate={{
                    y: [0, 20, 0],
                    x: [0, -10, 0],
                  }}
                  transition={{
                    repeat: Infinity,
                    duration: 10,
                    ease: 'easeInOut',
                  }}
                />
              </motion.div>
            </motion.div>
            {/* Bottom Info Text */}
            <motion.div
              className="absolute bottom-6 left-0 right-0 text-center text-xs text-white opacity-50 tracking-widest uppercase font-light"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 0.5, y: 0 }}
              transition={{ delay: 1, duration: 1 }}
            >
              Press Escape to Skip · {new Date().getFullYear()}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumLoadingExperience;
