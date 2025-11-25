import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp } from 'lucide-react';

interface SchematicProps {
  type: string;
}

const Schematic: React.FC<SchematicProps> = ({ type }) => {
  const color = "currentColor";
  switch (type) {
    case 'Bar Chart':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full text-indigo-500" fill="none" stroke={color} strokeWidth="2">
          <rect x="10" y="40" width="15" height="30" fill="currentColor" opacity="0.2" />
          <rect x="35" y="20" width="15" height="50" fill="currentColor" opacity="0.6" />
          <rect x="60" y="50" width="15" height="20" fill="currentColor" opacity="0.4" />
          <line x1="5" y1="75" x2="90" y2="75" strokeLinecap="round" />
          <line x1="5" y1="5" x2="5" y2="75" strokeLinecap="round" />
        </svg>
      );
    case 'Line Chart':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full text-emerald-500" fill="none" stroke={color} strokeWidth="2">
          <path d="M10 60 L 30 40 L 50 55 L 70 20 L 90 30" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="10" cy="60" r="3" fill="currentColor" stroke="none" />
          <circle cx="30" cy="40" r="3" fill="currentColor" stroke="none" />
          <circle cx="50" cy="55" r="3" fill="currentColor" stroke="none" />
          <circle cx="70" cy="20" r="3" fill="currentColor" stroke="none" />
          <circle cx="90" cy="30" r="3" fill="currentColor" stroke="none" />
          <line x1="5" y1="75" x2="95" y2="75" strokeWidth="1" opacity="0.5" />
          <line x1="5" y1="5" x2="5" y2="75" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case 'Pie Chart':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full text-amber-500">
           <path d="M40 40 L 40 5 A 35 35 0 0 1 70 23 Z" fill="currentColor" opacity="0.8" />
           <path d="M40 40 L 70 23 A 35 35 0 0 1 65 65 Z" fill="currentColor" opacity="0.6" />
           <path d="M40 40 L 65 65 A 35 35 0 1 1 40 5 Z" fill="currentColor" opacity="0.3" />
        </svg>
      );
    case 'Area Chart':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full text-blue-500" fill="none">
          <path d="M10 60 L 30 30 L 50 45 L 70 15 L 90 40 L 90 75 L 10 75 Z" fill="currentColor" opacity="0.3" />
          <path d="M10 60 L 30 30 L 50 45 L 70 15 L 90 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
           <line x1="5" y1="75" x2="95" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
           <line x1="5" y1="5" x2="5" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
        </svg>
      );
    case 'Scatter Plot':
      return (
        <svg viewBox="0 0 100 80" className="w-full h-full text-purple-500">
           <line x1="5" y1="75" x2="95" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
           <line x1="5" y1="5" x2="5" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
           <circle cx="20" cy="60" r="2.5" fill="currentColor" opacity="0.7"/>
           <circle cx="35" cy="40" r="2.5" fill="currentColor" opacity="0.7"/>
           <circle cx="50" cy="50" r="2.5" fill="currentColor" opacity="0.7"/>
           <circle cx="65" cy="20" r="2.5" fill="currentColor" opacity="0.7"/>
           <circle cx="80" cy="35" r="2.5" fill="currentColor" opacity="0.7"/>
           <circle cx="30" cy="65" r="2.5" fill="currentColor" opacity="0.7"/>
           <circle cx="60" cy="30" r="2.5" fill="currentColor" opacity="0.7"/>
        </svg>
      );
    case 'Composed Chart':
      return (
         <svg viewBox="0 0 100 80" className="w-full h-full text-rose-500" fill="none">
           {/* Bar part */}
           <rect x="15" y="45" width="10" height="30" fill="currentColor" opacity="0.3" />
           <rect x="45" y="25" width="10" height="50" fill="currentColor" opacity="0.3" />
           <rect x="75" y="50" width="10" height="25" fill="currentColor" opacity="0.3" />
           {/* Line part */}
           <path d="M20 35 L 50 15 L 80 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
           <circle cx="20" cy="35" r="2" fill="white" stroke="currentColor" />
           <circle cx="50" cy="15" r="2" fill="white" stroke="currentColor" />
           <circle cx="80" cy="40" r="2" fill="white" stroke="currentColor" />
           <line x1="5" y1="75" x2="95" y2="75" stroke="currentColor" strokeWidth="1" opacity="0.5" />
         </svg>
      );
    case 'Radar Chart':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full text-cyan-500" fill="none">
           <polygon points="40,10 70,25 70,55 40,70 10,55 10,25" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
           <polygon points="40,25 55,32 55,47 40,55 25,47 25,32" stroke="currentColor" strokeWidth="0.5" opacity="0.3" />
           <path d="M40 10 L 40 70 M 10 25 L 70 55 M 70 25 L 10 55" stroke="currentColor" strokeWidth="0.5" opacity="0.2" />
           <polygon points="40,15 65,30 60,50 40,65 20,50 25,30" fill="currentColor" fillOpacity="0.4" stroke="currentColor" strokeWidth="1.5" />
        </svg>
      );
    case 'Radial Bar':
      return (
        <svg viewBox="0 0 80 80" className="w-full h-full text-orange-500" fill="none">
          <circle cx="40" cy="40" r="30" stroke="currentColor" strokeWidth="6" opacity="0.1" />
          <circle cx="40" cy="40" r="20" stroke="currentColor" strokeWidth="6" opacity="0.1" />
          <path d="M40 10 A 30 30 0 1 1 20 62" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.8"/>
          <path d="M40 20 A 20 20 0 1 1 40 60" stroke="currentColor" strokeWidth="6" strokeLinecap="round" opacity="0.5"/>
        </svg>
      );
    default:
      return null;
  }
}

