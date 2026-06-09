import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from './components/Header';
import TextInput from './components/TextInput';
import ComparisonView from './components/ComparisonView';
import AnalyticsGrid from './components/AnalyticsGrid';
import SettingsPanel from './components/SettingsPanel';
import { humanizeText } from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [strength, setStrength] = useState('medium');
  const [tone, setTone] = useState('professional');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleHumanize = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const data = await humanizeText(input, strength, tone);
      setOutput(data.humanized_text);
      // Smooth scroll to results
      setTimeout(() => {
        window.scrollTo({ top: 800, behavior: 'smooth' });
      }, 100);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = () => {
    setInput('');
    setOutput('');
    setStrength('medium');
    setTone('professional');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
                key={strength}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-widest"
              >
                {strength}
              </motion.div>
              <motion.div
                key={tone}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-[10px] font-bold uppercase tracking-widest"
              >
                {tone}
              </motion.div>
            </div>

            <SettingsPanel
              strength={strength}
              setStrength={setStrength}
              tone={tone}
              setTone={setTone}
              onReset={handleReset}
            />

            <div className="mb-10">
              <AnalyticsGrid text={input} title="Current Input Stats" />
            </div>

            <TextInput
              value={input}
              onChange={setInput}
              onHumanize={handleHumanize}
              isLoading={isLoading}
            />

            {error && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 p-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center space-x-3"
              >
                <div className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                <span>{error}</span>
              </motion.div>
            )}
          </div>

          <AnimatePresence mode="wait">
            {output && (
              <ComparisonView key="comparison" original={input} humanized={output} />
            )}
          </AnimatePresence>
        </motion.main>

        <footer className="mt-24 text-center text-slate-600 text-sm font-medium tracking-wide">
          <p>&copy; {new Date().getFullYear()} HumanText. Crafting Natural Conversations.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;
