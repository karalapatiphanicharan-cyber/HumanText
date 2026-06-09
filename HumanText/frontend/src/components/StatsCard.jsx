import React from 'react';
import { motion } from 'framer-motion';

const MetricCard = ({ label, value, icon: Icon, colorClass = "text-blue-400", bgClass = "bg-blue-500/10" }) => {
  return (
    <motion.div
      whileHover={{ translateY: -2, scale: 1.02 }}
      className="glass-card p-4 rounded-2xl flex items-center space-x-4 border border-white/5 hover:border-white/10 transition-colors"
    >
      <div className={`p-3 ${bgClass} rounded-xl ${colorClass}`}>
        <Icon size={18} />
      </div>
      <div>
        <div className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">{label}</div>
        <div className="text-lg font-semibold text-slate-200">{value}</div>
      </div>
    </motion.div>
  );
};

export default MetricCard;
