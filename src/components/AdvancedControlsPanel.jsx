import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, ChevronUp, Check, Link2 } from 'lucide-react';
import { models, templates } from '../data/mockData';
import MCPModal from './MCPModal';

const ClaudeIcon = ({ size = 'sm' }) => {
  const s = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <div className={`${s} rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0`}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#D97757" strokeWidth="1.5" />
        <path d="M12 6L14.5 10.5L19 12L14.5 13.5L12 18L9.5 13.5L5 12L9.5 10.5L12 6Z" fill="#D97757" />
      </svg>
    </div>
  );
};

const OpenAIIcon = ({ size = 'sm' }) => {
  const s = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <div className={`${s} rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0`}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#9CA3AF" strokeWidth="1.5" />
        <circle cx="12" cy="12" r="4" stroke="#9CA3AF" strokeWidth="1.5" />
      </svg>
    </div>
  );
};

const GoogleIcon = ({ size = 'sm' }) => {
  const s = size === 'sm' ? 'w-5 h-5' : 'w-6 h-6';
  return (
    <div className={`${s} rounded-full bg-zinc-800 flex items-center justify-center flex-shrink-0`}>
      <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#4285F4" strokeWidth="1.5" />
        <path d="M12 7L15 12L12 17L9 12L12 7Z" fill="#4285F4" />
      </svg>
    </div>
  );
};

const getModelIcon = (icon, size) => {
  if (icon === 'claude') return <ClaudeIcon size={size} />;
  if (icon === 'openai') return <OpenAIIcon size={size} />;
  if (icon === 'google') return <GoogleIcon size={size} />;
  return null;
};

const AdvancedControlsPanel = ({ isOpen, onClose }) => {
  const [showMCPModal, setShowMCPModal] = useState(false);
  const [showTemplateDropdown, setShowTemplateDropdown] = useState(false);
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0]);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const templateRef = useRef(null);
  const modelRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (templateRef.current && !templateRef.current.contains(event.target)) {
        setShowTemplateDropdown(false);
      }
      if (modelRef.current && !modelRef.current.contains(event.target)) {
        setShowModelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  if (!isOpen) return null;

  return (
    <>
      <div className="w-full max-w-3xl mx-auto mt-4">
        <div className="bg-zinc-900/80 border border-teal-800/50 rounded-2xl backdrop-blur-xl shadow-2xl overflow-visible">
          {/* Header */}
          <div className="flex items-center justify-between p-5 pb-4">
            <div className="flex items-center gap-2">
              <svg className="w-5 h-5 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" x2="4" y1="21" y2="14" /><line x1="4" x2="4" y1="10" y2="3" />
                <line x1="12" x2="12" y1="21" y2="12" /><line x1="12" x2="12" y1="8" y2="3" />
                <line x1="20" x2="20" y1="21" y2="16" /><line x1="20" x2="20" y1="12" y2="3" />
                <line x1="2" x2="6" y1="14" y2="14" /><line x1="10" x2="14" y1="8" y2="8" />
                <line x1="18" x2="22" y1="16" y2="16" />
              </svg>
              <h3 className="text-teal-400 text-sm font-semibold">Contrôles avancés</h3>
            </div>
            <button onClick={onClose} className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
              <X className="w-4 h-4 text-zinc-400" />
            </button>
          </div>

          <div className="px-5 pb-5 space-y-4">
            {/* MCP Selector */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <p className="text-zinc-400 text-sm">Sélectionner les MCP à utiliser</p>
                <span className="px-2 py-0.5 bg-orange-400/20 text-orange-400 text-[10px] font-semibold rounded-full">
                  Nouveau
                </span>
              </div>
              <button
                onClick={() => setShowMCPModal(true)}
                className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800/40 border border-zinc-700/30 rounded-xl hover:bg-zinc-800/60 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Link2 className="w-4 h-4 text-zinc-500" />
                  <span className="text-zinc-400 text-sm">Sélectionner les outils MCP</span>
                </div>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </button>
            </div>

            {/* Template Selector */}
            <div ref={templateRef} className="relative">
              <p className="text-zinc-500 text-xs mb-2">Sélectionner un modèle</p>
              <button
                onClick={() => setShowTemplateDropdown(!showTemplateDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-zinc-800/40 border border-zinc-700/30 rounded-xl hover:bg-zinc-800/60 transition-colors"
              >
                <span className="text-zinc-300 text-sm truncate pr-4">
                  us-central1-docker.pkg.dev/emergent-default/emergent-container-hub/fastapi_react_mongo_shadcn_base_im
                </span>
                <ChevronDown className={`w-4 h-4 text-zinc-500 flex-shrink-0 transition-transform ${showTemplateDropdown ? 'rotate-180' : ''}`} />
              </button>
              {showTemplateDropdown && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-zinc-900/95 border border-zinc-700/50 rounded-xl shadow-xl overflow-hidden z-20">
                  <p className="px-4 py-2 text-zinc-500 text-xs">Select Template</p>
                  {templates.map((tmpl) => (
                    <button
                      key={tmpl.id}
                      onClick={() => {
                        setSelectedTemplate(tmpl);
                        setShowTemplateDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-3 text-white text-sm hover:bg-zinc-800/60 transition-colors ${
                        selectedTemplate.id === tmpl.id ? 'bg-zinc-800/40' : ''
                      }`}
                    >
                      {tmpl.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Model Selector */}
            <div ref={modelRef} className="relative">
              <p className="text-zinc-500 text-xs mb-2">Modèle</p>
              <button
                onClick={() => setShowModelDropdown(!showModelDropdown)}
                className="w-full flex items-center justify-between px-4 py-3 bg-teal-900/20 border border-teal-800/30 rounded-xl hover:bg-teal-900/30 transition-colors"
              >
                <div className="flex items-center gap-2">
                  {getModelIcon(selectedModel.icon, 'sm')}
                  <span className="text-teal-300 text-sm font-medium">{selectedModel.name}</span>
                </div>
                <ChevronUp className={`w-4 h-4 text-zinc-500 transition-transform ${showModelDropdown ? '' : 'rotate-180'}`} />
              </button>
              {showModelDropdown && (
                <div className="absolute bottom-full left-0 right-0 mb-1 bg-zinc-900/95 border border-zinc-700/50 rounded-xl shadow-xl overflow-hidden z-20 max-h-[400px] overflow-y-auto">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => {
                        setSelectedModel(model);
                        setShowModelDropdown(false);
                      }}
                      className="w-full flex items-center justify-between px-4 py-3.5 hover:bg-zinc-800/60 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        {getModelIcon(model.icon, 'md')}
                        <div className="text-left">
                          <div className="flex items-center gap-2">
                            <p className="text-white text-sm font-medium">{model.name}</p>
                            {model.isPro && (
                              <span className="px-2 py-0.5 bg-orange-400/20 text-orange-400 text-[10px] font-semibold rounded">
                                PRO
                              </span>
                            )}
                          </div>
                          <p className="text-zinc-500 text-xs mt-0.5">{model.description}</p>
                        </div>
                      </div>
                      {selectedModel.id === model.id && (
                        <Check className="w-5 h-5 text-teal-400" />
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <MCPModal isOpen={showMCPModal} onClose={() => setShowMCPModal(false)} />
    </>
  );
};

export default AdvancedControlsPanel;
