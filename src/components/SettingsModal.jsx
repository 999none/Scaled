import React, { useState } from 'react';
import { X, User, Pencil, ChevronDown } from 'lucide-react';
import { userProfile, languages } from '@/data/mockData';

const sidebarItems = [
  { id: 'profile', label: 'none', icon: User },
];

const SettingsModal = ({ isOpen, onClose }) => {
  const [activeSection, setActiveSection] = useState('profile');
  const [userName, setUserName] = useState(userProfile.name);
  const [isEditingName, setIsEditingName] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('fr');
  const [showLangDropdown, setShowLangDropdown] = useState(false);

  if (!isOpen) return null;

  const currentLang = languages.find((l) => l.code === selectedLanguage);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div data-testid="settings-modal" className="relative w-full max-w-2xl bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl mx-4 max-h-[80vh] overflow-hidden">
        <div className="flex h-full">
          <div className="w-[200px] border-r border-zinc-800 p-4 flex-shrink-0">
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-3">Paramètres personnels</p>
            {sidebarItems.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 w-full rounded-lg text-sm transition-colors mb-1 ${
                    activeSection === item.id ? 'bg-zinc-800/60 text-white' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/40'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {item.label}
                </button>
              );
            })}
          </div>
          <div className="flex-1 p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-white text-lg font-semibold">Paramètres du compte</h2>
              <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
                <X className="w-5 h-5 text-zinc-400" />
              </button>
            </div>
            {activeSection === 'profile' && (
              <div className="space-y-6">
                <div className="flex items-start justify-between py-4 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium mb-1">E-mail</p>
                    <p className="text-zinc-500 text-xs">L'adresse e-mail liée à votre compte actuel</p>
                  </div>
                  <p className="text-zinc-300 text-sm">{userProfile.email}</p>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Choisissez votre photo de profil</p>
                    <p className="text-zinc-500 text-xs">Cette image sera affichée publiquement</p>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-zinc-700 flex items-center justify-center text-white text-sm font-medium">{userProfile.avatar}</div>
                </div>
                <div className="flex items-start justify-between py-4 border-b border-zinc-800">
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Nom</p>
                    <p className="text-zinc-500 text-xs">Votre nom complet, tel qu'il apparaît partout</p>
                  </div>
                  {isEditingName ? (
                    <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} onBlur={() => setIsEditingName(false)} onKeyDown={(e) => e.key === 'Enter' && setIsEditingName(false)} className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-1.5 text-white text-sm outline-none focus:border-zinc-500 w-32" autoFocus />
                  ) : (
                    <button onClick={() => setIsEditingName(true)} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors">
                      {userName}
                      <Pencil className="w-3.5 h-3.5 text-zinc-400" />
                    </button>
                  )}
                </div>
                <div className="flex items-start justify-between py-4">
                  <div>
                    <p className="text-white text-sm font-medium mb-1">Langue</p>
                    <p className="text-zinc-500 text-xs">Sélectionnez votre langue préférée sur Emergent</p>
                  </div>
                  <div className="relative">
                    <button onClick={() => setShowLangDropdown(!showLangDropdown)} className="flex items-center gap-2 px-3 py-1.5 bg-zinc-800 border border-zinc-700 rounded-lg text-white text-sm hover:bg-zinc-700 transition-colors">
                      <span>{currentLang?.flag}</span>
                      <span>{currentLang?.name}</span>
                      <ChevronDown className="w-4 h-4 text-zinc-400" />
                    </button>
                    {showLangDropdown && (
                      <div className="absolute top-full right-0 mt-1 w-48 bg-zinc-800 border border-zinc-700 rounded-lg shadow-xl overflow-hidden z-10">
                        {languages.map((lang) => (
                          <button key={lang.code} onClick={() => { setSelectedLanguage(lang.code); setShowLangDropdown(false); }} className="flex items-center gap-2 px-3 py-2 w-full text-left hover:bg-zinc-700 transition-colors">
                            <span>{lang.flag}</span>
                            <span className="text-white text-sm">{lang.name}</span>
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
