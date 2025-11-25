import React from 'react';
import { BarChart3, User, HelpCircle } from 'lucide-react';

interface HeaderProps {
  onHomeClick: () => void;
  onTemplatesClick: () => void;
  onAccountClick: () => void;
  onHelpClick: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHomeClick, onTemplatesClick, onAccountClick, onHelpClick }) => {
  return (
    <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6 sticky top-0 z-50">
      <div className="flex items-center space-x-3 cursor-pointer" onClick={onHomeClick}>
        <div className="bg-indigo-600 p-2 rounded-lg shadow-sm shadow-indigo-200">
          <BarChart3 className="w-5 h-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-slate-900 tracking-tight">ChartCreator</h1>
        </div>
      </div>
      
      <nav className="flex items-center space-x-6">
        <button onClick={onHomeClick} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">Workspace</button>
        <button onClick={onTemplatesClick} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">Templates</button>
        <button onClick={onHelpClick} className="text-sm font-medium text-slate-500 hover:text-indigo-600 transition-colors">Help</button>
        <div className="h-6 w-px bg-slate-200"></div>
        <button 
          onClick={onAccountClick}
          className="flex items-center space-x-2 group"
        >
           <div className="w-8 h-8 rounded-full bg-indigo-100 group-hover:bg-indigo-200 border border-indigo-200 flex items-center justify-center text-indigo-700 transition-colors">
             <User className="w-4 h-4" />
           </div>
           <span className="text-sm font-medium text-slate-600 group-hover:text-indigo-600 transition-colors hidden sm:inline">My Account</span>
        </button>
      </nav>
    </header>
  );
};

export default Header;