import React from 'react';
import { LogEvent } from '../types';
import { ShieldCheck, Map, FileSignature, DollarSign, Wrench, Users, Video, AlertCircle, ScrollText, MessageCircle, User } from 'lucide-react';

interface TimelineLogProps {
  logs: LogEvent[];
}

const getIcon = (category: string) => {
  switch (category) {
    case 'TRUST': return <ShieldCheck className="w-4 h-4 text-emerald-600" />;
    case 'SPATIAL': return <Map className="w-4 h-4 text-blue-600" />;
    case 'LEGAL': return <FileSignature className="w-4 h-4 text-purple-600" />;
    case 'FINANCIAL': return <DollarSign className="w-4 h-4 text-amber-600" />;
    case 'MAINTENANCE': return <Wrench className="w-4 h-4 text-slate-600" />;
    case 'SOCIAL': return <Users className="w-4 h-4 text-pink-600" />;
    case 'MEDIA': return <Video className="w-4 h-4 text-indigo-600" />;
    case 'POLICY': return <ScrollText className="w-4 h-4 text-orange-600" />;
    case 'COMMUNICATION': return <MessageCircle className="w-4 h-4 text-cyan-600" />;
    case 'USER': return <User className="w-4 h-4 text-slate-900" />;
    default: return <AlertCircle className="w-4 h-4 text-gray-600" />;
  }
};

const TimelineLog: React.FC<TimelineLogProps> = ({ logs }) => {
  // Sort logs by date desc
  const sortedLogs = [...logs].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  return (
    <div className="relative border-l-2 border-slate-200 ml-3 space-y-6">
      {sortedLogs.map((log) => (
        <div key={log.id} className="ml-6 relative">
          <span className={`absolute -left-[31px] top-0 flex items-center justify-center w-8 h-8 rounded-full border-2 ${log.verified ? 'bg-white border-emerald-100' : 'bg-gray-50 border-gray-200'}`}>
            {getIcon(log.category)}
          </span>
          <div className="bg-white p-4 rounded-lg border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex justify-between items-start mb-1">
              <h4 className="text-sm font-semibold text-slate-800">{log.title}</h4>
              <span className="text-xs text-slate-400 font-mono">{log.date}</span>
            </div>
            <p className="text-sm text-slate-600 leading-relaxed">{log.description}</p>
            {log.metadata && (
              <div className="mt-2 flex flex-wrap gap-2">
                {Object.entries(log.metadata).map(([key, value]) => (
                  <span key={key} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600">
                    {key}: {value}
                  </span>
                ))}
              </div>
            )}
            {log.verified && (
              <div className="mt-2 flex items-center gap-1 text-xs text-emerald-600 font-medium">
                <ShieldCheck className="w-3 h-3" />
                Verified Event
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TimelineLog;