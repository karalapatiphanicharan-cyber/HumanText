import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, AlertCircle } from 'lucide-react';

const FeedbackSection = ({ strengths, suggestions }) => {
  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {/* Strengths */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass p-8 rounded-[32px] border-emerald-500/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={20} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Writing Strengths</h3>
        </div>

        <ul className="space-y-4">
          {strengths.map((strength, index) => (
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-start gap-3 group"
            >
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500/40 group-hover:bg-emerald-500 transition-colors" />
              <span className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                {strength}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Suggestions */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="glass p-8 rounded-[32px] border-amber-500/10"
      >
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400">
            <AlertCircle size={20} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-widest">Growth Opportunities</h3>
        </div>

        <ul className="space-y-4">
          {suggestions.map((suggestion, index) => (
            <motion.li
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              key={index}
              className="flex items-start gap-3 group"
            >
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-500/40 group-hover:bg-amber-500 transition-colors" />
              <span className="text-sm text-slate-400 leading-relaxed group-hover:text-slate-200 transition-colors">
                {suggestion}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default FeedbackSection;
