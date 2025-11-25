import React, { useState, useEffect } from 'react';
import { AnalysisResult, DataPoint } from '../types';
import { Sliders, X } from 'lucide-react';

interface VisualEditorProps {
  data: AnalysisResult;
  selectedIndex: number | null;
  onUpdateData: (newData: DataPoint[]) => void;
  onClose: () => void;
}

const VisualEditor: React.FC<VisualEditorProps> = ({ data, selectedIndex, onUpdateData, onClose }) => {
  const [selectedKey, setSelectedKey] = useState<string>(data.config.dataKeys[0] || '');
  const [localValue, setLocalValue] = useState<number | string>(0);
  
  const selectedPoint = selectedIndex !== null ? data.data[selectedIndex] : null;

  // Sync state when selection or key changes
  useEffect(() => {
    if (selectedPoint && selectedKey) {
      const val = selectedPoint[selectedKey];
      setLocalValue(val);
    }
  }, [selectedIndex, selectedPoint, selectedKey]);

  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = parseFloat(e.target.value);
    setLocalValue(newVal);

    if (selectedIndex !== null && !isNaN(newVal)) {
      const newData = [...data.data];
      
      newData[selectedIndex] = {
        ...newData[selectedIndex],
        [selectedKey]: newVal
      };
      
      onUpdateData(newData);
    }
  };

  if (selectedIndex === null || !selectedPoint) {
    return (
      <div className="bg-white p-6 rounded-xl border border-dashed border-slate-200 text-center h-full flex flex-col items-center justify-center text-slate-400">
        <Sliders className="w-8 h-8 mb-2 opacity-50" />
        <p className="text-sm">Select a data point on the chart to edit its value visually.</p>
      </div>
    );
  }

  const categoryName = selectedPoint[data.config.xAxisKey];
  const maxValue = Math.max(...data.data.map(d => Number(d[selectedKey]) || 0));

  return (
    <div className="bg-white rounded-xl shadow-sm border border-indigo-100 overflow-hidden animate-in slide-in-from-right-4 duration-300">
      <div className="bg-indigo-50/50 p-4 border-b border-indigo-100 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Sliders className="w-4 h-4 text-indigo-600" />
          <h3 className="font-semibold text-slate-800 text-sm">Visual Data Tuner</h3>
        </div>
        <button onClick={onClose} className="text-slate-400 hover:text-slate-600">
          <X className="w-4 h-4" />
        </button>
      </div>
      
      <div className="p-6 space-y-6">
        <div>
          <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-1">
            Category
          </label>
          <div className="text-lg font-bold text-slate-900">{categoryName}</div>
        </div>

        <div>
           <label className="text-xs font-medium text-slate-500 uppercase tracking-wider block mb-2">
            Data Series
          </label>
          <select 
            value={selectedKey} 
            onChange={(e) => setSelectedKey(e.target.value)}
            className="w-full mb-4 p-2 text-sm border border-slate-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 outline-none"
          >
            {data.config.dataKeys.map(key => (
              <option key={key} value={key}>{key}</option>
            ))}
          </select>

          <div className="flex justify-between items-center mb-2">
             <label className="text-xs font-medium text-slate-500 uppercase tracking-wider">
               Value
             </label>
             <span className="text-sm font-mono font-medium text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded">
               {typeof localValue === 'number' ? localValue.toFixed(1) : localValue}
             </span>
          </div>
          
          <div className="flex items-center space-x-4">
             <input 
              type="range"
              min="0"
              max={maxValue * 1.5 || 100}
              value={Number(localValue) || 0}
              onChange={handleValueChange}
              className="flex-1 h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 hover:accent-indigo-500"
            />
          </div>
          <div className="mt-2">
             <input
                type="number"
                value={localValue}
                onChange={handleValueChange}
                className="w-full border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
             />
          </div>
        </div>

        <div className="pt-4 border-t border-slate-100">
          <p className="text-xs text-slate-400 italic">
            Changes update the chart instantly. Insights may need regeneration.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VisualEditor;
