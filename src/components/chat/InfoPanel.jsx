import React from 'react';
import { X, Copy, Upload, FileSpreadsheet, FileText, File } from 'lucide-react';

const InfoPanel = ({ isOpen, onClose, sessionId, modelName }) => {
  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(sessionId);
  };

  return (
    <div
      data-testid="info-panel"
      className="fixed top-0 right-0 bottom-0 w-[380px] z-40 bg-zinc-950 border-l border-zinc-800/50 flex flex-col animate-slideIn"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 py-4 border-b border-zinc-800/50">
        <h2 className="text-white text-base font-semibold">Run Details</h2>
        <button
          data-testid="close-info-btn"
          onClick={onClose}
          className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors"
        >
          <X className="w-5 h-5 text-zinc-400" />
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Model */}
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">Model</p>
          <p data-testid="info-model" className="text-white text-sm">{modelName}</p>
        </div>

        {/* Job ID */}
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">Job ID</p>
          <div className="flex items-center gap-2">
            <p data-testid="info-session-id" className="text-white text-sm font-mono flex-1 truncate">{sessionId}</p>
            <button
              data-testid="copy-session-id"
              onClick={handleCopy}
              className="p-1.5 rounded hover:bg-zinc-800 transition-colors"
            >
              <Copy className="w-4 h-4 text-zinc-400" />
            </button>
          </div>
        </div>

        {/* Assets section */}
        <div>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-4">ASSETS</p>

          <div className="flex flex-col items-center py-6">
            {/* File type icons */}
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                <FileSpreadsheet className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                <File className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                <FileText className="w-5 h-5 text-zinc-500" />
              </div>
              <div className="w-10 h-10 rounded-lg bg-zinc-800 border border-zinc-700/50 flex items-center justify-center">
                <Upload className="w-5 h-5 text-zinc-500" />
              </div>
            </div>

            <p className="text-zinc-500 text-xs text-center mb-4">
              Upload assets or sync files to be used as sources
            </p>

            <button
              data-testid="upload-assets-btn"
              className="px-6 py-2.5 bg-teal-600 hover:bg-teal-500 text-white text-sm font-medium rounded-xl transition-colors"
            >
              Upload Assets
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoPanel;
