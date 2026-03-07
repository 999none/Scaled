import React, { useState } from 'react';
import { appTypes } from '@/data/mockData';

const AppTypeTabs = () => {
  const [activeTab, setActiveTab] = useState('fullstack');

  return (
    <div data-testid="app-type-tabs" className="flex items-center gap-1 p-1.5 bg-zinc-900/60 rounded-xl backdrop-blur-xl border border-zinc-800/50">
      {appTypes.map((type) => {
        const Icon = type.icon;
        const isActive = activeTab === type.id;
        return (
          <button
            key={type.id}
            onClick={() => setActiveTab(type.id)}
            className={`flex items-center gap-2 px-5 py-3 rounded-xl transition-all duration-200 ${
              isActive
                ? 'bg-zinc-800/80 text-white shadow-lg'
                : 'text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/40'
            }`}
          >
            <Icon className="w-4 h-4" />
            <span className="text-sm font-medium whitespace-nowrap">{type.label}</span>
          </button>
        );
      })}
    </div>
  );
};

export default AppTypeTabs;
