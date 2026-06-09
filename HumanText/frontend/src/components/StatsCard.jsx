import React from 'react';

const StatsCard = ({ text }) => {
  const wordCount = text.trim() ? text.trim().split(/\s+/).length : 0;
  const charCount = text.length;

  return (
    <div className="flex space-x-6 mb-4">
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Words</span>
        <span className="text-slate-300 text-xl font-mono">{wordCount}</span>
      </div>
      <div className="w-px h-10 bg-slate-800" />
      <div className="flex flex-col">
        <span className="text-slate-500 text-xs uppercase tracking-wider font-semibold">Characters</span>
        <span className="text-slate-300 text-xl font-mono">{charCount}</span>
      </div>
    </div>
  );
};

export default StatsCard;
