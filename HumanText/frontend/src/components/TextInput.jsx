import React from 'react';
import { Sparkles, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const TextInput = ({ value, onChange, onHumanize, isLoading }) => {
  return (
    <div className="flex flex-col space-y-6">
      <div className="relative group">
        <textarea
          className="w-full h-80 p-8 rounded-3xl bg-dark-lighter/30 border border-white/5 text-slate-200 placeholder-slate-600 focus:outline-none focus:border-blue-500/50 transition-all resize-none backdrop-blur-xl leading-relaxed text-lg"
          placeholder="Paste AI-generated content here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
      </div>

      <motion.button
        whileHover={!isLoading && value.trim() ? { scale: 1.02, boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)" } : {}}
        whileTap={!isLoading && value.trim() ? { scale: 0.98 } : {}}
        onClick={onHumanize}
        disabled={isLoading || !value.trim()}
        className={`relative overflow-hidden py-5 px-10 rounded-2xl font-bold text-white transition-all flex items-center justify-center space-x-3 shadow-xl ${
          isLoading || !value.trim()
            ? 'bg-slate-800 cursor-not-allowed opacity-50'
            : 'bg-gradient-to-r from-cyan-500 via-blue-600 to-purple-600'
        }`}
      >
        <AnimatePresence mode="wait">
          {isLoading ? (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <Loader2 className="animate-spin h-5 w-5" />
              <span>Polishing your text...</span>
            </motion.div>
          ) : (
            <motion.div
              key="default"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center space-x-3"
            >
              <Sparkles size={20} />
              <span className="tracking-wide uppercase text-sm">Humanize Content</span>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default TextInput;
