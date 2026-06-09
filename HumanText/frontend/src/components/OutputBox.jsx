import React, { useState } from 'react';
import { Check, Copy, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const OutputBox = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy!', err);
    }
  };

  if (!text) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12"
    >
      <div className="flex justify-between items-end mb-6">
        <div>
          <h3 className="text-slate-400 text-sm font-bold uppercase tracking-widest mb-1">Result</h3>
          <h4 className="text-2xl font-bold text-slate-100">Humanized Version</h4>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={copyToClipboard}
          className={`px-5 py-2.5 rounded-xl border transition-all flex items-center space-x-2 font-medium ${
            copied
              ? 'bg-green-500/10 border-green-500/30 text-green-400'
              : 'bg-slate-800/50 border-white/5 text-slate-300 hover:bg-slate-700/50'
          }`}
        >
          {copied ? (
            <>
              <Check size={18} />
              <span>Copied</span>
            </>
          ) : (
            <>
              <Copy size={18} />
              <span>Copy</span>
            </>
          )}
        </motion.button>
      </div>

      <div className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/20 to-purple-600/20 rounded-[32px] blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
        <div className="relative w-full p-10 rounded-[30px] glass border border-white/10 text-slate-200 min-h-[240px] whitespace-pre-wrap leading-relaxed text-lg shadow-2xl overflow-hidden">
          {text}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
                className="absolute top-4 right-4 text-green-500/20 pointer-events-none"
              >
                <CheckCircle2 size={120} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};

export default OutputBox;
