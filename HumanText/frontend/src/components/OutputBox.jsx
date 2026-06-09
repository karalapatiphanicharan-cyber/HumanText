import React, { useState } from 'react';

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
    <div className="mt-8 animate-fade-in">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-slate-300 font-medium">Humanized Output</h3>
        <button
          onClick={copyToClipboard}
          className="text-sm px-4 py-2 rounded-lg bg-slate-800 text-slate-300 border border-slate-700 hover:bg-slate-700 transition-colors flex items-center space-x-2"
        >
          {copied ? (
            <span className="text-green-400 font-medium">Copied successfully</span>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
              </svg>
              <span>Copy text</span>
            </>
          )}
        </button>
      </div>
      <div className="w-full p-6 rounded-2xl bg-slate-900/50 border border-slate-700 text-slate-200 backdrop-blur-md min-h-[200px] whitespace-pre-wrap leading-relaxed shadow-xl">
        {text}
      </div>
    </div>
  );
};

export default OutputBox;
