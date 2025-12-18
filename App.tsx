import React, { useState } from 'react';
import Navigation from './components/Navigation';
import Dashboard from './components/Dashboard';
import TimelineLog from './components/TimelineLog';
import DetailSidebar from './components/DetailSidebar';
import ChatWidget, { Channel } from './components/ChatWidget';
import HotRequestModal from './components/HotRequestModal';
import { MOCK_PROPERTIES } from './constants';
import { PropertyMode, Property, LogEvent } from './types';
import { ArrowLeft, Share2, Heart, MessageSquare, BadgeCheck, Activity } from 'lucide-react';

const App: React.FC = () => {
  const [activeMode, setActiveMode] = useState<PropertyMode>('PRODUCTION');
  const [selectedPropertyId, setSelectedPropertyId] = useState<string | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  
  // In a real app, this state would come from a backend or global store
  const [properties, setProperties] = useState<Property[]>(MOCK_PROPERTIES);

  const activeProperty = properties.find(p => p.id === selectedPropertyId);

  const handleAddLog = (category: string, title: string, description?: string) => {
    if (!selectedPropertyId) return;

    const newLog: LogEvent = {
      id: `new-${Date.now()}`,
      date: new Date().toISOString().split('T')[0],
      category: category as any,
      title: title,
      description: description || 'User initiated action via Cumulative Dashboard.',
      verified: true, // System verified event
    };

    setProperties(prev => prev.map(p => {
      if (p.id === selectedPropertyId) {
        return { ...p, logs: [newLog, ...p.logs] };
      }
      return p;
    }));
  };

  const handleSendMessage = (channel: Channel, message: string) => {
    handleAddLog(
      'COMMUNICATION', 
      `Outbound ${channel} Message`, 
      `User sent: "${message}"`
    );
  };

  const handlePostHotRequest = (description: string, mode: PropertyMode, budget: string, hasCustomArea: boolean) => {
    const timestamp = Date.now();
    const dateStr = new Date().toISOString().split('T')[0];

    const newLog: LogEvent = {
      id: `req-${timestamp}`,
      date: dateStr,
      category: 'SOCIAL',
      title: 'Hot Request Match',
      description: `Seeker looking for: "${description}". Budget: ${budget}. System matched this property.`,
      verified: true,
      metadata: { 'Budget': budget, 'Type': mode }
    };

    const userLog: LogEvent | null = hasCustomArea ? {
      id: `usr-${timestamp}`,
      date: dateStr,
      category: 'USER',
      title: 'Custom Search Zone Saved',
      description: 'User defined a custom polygon boundary for match alerts.',
      verified: true,
      metadata: { 'Type': 'Map Draw', 'Area': 'Custom Polygon' }
    } : null;

    setProperties(prev => prev.map(p => {
      if (p.mode === mode) {
        const updates = [newLog];
        if (userLog) updates.push(userLog);
        return { ...p, logs: [...updates, ...p.logs] };
      }
      return p;
    }));
  };

  const calculateHealthScore = (logs: LogEvent[]) => {
    let score = 70; // Base baseline
    
    // Factors
    const verifiedCount = logs.filter(l => l.verified).length;
    const maintenanceCount = logs.filter(l => l.category === 'MAINTENANCE').length;
    const legalCount = logs.filter(l => l.category === 'LEGAL').length;

    score += (verifiedCount * 3);
    score += (maintenanceCount * 5);
    score += (legalCount * 5);

    // Risks
    const riskKeywords = ['fail', 'risk', 'damage', 'leak', 'distressed'];
    const riskCount = logs.filter(l => 
      riskKeywords.some(k => l.title.toLowerCase().includes(k) || l.description.toLowerCase().includes(k))
    ).length;

    score -= (riskCount * 15);

    return Math.min(100, Math.max(0, score));
  };

  const getHealthColor = (score: number) => {
    if (score >= 80) return 'text-emerald-600 bg-emerald-50 border-emerald-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 border-amber-200';
    return 'text-red-600 bg-red-50 border-red-200';
  };

  const healthScore = activeProperty ? calculateHealthScore(activeProperty.logs) : 0;

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navigation 
        activeMode={activeMode} 
        onModeChange={(mode) => {
          setActiveMode(mode);
          setSelectedPropertyId(null);
          setIsChatOpen(false);
        }}
        onGoHome={() => {
          setSelectedPropertyId(null);
          setIsChatOpen(false);
        }}
        onOpenHotRequest={() => setIsRequestModalOpen(true)}
      />

      <main className="flex-1 flex flex-col h-[calc(100vh-64px)] overflow-hidden">
        {!selectedPropertyId ? (
          <div className="flex-1 overflow-y-auto">
            <Dashboard 
              properties={properties} 
              activeMode={activeMode} 
              onSelectProperty={setSelectedPropertyId} 
            />
          </div>
        ) : (
          activeProperty && (
            <div className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
              {/* Left Panel: Content & Timeline */}
              <div className="flex-1 flex flex-col overflow-y-auto bg-white">
                
                {/* Image Header */}
                <div className="relative h-64 lg:h-80 bg-slate-200">
                  <img src={activeProperty.image} alt={activeProperty.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 left-4 z-10">
                     <button 
                       onClick={() => {
                         setSelectedPropertyId(null);
                         setIsChatOpen(false);
                       }}
                       className="bg-white/90 hover:bg-white p-2 rounded-full shadow-lg text-slate-700 transition-all"
                     >
                       <ArrowLeft className="w-5 h-5" />
                     </button>
                  </div>
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent p-6 pt-20">
                    <div className="flex justify-between items-end">
                      <div>
                        <h1 className="text-2xl lg:text-3xl font-bold text-white mb-2">{activeProperty.title}</h1>
                        <p className="text-white/80 flex items-center gap-2">
                           <span className="bg-blue-600 px-2 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                             {activeProperty.mode}
                           </span>
                           {activeProperty.address}
                        </p>
                      </div>
                      <div className="flex gap-2">
                         <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white border border-white/20">
                           <Share2 className="w-5 h-5" />
                         </button>
                         <button className="p-2 bg-white/10 hover:bg-white/20 backdrop-blur rounded-full text-white border border-white/20">
                           <Heart className="w-5 h-5" />
                         </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Main Content Area */}
                <div className="p-6 lg:p-10 max-w-4xl mx-auto w-full">
                  
                  {/* Action Bar */}
                  <div className="flex flex-wrap gap-8 mb-10 items-center justify-between">
                    <div className="flex items-center gap-8">
                      <div>
                        <span className="text-sm text-slate-500 block mb-1">Current Price</span>
                        <span className="text-3xl font-bold text-slate-900">
                          {new Intl.NumberFormat('en-US', { style: 'currency', currency: activeProperty.currency }).format(activeProperty.price)}
                          {activeProperty.mode === 'LIVING' && <span className="text-lg font-medium text-slate-400">/mo</span>}
                        </span>
                      </div>
                      <div>
                        <span className="text-sm text-slate-500 block mb-1">Health Score</span>
                        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border ${getHealthColor(healthScore)}`}>
                            <Activity className="w-5 h-5" />
                            <span className="text-xl font-bold">{healthScore}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-3">
                       <button 
                          onClick={() => setIsChatOpen(!isChatOpen)}
                          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-sm shadow-blue-200 flex items-center gap-2"
                       >
                          <MessageSquare className="w-4 h-4" />
                          Chat with Owner
                       </button>
                       <button 
                          onClick={() => handleAddLog('FINANCIAL', 'Offer Initiated', 'User started the offer process.')}
                          className="px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg shadow-sm shadow-emerald-200 flex items-center gap-2"
                       >
                          <BadgeCheck className="w-4 h-4" />
                          Make Offer
                       </button>
                    </div>
                  </div>

                  {/* Specs Grid */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
                    {activeProperty.specs.map(spec => (
                      <div key={spec.label} className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="text-xs text-slate-400 block uppercase tracking-wider mb-1">{spec.label}</span>
                        <span className="font-semibold text-slate-700">{spec.value}</span>
                      </div>
                    ))}
                  </div>

                  {/* The Living Log */}
                  <div className="mb-8">
                     <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                       Property Timeline
                       <span className="bg-slate-100 text-slate-500 text-xs px-2 py-1 rounded-full">{activeProperty.logs.length} events</span>
                     </h2>
                     <TimelineLog logs={activeProperty.logs} />
                  </div>

                </div>
              </div>

              {/* Right Panel: Intelligence/Summary Sidebar */}
              <div className="hidden lg:block h-full border-l border-slate-200">
                <DetailSidebar property={activeProperty} onAddLog={handleAddLog} />
              </div>

              {/* Chat Widget Overlay */}
              <ChatWidget 
                isOpen={isChatOpen} 
                onClose={() => setIsChatOpen(false)} 
                propertyName={activeProperty.title}
                onSendMessage={handleSendMessage}
              />

            </div>
          )
        )}
      </main>

      <HotRequestModal 
        isOpen={isRequestModalOpen}
        onClose={() => setIsRequestModalOpen(false)}
        onSubmit={handlePostHotRequest}
      />
    </div>
  );
};

export default App;