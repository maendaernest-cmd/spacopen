import React, { useState } from 'react';
import { X, Flame, Map, Check, PenTool } from 'lucide-react';
import { PropertyMode } from '../types';

interface HotRequestModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (description: string, mode: PropertyMode, budget: string, hasCustomArea: boolean) => void;
}

const HotRequestModal: React.FC<HotRequestModalProps> = ({ isOpen, onClose, onSubmit }) => {
  const [description, setDescription] = useState('');
  const [mode, setMode] = useState<PropertyMode>('LIVING');
  const [budget, setBudget] = useState('');
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasCustomArea, setHasCustomArea] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(description, mode, budget, hasCustomArea);
    setDescription('');
    setBudget('');
    setHasCustomArea(false);
    onClose();
  };

  const handleDrawClick = () => {
    if (hasCustomArea) {
      setHasCustomArea(false);
      return;
    }
    
    setIsDrawing(true);
    // Simulate drawing interaction delay
    setTimeout(() => {
      setIsDrawing(false);
      setHasCustomArea(true);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden scale-100 transition-transform">
         <div className="bg-orange-600 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-2">
               <Flame className="w-5 h-5 fill-white" />
               <h3 className="font-bold">Post a Hot Request</h3>
            </div>
            <button onClick={onClose} className="hover:bg-white/20 p-1 rounded transition-colors"><X className="w-5 h-5" /></button>
         </div>
         
         <form onSubmit={handleSubmit} className="p-6 space-y-4">
            <div>
               <label className="block text-sm font-medium text-slate-700 mb-1">What are you looking for?</label>
               <textarea 
                 required
                 value={description}
                 onChange={e => setDescription(e.target.value)}
                 className="w-full border border-slate-200 rounded-lg p-3 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                 placeholder="e.g., 3-bedroom apartment near CBD..."
                 rows={3}
               />
            </div>

            <div className="grid grid-cols-2 gap-4">
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Category</label>
                  <select 
                    value={mode}
                    onChange={e => setMode(e.target.value as PropertyMode)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                  >
                     <option value="LIVING">Living</option>
                     <option value="BUSINESS">Business</option>
                     <option value="PRODUCTION">Production</option>
                     <option value="TRAVEL">Travel</option>
                  </select>
               </div>
               <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Budget (USD)</label>
                  <input 
                    type="text"
                    required
                    value={budget}
                    onChange={e => setBudget(e.target.value)}
                    className="w-full border border-slate-200 rounded-lg p-2.5 text-sm focus:ring-2 focus:ring-orange-500 focus:outline-none"
                    placeholder="e.g. 500/mo"
                  />
               </div>
            </div>

            {/* Draw Search Feature */}
            <div className="pt-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Location Boundary</label>
              <button
                type="button"
                onClick={handleDrawClick}
                disabled={isDrawing}
                className={`w-full border-2 border-dashed rounded-xl p-4 flex items-center justify-center gap-3 transition-all ${
                  hasCustomArea 
                    ? 'border-emerald-400 bg-emerald-50 text-emerald-700' 
                    : isDrawing 
                      ? 'border-blue-300 bg-blue-50 text-blue-600 animate-pulse'
                      : 'border-slate-300 hover:border-slate-400 text-slate-500 hover:text-slate-600'
                }`}
              >
                {isDrawing ? (
                  <>
                    <PenTool className="w-5 h-5 animate-bounce" />
                    <span className="font-medium">Simulating Drawing...</span>
                  </>
                ) : hasCustomArea ? (
                  <>
                    <Check className="w-5 h-5" />
                    <span className="font-bold">Custom Area Defined</span>
                    <span className="text-xs bg-white px-2 py-0.5 rounded border border-emerald-200 ml-auto">Click to remove</span>
                  </>
                ) : (
                  <>
                    <Map className="w-5 h-5" />
                    <span className="font-medium">Draw Custom Search Area</span>
                  </>
                )}
              </button>
            </div>

            <div className="pt-2">
               <button type="submit" className="w-full bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 rounded-lg shadow-lg shadow-orange-200 transition-all flex justify-center items-center gap-2">
                  <Flame className="w-4 h-4" />
                  Post Request
               </button>
               <p className="text-xs text-center text-slate-400 mt-3">Matched owners will be notified instantly.</p>
            </div>
         </form>
      </div>
    </div>
  );
}
export default HotRequestModal;