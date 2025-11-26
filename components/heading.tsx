"use client";
import demoImg from "../assets/HomeBanner.png";
import { motion, Variants } from "framer-motion";

function HeroSection() {
  // Animation variants with proper TypeScript types
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="pt-4 sm:pt-8 md:pt-12 sm:px-8 md:px-12 text-center bg-white relative overflow-hidden min-h-screen">
      <div className="sm:max-w-6xl mx-auto max-w-full relative z-10">
        {/* ✅ "Not backed by Y Combinator" badge with real logo */}
        <motion.div 
          className="inline-flex items-center gap-2 px-[10px] py-1 bg-white text-gray-700 rounded-full border border-gray-200 mb-6 cursor-default"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="text-sm font-medium">Not backed by</span>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Y_Combinator_logo.svg/1200px-Y_Combinator_logo.svg.png"
            alt="Y Combinator Logo"
            className="w-5 h-5 rounded-sm"
          />
        </motion.div>

        {/* Title */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.h1 
            className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold mb-6 text-gray-900 tracking-tight leading-tight"
            variants={itemVariants}
          >
            The Only{" "}
            <motion.span 
              className="inline-block bg-green-200 text-green-800 font-semibold px-3 py-1 sm:px-4 sm:py-1 rounded-lg rotate-3 mx-1 sm:mx-2"
              whileHover={{ 
                scale: 1.1,
                rotate: 3,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              }}
            >
              Chatbot
            </motion.span>{" "}
            That Loads{" "}
            <motion.span 
              className="inline-block bg-blue-200 text-blue-800 font-semibold px-3 py-1 sm:px-4 sm:py-1 rounded-lg -rotate-2 mx-1 sm:mx-2"
             whileHover={{ 
                scale: 1.1,
                rotate: -3,
              }}
              transition={{ 
                type: "spring", 
                stiffness: 400, 
                damping: 10 
              }}
            >
              Slower
            </motion.span>{" "}
            Than Other Chatbot
          </motion.h1>

          {/* Subtitle */}
          <motion.p 
            className="text-base sm:text-lg md:text-xl mb-8 sm:mb-10 max-w-2xl mx-auto text-gray-600"
            variants={itemVariants}
          >
            AskPDF doesn't promise speed. It promises existence.
            <br className="hidden sm:block" />
            Barely alive, but proudly online.
          </motion.p>

          {/* Buttons */}
          <motion.div 
            className="flex justify-center gap-3 sm:gap-4"
            variants={itemVariants}
          >
            <motion.button 
              className="bg-[#3a00a5] hover:bg-[#2d0080] text-white px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-base sm:text-lg font-medium transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
            <motion.button 
              className="bg-transparent border border-gray-300 hover:border-gray-400 text-gray-700 px-6 sm:px-8 py-3 sm:py-3.5 rounded-lg text-base sm:text-lg font-medium transition-all cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Learn More
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Demo Image with Blob Effects - No animation on image */}
        <div className="relative mt-12 mx-auto max-w-full">
          {/* Green Blob */}
          <motion.div 
            className="absolute -left-20 -top-20 sm:-left-40 sm:-top-20 w-80 h-80 sm:w-[50rem] sm:h-[50rem] bg-green-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-left"
            animate={{
              scale: [1, 1.1, 1],
              opacity: [0.7, 0.8, 0.7],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Blue Blob */}
          <motion.div 
            className="absolute -right-10 -bottom-30 sm:-right-30 sm:-bottom-30 w-96 h-96 sm:w-[50rem] sm:h-[50rem] bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob-right"
            animate={{
              scale: [1.1, 1, 1.1],
              opacity: [0.7, 0.6, 0.7],
            }}
            transition={{
              duration: 6,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />

          {/* Demo image without any animation */}
          <img
            src={demoImg.src}
            alt="Demo"
            className="relative w-full rounded-lg shadow-lg border border-gray-200"
          />
        </div>
      </div>
    </section>
  );
}

export default HeroSection;