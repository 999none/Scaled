import React from 'react';
import { X, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';

const PreviewPanel = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div
      data-testid="preview-panel"
      className="fixed top-0 right-0 bottom-0 w-1/2 z-40 bg-zinc-950 border-l border-zinc-800/50 flex flex-col animate-slideIn"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/50">
        <h2 className="text-white text-base font-semibold">App Preview</h2>
        <button
          data-testid="close-preview-btn"
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-8">
        <Sparkles className="w-10 h-10 text-zinc-500 mb-6" />
        <h3 className="text-white text-xl font-bold mb-3">Deploy Your Application</h3>
        <p className="text-zinc-500 text-sm text-center max-w-sm mb-8">
          Make your app publicly available with managed infrastructure.
        </p>

        {/* Mock preview window */}
        <div className="w-full max-w-md aspect-[4/3] bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden mb-6 relative">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="w-12 h-12 rounded-full bg-zinc-800 flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-zinc-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="3" width="18" height="18" rx="3" />
                  <path d="M3 9h18" />
                  <circle cx="6.5" cy="6" r="1" fill="currentColor" />
                  <circle cx="9.5" cy="6" r="1" fill="currentColor" />
                </svg>
              </div>
              <p className="text-zinc-600 text-xs">Preview will appear here</p>
            </div>
          </div>
          {/* Fake play button */}
          <div className="absolute bottom-3 right-3">
            <button className="w-8 h-8 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-zinc-400" viewBox="0 0 24 24" fill="currentColor"><path d="M6 4v16l14-8z" /></svg>
            </button>
          </div>
        </div>

        {/* Navigation dots */}
        <div className="flex items-center gap-4">
          <button className="p-1.5 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors">
            <ChevronLeft className="w-4 h-4 text-zinc-400" />
          </button>
          <div className="flex gap-2">
            {[0, 1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-white w-4' : 'bg-zinc-700'} transition-all`} />
            ))}
          </div>
          <button className="p-1.5 rounded-full border border-zinc-700 hover:bg-zinc-800 transition-colors">
            <ChevronRight className="w-4 h-4 text-zinc-400" />
          </button>
        </div>

        {/* Awaiting message */}
        <div className="mt-10 flex items-center gap-2 px-5 py-3 bg-zinc-900/60 border border-zinc-800/50 rounded-full">
          <Sparkles className="w-4 h-4 text-zinc-500" />
          <span className="text-zinc-500 text-sm">Awaiting further instruction.</span>
        </div>
      </div>
    </div>
  );
};

export default PreviewPanel;
