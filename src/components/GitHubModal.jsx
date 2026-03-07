import React, { useState } from 'react';
import { X, Github, Lock, Globe, Search, ChevronDown, GitBranch } from 'lucide-react';

const GitHubModal = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('private');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div data-testid="github-modal" className="relative w-full max-w-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl mx-4">
        <div className="flex items-center justify-between p-6 pb-4">
          <div className="flex items-center gap-3">
            <Github className="w-6 h-6 text-white" />
            <h2 className="text-white text-xl font-bold">Add from Github</h2>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>
        <div className="px-6 mb-6">
          <div className="flex gap-2 bg-zinc-800/40 rounded-xl p-1">
            <button onClick={() => setActiveTab('private')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'private' ? 'bg-zinc-700/80 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              <Lock className="w-4 h-4" />
              Dépôt privé
            </button>
            <button onClick={() => setActiveTab('public')} className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all ${activeTab === 'public' ? 'bg-zinc-700/80 text-white' : 'text-zinc-500 hover:text-zinc-300'}`}>
              <Globe className="w-4 h-4" />
              Dépôt public
            </button>
          </div>
        </div>
        <div className="px-6 pb-8 min-h-[300px]">
          {activeTab === 'private' && (
            <div className="text-center w-full flex items-center justify-center min-h-[250px]">
              <div className="bg-zinc-800/40 rounded-xl p-6 flex items-center justify-between w-full">
                <div>
                  <p className="text-white text-sm font-semibold mb-1">Authentification GitHub requise</p>
                  <p className="text-zinc-500 text-xs">Connectez votre compte GitHub pour accéder à tous vos dépôts privés et publics.</p>
                </div>
                <button className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium rounded-full transition-colors whitespace-nowrap ml-4">
                  <Github className="w-4 h-4" />
                  Se connecter à Github
                </button>
              </div>
            </div>
          )}
          {activeTab === 'public' && (
            <div className="w-full space-y-5">
              <div className="flex gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Globe className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-300 text-sm font-medium">URL du dépôt</span>
                  </div>
                  <div className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
                    <Search className="w-4 h-4 text-zinc-500" />
                    <input type="text" placeholder="Entrez une URL de dépôt GitHub" className="bg-transparent text-white text-sm outline-none flex-1 placeholder-zinc-500" />
                    <ChevronDown className="w-4 h-4 text-zinc-500" />
                  </div>
                </div>
                <div className="w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <GitBranch className="w-4 h-4 text-zinc-400" />
                    <span className="text-zinc-300 text-sm font-medium">Branche</span>
                  </div>
                  <div className="flex items-center justify-between bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
                    <span className="text-zinc-500 text-sm truncate">Sélectionnez d'abord</span>
                    <ChevronDown className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GitHubModal;
