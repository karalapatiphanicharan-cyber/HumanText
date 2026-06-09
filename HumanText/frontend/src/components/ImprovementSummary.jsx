import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, Sparkles, Zap, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';
import { analyzeText } from '../utils/textAnalysis';

const MODE_CONFIG = {
  humanize: {
    icon: Sparkles,
    color: 'text-blue-400',
    insight: 'Text rewritten for natural flow',
    accent: 'bg-blue-500'
  },
  simplify: {
    icon: Zap,
    color: 'text-emerald-400',
    insight: 'Simplified for better readability',
    accent: 'bg-emerald-500'
  },
  expand: {
    icon: Maximize2,
    color: 'text-orange-400',
    insight: (diff) => `${diff > 0 ? '+' + diff : diff} words added`,
    accent: 'bg-orange-500'
  },
  shorten: {
    icon: Minimize2,
    color: 'text-indigo-400',
    insight: (diff) => `${Math.abs(diff)} words removed`,
    accent: 'bg-indigo-500'
  },
  grammar: {
    icon: CheckCircle2,
    color: 'text-violet-400',
    insight: 'Corrections applied for technical accuracy',
    accent: 'bg-violet-500'
  }
};

const ImprovementSummary = ({ original, humanized, mode = 'humanize' }) => {
  const origStats = analyzeText(original);
  const humStats = analyzeText(humanized);
  const config = MODE_CONFIG[mode] || MODE_CONFIG.humanize;
  const Icon = config.icon;

  const diffWords = humStats.words - origStats.words;
  const readabilityImproved = humStats.readability !== origStats.readability || humStats.wordsPerSentence < origStats.wordsPerSentence;

  const insightText = typeof config.insight === 'function' ? config.insight(diffWords) : config.insight;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`glass p-6 rounded-[32px] border ${config.color.replace('text', 'border')}/20 ${config.accent}/5`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-2 ${config.accent} rounded-lg text-white shadow-lg ${config.accent.replace('bg', 'shadow')}/20`}>
            <Icon size={20} />
          </div>
          <h3 className="text-xl font-bold text-slate-100">Transformation Summary</h3>
        </div>
        <div className={`text-xs font-bold ${config.color} uppercase tracking-widest px-3 py-1 bg-white/5 rounded-full border ${config.color.replace('text', 'border')}/10`}>
          {mode} Mode
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Word Count</div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-slate-200">{origStats.words}</span>
            <ArrowRight size={14} className="text-slate-600" />
            <span className={`text-lg font-bold ${config.color}`}>{humStats.words}</span>
          </div>
          <div className="text-[10px] text-slate-500">{insightText}</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Readability</div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-slate-200">{origStats.readability}</span>
            <ArrowRight size={14} className="text-slate-600" />
            <span className={`text-lg font-bold ${readabilityImproved ? 'text-emerald-400' : 'text-slate-200'}`}>
              {humStats.readability}
            </span>
          </div>
          <div className="text-[10px] text-slate-500">{readabilityImproved ? 'Improved clarity' : 'Maintained quality'}</div>
        </div>

        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Reading Time</div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-slate-200">{origStats.readingTime}</span>
            <ArrowRight size={14} className="text-slate-600" />
            <span className="text-lg font-bold text-purple-400">{humStats.readingTime}</span>
          </div>
          <div className="text-[10px] text-slate-500">Optimized for engagement</div>
        </div>
      </div>
    </motion.div>
  );
};

export default ImprovementSummary;
