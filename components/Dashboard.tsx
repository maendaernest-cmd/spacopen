import React from 'react';
import { Property, PropertyMode } from '../types';
import { MapPin, ArrowRight, BedDouble, Tractor, Building2, Palmtree } from 'lucide-react';

interface DashboardProps {
  properties: Property[];
  activeMode: PropertyMode;
  onSelectProperty: (id: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ properties, activeMode, onSelectProperty }) => {
  const filteredProperties = properties.filter(p => p.mode === activeMode);

  return (
    <div className="p-6 lg:p-10 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            {activeMode === 'LIVING' && 'Find your next home'}
            {activeMode === 'BUSINESS' && 'Commercial & Retail Spaces'}
            {activeMode === 'PRODUCTION' && 'Agricultural & Industrial Land'}
            {activeMode === 'TRAVEL' && 'Short-term Stays & BnBs'}
          </h1>
          <p className="text-slate-500 mt-2">
             Verified listings with cumulative history logs. No agents, just data.
          </p>
        </div>
        <div className="flex gap-2 text-sm">
           <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm">
             Verified Only
           </span>
           <span className="px-3 py-1 bg-white border border-slate-200 rounded-full text-slate-600 shadow-sm">
             Map View
           </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProperties.map(property => (
          <div 
            key={property.id} 
            onClick={() => onSelectProperty(property.id)}
            className="bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group"
          >
            <div className="relative h-48 bg-slate-100">
              <img src={property.image} alt={property.title} className="w-full h-full object-cover" />
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold text-slate-900 shadow-sm">
                Score: {property.summaryScore}
              </div>
              <div className="absolute bottom-4 right-4 bg-slate-900/80 backdrop-blur px-3 py-1 rounded-full text-xs font-medium text-white flex items-center gap-1">
                <MapPin className="w-3 h-3" />
                Verified
              </div>
            </div>
            <div className="p-5">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-bold text-slate-800 text-lg leading-tight group-hover:text-blue-600 transition-colors">{property.title}</h3>
              </div>
              <p className="text-slate-500 text-sm mb-4">{property.address}</p>
              
              <div className="flex gap-4 mb-4 text-xs font-medium text-slate-600">
                {property.specs.map(spec => (
                  <div key={spec.label} className="bg-slate-50 px-2 py-1 rounded border border-slate-100">
                    {spec.value}
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                <div className="text-lg font-bold text-slate-900">
                  {new Intl.NumberFormat('en-US', { style: 'currency', currency: property.currency }).format(property.price)}
                  {activeMode === 'LIVING' && <span className="text-xs font-normal text-slate-400">/mo</span>}
                </div>
                <div className="p-2 rounded-full bg-slate-50 text-slate-400 group-hover:bg-blue-600 group-hover:text-white transition-all">
                  <ArrowRight className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {filteredProperties.length === 0 && (
        <div className="text-center py-20 bg-slate-50 rounded-2xl border border-dashed border-slate-300">
          <p className="text-slate-400">No listings found in this category for the demo.</p>
          <button className="mt-4 text-blue-600 font-medium hover:underline">Reset Filters</button>
        </div>
      )}
    </div>
  );
};

export default Dashboard;