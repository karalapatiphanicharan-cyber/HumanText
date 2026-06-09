import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Eye,
  Heart,
  BookOpen,
  Briefcase,
  Download,
  BarChart3,
  Sparkles
} from 'lucide-react';
import MetricCard from './MetricCard';
import FeedbackSection from './FeedbackSection';

const AnalysisDashboard = ({ analysis, onExport }) => {
  if (!analysis) return null;

  const getQualityLabel = (score) => {
    if (score >= 90) return { text: 'Excellent', color: 'emerald' };
    if (score >= 80) return { text: 'Very Good', color: 'blue' };
    if (score >= 70) return { text: 'Good', color: 'indigo' };
    if (score >= 60) return { text: 'Average', color: 'amber' };
    return { text: 'Needs Improvement', color: 'red' };
  };

  const metrics = [
    { label: 'Human-Likeness', score: analysis.human_likeness, icon: User, color: 'blue' },
    { label: 'Clarity', score: analysis.clarity, icon: Eye, color: 'emerald' },
    { label: 'Engagement', score: analysis.engagement, icon: Heart, color: 'rose' },
    { label: 'Readability', score: analysis.readability, icon: BookOpen, color: 'amber' },
    { label: 'Professionalism', score: analysis.professionalism, icon: Briefcase, color: 'indigo' },
  ];

  const overallScore = Math.round(
    (analysis.human_likeness +
      analysis.clarity +
      analysis.engagement +
      analysis.readability +
      analysis.professionalism) / 5
  );

  const quality = getQualityLabel(overallScore);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-16 space-y-10"
    >
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-white shadow-lg shadow-blue-500/20">
              <BarChart3 size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-black text-white tracking-tight">Writing Analysis</h2>
              <p className="text-slate-500 text-sm font-medium">Deep insights into your content's performance.</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className={`text-[10px] font-black uppercase tracking-[0.2em] text-${quality.color}-400 mb-1`}>
              Content Quality
            </div>
            <div className="text-2xl font-black text-white uppercase tracking-tighter">
              {quality.text}
            </div>
          </div>

          <div className="h-12 w-[1px] bg-white/10 mx-2" />

          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative glass px-6 py-3 rounded-2xl flex items-center gap-4 border-white/10">
              <div className="text-center">
                <div className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-0.5">Overall</div>
                <div className="text-3xl font-black text-white leading-none">{overallScore}</div>
              </div>
              <div className="text-slate-600 font-bold">/</div>
              <div className="text-slate-500 font-bold">100</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {metrics.map((metric) => (
          <MetricCard key={metric.label} {...metric} />
        ))}
      </div>

      {/* AI Insights (Strengths & Suggestions) */}
      <FeedbackSection
        strengths={analysis.strengths}
        suggestions={analysis.suggestions}
      />

      {/* Actions */}
      <div className="flex justify-center pt-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onExport}
          className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 text-white text-sm font-bold uppercase tracking-widest transition-all"
        >
          <Download size={18} />
          Export Analysis JSON
        </motion.button>
      </div>
    </motion.div>
  );
};

export default AnalysisDashboard;