const TemplatesPage: React.FC<{ onUseTemplate: () => void }> = ({ onUseTemplate }) => {
  const templates = [
    {
      title: "Bar Chart",
      description: "A classic visualization using rectangular bars to compare values across different categories.",
      advantages: [
        "Easy to compare magnitude",
        "Instantly familiar",
        "Handles negative values"
      ],
      scenarios: ["Sales by region", "Survey results", "Inventory levels"],
      color: "bg-indigo-50 border-indigo-100"
    },
    {
      title: "Line Chart",
      description: "Displays information as a series of data points connected by straight line segments.",
      advantages: [
        "Visualizing trends over time",
        "Comparing multiple series",
        "Highlighting acceleration"
      ],
      scenarios: ["Stock prices", "Website traffic", "Weather trends"],
      color: "bg-emerald-50 border-emerald-100"
    },
    {
      title: "Pie Chart",
      description: "A circular graphic divided into slices to illustrate numerical proportion.",
      advantages: [
        "Part-to-whole relationships",
        "Best for few categories",
        "Intuitive proportions"
      ],
      scenarios: ["Market share", "Budget allocation", "Demographics"],
      color: "bg-amber-50 border-amber-100"
    },
    {
      title: "Area Chart",
      description: "Similar to a line chart, but the area below the line is filled with color to emphasize volume.",
      advantages: [
        "Emphasizes volume",
        "Shows cumulative totals",
        "Visual impact"
      ],
      scenarios: ["Revenue streams", "Server load", "Accumulated savings"],
      color: "bg-blue-50 border-blue-100"
    },
    {
      title: "Scatter Plot",
      description: "Uses Cartesian coordinates to display values for typically two variables for a set of data.",
      advantages: [
        "Identifies correlations",
        "Highlights outliers",
        "Large datasets"
      ],
      scenarios: ["Ad spend vs Sales", "Height vs Weight", "Exam scores"],
      color: "bg-purple-50 border-purple-100"
    },
    {
      title: "Composed Chart",
      description: "Combines multiple chart types (e.g., bar and line) into a single visualization.",
      advantages: [
        "Compare different scales",
        "Volume vs Trend",
        "Dense information"
      ],
      scenarios: ["Revenue vs Margin", "Temp vs Rain", "Traffic vs Conversion"],
      color: "bg-rose-50 border-rose-100"
    },
    {
      title: "Radar Chart",
      description: "A graphical method of displaying multivariate data in the form of a two-dimensional chart.",
      advantages: [
        "Compare multiple variables",
        "Performance analysis",
        "Profile comparison"
      ],
      scenarios: ["Skill assessment", "Product features", "Athlete stats"],
      color: "bg-cyan-50 border-cyan-100"
    },
    {
      title: "Radial Bar",
      description: "A bar chart plotted on a polar coordinate system, often used for aesthetic comparisons.",
      advantages: [
        "Aesthetic appeal",
        "Compact layout",
        "Goal progress"
      ],
      scenarios: ["Activity rings", "Progress tracking", "Circular metrics"],
      color: "bg-orange-50 border-orange-100"
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in duration-700">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold text-slate-900 mb-4">Visual Template Library</h2>
        <p className="text-xl text-slate-600 max-w-3xl mx-auto">
          Explore our collection of professional chart templates. Each design is optimized to present specific types of data with clarity and impact.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template, index) => (
          <div 
            key={index} 
            className={`flex flex-col rounded-2xl border p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white ${template.color.replace('bg-', 'hover:bg-opacity-50 ')} border-slate-200`}
          >
            {/* Schematic Diagram Area */}
            <div className={`w-full h-32 rounded-xl mb-6 ${template.color} p-4 flex items-center justify-center`}>
               <div className="w-24 h-24">
                 <Schematic type={template.title} />
               </div>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">{template.title}</h3>
            <p className="text-sm text-slate-600 mb-4 leading-relaxed line-clamp-3">
              {template.description}
            </p>

            <div className="space-y-4 mb-6 flex-1">
              <div>
                <h4 className="flex items-center text-xs font-bold text-slate-900 uppercase tracking-wide mb-2">
                  <CheckCircle2 className="w-3 h-3 mr-1 text-green-500" />
                  Why use it?
                </h4>
                <ul className="space-y-1">
                  {template.advantages.slice(0, 2).map((adv, i) => (
                    <li key={i} className="text-xs text-slate-500 flex items-start">
                      <span className="mr-1">•</span> {adv}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 mt-auto">
              <button 
                onClick={onUseTemplate}
                className="w-full py-2 rounded-lg bg-white border border-slate-200 text-slate-700 text-sm font-semibold hover:border-indigo-600 hover:text-indigo-600 transition-colors flex items-center justify-center group"
              >
                Use Template
                <ArrowRight className="w-3 h-3 ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* CTA Section */}
      <div className="mt-20 bg-slate-900 rounded-3xl p-12 text-center text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-400 via-slate-900 to-slate-900"></div>
        <div className="relative z-10">
           <h3 className="text-3xl font-bold mb-4">Ready to visualize your data?</h3>
           <p className="text-slate-300 mb-8 max-w-xl mx-auto">
             Upload your data now and let our AI suggest the perfect template for your needs automatically.
           </p>
           <button 
             onClick={onUseTemplate}
             className="bg-indigo-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-indigo-500 transition-colors shadow-lg shadow-indigo-900/50"
           >
             Start Creating Now
           </button>
        </div>
      </div>
    </div>
  );
};

export default TemplatesPage;