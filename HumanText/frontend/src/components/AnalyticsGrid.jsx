import React from 'react';
import { Type, Hash, AlignLeft, Layers, Clock, BookOpen } from 'lucide-react';
import MetricCard from './StatsCard';
import { analyzeText } from '../utils/textAnalysis';

const AnalyticsGrid = ({ text, title }) => {
  const stats = analyzeText(text);

  return (
    <div className="space-y-4">
      {title && (
        <h4 className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 ml-1">
          {title}
        </h4>
      )}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        <MetricCard label="Words" value={stats.words} icon={Type} />
        <MetricCard label="Chars" value={stats.characters} icon={Hash} colorClass="text-purple-400" bgClass="bg-purple-500/10" />
        <MetricCard label="Sentences" value={stats.sentences} icon={AlignLeft} colorClass="text-emerald-400" bgClass="bg-emerald-500/10" />
        <MetricCard label="Paragraphs" value={stats.paragraphs} icon={Layers} colorClass="text-orange-400" bgClass="bg-orange-500/10" />
        <MetricCard label="Reading Time" value={stats.readingTime} icon={Clock} colorClass="text-pink-400" bgClass="bg-pink-500/10" />
        <MetricCard label="Readability" value={stats.readability} icon={BookOpen} colorClass="text-cyan-400" bgClass="bg-cyan-500/10" />
      </div>
    </div>
  );
};

export default AnalyticsGrid;
