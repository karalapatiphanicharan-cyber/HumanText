import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { analyzeText } from '../utils/textAnalysis';

const ImprovementSummary = ({ original, humanized }) => {
  const origStats = analyzeText(original);
  const humStats = analyzeText(humanized);

  const diffWords = humStats.words - origStats.words;
  const readabilityImproved = humStats.readability !== origStats.readability || humStats.wordsPerSentence < origStats.wordsPerSentence;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="glass p-6 rounded-[32px] border border-blue-500/20 bg-blue-500/5"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-blue-500 rounded-lg text-white">
          <TrendingUp size={20} />
        </div>
        <h3 className="text-xl font-bold text-slate-100">Improvement Summary</h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-1">
          <div className="text-xs font-bold text-slate-500 uppercase tracking-widest">Word Count</div>
          <div className="flex items-center space-x-2">
            <span className="text-lg font-semibold text-slate-200">{origStats.words}</span>
            <ArrowRight size={14} className="text-slate-600" />
            <span className="text-lg font-bold text-blue-400">{humStats.words}</span>
          </div>
          <div className="text-[10px] text-slate-500">{diffWords >= 0 ? `+${diffWords}` : diffWords} words difference</div>
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
