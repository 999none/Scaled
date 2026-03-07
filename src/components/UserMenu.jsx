import React, { useState } from 'react';
import { Settings, Globe, Github, Info, MessageCircle, LogOut, ChevronRight, Check, ArrowLeftRight, Plus, Search } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { projects, languages, userProfile } from '@/data/mockData';

const UserMenu = ({ isOpen, onClose, onOpenSettings }) => {
  const navigate = useNavigate();
  const [showLanguages, setShowLanguages] = useState(false);
  const [showProjectSwitch, setShowProjectSwitch] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [searchLang, setSearchLang] = useState('');

  const handleLogout = () => {
    onClose();
    navigate('/');
  };

  if (!isOpen) return null;

  const filteredLanguages = languages.filter((l) =>
    l.name.toLowerCase().includes(searchLang.toLowerCase())
  );

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={() => { onClose(); setShowLanguages(false); setShowProjectSwitch(false); }} />
      <div data-testid="user-menu-panel" className="fixed top-12 right-4 z-50 w-[300px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl overflow-hidden">
        <div className="px-4 pt-4 pb-3 border-b border-zinc-800">
          <p className="text-zinc-400 text-sm">{userProfile.email}</p>
        </div>
        <div className="px-4 py-3 border-b border-zinc-800">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-full flex-shrink-0" style={{ background: projects[0].color }} />
              <div>
                <p className="text-white text-sm font-semibold">{projects[0].name}</p>
                <p className="text-zinc-500 text-xs">{projects[0].role} • {projects[0].members} membre</p>
              </div>
            </div>
            <button onClick={() => setShowProjectSwitch(!showProjectSwitch)} className="p-1.5 rounded-lg hover:bg-zinc-800 transition-colors">
              <ArrowLeftRight className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>
        {showProjectSwitch && (
          <div className="border-b border-zinc-800 bg-zinc-800/40">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between px-4 py-3 hover:bg-zinc-800/60 cursor-pointer">
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: project.color }} />
                  <div>
                    <p className="text-white text-sm font-medium">{project.name}</p>
                    <p className="text-zinc-500 text-xs">{project.plan} • {project.members} membre</p>
                  </div>
                </div>
                <Check className="w-5 h-5 text-emerald-400" />
              </div>
            ))}
            <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors">
              <Plus className="w-5 h-5 text-zinc-400" />
              <span className="text-white text-sm">Créer un nouveau projet</span>
            </button>
          </div>
        )}
        <div className="py-1">
          <button onClick={() => { onClose(); if (onOpenSettings) onOpenSettings(); }} className="flex items-center gap-3 px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors">
            <Settings className="w-5 h-5 text-zinc-400" />
            <span className="text-white text-sm">Paramètres du compte</span>
          </button>
          <button onClick={() => setShowLanguages(!showLanguages)} className="flex items-center justify-between px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors">
            <div className="flex items-center gap-3">
              <Globe className="w-5 h-5 text-zinc-400" />
              <span className="text-white text-sm font-medium">Langue</span>
            </div>
            <ChevronRight className="w-4 h-4 text-zinc-500" />
          </button>
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors">
            <Github className="w-5 h-5 text-zinc-400" />
            <span className="text-white text-sm">Se connecter à Github</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors">
            <Info className="w-5 h-5 text-zinc-400" />
            <span className="text-white text-sm">Centre d'aide</span>
          </button>
          <button className="flex items-center gap-3 px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors">
            <MessageCircle className="w-5 h-5 text-zinc-400" />
            <span className="text-white text-sm">Rejoindre Discord</span>
          </button>
          <button onClick={handleLogout} data-testid="logout-btn" className="flex items-center gap-3 px-4 py-3 w-full hover:bg-zinc-800/60 transition-colors border-t border-zinc-800">
            <LogOut className="w-5 h-5 text-zinc-400" />
            <span className="text-white text-sm">Déconnexion</span>
          </button>
        </div>
      </div>
      {showLanguages && (
        <div className="fixed top-[170px] right-[310px] z-[60] w-[240px] bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden">
          <div className="p-2">
            <div className="flex items-center gap-2 px-3 py-2 bg-zinc-800/60 rounded-lg mb-1">
              <Search className="w-4 h-4 text-zinc-500" />
              <input type="text" value={searchLang} onChange={(e) => setSearchLang(e.target.value)} placeholder="Rechercher" className="bg-transparent text-white text-sm outline-none w-full placeholder-zinc-500" />
            </div>
          </div>
          <div className="max-h-[300px] overflow-y-auto">
            {filteredLanguages.map((lang) => (
              <button key={lang.code} onClick={() => { setSelectedLanguage(lang.code); setShowLanguages(false); }} className="flex items-center justify-between px-4 py-2.5 w-full hover:bg-zinc-800/60 transition-colors">
                <div className="flex items-center gap-3">
                  <span className="text-base">{lang.flag}</span>
                  <span className="text-white text-sm">{lang.name}</span>
                </div>
                {selectedLanguage === lang.code && <Check className="w-4 h-4 text-zinc-300" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default UserMenu;
