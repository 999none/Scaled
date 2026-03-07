import React, { useState } from 'react';
import { X, Copy, Eye, EyeOff } from 'lucide-react';

const CodeModal = ({ isOpen, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const mockPassword = 'sk-emergent-x4f9a2b1c3d7';

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div data-testid="code-modal" className="relative w-full max-w-md bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl mx-4">
        <div className="flex items-center justify-between p-5 border-b border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-cyan-900/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
            </div>
            <h2 className="text-white text-lg font-bold">Code Access</h2>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="p-5 space-y-5">
          <div>
            <p className="text-zinc-400 text-sm mb-3">
              Access your codespace VSCode environment with the credentials below.
            </p>
          </div>

          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">VSCode URL</p>
            <div className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/40 rounded-xl px-4 py-3">
              <span className="text-cyan-400 text-sm font-mono flex-1 truncate">
                https://code.emergent.sh/workspace-{Math.random().toString(36).substring(2, 8)}
              </span>
              <button className="p-1 rounded hover:bg-zinc-700 transition-colors">
                <Copy className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>

          <div>
            <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider mb-2">Password</p>
            <div className="flex items-center gap-2 bg-zinc-800/60 border border-zinc-700/40 rounded-xl px-4 py-3">
              <span className="text-white text-sm font-mono flex-1">
                {showPassword ? mockPassword : '••••••••••••••••'}
              </span>
              <button
                data-testid="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                className="p-1 rounded hover:bg-zinc-700 transition-colors"
              >
                {showPassword ? <EyeOff className="w-4 h-4 text-zinc-400" /> : <Eye className="w-4 h-4 text-zinc-400" />}
              </button>
              <button className="p-1 rounded hover:bg-zinc-700 transition-colors">
                <Copy className="w-4 h-4 text-zinc-400" />
              </button>
            </div>
          </div>

          <button
            data-testid="open-vscode-btn"
            className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 text-white text-sm font-semibold rounded-xl transition-colors"
          >
            Open in VSCode
          </button>
        </div>
      </div>
    </div>
  );
};

export default CodeModal;
