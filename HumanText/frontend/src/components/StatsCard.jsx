import React from 'react';
import { Type, Hash } from 'lucide-react';
import { motion } from 'framer-motion';

const StatsCard = ({ text }) => {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="flex gap-4 mb-6">
      <motion.div
        whileHover={{ translateY: -2 }}
        className="flex-1 glass-card p-4 rounded-2xl flex items-center space-x-4"
      >
        <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
          <Type size={20} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Words</div>
          <div className="text-xl font-semibold text-slate-200">{wordCount}</div>
        </div>
      </motion.div>

      <motion.div
        whileHover={{ translateY: -2 }}
        className="flex-1 glass-card p-4 rounded-2xl flex items-center space-x-4"
      >
        <div className="p-3 bg-purple-500/10 rounded-xl text-purple-400">
          <Hash size={20} />
        </div>
        <div>
          <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">Characters</div>
          <div className="text-xl font-semibold text-slate-200">{charCount}</div>
        </div>
      </motion.div>
    </div>
  );
};

export default StatsCard;
