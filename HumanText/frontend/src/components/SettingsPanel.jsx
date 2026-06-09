import React from 'react';
import { motion } from 'framer-motion';
import { RotateCcw, Zap, Target } from 'lucide-react';

const STRENGTH_OPTIONS = ['Light', 'Medium', 'Strong'];
const TONE_OPTIONS = ['Professional', 'Casual', 'Academic', 'Friendly', 'LinkedIn'];

const SettingsPanel = ({ strength, setStrength, tone, setTone, onReset }) => {
  return (
    <div className="space-y-6 mb-8">
      {/* Strength Selection */}
      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
          <Zap size={14} className="text-blue-500" />
          <span>Humanization Strength</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {STRENGTH_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setStrength(opt.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                strength === opt.toLowerCase()
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 border border-slate-700/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>

      {/* Tone Selection */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2 text-slate-400 text-xs font-bold uppercase tracking-wider">
            <Target size={14} className="text-purple-500" />
            <span>Writing Tone</span>
          </div>
          <button
            onClick={onReset}
            className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-300 text-xs font-semibold transition-colors group"
          >
            <RotateCcw size={12} className="group-hover:rotate-[-45deg] transition-transform" />
            <span>Reset Settings</span>
          </button>
        </div>
        <div className="flex flex-wrap gap-2">
          {TONE_OPTIONS.map((opt) => (
            <button
              key={opt}
              onClick={() => setTone(opt.toLowerCase())}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                tone === opt.toLowerCase()
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/30'
                  : 'bg-slate-800/50 text-slate-400 hover:bg-slate-700/50 hover:text-slate-300 border border-slate-700/50'
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
