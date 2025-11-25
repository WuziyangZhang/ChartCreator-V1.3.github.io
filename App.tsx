import React, { useState, useRef } from 'react';
import Header from './components/Header';
import FileUpload from './components/FileUpload';
import ChartRenderer from './components/ChartRenderer';
import InsightPanel from './components/InsightPanel';
import VisualEditor from './components/VisualEditor';
import TemplatesPage from './components/TemplatesPage';
import AccountPage from './components/AccountPage';
import HelpPage from './components/HelpPage';
import ExportDialog from './components/ExportDialog';
import { useAnalysis } from './hooks/useAnalysis';
import { useChartExport } from './hooks/useChartExport';
import { AnalysisStatus, ChartType } from './types';
import { 
  Download, Sparkles, Loader2, BarChart2, PieChart, LineChart as LineIcon, 
  Activity, Grid, RefreshCw, Send, Ruler, Move, Palette, 
  Layout, PenTool, Rocket, Table, ChevronRight, MousePointerClick, Globe2, Layers
} from 'lucide-react';

type Tool = 'size' | 'graph' | 'axes' | 'color' | 'elements' | 'annotate' | 'powerups' | 'data';

const App: React.FC = () => {
  const [step, setStep] = useState<'landing' | 'workspace' | 'templates' | 'account' | 'help'>('landing');
  const [activeTool, setActiveTool] = useState<Tool>('graph');
  const [refinementPrompt, setRefinementPrompt] = useState("");
  const [showExportDialog, setShowExportDialog] = useState(false);
  
  const chartContainerRef = useRef<HTMLDivElement>(null);
  const tableRef = useRef<HTMLDivElement>(null);

  // Custom Hooks
  const { 
    data, 
    status, 
    error: analysisError, 
    selectedDataIndex, 
    isRegeneratingInsights,
    analyzeData,
    refineAnalysis,
    updateData,
    updateConfig,
    updateChartType,
    regenerateChartInsights,
    setSelectedDataIndex,
    reset
  } = useAnalysis();

  const { handleExport, exportError } = useChartExport(chartContainerRef);

  const loading = status === AnalysisStatus.ANALYZING;
  const isRefining = status === AnalysisStatus.REFINING;
  const error = analysisError || exportError;

  const handleDataSubmit = async (rawData: string, requirements: string) => {
    await analyzeData(rawData, requirements);
    setStep('workspace');
  };

  const onRefineClick = async () => {
    if (!refinementPrompt.trim()) return;
    await refineAnalysis(refinementPrompt);
    setRefinementPrompt("");
  };

  const renderLanding = () => (
    <div className="max-w-6xl mx-auto mt-12 text-center px-4 pb-16">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8 inline-flex items-center px-3 py-1 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium border border-indigo-100">
           <Sparkles className="w-3 h-3 mr-1" />
           AI-Powered Data Visualization
        </div>
        <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
          ChartCreator
        </h2>
        <p className="text-xl text-slate-600 mb-12 max-w-2xl mx-auto leading-relaxed">
          Upload data, get professional charts instantly. <br/>
          <span className="text-indigo-600 font-semibold">Drag & Edit</span> values visually to explore scenarios.
        </p>
        
        <FileUpload onDataSubmit={handleDataSubmit} isLoading={loading} />
      </div>

      {/* Features Highlight Section (Moved Up) */}
      <div className="mt-24 mb-20">
        <div className="mb-12">
           <h3 className="text-2xl font-bold text-slate-900 mb-3">Everything you need to tell your data story</h3>
           <p className="text-slate-500 max-w-2xl mx-auto">
             Powerful tools designed for students, researchers, and business professionals to create stunning visualizations in seconds.
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {/* Feature 1: AI Analysis */}
          <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-indigo-100 to-purple-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="w-12 h-12 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Sparkles className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Instant AI Analysis</h3>
             <p className="text-sm text-slate-500 leading-relaxed relative z-10">
               Drop your raw CSV or Excel data. Our AI instantly identifies patterns, cleans inputs, and builds the perfect visualization structure.
             </p>
          </div>

          {/* Feature 2: Visual Editing */}
          <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-100 to-teal-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <MousePointerClick className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Visual Data Tuning</h3>
             <p className="text-sm text-slate-500 leading-relaxed relative z-10">
               Unique to ChartCreator. Click any bar or point on the chart and drag a slider to modify underlying numbers in real-time.
             </p>
          </div>

          {/* Feature 3: Bilingual Insights */}
          <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-100 to-cyan-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Globe2 className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Global Insights</h3>
             <p className="text-sm text-slate-500 leading-relaxed relative z-10">
               Automatically generate professional key takeaways and summaries in both English and Chinese to help you explain your findings.
             </p>
          </div>

          {/* Feature 4: Pro Export */}
          <div className="group relative bg-white p-6 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-orange-100 to-amber-50 rounded-bl-full -mr-4 -mt-4 opacity-50 group-hover:opacity-100 transition-opacity" />
             <div className="w-12 h-12 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-600 mb-4 group-hover:scale-110 transition-transform duration-300 relative z-10">
                <Layers className="w-6 h-6" />
             </div>
             <h3 className="text-lg font-bold text-slate-900 mb-2 relative z-10">Production Ready</h3>
             <p className="text-sm text-slate-500 leading-relaxed relative z-10">
               Export as transparent PNGs, JPEGs, or scalable SVGs. Customize backgrounds for dark mode slides or professional reports.
             </p>
          </div>
        </div>
      </div>

      {/* Partner Logos Section (Moved Down) */}
      <div className="max-w-4xl mx-auto mt-16 pt-8 border-t border-slate-100">
        <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-8">Trusted by students & professionals at</p>
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-60 hover:opacity-100 transition-opacity duration-300">
            {/* Apple */}
            <div className="flex items-center font-semibold text-xl text-slate-800 font-sans">
              <span className="mr-1 text-xl"></span> Apple
            </div>
            
            {/* EY */}
            <div className="font-serif font-bold text-2xl text-slate-700 tracking-tighter">EY</div>
            
            {/* PwC */}
            <div className="font-serif font-bold text-2xl text-slate-700">pwc</div>

            {/* Google */}
            <div className="font-sans font-bold text-lg text-slate-600">Google</div>
            
            {/* UW-Madison */}
            <div className="font-serif font-bold text-base text-slate-600">UW-Madison</div>
            
            {/* U of Toronto */}
            <div className="font-serif font-bold text-base text-slate-600">U of Toronto</div>
        </div>
      </div>
    </div>
  );

  const renderWorkspace = () => {
    if (!data) return null;
    
    // Define Tools
    const tools: { id: Tool; icon: any; label: string }[] = [
      { id: 'size', icon: Ruler, label: 'Size' },
      { id: 'graph', icon: BarChart2, label: 'Graph' },
      { id: 'axes', icon: Move, label: 'Axes' },
      { id: 'color', icon: Palette, label: 'Color' },
      { id: 'elements', icon: Layout, label: 'Elements' },
      { id: 'annotate', icon: PenTool, label: 'Annotate' },
      { id: 'powerups', icon: Rocket, label: 'Power-ups' },
      { id: 'data', icon: Table, label: 'Edit data' },
    ];

    // Color Palettes
    const palettes = [
       { name: "Default", colors: data.config.colors },
       { name: "Ocean", colors: ["#0ea5e9", "#0284c7", "#0369a1", "#075985", "#0c4a6e"] },
       { name: "Forest", colors: ["#10b981", "#059669", "#047857", "#065f46", "#064e3b"] },
       { name: "Sunset", colors: ["#f59e0b", "#d97706", "#b45309", "#78350f", "#451a03"] },
       { name: "Berry", colors: ["#ec4899", "#db2777", "#be185d", "#9d174d", "#831843"] },
       { name: "Mono", colors: ["#94a3b8", "#64748b", "#475569", "#334155", "#1e293b"] },
    ];

    return (
      <div className="flex flex-col lg:flex-row h-[calc(100vh-64px)] overflow-hidden">
        
        {/* New Left Sidebar Container: Icon Strip + Tool Panel */}
        <div className="w-full lg:w-auto flex bg-white border-r border-slate-200 z-10 shadow-sm transition-all">
          
          {/* 1. Icon Strip */}
          <div className="w-16 lg:w-20 bg-white border-r border-slate-100 flex flex-col items-center py-4 space-y-4 overflow-y-auto hide-scrollbar">
             {tools.map(tool => (
               <button
                 key={tool.id}
                 onClick={() => {
                   setActiveTool(tool.id);
                   if (tool.id === 'data' && tableRef.current) {
                      tableRef.current.scrollIntoView({ behavior: 'smooth' });
                   }
                 }}
                 className={`flex flex-col items-center justify-center w-full py-2 space-y-1 transition-all
                   ${activeTool === tool.id ? 'text-indigo-600 bg-indigo-50 border-r-2 border-indigo-600' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'}
                 `}
               >
                 <tool.icon className="w-5 h-5" />
                 <span className="text-[9px] font-medium">{tool.label}</span>
               </button>
             ))}
          </div>

          {/* 2. Tool Panel */}
          <div className="w-64 bg-white flex flex-col h-full overflow-y-auto animate-in fade-in duration-300">
             <div className="p-4 border-b border-slate-100 bg-slate-50/50">
               <h3 className="font-semibold text-slate-800 capitalize flex items-center">
                 {tools.find(t => t.id === activeTool)?.label || 'Tools'}
               </h3>
             </div>

             <div className="p-4 space-y-6">
                
                {/* TOOL: SIZE */}
                {activeTool === 'size' && (
                  <div className="space-y-4">
                     <div>
                       <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Chart Height</label>
                       <input 
                         type="range" 
                         min="300" 
                         max="800" 
                         value={data.config.height || 400}
                         onChange={(e) => updateConfig({ height: parseInt(e.target.value) })}
                         className="w-full accent-indigo-600"
                       />
                       <div className="flex justify-between text-xs text-slate-400 mt-1">
                          <span>Small</span>
                          <span>{data.config.height || 400}px</span>
                          <span>Large</span>
                       </div>
                     </div>
                     <p className="text-xs text-slate-400">
                       Adjust the vertical height of the chart container.
                     </p>
                  </div>
                )}

                {/* TOOL: GRAPH */}
                {activeTool === 'graph' && (
                  <div className="grid grid-cols-2 gap-2">
                   {[ChartType.BAR, ChartType.LINE, ChartType.AREA, ChartType.PIE, ChartType.SCATTER, ChartType.RADAR, ChartType.RADIAL].map(type => (
                      <button 
                        key={type}
                        onClick={() => updateChartType(type)}
                        className={`p-3 rounded-lg text-sm font-medium flex flex-col items-center justify-center space-y-2 transition-all border
                          ${data.chartType === type 
                            ? 'bg-indigo-50 border-indigo-200 text-indigo-700 shadow-sm' 
                            : 'bg-white border-slate-100 text-slate-500 hover:bg-slate-50 hover:border-slate-200'}`}
                      >
                         {type === ChartType.BAR && <BarChart2 className="w-5 h-5" />}
                         {type === ChartType.LINE && <LineIcon className="w-5 h-5" />}
                         {type === ChartType.AREA && <Grid className="w-5 h-5" />}
                         {type === ChartType.PIE && <PieChart className="w-5 h-5" />}
                         {type === ChartType.SCATTER && <Activity className="w-5 h-5" />}
                         {type === ChartType.RADAR && <Activity className="w-5 h-5" />} 
                         {type === ChartType.RADIAL && <PieChart className="w-5 h-5" />}
                         <span className="capitalize text-[10px]">{type.toLowerCase()}</span>
                      </button>
                   ))}
                 </div>
                )}

                {/* TOOL: AXES */}
                {activeTool === 'axes' && (
                   <div className="space-y-4">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">X-Axis Label</label>
                        <input 
                          type="text" 
                          value={data.config.xAxisLabel || ""}
                          onChange={(e) => updateConfig({ xAxisLabel: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 outline-none"
                          placeholder="Auto"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Y-Axis Label</label>
                        <input 
                          type="text" 
                          value={data.config.yAxisLabel || ""}
                          onChange={(e) => updateConfig({ yAxisLabel: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 outline-none"
                          placeholder="Auto"
                        />
                     </div>
                     <div className="flex items-center justify-between pt-2">
                        <span className="text-sm text-slate-700">Show Grid Lines</span>
                        <button 
                           onClick={() => updateConfig({ showGrid: !data.config.showGrid })}
                           className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${data.config.showGrid !== false ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'}`}
                        >
                           <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </button>
                     </div>
                   </div>
                )}

                {/* TOOL: COLOR */}
                {activeTool === 'color' && (
                  <div className="space-y-4">
                    {/* Custom Color Picker */}
                    <div>
                       <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Custom Palette</label>
                       <div className="flex flex-wrap gap-2">
                          {data.config.colors.map((color, idx) => (
                            <div key={idx} className="relative group">
                               <input 
                                 type="color" 
                                 value={color}
                                 onChange={(e) => {
                                   const newColors = [...data.config.colors];
                                   newColors[idx] = e.target.value;
                                   updateConfig({ colors: newColors });
                                 }}
                                 className="w-8 h-8 rounded-full overflow-hidden cursor-pointer border-0 p-0"
                               />
                            </div>
                          ))}
                       </div>
                    </div>

                    <div className="border-t border-slate-100 pt-2">
                       <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Preset Palettes</label>
                       <div className="space-y-2">
                         {palettes.map(palette => (
                            <button
                               key={palette.name}
                               onClick={() => updateConfig({ colors: palette.colors })}
                               className="w-full p-2 rounded-lg border border-slate-100 hover:border-indigo-200 flex items-center justify-between group"
                            >
                               <span className="text-sm text-slate-600 font-medium group-hover:text-indigo-600">{palette.name}</span>
                               <div className="flex space-x-1">
                                  {palette.colors.slice(0, 5).map(c => (
                                     <div key={c} className="w-4 h-4 rounded-full" style={{ backgroundColor: c }} />
                                  ))}
                               </div>
                            </button>
                         ))}
                       </div>
                    </div>
                  </div>
                )}

                {/* TOOL: ELEMENTS */}
                {activeTool === 'elements' && (
                  <div className="space-y-4">
                     <div className="flex items-center justify-between">
                        <span className="text-sm text-slate-700">Show Legend</span>
                        <button 
                           onClick={() => updateConfig({ showLegend: !data.config.showLegend })}
                           className={`w-10 h-6 rounded-full transition-colors flex items-center p-1 ${data.config.showLegend !== false ? 'bg-indigo-600 justify-end' : 'bg-slate-200 justify-start'}`}
                        >
                           <div className="w-4 h-4 bg-white rounded-full shadow-sm" />
                        </button>
                     </div>
                  </div>
                )}

                {/* TOOL: ANNOTATE */}
                {activeTool === 'annotate' && (
                  <div className="space-y-4">
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Chart Title</label>
                        <input 
                          type="text" 
                          value={data.config.title}
                          onChange={(e) => updateConfig({ title: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 outline-none font-semibold"
                        />
                     </div>
                     <div>
                        <label className="text-xs font-bold text-slate-500 uppercase mb-2 block">Description</label>
                        <textarea 
                          value={data.config.description}
                          onChange={(e) => updateConfig({ description: e.target.value })}
                          className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:border-indigo-500 outline-none resize-none h-24"
                        />
                     </div>
                  </div>
                )}

                {/* TOOL: POWER-UPS (AI) */}
                {activeTool === 'powerups' && (
                  <div className="space-y-4">
                     <div className="bg-indigo-50 rounded-xl p-3 border border-indigo-100">
                        <div className="flex items-center space-x-2 mb-2 text-indigo-800 font-semibold text-sm">
                           <Sparkles className="w-4 h-4" />
                           <h3>Refine with AI</h3>
                        </div>
                        <textarea 
                           className="w-full h-24 bg-white border border-indigo-100 rounded-lg focus:ring-2 focus:ring-indigo-200 text-sm p-2 resize-none text-slate-700 placeholder:text-slate-400 mb-2"
                           placeholder="Describe changes (e.g., 'Filter values < 100')..."
                           value={refinementPrompt}
                           onChange={(e) => setRefinementPrompt(e.target.value)}
                        />
                        <button 
                           onClick={onRefineClick}
                           disabled={isRefining || !refinementPrompt.trim()}
                           className="w-full py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-colors shadow-sm flex items-center justify-center space-x-2 text-sm font-medium"
                        >
                           {isRefining ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-3 h-3" />}
                           <span>Apply Changes</span>
                        </button>
                     </div>
                  </div>
                )}
                 
                 {/* TOOL: DATA */}
                 {activeTool === 'data' && (
                    <div className="text-center py-8">
                       <Table className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                       <p className="text-sm text-slate-500 mb-4">View and edit source data</p>
                       <button 
                          onClick={() => tableRef.current?.scrollIntoView({ behavior: 'smooth' })}
                          className="text-indigo-600 text-sm font-medium hover:underline flex items-center justify-center mx-auto"
                       >
                          Scroll to Data Table <ChevronRight className="w-4 h-4" />
                       </button>
                    </div>
                 )}

             </div>
          </div>
        </div>

        {/* Center: Canvas */}
        <div className="flex-1 bg-[#f8fafc] overflow-y-auto p-4 md:p-8 flex flex-col relative">
          {/* Toolbar */}
          <div className="flex justify-between items-center mb-6">
            <div>
               <h2 className="text-2xl font-bold text-slate-900">{data.config.title}</h2>
               <p className="text-sm text-slate-500">{data.config.description}</p>
            </div>
            <button 
              onClick={() => setShowExportDialog(true)}
              className="flex items-center space-x-2 px-4 py-2 bg-white border border-slate-200 rounded-lg text-sm font-medium hover:bg-slate-50 transition-colors shadow-sm"
            >
               <Download className="w-4 h-4" />
               <span className="hidden sm:inline">Export</span>
            </button>
          </div>

          {/* Chart Area */}
          <div 
             ref={chartContainerRef} 
             className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 relative group flex flex-col mb-8 transition-all duration-300"
             style={{ minHeight: `${data.config.height || 400}px` }}
          >
             <div className="absolute top-4 right-4 bg-indigo-50 text-indigo-700 px-3 py-1 rounded-full text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                Click bars/points to edit
             </div>
             {isRefining && (
               <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-20 flex flex-col items-center justify-center">
                 <Loader2 className="w-8 h-8 text-indigo-600 animate-spin mb-2" />
                 <p className="text-sm font-medium text-slate-600">Updating Analysis...</p>
               </div>
             )}
             <div className="flex-1">
                <ChartRenderer 
                   analysis={data} 
                   onDataPointClick={setSelectedDataIndex}
                   selectedIndex={selectedDataIndex}
                />
             </div>
          </div>

          {/* Data Table Mini View */}
          <div ref={tableRef} className="mt-auto">
             <div className="flex items-center space-x-2 mb-4">
                <Grid className="w-4 h-4 text-slate-400" />
                <h3 className="text-sm font-semibold text-slate-700">Source Data Preview</h3>
             </div>
             <div className="bg-white rounded-xl border border-slate-200 overflow-hidden overflow-x-auto shadow-sm">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium">
                    <tr>
                      {Object.keys(data.data[0] || {}).map(key => (
                        <th key={key} className="px-4 py-3 whitespace-nowrap">{key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {data.data.slice(0, 5).map((row, idx) => (
                       <tr key={idx} className={`transition-colors ${idx === selectedDataIndex ? 'bg-indigo-50' : 'hover:bg-slate-50'}`}>
                          {Object.values(row).map((val, vIdx) => (
                            <td key={vIdx} className="px-4 py-3 text-slate-600 whitespace-nowrap">{val}</td>
                          ))}
                       </tr>
                    ))}
                    {data.data.length > 5 && (
                      <tr><td colSpan={100} className="px-4 py-2 text-xs text-slate-400 text-center bg-slate-50/50">... {data.data.length - 5} more rows</td></tr>
                    )}
                  </tbody>
                </table>
             </div>
          </div>
        </div>

        {/* Right Sidebar: Intelligence & Editor */}
        <div className="w-full lg:w-80 bg-white border-l border-slate-200 flex flex-col h-full overflow-hidden">
          
          {/* Visual Editor Panel */}
          <div className="p-4 border-b border-slate-100">
             <VisualEditor 
                data={data} 
                selectedIndex={selectedDataIndex} 
                onUpdateData={updateData}
                onClose={() => setSelectedDataIndex(null)}
             />
          </div>

          {/* Insights Panel */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
             <div className="flex items-center justify-between">
                <h3 className="font-semibold text-slate-800 flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-500" />
                  AI Insights
                </h3>
                <button 
                  onClick={regenerateChartInsights}
                  disabled={isRegeneratingInsights}
                  className="text-xs flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 disabled:opacity-50 font-medium bg-indigo-50 px-2 py-1 rounded-md"
                >
                   <RefreshCw className={`w-3 h-3 ${isRegeneratingInsights ? 'animate-spin' : ''}`} />
                   <span>{isRegeneratingInsights ? 'Updating...' : 'Update'}</span>
                </button>
             </div>
             
             <div className="h-full">
               <InsightPanel insights={data.insights} />
             </div>
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 font-sans">
      <Header 
        onHomeClick={() => { setStep('landing'); reset(); }} 
        onTemplatesClick={() => setStep('templates')}
        onAccountClick={() => setStep('account')}
        onHelpClick={() => setStep('help')}
      />
      
      <main>
        {/* Export Dialog */}
        <ExportDialog 
          isOpen={showExportDialog} 
          onClose={() => setShowExportDialog(false)} 
          onExport={(config) => { setShowExportDialog(false); handleExport(config); }}
        />

        {/* Error Toast */}
        {error && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50 px-6 py-3 bg-red-500 text-white rounded-full shadow-lg flex items-center space-x-2 animate-in fade-in slide-in-from-top-4">
            <Activity className="w-4 h-4" />
            <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {step === 'landing' && renderLanding()}
        {step === 'workspace' && renderWorkspace()}
        {step === 'templates' && (
          <TemplatesPage onUseTemplate={() => setStep('landing')} />
        )}
        {step === 'account' && (
          <AccountPage onLogout={() => setStep('landing')} />
        )}
        {step === 'help' && (
          <HelpPage onBack={() => setStep('landing')} />
        )}
      </main>
    </div>
  );
};

export default App;