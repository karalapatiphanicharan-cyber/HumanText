import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ label, score, icon: Icon, color }) => {
  const radius = 36;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;

  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="glass p-6 rounded-3xl relative overflow-hidden group"
    >
      <div className={`absolute top-0 right-0 w-24 h-24 bg-${color}-500/10 blur-3xl rounded-full group-hover:bg-${color}-500/20 transition-colors duration-500`} />

      <div className="flex flex-col items-center text-center space-y-4">
        <div className="relative w-24 h-24 flex items-center justify-center">
          {/* Background Circle */}
          <svg className="absolute w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-white/5"
            />
            {/* Progress Circle */}
            <motion.circle
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: 1.5, ease: "easeOut", delay: 0.2 }}
              cx="48"
              cy="48"
              r={radius}
              stroke="currentColor"
              strokeWidth="8"
              strokeDasharray={circumference}
              fill="transparent"
              strokeLinecap="round"
              className={`text-${color}-500`}
            />
          </svg>

          <div className="z-10 flex flex-col items-center">
            <span className="text-2xl font-black text-white">{score}</span>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-tighter">%</span>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex items-center justify-center gap-2">
            <div className={`p-1.5 rounded-lg bg-${color}-500/10 text-${color}-400`}>
              <Icon size={14} />
            </div>
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">{label}</h3>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
