import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Zap, Maximize2, Minimize2, CheckCircle2 } from 'lucide-react';

const MODES = [
  {
    id: 'humanize',
    label: 'Humanize',
    icon: Sparkles,
    description: 'Make AI-generated content sound natural.',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'simplify',
    label: 'Simplify',
    icon: Zap,
    description: 'Convert difficult text into easy-to-read language.',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    id: 'expand',
    label: 'Expand',
    icon: Maximize2,
    description: 'Turn short content into detailed writing.',
    color: 'from-orange-500 to-rose-500'
  },
  {
    id: 'shorten',
    label: 'Shorten',
    icon: Minimize2,
    description: 'Condense lengthy text while keeping core value.',
    color: 'from-indigo-500 to-blue-500'
  },
  {
    id: 'grammar',
    label: 'Grammar Fix',
    icon: CheckCircle2,
    description: 'Correct grammar and spelling mistakes.',
    color: 'from-violet-500 to-fuchsia-500'
  },
];

const ModeSelector = ({ activeMode, onChange }) => {
  const selectedMode = MODES.find(m => m.id === activeMode) || MODES[0];

  return (
    <div className="space-y-4">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-2 mb-2">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500 flex items-center gap-2">
          <Zap size={14} className="text-blue-400" />
          Rewrite Mode
        </h3>

        <motion.p
          key={selectedMode.id}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xs font-medium text-blue-400/80 italic"
        >
          {selectedMode.description}
        </motion.p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-2 p-1.5 bg-slate-900/50 backdrop-blur-xl border border-white/5 rounded-2xl">
        {MODES.map((mode) => {
          const isActive = activeMode === mode.id;
          const Icon = mode.icon;

          return (
            <button
              key={mode.id}
              onClick={() => onChange(mode.id)}
              className={`
                relative flex flex-col items-center justify-center gap-2 py-3 px-2 rounded-xl transition-all duration-300
                ${isActive
                  ? 'text-white'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'}
              `}
            >
              {isActive && (
                <motion.div
                  layoutId="activeMode"
                  className={`absolute inset-0 bg-gradient-to-br ${mode.color} rounded-xl shadow-lg shadow-blue-500/20`}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}

              <span className="relative z-10">
                <Icon size={18} className={isActive ? 'text-white' : 'text-slate-400'} />
              </span>
              <span className="relative z-10 text-[10px] md:text-xs font-bold uppercase tracking-tight">
                {mode.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ModeSelector;
