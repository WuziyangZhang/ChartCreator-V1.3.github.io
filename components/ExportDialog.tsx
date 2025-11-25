import React, { useState } from 'react';
import { X, Download, Image, FileCode, Check } from 'lucide-react';
import { ExportConfig } from '../types';

interface ExportDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onExport: (config: ExportConfig) => void;
}

const ExportDialog: React.FC<ExportDialogProps> = ({ isOpen, onClose, onExport }) => {
  const [format, setFormat] = useState<ExportConfig['format']>('png');
  const [background, setBackground] = useState<ExportConfig['background']>('white');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 m-4 animate-in zoom-in-95 duration-200 border border-slate-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold text-slate-900">Export Chart</h3>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors text-slate-500">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Format Selection */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">File Format</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setFormat('png')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                  format === 'png' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                <Image className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">PNG</span>
              </button>
              <button
                onClick={() => setFormat('jpeg')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                  format === 'jpeg' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                <Image className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">JPEG</span>
              </button>
              <button
                onClick={() => setFormat('svg')}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                  format === 'svg' ? 'border-indigo-600 bg-indigo-50 text-indigo-700' : 'border-slate-100 hover:border-slate-200 text-slate-600'
                }`}
              >
                <FileCode className="w-6 h-6 mb-2" />
                <span className="text-sm font-semibold">SVG</span>
              </button>
            </div>
          </div>

          {/* Background Selection */}
          <div>
            <label className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 block">Background</label>
            <div className="grid grid-cols-3 gap-3">
              <button
                onClick={() => setBackground('white')}
                className={`group relative h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                  background === 'white' ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'
                }`}
              >
                <div className="flex items-center space-x-2">
                   <div className="w-4 h-4 rounded-full border border-slate-300 bg-white"></div>
                   <span className="text-sm font-medium text-slate-700">White</span>
                </div>
                {background === 'white' && <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-600 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></div>}
              </button>

              <button
                onClick={() => setBackground('black')}
                className={`group relative h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                  background === 'black' ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'
                }`}
              >
                 <div className="flex items-center space-x-2">
                   <div className="w-4 h-4 rounded-full border border-slate-600 bg-slate-900"></div>
                   <span className="text-sm font-medium text-slate-700">Black</span>
                </div>
                {background === 'black' && <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-600 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></div>}
              </button>

              <button
                onClick={() => setBackground('transparent')}
                disabled={format === 'jpeg'}
                className={`group relative h-12 rounded-lg border-2 flex items-center justify-center transition-all ${
                  background === 'transparent' ? 'border-indigo-600 ring-2 ring-indigo-100' : 'border-slate-200'
                } ${format === 'jpeg' ? 'opacity-50 cursor-not-allowed bg-slate-50' : ''}`}
              >
                <div className="flex items-center space-x-2">
                   <div className="w-4 h-4 rounded-full border border-slate-300 bg-[url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAQAAAAECAYAAACp8Z5+AAAAIklEQVQIW2NkQAKrVq36zwjjgzhhYWGMYAEYB8RmROaABADeOQ8CXl/xfgAAAABJRU5ErkJggg==')]"></div>
                   <span className="text-sm font-medium text-slate-700">None</span>
                </div>
                {background === 'transparent' && <div className="absolute top-0 right-0 -mt-2 -mr-2 bg-indigo-600 text-white rounded-full p-0.5"><Check className="w-3 h-3" /></div>}
              </button>
            </div>
            {format === 'jpeg' && background === 'transparent' && (
              <p className="text-xs text-amber-600 mt-2">JPEG does not support transparency. White background will be used.</p>
            )}
          </div>

          <button
            onClick={() => onExport({ format, background: format === 'jpeg' && background === 'transparent' ? 'white' : background })}
            className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold text-sm shadow-lg shadow-indigo-200 hover:bg-indigo-700 hover:shadow-indigo-300 transition-all flex items-center justify-center space-x-2"
          >
            <Download className="w-4 h-4" />
            <span>Download High-Res {format.toUpperCase()}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportDialog;