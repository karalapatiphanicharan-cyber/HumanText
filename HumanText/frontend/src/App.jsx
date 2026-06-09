import React, { useState } from 'react';
import Header from './components/Header';
import TextInput from './components/TextInput';
import OutputBox from './components/OutputBox';
import StatsCard from './components/StatsCard';
import { humanizeText } from './services/api';

function App() {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleHumanize = async () => {
    if (!input.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const data = await humanizeText(input);
      setOutput(data.humanized_text);
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 pb-20">
      <Header />

      <main className="space-y-8">
        <div className="bg-slate-900/40 border border-slate-800 p-8 rounded-3xl backdrop-blur-xl shadow-2xl">
          <StatsCard text={input} />

          <TextInput
            value={input}
            onChange={setInput}
            onHumanize={handleHumanize}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-4 p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
              {error}
            </div>
          )}
        </div>

        <OutputBox text={output} />
      </main>

      <footer className="mt-20 text-center text-slate-500 text-sm">
        &copy; {new Date().getFullYear()} HumanText. All rights reserved.
      </footer>
    </div>
  );
}

export default App;
