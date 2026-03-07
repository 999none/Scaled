import React, { useState, useRef } from 'react';
import { Paperclip, Github, ChevronDown, Mic, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { models } from '@/data/mockData';
import GitHubModal from './GitHubModal';

const ClaudeIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none">
    <circle cx="12" cy="12" r="10" stroke="#D97757" strokeWidth="1.5" />
    <path d="M12 6L14.5 10.5L19 12L14.5 13.5L12 18L9.5 13.5L5 12L9.5 10.5L12 6Z" fill="#D97757" />
  </svg>
);

const PromptInput = () => {
  const [prompt, setPrompt] = useState('');
  const [showModelDropdown, setShowModelDropdown] = useState(false);
  const [selectedModel, setSelectedModel] = useState(models[0]);
  const [showGitHubModal, setShowGitHubModal] = useState(false);
  const textareaRef = useRef(null);
  const navigate = useNavigate();

  const handleTextareaChange = (e) => {
    setPrompt(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = '60px';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 200) + 'px';
    }
  };

  const handleSubmit = () => {
    if (!prompt.trim()) return;
    navigate('/chat', {
      state: {
        userPrompt: prompt.trim(),
        model: selectedModel,
      },
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto">
      <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl backdrop-blur-xl shadow-2xl overflow-visible">
        <div className="p-4">
          <textarea
            ref={textareaRef}
            data-testid="prompt-input"
            value={prompt}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Construis-moi une application SaaS pour..."
            className="w-full bg-transparent text-white placeholder-zinc-500 resize-none outline-none text-base min-h-[60px] max-h-[200px]"
            rows={2}
            style={{ height: '60px' }}
          />
        </div>
        <div className="flex items-center justify-between px-4 pb-4">
          <div className="flex items-center gap-1">
            <button className="p-2.5 rounded-full hover:bg-zinc-800 transition-colors group" title="Joindre un fichier">
              <Paperclip className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300" />
            </button>
            <button onClick={() => setShowGitHubModal(true)} className="p-2.5 rounded-full hover:bg-zinc-800 transition-colors group" title="Importer depuis GitHub">
              <Github className="w-5 h-5 text-zinc-500 group-hover:text-zinc-300" />
            </button>
            <div className="relative">
              <button onClick={() => setShowModelDropdown(!showModelDropdown)} className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors hover:bg-zinc-800">
                <ClaudeIcon />
                <span className="text-zinc-300 text-sm font-medium">{selectedModel.name}</span>
                <ChevronDown className="w-4 h-4 text-zinc-500" />
              </button>
              {showModelDropdown && (
                <div className="absolute bottom-full left-0 mb-2 w-72 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden z-50">
                  {models.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => { setSelectedModel(model); setShowModelDropdown(false); }}
                      className={`w-full flex items-center gap-3 px-4 py-3 hover:bg-zinc-800/60 transition-colors text-left ${selectedModel.id === model.id ? 'bg-zinc-800/40' : ''}`}
                    >
                      <div>
                        <p className="text-white text-sm font-medium">{model.name}</p>
                        <p className="text-zinc-500 text-xs mt-0.5">{model.description}</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2.5 rounded-full transition-colors hover:bg-zinc-800 text-zinc-500 hover:text-zinc-300" title="Enregistrement vocal">
              <Mic className="w-5 h-5" />
            </button>
            <button
              data-testid="submit-prompt-btn"
              onClick={handleSubmit}
              disabled={!prompt.trim()}
              className={`p-2.5 rounded-full transition-all duration-200 ${
                prompt.trim() ? 'bg-white text-black hover:bg-zinc-200' : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
              }`}
              title="Envoyer"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      <GitHubModal isOpen={showGitHubModal} onClose={() => setShowGitHubModal(false)} />
    </div>
  );
};

export default PromptInput;
