import React from 'react';
import { InsightData } from '../types';
import { Sparkles, Globe } from 'lucide-react';

interface InsightPanelProps {
  insights: InsightData;
}

const InsightPanel: React.FC<InsightPanelProps> = ({ insights }) => {
  return (
    <div className="space-y-6 h-full flex flex-col">
      {/* English Insights */}
      <div className="bg-indigo-50/50 rounded-xl p-6 border border-indigo-100 flex-1">
        <div className="flex items-center space-x-2 mb-4">
          <Sparkles className="w-5 h-5 text-indigo-600" />
          <h3 className="font-semibold text-indigo-900">Key Insights (English)</h3>
        </div>
        <div className="prose prose-sm text-slate-700 max-w-none">
           <ul className="list-disc pl-4 space-y-2">
            {insights.en.split('\n').filter(line => line.trim().length > 0).map((line, idx) => (
                <li key={idx} className="leading-relaxed">
                  {line.replace(/^-\s*/, '')}
                </li>
            ))}
           </ul>
        </div>
      </div>

      {/* Chinese Insights */}
      <div className="bg-emerald-50/50 rounded-xl p-6 border border-emerald-100 flex-1">
        <div className="flex items-center space-x-2 mb-4">
          <Globe className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-emerald-900">核心洞察 (中文)</h3>
        </div>
         <div className="prose prose-sm text-slate-700 max-w-none">
           <ul className="list-disc pl-4 space-y-2">
            {insights.zh.split('\n').filter(line => line.trim().length > 0).map((line, idx) => (
                <li key={idx} className="leading-relaxed">
                  {line.replace(/^-\s*/, '')}
                </li>
            ))}
           </ul>
        </div>
      </div>
    </div>
  );
};

export default InsightPanel;
