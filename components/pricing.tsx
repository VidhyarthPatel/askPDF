"use client";
import { motion, Variants } from "framer-motion";

function Pricing() {
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

  const cardVariants: Variants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="bg-white py-24 sm:py-22">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 md:px-12 text-center">
        {/* Header */}
        <motion.div 
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-sm font-medium text-gray-700 mb-5 shadow-sm"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <span>💰 Honest Pricing</span>
        </motion.div>

        <motion.h2 
          className="text-4xl sm:text-6xl font-extrabold text-gray-900 mb-6 leading-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          viewport={{ once: true }}
        >
          Choose Your{" "}
          <motion.span 
            className="inline-block bg-yellow-200 text-yellow-800 px-4 py-1 rounded-lg rotate-2"
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
            Pain Level
          </motion.span>
        </motion.h2>

        <motion.p 
          className="text-gray-600 text-lg max-w-2xl mx-auto mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
        >
          We don't do "tiers" or "pro plans." Just one plan, because our server
          can barely handle that. But if you insist, here's what you *could*
          theoretically pay for.
        </motion.p>

        {/* Pricing Cards */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {/* Free Plan */}
          <motion.div 
            className="bg-[#f9fafb] border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-md transition"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Free</h3>
            <p className="text-gray-600 mb-6">
              The "I have patience and trust issues" plan.
            </p>
            <h4 className="text-4xl font-extrabold text-gray-900 mb-4">₹0</h4>
            <p className="text-gray-500 text-sm mb-8">
              Because curiosity shouldn't cost money (yet).
            </p>
            <ul className="text-gray-700 text-left mb-8 space-y-3">
              <li>✅ Upload up to 3 PDFs (and pray)</li>
              <li>🐢 Same speed as everyone else</li>
              <li>💬 5 questions per file — choose wisely</li>
              <li>⚡ Includes that one lucky fast response</li>
            </ul>
            <motion.button 
              className="bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Start Suffering (Free)
            </motion.button>
          </motion.div>

          {/* Pro Plan */}
          <motion.div 
            className="bg-blue-50 border border-blue-200 rounded-2xl shadow-md p-8 hover:shadow-lg transition relative overflow-hidden"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <motion.div 
              className="absolute top-4 right-4 bg-yellow-300 text-xs font-semibold px-3 py-1 rounded-full"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              transition={{ delay: 0.5, type: "spring" }}
              viewport={{ once: true }}
            >
              Most Confused Users Pick This
            </motion.div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Pro (ish)</h3>
            <p className="text-gray-600 mb-6">
              For those who think paying ₹199 makes it faster. (It doesn't.)
            </p>
            <h4 className="text-4xl font-extrabold text-gray-900 mb-4">₹199/month</h4>
            <p className="text-gray-500 text-sm mb-8">
              Comes with bragging rights and identical performance.
            </p>
            <ul className="text-gray-700 text-left mb-8 space-y-3">
              <li>✅ Unlimited PDFs (because why not?)</li>
              <li>💬 Unlimited questions (and regret)</li>
              <li>🤝 Priority email support (we'll *see* it faster)</li>
              <li>💸 Slight wallet pain, infinite emotional pain</li>
            </ul>
            <motion.button 
              className="bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-800 transition w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Go Pro(ish)
            </motion.button>
          </motion.div>

          {/* Enterprise Plan */}
          <motion.div 
            className="bg-[#f9fafb] border border-gray-200 rounded-2xl shadow-sm p-8 hover:shadow-md transition"
            variants={cardVariants}
            whileHover={{ y: -5 }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Enterprise</h3>
            <p className="text-gray-600 mb-6">
              For companies that enjoy pain, bureaucracy, and waiting.
            </p>
            <h4 className="text-4xl font-extrabold text-gray-900 mb-4">₹9,999/month</h4>
            <p className="text-gray-500 text-sm mb-8">
              Includes a monthly apology call from the developer (me).
            </p>
            <ul className="text-gray-700 text-left mb-8 space-y-3">
              <li>✅ Everything in Pro(ish), equally slow</li>
              <li>🧠 "Custom" AI model — still the same Gemini free API</li>
              <li>📞 24/7 support (if you count DMs as support)</li>
              <li>🎁 Lifetime access to AskPDF 2.0 (once it exists)</li>
            </ul>
            <motion.button 
              className="bg-gray-900 text-white px-6 py-3 rounded-xl font-semibold hover:bg-gray-800 transition w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Sales (aka just me)
            </motion.button>
          </motion.div>
        </motion.div>

        {/* Footer Note */}
        <motion.p 
          className="text-sm text-gray-500 mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
        >
          *No refunds. Not because we're greedy — because we literally don't
          know how to set them up.
        </motion.p>
      </div>
    </section>
  );
}

export default Pricing;