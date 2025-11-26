"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

function FAQ() {
  const faqs = [
    {
      question: "Why is AskPDF so slow?",
      answer:
        "Because it's powered by free APIs, caffeine, and pure stubbornness. Think of it less like a product, and more like an experience in patience.",
    },
    {
      question: "Does upgrading to Pro make it faster?",
      answer:
        "Absolutely not. It just makes *you* feel faster. Your wallet becomes lighter, which technically reduces drag.",
    },
    {
      question: "Who built this?",
      answer:
        "One developer. Alone. On bad Wi-Fi. Probably listening to The Local Train while debugging memory leaks.",
    },
    {
      question: "Can I upload my entire 400-page research paper?",
      answer:
        "Sure, but it might take longer than your actual research did. AskPDF is built for curiosity, not speedruns.",
    },
    {
      question: "What happens if I break it?",
      answer:
        "Congratulations, you've joined the QA team. Please don't. But if you do, just refresh — that fixes 97% of our known problems.",
    },
    {
      question: "Is there a dark mode?",
      answer:
        "Not yet. But you can always turn off your monitor and imagine it.",
    },
    {
      question: "How do I contact support?",
      answer:
        "You don't. Just stare at the screen until it works. If it still doesn't, whisper your issue into the void — I might hear it.",
    },
    {
      question: "Will AskPDF ever be fast?",
      answer:
        "When AI learns to pay for its own API keys.",
    },
  ];

  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-20 sm:py-28">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 md:px-12">
        {/* Header - Keeping your original text */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gray-50 text-sm font-medium text-gray-700 mb-6">
            <span>🙃 FAQs (Frequently Avoided Questions)</span>
          </div>
          <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Questions You{" "}
            <motion.span 
              className="inline-block bg-red-100 text-red-700 font-semibold px-4 py-1 rounded-lg -rotate-2 cursor-pointer"
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
              Probably
            </motion.span>{" "}
            Shouldn't Ask
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            We know what you're wondering. So here are some answers — not necessarily helpful, but definitely honest.
          </p>
        </div>

        {/* FAQ Grid - Independent columns */}
        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Left Column */}
          <div className="flex-1 space-y-8">
            {faqs.slice(0, Math.ceil(faqs.length / 2)).map((faq, index) => (
              <motion.div
                key={index}
                className="border-b border-gray-200 pb-6 last:border-b-0"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <button
                  className="w-full flex justify-between items-start text-left group cursor-pointer"
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                >
                  <div className="flex items-start space-x-4 flex-1">
                    {/* Checkmark icon */}
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 group-hover:bg-green-200 transition-colors">
                      <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 pr-8 leading-relaxed group-hover:text-gray-700 transition-colors">
                        {faq.question}
                      </h3>
                      
                      <AnimatePresence>
                        {openIndex === index && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <p className="text-gray-600 mt-3 leading-relaxed">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  {/* Chevron icon */}
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex-shrink-0 ml-4 group-hover:bg-gray-100 p-1 rounded-full transition-colors"
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                  </motion.div>
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right Column */}
          <div className="flex-1 space-y-8">
            {faqs.slice(Math.ceil(faqs.length / 2)).map((faq, index) => {
              const adjustedIndex = index + Math.ceil(faqs.length / 2);
              return (
                <motion.div
                  key={adjustedIndex}
                  className="border-b border-gray-200 pb-6 last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <button
                    className="w-full flex justify-between items-start text-left group cursor-pointer"
                    onClick={() => setOpenIndex(openIndex === adjustedIndex ? null : adjustedIndex)}
                  >
                    <div className="flex items-start space-x-4 flex-1">
                      {/* Checkmark icon */}
                      <div className="flex-shrink-0 w-6 h-6 rounded-full bg-green-100 flex items-center justify-center mt-1 group-hover:bg-green-200 transition-colors">
                        <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                      
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 pr-8 leading-relaxed group-hover:text-gray-700 transition-colors">
                          {faq.question}
                        </h3>
                        
                        <AnimatePresence>
                          {openIndex === adjustedIndex && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="overflow-hidden"
                            >
                              <p className="text-gray-600 mt-3 leading-relaxed">
                                {faq.answer}
                              </p>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </div>

                    {/* Chevron icon */}
                    <motion.div
                      animate={{ rotate: openIndex === adjustedIndex ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0 ml-4 group-hover:bg-gray-100 p-1 rounded-full transition-colors"
                    >
                      <ChevronDown className="w-5 h-5 text-gray-400 group-hover:text-gray-600 transition-colors" />
                    </motion.div>
                  </button>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-16">
          <p className="text-gray-500 text-lg">
            Still confused? Perfect. That means it's working.
          </p>
        </div>
      </div>
    </section>
  );
}

export default FAQ;