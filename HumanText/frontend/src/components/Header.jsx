import React from 'react';
import { motion } from 'framer-motion';

const Header = () => {
  return (
    <header className="relative pt-24 pb-16 text-center overflow-hidden">
      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-blue-500/20 blur-[120px] rounded-full -z-10" />

      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <h1 className="text-7xl font-extrabold tracking-tight mb-6">
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
            HumanText
          </span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        className="text-slate-400 text-2xl max-w-2xl mx-auto font-light leading-relaxed"
      >
        Transform AI-generated content into <span className="text-slate-200 font-normal">natural, authentic</span> human writing.
      </motion.p>
    </header>
  );
};

export default Header;
