import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Copy, Check, FileText, Sparkles, Layout, Zap, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import AnalyticsGrid from './AnalyticsGrid';
import ImprovementSummary from './ImprovementSummary';

const MODE_CONFIG = {
  humanize: { icon: Sparkles, label: 'Humanized Text', color: 'text-blue-400' },
  simplify: { icon: Zap, label: 'Simplified Text', color: 'text-emerald-400' },
  expand: { icon: Maximize2, label: 'Expanded Text', color: 'text-orange-400' },
  shorten: { icon: Minimize2, label: 'Shortened Text', color: 'text-indigo-400' },
  grammar: { icon: CheckCircle2, label: 'Corrected Text', color: 'text-violet-400' },
};

const ComparisonView = ({ original, humanized, mode = 'humanize', tone = 'professional', strength = 'medium' }) => {
  const [copied, setCopied] = useState(false);
  const config = MODE_CONFIG[mode] || MODE_CONFIG.humanize;
  const Icon = config.icon;

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
      <ImprovementSummary original={original} humanized={humanized} mode={mode} />

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

        {/* Output Side */}
        <div className="space-y-6 relative">
          <div className="flex items-center justify-between mb-2 px-2">
            <div className="flex items-center space-x-3">
              <Icon size={18} className={config.color} />
              <h3 className="text-slate-100 font-bold uppercase tracking-widest text-xs">{config.label}</h3>
            </div>

            <div className="flex items-center space-x-3">
              <div className="hidden md:flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <span className="text-[10px] font-bold text-slate-500 uppercase">{tone}</span>
                <div className="w-1 h-1 rounded-full bg-slate-700"></div>
                <span className="text-[10px] font-bold text-slate-500 uppercase">{strength}</span>
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
          </div>

          <div className="relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-[34px] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
            <div className="relative glass p-8 rounded-[32px] text-slate-100 text-lg leading-relaxed bg-slate-900/60 border border-white/10 min-h-[400px] shadow-2xl">
              {humanized}
            </div>

            {/* Sticky Action Bar */}
            <div className="absolute bottom-6 right-6">
               <div className="glass px-4 py-2 rounded-full border border-white/10 shadow-xl flex items-center space-x-3">
                  <div className={`w-2 h-2 rounded-full ${config.color.replace('text', 'bg')} animate-pulse`}></div>
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
