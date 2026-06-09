import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileText, Sparkles, Layout } from 'lucide-react';
import AnalyticsGrid from './AnalyticsGrid';
import ImprovementSummary from './ImprovementSummary';

const ComparisonView = ({ original, humanized }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(humanized);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="space-y-12 mt-12"
    >
      <ImprovementSummary original={original} humanized={humanized} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Original Side */}
        <div className="space-y-6">
          <div className="flex items-center space-x-3 mb-2 px-2">
            <FileText size={18} className="text-slate-500" />
            <h3 className="text-slate-300 font-bold uppercase tracking-widest text-xs">Original Text</h3>
          </div>

          <div className="glass p-8 rounded-[32px] text-slate-400 text-base leading-relaxed bg-slate-900/40 border border-white/5 min-h-[400px]">
            {original}
          </div>

          <AnalyticsGrid text={original} title="Input Analytics" />
        </div>

        {/* Humanized Side */}
        <div className="space-y-6 relative">
          <div className="flex items-center justify-between mb-2 px-2">
            <div className="flex items-center space-x-3">
              <Sparkles size={18} className="text-blue-400" />
              <h3 className="text-slate-100 font-bold uppercase tracking-widest text-xs">Humanized Text</h3>
            </div>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={copyToClipboard}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                copied
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400'
                  : 'bg-blue-600 text-white border-transparent shadow-lg shadow-blue-500/20 hover:bg-blue-500'
              }`}
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? 'Copied' : 'Copy Result'}</span>
            </motion.button>
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-[34px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative glass p-8 rounded-[32px] text-slate-100 text-lg leading-relaxed bg-slate-900/60 border border-white/10 min-h-[400px] shadow-2xl">
              {humanized}
            </div>

            {/* Sticky Action Bar */}
            <div className="absolute bottom-6 right-6">
               <div className="glass px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center space-x-3">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></div>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Optimized Output</span>
               </div>
            </div>
          </div>

          <AnalyticsGrid text={humanized} title="Output Analytics" />
        </div>
      </div>
    </motion.div>
  );
};

export default ComparisonView;
