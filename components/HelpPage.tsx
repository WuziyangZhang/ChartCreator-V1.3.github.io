import React from 'react';
import { ArrowLeft, FileText, BarChart2, Download, Settings, Zap } from 'lucide-react';

interface HelpPageProps {
  onBack: () => void;
}

const HelpPage: React.FC<HelpPageProps> = ({ onBack }) => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center text-slate-500 hover:text-indigo-600 mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back to Home
      </button>

      <div className="mb-12 text-center">
        <h2 className="text-3xl font-bold text-slate-900 mb-4">How can we help you?</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Learn how to use ChartCreator to turn your raw data into professional, presentation-ready visualizations in seconds.
        </p>
      </div>

      <div className="grid gap-8">
        
        {/* Section 1: Getting Started */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="bg-indigo-100 p-3 rounded-xl text-indigo-600">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">1. Uploading Your Data</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                ChartCreator accepts <strong>CSV, Excel (text content), JSON, or plain text</strong>. 
                Simply drag and drop your file onto the upload area, or paste your text directly. 
                You can also optionally add specific instructions (e.g., "Focus on Q4 sales") in the requirements box.
              </p>
              <div className="bg-slate-50 p-4 rounded-lg text-sm text-slate-500 border border-slate-100">
                <strong>Tip:</strong> Ensure your data has clear headers (e.g., "Date", "Revenue", "Region") for the best results.
              </div>
            </div>
          </div>
        </div>

        {/* Section 2: Customizing Charts */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="bg-emerald-100 p-3 rounded-xl text-emerald-600">
              <BarChart2 className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">2. Customizing Your Visualization</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Once your chart is generated, use the toolbar on the left to refine it:
              </p>
              <ul className="space-y-3 text-slate-600">
                <li className="flex items-start">
                  <Settings className="w-4 h-4 mt-1 mr-2 text-slate-400" />
                  <span><strong>Axes & Labels:</strong> Rename axes, toggle grid lines, and adjust the chart title.</span>
                </li>
                <li className="flex items-start">
                  <Settings className="w-4 h-4 mt-1 mr-2 text-slate-400" />
                  <span><strong>Colors:</strong> Choose from professional palettes like "Ocean", "Forest", or "Berry".</span>
                </li>
                <li className="flex items-start">
                  <Settings className="w-4 h-4 mt-1 mr-2 text-slate-400" />
                  <span><strong>Visual Editor:</strong> Click on any bar or point in the chart to manually adjust its value using sliders.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 3: AI Refinement */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="bg-purple-100 p-3 rounded-xl text-purple-600">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">3. Refining with AI</h3>
              <p className="text-slate-600 mb-4 leading-relaxed">
                Need complex changes? Use the <strong>"Refine with AI"</strong> tool in the "Power-ups" section.
                Describe what you want in natural language, such as:
              </p>
              <ul className="list-disc list-inside text-slate-600 ml-2 space-y-1 italic">
                <li>"Filter out values below 100"</li>
                <li>"Group data by month instead of day"</li>
                <li>"Calculate the cumulative total"</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 4: Exporting */}
        <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
          <div className="flex items-start space-x-4">
            <div className="bg-amber-100 p-3 rounded-xl text-amber-600">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">4. Exporting</h3>
              <p className="text-slate-600 leading-relaxed">
                Click the <strong>Export</strong> button at the top right of the workspace. 
                You can download your chart as a high-resolution <strong>PNG, JPEG, or SVG</strong>. 
                You can also choose between a transparent, white, or black background for your export.
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default HelpPage;