"use client";

import DownGraph from "@/assets/downGraph.png";
import UploadIcon from "@/assets/upLoadPdf.png";
import { motion, Variants } from "framer-motion";

function OtherStuff() {
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
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const imageVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.7,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-[#f9fafb] py-20 sm:py-28">
      {/* 💬 WHY SLOW SECTION */}
      <motion.div 
        className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* LEFT: Text */}
        <motion.div 
          className="flex-1 text-left"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white border border-gray-200 text-sm font-medium text-gray-700 mb-5 shadow-sm">
            <span>🧠 AskPDF Insight</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Why It's{" "}
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
              proudly
            </motion.span>{" "}
            Slow
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            No complex tech stack, no over-engineering — just one developer and
            one painfully free API that occasionally takes coffee breaks.
          </p>
        </motion.div>

        {/* RIGHT: Image */}
        <motion.div 
          className="flex-1 relative"
          variants={imageVariants}
        >
          <div className="absolute -right-8 -bottom-8 w-24 h-24 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>

          <motion.div 
            className="relative bg-white rounded-2xl shadow-xl p-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={DownGraph.src}
              alt="Performance Graph"
              className="w-full rounded-xl border border-gray-100"
            />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* How It Works Heading */}
      <motion.h1 
        className="text-3xl sm:text-8xl font-extrabold text-gray-900 mb-8 text-center mt-20"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        How It Works
      </motion.h1>

      {/* 🪄 STEP 1 - Upload PDF */}
      <motion.div 
        className="mt-20 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* LEFT: Image */}
        <motion.div 
          className="flex-1 relative"
          variants={imageVariants}
        >
          <div className="absolute -right-8 -bottom-8 w-24 h-24 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>

          <motion.div 
            className="relative bg-white rounded-2xl shadow-xl p-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={UploadIcon.src}
              alt="Upload PDF"
              className="w-full rounded-xl border border-gray-100"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT: Text */}
        <motion.div 
          className="flex-1 text-left order-1 md:order-2"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-sm font-medium text-blue-700 mb-5">
            <span>Step 1</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Start With{" "}
            <motion.span 
              className="inline-block bg-green-200 text-green-800 font-semibold px-3 py-1 sm:px-4 sm:py-1 rounded-lg rotate-2 mx-1"
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
              Uploading
            </motion.span>{" "}
            Your File
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Simply drag, drop, or click "Browse Files." That's it. No OAuth,
            no sign-in, no unnecessary buttons that make you feel techy.
          </p>
        </motion.div>
      </motion.div>

      {/* ⏳ STEP 2 - Wait Patiently */}
      <motion.div 
        className="mt-20 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row-reverse items-center justify-between gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* RIGHT: Image */}
        <motion.div 
          className="flex-1 relative"
          variants={imageVariants}
        >
          <div className="absolute -left-8 -bottom-8 w-24 h-24 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>
          <div className="absolute -top-6 -right-6 w-16 h-16 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>

          <motion.div 
            className="relative bg-white rounded-2xl shadow-xl p-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={DownGraph.src}
              alt="Processing PDF"
              className="w-full rounded-xl border border-gray-100"
            />
          </motion.div>
        </motion.div>

        {/* LEFT: Text */}
        <motion.div 
          className="flex-1 text-left"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-50 border border-purple-100 text-sm font-medium text-purple-700 mb-5">
            <span>Step 2</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Then{" "}
            <motion.span 
              className="inline-block bg-yellow-200 text-yellow-800 font-semibold px-3 py-1 sm:px-4 sm:py-1 rounded-lg -rotate-1 mx-1"
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
              Wait
            </motion.span>{" "}
            Patiently
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Our servers are powered by pure hope and unpaid APIs. Grab a coffee,
            take a walk, maybe finish a Netflix episode while it processes.
          </p>
        </motion.div>
      </motion.div>

      {/* 🤯 STEP 3 - Ask Questions */}
      <motion.div 
        className="mt-20 max-w-6xl mx-auto px-6 sm:px-8 md:px-12 flex flex-col md:flex-row items-center justify-between gap-12"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={containerVariants}
      >
        {/* LEFT: Image */}
        <motion.div 
          className="flex-1 relative"
          variants={imageVariants}
        >
          <div className="absolute -right-8 -bottom-8 w-24 h-24 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>
          <div className="absolute -top-6 -left-6 w-16 h-16 border-2 border-dotted border-gray-300 rounded-lg opacity-50"></div>

          <motion.div 
            className="relative bg-white rounded-2xl shadow-xl p-4"
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <img
              src={DownGraph.src}
              alt="Ask PDF"
              className="w-full rounded-xl border border-gray-100"
            />
          </motion.div>
        </motion.div>

        {/* RIGHT: Text */}
        <motion.div 
          className="flex-1 text-left order-1 md:order-2"
          variants={itemVariants}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-pink-50 border border-pink-100 text-sm font-medium text-pink-700 mb-5">
            <span>Step 3</span>
          </div>

          <h2 className="text-4xl sm:text-5xl font-extrabold text-gray-900 mb-6 leading-tight">
            Finally{" "}
            <motion.span 
              className="inline-block bg-blue-200 text-blue-800 font-semibold px-3 py-1 sm:px-4 sm:py-1 rounded-lg rotate-2 mx-1"
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
              Ask
            </motion.span>{" "}
            About Anything
          </h2>

          <p className="text-gray-600 text-lg mb-8 max-w-lg">
            Type your question and watch as AskPDF heroically tries to
            understand it — slowly but surely. Like your friend who responds
            to texts... eventually.
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default OtherStuff;