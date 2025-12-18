import React from 'react';
import { PropertyMode } from '../types';
import { Home, Briefcase, Tractor, Plane, Menu, Search, Bell, Flame } from 'lucide-react';

interface NavigationProps {
  activeMode: PropertyMode;
  onModeChange: (mode: PropertyMode) => void;
  onGoHome: () => void;
  onOpenHotRequest: () => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeMode, onModeChange, onGoHome, onOpenHotRequest }) => {
  const navItems: { mode: PropertyMode; label: string; icon: React.ReactNode }[] = [
    { mode: 'LIVING', label: 'Living', icon: <Home className="w-4 h-4" /> },
    { mode: 'BUSINESS', label: 'Business', icon: <Briefcase className="w-4 h-4" /> },
    { mode: 'PRODUCTION', label: 'Production', icon: <Tractor className="w-4 h-4" /> },
    { mode: 'TRAVEL', label: 'Travel', icon: <Plane className="w-4 h-4" /> },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 cursor-pointer" onClick={onGoHome}>
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">P</div>
          <span className="font-bold text-slate-800 text-lg hidden md:block">PropOS</span>
        </div>

        {/* Central Mode Toggles */}
        <div className="hidden md:flex items-center bg-slate-100 p-1 rounded-lg">
          {navItems.map((item) => (
            <button
              key={item.mode}
              onClick={() => onModeChange(item.mode)}
              className={`flex items-center gap-2 px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                activeMode === item.mode
                  ? 'bg-white text-blue-600 shadow-sm'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {item.icon}
              {item.label}
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={onOpenHotRequest}
            className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-orange-50 text-orange-600 hover:bg-orange-100 rounded-full text-sm font-semibold transition-colors border border-orange-100"
          >
            <Flame className="w-4 h-4 fill-orange-600" />
            Hot Request
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-full transition-colors relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"></span>
          </button>
          <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 overflow-hidden cursor-pointer">
            <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix" alt="User" />
          </div>
          <button className="md:hidden p-2 text-slate-500">
             <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
      
      {/* Mobile Mode Toggles */}
      <div className="md:hidden flex flex-col p-2 gap-2 border-t border-slate-100">
         <div className="flex overflow-x-auto gap-2 no-scrollbar">
            {navItems.map((item) => (
                <button
                key={item.mode}
                onClick={() => onModeChange(item.mode)}
                className={`flex-shrink-0 flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${
                    activeMode === item.mode
                    ? 'bg-blue-50 text-blue-600'
                    : 'bg-white text-slate-500 border border-slate-200'
                }`}
                >
                {item.icon}
                {item.label}
                </button>
            ))}
         </div>
         <button 
            onClick={onOpenHotRequest}
            className="flex items-center justify-center gap-2 px-3 py-2 bg-orange-600 text-white rounded-lg text-sm font-semibold transition-colors w-full"
          >
            <Flame className="w-4 h-4 fill-white" />
            Post Hot Request
          </button>
      </div>
    </nav>
  );
};

export default Navigation;