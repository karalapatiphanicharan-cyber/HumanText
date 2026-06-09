import React from 'react';

const TextInput = ({ value, onChange, onHumanize, isLoading }) => {
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative group">
        <textarea
          className="w-full h-64 p-6 rounded-2xl bg-slate-800/50 border border-slate-700 text-slate-200 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all resize-none backdrop-blur-sm"
          placeholder="Paste AI-generated content here..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-focus-within:opacity-100 pointer-events-none transition-opacity" />
      </div>

      <button
        onClick={onHumanize}
        disabled={isLoading || !value.trim()}
        className={`py-4 px-8 rounded-xl font-semibold text-white transition-all transform active:scale-95 flex items-center justify-center space-x-2 ${
          isLoading || !value.trim()
            ? 'bg-slate-700 cursor-not-allowed grayscale'
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:shadow-lg hover:shadow-blue-500/25'
        }`}
      >
        {isLoading ? (
          <>
            <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
            </svg>
            <span>Processing...</span>
          </>
        ) : (
          <span>Humanize Text</span>
        )}
      </button>
    </div>
  );
};

export default TextInput;
