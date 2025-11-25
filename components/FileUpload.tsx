import React, { useCallback, useState } from 'react';
import { Upload, FileText, Loader2, ArrowRight, X, FileSpreadsheet } from 'lucide-react';

interface FileUploadProps {
  onDataSubmit: (data: string, requirements: string) => void;
  isLoading: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ onDataSubmit, isLoading }) => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<{name: string, content: string} | null>(null);
  const [requirements, setRequirements] = useState('');
  const [pasteMode, setPasteMode] = useState(false);
  const [pastedText, setPastedText] = useState('');

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target?.result;
      if (typeof text === 'string') {
        setUploadedFile({ name: file.name, content: text });
        setPasteMode(false);
      }
    };
    reader.readAsText(file);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    const data = uploadedFile ? uploadedFile.content : pastedText;
    if (data.trim()) {
      onDataSubmit(data, requirements);
    }
  };

  const clearFile = () => {
    setUploadedFile(null);
    setRequirements('');
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Upload Area / File Status */}
      {!uploadedFile && !pasteMode && (
        <div 
          className={`relative group rounded-2xl border-2 border-dashed transition-all duration-300 ease-in-out p-10 flex flex-col items-center justify-center text-center cursor-pointer bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md
            ${dragActive ? "border-indigo-500 bg-indigo-50/50" : "border-slate-300 hover:border-indigo-400 hover:bg-slate-50"}
            ${isLoading ? "pointer-events-none opacity-50" : ""}
          `}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input 
            type="file" 
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10" 
            onChange={handleChange}
            accept=".csv,.txt,.json,.xls,.xlsx"
            disabled={isLoading}
          />
          
          <div className="bg-indigo-100 p-4 rounded-full mb-4 group-hover:scale-110 transition-transform duration-300">
            <Upload className="w-8 h-8 text-indigo-600" />
          </div>
          
          <h3 className="text-xl font-semibold text-slate-800 mb-2">
            Click to upload or drag & drop
          </h3>
          <p className="text-slate-500 max-w-sm text-sm">
            Supports CSV, Excel (as text), JSON, or plain text data.
          </p>
        </div>
      )}

      {/* Selected File View */}
      {uploadedFile && (
        <div className="bg-white rounded-xl border border-indigo-100 p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4 pb-4 border-b border-slate-100">
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-lg">
                <FileSpreadsheet className="w-6 h-6 text-green-600" />
              </div>
              <div>
                <h3 className="font-semibold text-slate-800">{uploadedFile.name}</h3>
                <p className="text-xs text-slate-400">Ready for analysis</p>
              </div>
            </div>
            <button onClick={clearFile} className="text-slate-400 hover:text-red-500 p-2 hover:bg-red-50 rounded-lg transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-700 block">
              Analysis Requirements (Optional)
            </label>
            <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Visualize sales by region for 2023, exclude Q1 data..."
              className="w-full h-24 p-3 rounded-lg border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/20 outline-none text-sm resize-none"
            />
          </div>
        </div>
      )}

      {/* Paste Mode Toggle */}
      {!uploadedFile && (
        <div className="relative">
           <div className="absolute inset-0 flex items-center">
             <span className="w-full border-t border-slate-200" />
           </div>
           <div className="relative flex justify-center text-xs uppercase">
             <button 
               onClick={() => setPasteMode(!pasteMode)}
               className="bg-[#f8fafc] px-4 text-slate-400 font-medium hover:text-indigo-600 transition-colors"
             >
               {pasteMode ? "Or upload a file" : "Or paste text data"}
             </button>
           </div>
        </div>
      )}

      {/* Paste Mode Text Area */}
      {pasteMode && !uploadedFile && (
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-4">
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Raw Data</label>
             <textarea
              value={pastedText}
              onChange={(e) => setPastedText(e.target.value)}
              placeholder="Paste your CSV or JSON data here..."
              className="w-full h-32 p-3 rounded-lg border border-slate-200 bg-slate-50 text-sm focus:border-indigo-500 outline-none resize-none font-mono"
            />
           </div>
           <div>
             <label className="text-xs font-bold text-slate-500 uppercase mb-1 block">Requirements (Optional)</label>
             <textarea
              value={requirements}
              onChange={(e) => setRequirements(e.target.value)}
              placeholder="e.g. Group by category and show average price..."
              className="w-full h-20 p-3 rounded-lg border border-slate-200 text-sm focus:border-indigo-500 outline-none resize-none"
            />
           </div>
        </div>
      )}

      {/* Action Button */}
      {(uploadedFile || pasteMode) && (
        <div className="flex justify-end">
          <button
            onClick={handleSubmit}
            disabled={(!uploadedFile && !pastedText.trim()) || isLoading}
            className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-base font-medium transition-all w-full md:w-auto justify-center
              ${(!uploadedFile && !pastedText.trim()) || isLoading 
                ? "bg-slate-100 text-slate-400 cursor-not-allowed" 
                : "bg-indigo-600 text-white hover:bg-indigo-700 shadow-lg shadow-indigo-200 hover:shadow-indigo-300 hover:-translate-y-0.5"}
            `}
          >
            {isLoading ? (
               <>
                 <Loader2 className="w-5 h-5 animate-spin" />
                 <span>Analyzing Data...</span>
               </>
            ) : (
               <>
                 <FileText className="w-5 h-5" />
                 <span>Generate Visualization</span>
                 <ArrowRight className="w-5 h-5" />
               </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default FileUpload;