import React, { useState } from 'react';
import { X, Mail, Tag } from 'lucide-react';

const tabs = [
  { id: 'inbox', label: 'Boîte de réception' },
  { id: 'offers', label: 'Offres' },
  { id: 'updates', label: 'Mises à jour' },
];

const NotificationPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('inbox');

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div data-testid="notification-panel" className="fixed top-12 right-4 z-50 w-[380px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-5 pt-5 pb-0">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-white text-lg font-semibold">Notifications</h2>
          </div>
          <div className="flex border-b border-zinc-800">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 pb-3 text-sm font-medium transition-colors relative ${
                  activeTab === tab.id ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white" />
                )}
              </button>
            ))}
          </div>
        </div>
        <div className="p-8 flex flex-col items-center justify-center min-h-[300px]">
          {activeTab === 'inbox' && (
            <>
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <Mail className="w-7 h-7 text-zinc-500" />
              </div>
              <p className="text-zinc-300 text-sm font-medium mb-1">Vous êtes à jour</p>
              <p className="text-zinc-500 text-xs text-center max-w-[220px]">
                Les messages et alertes importantes apparaîtront ici
              </p>
            </>
          )}
          {activeTab === 'offers' && (
            <>
              <div className="w-14 h-14 rounded-full bg-zinc-800 flex items-center justify-center mb-4">
                <Tag className="w-7 h-7 text-zinc-500" />
              </div>
              <p className="text-zinc-300 text-sm font-medium mb-1">Offres à venir</p>
              <p className="text-zinc-500 text-xs text-center max-w-[220px]">
                De nouvelles offres sont ajoutées ici de temps en temps
              </p>
            </>
          )}
          {activeTab === 'updates' && (
            <p className="text-zinc-500 text-sm">Aucune mise à jour disponible</p>
          )}
        </div>
      </div>
    </>
  );
};

export default NotificationPanel;
