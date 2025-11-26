"use client";

import React from 'react';
import { motion } from 'framer-motion';

function Belt() {
  const brands = [
    { 
      name: "Amazon", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg" 
    },
    { 
      name: "Google", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg" 
    },
    {
      name: "Vercel",
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Vercel_logo_2025.svg"
    },
    { 
      name: "Disney", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/3/3e/Disney%2B_logo.svg" 
    },
    { 
      name: "Microsoft", 
      logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg" 
    },
    {
      name: "Meta",
      logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg"
    },
  ];

  // Calculate total width of one set of brands
  const singleSetWidth = brands.length * 160; // 160px per logo (120px logo + 40px margin)

  return (
    <div className="w-[60%] bg-[#ffffff] py-10 mx-auto overflow-hidden">
      {/* Title */}
      <motion.div 
        className="text-center text-xl sm:text-5xl font-semibold w-full mx-auto mb-10"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        IGNORED BY INDUSTRY LEADERS
      </motion.div>

      {/* Scrolling container */}
      <div className="overflow-hidden">
        <motion.div 
          className="flex"
          animate={{ 
            x: [0, -singleSetWidth] 
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 20,
              ease: "linear"
            }
          }}
          // whileHover={{
          //   animationPlayState: "paused"
          // }}
        >
          {/* First set of logos */}
          {brands.map((brand, index) => (
            <motion.div 
              key={`brand1-${index}`} 
              className="flex items-center justify-center flex-shrink-0 mx-8"
              // initial={{ opacity: 0, scale: 0.8 }}
              // whileInView={{ opacity: 1, scale: 1 }}
              // whileHover={{ 
              //   scale: 1.3,
              //   rotate: [0, -5, 5, 0],
              // }}
              transition={{ 
                opacity: { duration: 0.5, delay: index * 0.1 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.4 }
              }}
              viewport={{ once: true }}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-8 sm:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
              />
            </motion.div>
          ))}
          
          {/* Second set of logos for seamless loop */}
          {brands.map((brand, index) => (
            <motion.div 
              key={`brand2-${index}`} 
              className="flex items-center justify-center flex-shrink-0 mx-8"
              // initial={{ opacity: 0, scale: 0.8 }}
              // whileInView={{ opacity: 1, scale: 1 }}
              // whileHover={{ 
              //   scale: 1.3,
              //   rotate: [0, -5, 5, 0],
              // }}
              transition={{ 
                opacity: { duration: 0.5, delay: index * 0.1 },
                scale: { duration: 0.3 },
                rotate: { duration: 0.4 }
              }}
              viewport={{ once: true }}
            >
              <img 
                src={brand.logo} 
                alt={brand.name} 
                className="h-8 sm:h-12 object-contain grayscale hover:grayscale-0 transition-all duration-300 opacity-80 hover:opacity-100"
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

export default Belt;