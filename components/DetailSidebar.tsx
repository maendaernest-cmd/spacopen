import React from 'react';
import { Property } from '../types';
import { CheckCircle2, AlertTriangle, TrendingUp, Lock } from 'lucide-react';
import { LineChart, Line, ResponsiveContainer, XAxis, Tooltip } from 'recharts';

interface DetailSidebarProps {
  property: Property;
  onAddLog: (category: string, title: string) => void;
}

const mockChartData = [
  { name: 'Jan', value: 40000 },
  { name: 'Feb', value: 42000 },
  { name: 'Mar', value: 41500 },
  { name: 'Apr', value: 43000 },
  { name: 'May', value: 45000 },
];

const DetailSidebar: React.FC<DetailSidebarProps> = ({ property, onAddLog }) => {
  // Basic logic to generate summary text based on logs
  const isVerified = property.logs.some(l => l.category === 'TRUST' && l.title.includes('Ownership'));
  const hasSpatial = property.logs.some(l => l.category === 'SPATIAL');
  const hasLegal = property.logs.some(l => l.category === 'LEGAL');
  const riskCount = property.logs.filter(l => l.description.toLowerCase().includes('risk') || l.description.toLowerCase().includes('fail')).length;

  return (
    <div className="w-full lg:w-96 bg-slate-50 border-l border-slate-200 h-full overflow-y-auto p-6 flex flex-col gap-6">
      {/* Score Header */}
      <div>
        <h2 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Cumulative Summary</h2>
        <div className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <div>
            <div className="text-3xl font-bold text-slate-800">{property.summaryScore}<span className="text-sm text-slate-400 font-normal">/100</span></div>
            <div className="text-xs text-slate-500 font-medium mt-1">Trust Score</div>
          </div>
          <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <Lock className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Auto-Generated Summary Text */}
      <div className="bg-blue-50/50 p-4 rounded-lg border border-blue-100">
        <h3 className="text-sm font-semibold text-blue-900 mb-2 flex items-center gap-2">
          <TrendingUp className="w-4 h-4" />
          System Analysis
        </h3>
        <p className="text-sm text-blue-800/80 leading-relaxed">
          {property.title} shows a <strong>strong verification history</strong>. 
          {isVerified ? ' Ownership is confirmed via DealMachine.' : ' Ownership pending verification.'}
          {hasSpatial ? ' Boundaries are GPS-locked.' : ' Spatial survey recommended.'}
          {riskCount > 0 ? <span className="text-red-600 font-bold block mt-1">⚠️ Caution: {riskCount} risk flags detected in maintenance logs.</span> : ' No major risks flagged.'}
        </p>
      </div>

      {/* Market Data (LoopNet/PropStream Sim) */}
      <div className="bg-white p-4 rounded-lg border border-slate-200">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-sm font-semibold text-slate-700">Market Value Trend</h3>
          <span className="text-xs text-emerald-600 bg-emerald-50 px-2 py-1 rounded">+12% YoY</span>
        </div>
        <div className="h-32 w-full">
           <ResponsiveContainer width="100%" height="100%">
            <LineChart data={mockChartData}>
              <XAxis dataKey="name" hide />
              <Tooltip 
                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                itemStyle={{ fontSize: '12px', color: '#475569' }}
              />
              <Line type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Actionable Steps (Trello Style) */}
      <div>
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Next Steps</h3>
        <div className="space-y-2">
          <button 
            onClick={() => onAddLog('LEGAL', 'Offer Submitted')}
            className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 transition-all flex items-center gap-3 group"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500"></div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Submit Digital Offer</span>
          </button>
          <button 
             onClick={() => onAddLog('SPATIAL', 'Site Visit Scheduled')}
             className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 transition-all flex items-center gap-3 group"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500"></div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Schedule Zero-Fee Viewing</span>
          </button>
          <button 
             onClick={() => onAddLog('POLICY', 'No Viewing Fee Commitment')}
             className="w-full text-left p-3 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 hover:border-blue-300 transition-all flex items-center gap-3 group"
          >
            <div className="w-5 h-5 rounded-full border-2 border-slate-300 group-hover:border-blue-500"></div>
            <span className="text-sm font-medium text-slate-600 group-hover:text-slate-900">Commit to No Viewing Fees</span>
          </button>
        </div>
      </div>

      {/* Integrated Services Badges */}
      <div className="mt-auto pt-6 border-t border-slate-200">
        <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Verified Integrations</h3>
        <div className="flex flex-wrap gap-2">
          {['DocuSign', 'LandGlide', 'LoopNet', 'OpenProp'].map(tech => (
            <span key={tech} className="px-2 py-1 bg-slate-200 text-slate-600 text-[10px] font-bold uppercase rounded">
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DetailSidebar;