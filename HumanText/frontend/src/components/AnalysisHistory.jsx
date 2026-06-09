import React from 'react';
import { motion } from 'framer-motion';
import { History, Calendar, Zap, ChevronRight } from 'lucide-react';

const AnalysisHistory = ({ history, onSelect }) => {
  if (!history || history.length === 0) return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="p-2 rounded-xl bg-blue-500/10 text-blue-400">
          <History size={18} />
        </div>
        <h3 className="text-sm font-bold text-white uppercase tracking-widest">Recent Analyses</h3>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {history.map((item, index) => (
          <motion.button
            key={item.id || index}
            whileHover={{ y: -4, scale: 1.02 }}
            onClick={() => onSelect(item)}
            data-testid="history-item"
            className="glass p-5 rounded-2xl text-left group relative overflow-hidden transition-all duration-300 border-white/5 hover:border-blue-500/30"
          >
            <div className="absolute top-0 right-0 p-2 text-slate-700 group-hover:text-blue-500 transition-colors">
              <ChevronRight size={16} />
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-slate-500">
                <Calendar size={12} />
                <span className="text-[10px] font-bold uppercase tracking-tight">
                  {new Date(item.timestamp).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase mb-1">{item.mode}</div>
                  <div className="text-2xl font-black text-white group-hover:text-blue-400 transition-colors">
                    {item.overallScore}
                  </div>
                </div>

                <div className="flex flex-col items-end">
                   <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-400">
                      <Zap size={14} fill="currentColor" />
                   </div>
                   <span className="text-[10px] font-bold text-slate-600 mt-1 uppercase">Score</span>
                </div>
              </div>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default AnalysisHistory;
