import React, { useState } from 'react';
import { X, Send, MessageCircle, Mail, Smartphone } from 'lucide-react';

export type Channel = 'WHATSAPP' | 'SMS' | 'EMAIL';

interface ChatWidgetProps {
  isOpen: boolean;
  onClose: () => void;
  propertyName: string;
  onSendMessage: (channel: Channel, message: string) => void;
}

const ChatWidget: React.FC<ChatWidgetProps> = ({ isOpen, onClose, propertyName, onSendMessage }) => {
  const [activeChannel, setActiveChannel] = useState<Channel>('WHATSAPP');
  const [message, setMessage] = useState('');

  if (!isOpen) return null;

  const handleSend = () => {
    if (!message.trim()) return;
    onSendMessage(activeChannel, message);
    setMessage('');
    onClose();
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden animate-in fade-in slide-in-from-bottom-4">
       {/* Header */}
       <div className="bg-slate-900 p-4 flex justify-between items-center text-white">
          <div>
            <h3 className="font-bold text-sm">Owner Chat</h3>
            <p className="text-xs text-slate-400 truncate max-w-[200px]">{propertyName}</p>
          </div>
          <button onClick={onClose} className="hover:bg-white/10 p-1 rounded"><X className="w-4 h-4" /></button>
       </div>

       {/* Channel Tabs */}
       <div className="flex bg-slate-100 p-1 m-2 rounded-lg">
          <button
            onClick={() => setActiveChannel('WHATSAPP')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${activeChannel === 'WHATSAPP' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <MessageCircle className="w-3.5 h-3.5" /> WhatsApp
          </button>
          <button
            onClick={() => setActiveChannel('SMS')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${activeChannel === 'SMS' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Smartphone className="w-3.5 h-3.5" /> SMS
          </button>
          <button
            onClick={() => setActiveChannel('EMAIL')}
            className={`flex-1 flex items-center justify-center gap-2 py-2 text-xs font-medium rounded-md transition-all ${activeChannel === 'EMAIL' ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </button>
       </div>

       {/* Message Area */}
       <div className="p-4 bg-slate-50 min-h-[150px] flex flex-col justify-end">
          <div className="text-center mb-4">
             <p className="text-xs text-slate-400">Start the conversation via {activeChannel === 'WHATSAPP' ? 'WhatsApp' : activeChannel === 'SMS' ? 'SMS' : 'Email'}.</p>
             <p className="text-[10px] text-slate-300 mt-1">Logs will be added to the property timeline.</p>
          </div>
       </div>

       {/* Input Area */}
       <div className="p-3 border-t border-slate-100 flex gap-2 bg-white">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={`Message via ${activeChannel}...`}
            className="flex-1 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          />
          <button
            onClick={handleSend}
            disabled={!message.trim()}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="w-4 h-4" />
          </button>
       </div>
    </div>
  );
};

export default ChatWidget;