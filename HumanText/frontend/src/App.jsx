import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MousePointer2, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import OutputBox from './components/OutputBox';
import AnalyticsGrid from './components/AnalyticsGrid';
import SettingsPanel from './components/SettingsPanel';
import ModeSelector from './components/ModeSelector';
import AnalysisDashboard from './components/AnalysisDashboard';
import { humanizeText, analyzeText } from './services/api';

const EXAMPLES = [
  {
    label: 'Humanize Example',
    mode: 'humanize',
    text: 'Artificial intelligence is fundamentally changing the way businesses operate by automating repetitive tasks and providing data-driven insights. This technology allows organizations to optimize their efficiency and reduce costs while improving decision-making processes across various departments.'
  },
  {
    label: 'Simplify Example',
    mode: 'simplify',
    text: 'The implementation of automated systems facilitated operational optimization within the corporate infrastructure. Consequently, the organization experienced a significant augmentation in productivity metrics and a simultaneous diminution in overhead expenditures.'
  },
  {
    label: 'Expand Example',
    mode: 'expand',
    text: 'AI helps businesses.'
  },
];

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [mode, setMode] = useState('humanize');
  const [strength, setStrength] = useState('medium');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [error, setError] = useState('');
  const [analysis, setAnalysis] = useState(null);

  const handleProcess = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setIsAnalyzing(true);
    setError('');
    setAnalysis(null);

    try {
      const data = await humanizeText(input, mode, strength, tone);
      setOutput(data.humanized_text);

      // Run analysis
      const analysisData = await analyzeText(data.humanized_text);
      setAnalysis(analysisData);

      // Smooth scroll to results
      setTimeout(() => {
        const resultsEl = document.getElementById('results-section');
        if (resultsEl) {
          resultsEl.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
      setIsAnalyzing(false);
    }
  };

  const handleExport = () => {
    if (!analysis || !output) return;

    const exportData = {
      originalText: input,
      rewrittenText: output,
      analysis,
      metadata: {
        mode,
        tone,
        strength,
        timestamp: new Date().toISOString()
      }
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `humantext-analysis-${Date.now()}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setAnalysis(null);
    setMode('humanize');
    setStrength('medium');
    setTone('professional');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const fillExample = (example) => {
    setInput(example.text);
    setMode(example.mode);
  };

  return (
    <div className="relative min-h-screen">
      {/* Background Blobs */}
      <div className="bg-blobs">
        <div className="blob blob-1" />
        <div className="blob blob-2" />
        <div className="blob blob-3" />
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-24 relative z-10">
        <Header />

        <motion.main
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="space-y-12"
        >
          <div className="glass p-10 rounded-[40px] shadow-2xl relative overflow-hidden group">
            {/* Inner Glow */}
            <div className="absolute -top-24 -left-24 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-colors duration-700" />

            {/* Active Badges */}
            <div className="flex flex-wrap gap-3 mb-8">
              <motion.div
                key={mode}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-blue-500/5"
              >
                {mode}
              </motion.div>
              <motion.div
                key={tone}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-purple-500/5"
              >
                {tone}
              </motion.div>
              <motion.div
                key={strength}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-[10px] font-bold uppercase tracking-widest shadow-lg shadow-indigo-500/5"
              >
                {strength}
              </motion.div>
            </div>

            <div className="mb-10">
               <ModeSelector activeMode={mode} onChange={setMode} />
            </div>

            <SettingsPanel
              strength={strength}
              setStrength={setStrength}
              tone={tone}
              setTone={setTone}
              onReset={handleReset}
            />

            <div className="mb-10">
              <div className="flex items-center justify-between mb-4">
                <AnalyticsGrid text={input} title="Current Input Stats" />
              </div>

              {/* Quick Examples */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="text-[10px] uppercase tracking-widest text-slate-500 font-bold flex items-center gap-1.5 mr-2">
                  <MousePointer2 size={12} />
                  Try it:
                </span>
                {EXAMPLES.map((ex) => (
                  <button
                    key={ex.label}
                    onClick={() => fillExample(ex)}
                    className="px-3 py-1 text-[10px] font-bold text-slate-400 hover:text-white bg-slate-800/50 hover:bg-slate-700/50 border border-white/5 rounded-full transition-all duration-200"
                  >
                    {ex.label}
                  </button>
                ))}
              </div>
            </div>

            <TextInput
              value={input}
              onChange={setInput}
              onHumanize={handleProcess}
              isLoading={isLoading}
              mode={mode}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 p-6 rounded-3xl bg-red-500/5 border border-red-500/20 backdrop-blur-md relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <AlertCircle size={48} className="text-red-500" />
                </div>
                <div className="flex items-start space-x-4 relative z-10">
                  <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center flex-shrink-0">
                    <AlertCircle size={20} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-red-400 font-bold mb-1">Service Error</h4>
                    <p className="text-red-400/80 text-sm leading-relaxed mb-4">{error}</p>
                    <button
                      onClick={handleProcess}
                      className="flex items-center space-x-2 text-xs font-bold uppercase tracking-widest text-red-400 hover:text-red-300 transition-colors"
                    >
                      <RefreshCw size={14} />
                      <span>Retry Request</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          <div id="results-section" className="scroll-mt-12">
            <AnimatePresence mode="wait">
              {output && (
                <div className="space-y-12">
                  <OutputBox
                    key="comparison"
                    original={input}
                    humanized={output}
                    mode={mode}
                    tone={tone}
                    strength={strength}
                  />

                  {isAnalyzing && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="glass p-12 rounded-[40px] flex flex-col items-center justify-center space-y-6"
                    >
                      <div className="relative">
                        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                        <Sparkles className="absolute inset-0 m-auto text-blue-400 animate-pulse" size={24} />
                      </div>
                      <div className="text-center">
                        <h3 className="text-xl font-bold text-white mb-2">Analyzing Content...</h3>
                        <p className="text-slate-500 max-w-xs">Our AI is evaluating clarity, engagement, and human-likeness scores.</p>
                      </div>
                    </motion.div>
                  )}

                  {analysis && !isAnalyzing && (
                    <AnalysisDashboard
                      analysis={analysis}
                      onExport={handleExport}
                    />
                  )}
                </div>
              )}
            </AnimatePresence>
          </div>
        </motion.main>

        <footer className="mt-24 text-center text-slate-600 text-sm font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} HumanText. Crafting Natural Conversations.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
