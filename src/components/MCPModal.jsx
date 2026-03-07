import React, { useState } from 'react';
import { X, Plus, Settings, Link2 } from 'lucide-react';
import { mcpServers } from '../data/mockData';

const MemoryIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-zinc-700 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  </div>
);

const SupabaseIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none">
      <path d="M13.5 21.5L8 14h9l-3.5 7.5z" fill="#3ECF8E" />
      <path d="M10.5 2.5L16 10H7l3.5-7.5z" fill="#3ECF8E" opacity="0.7" />
    </svg>
  </div>
);

const NotionIcon = () => (
  <div className="w-10 h-10 rounded-xl bg-zinc-800 flex items-center justify-center">
    <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
      <path d="M4 4h10l6 6v10H4V4zm10 0v6h6" />
      <text x="7" y="16" fontSize="8" fontWeight="bold" fill="white">N</text>
    </svg>
  </div>
);

const ConfigureNewMCPModal = ({ isOpen, onClose }) => {
  const [mcpName, setMcpName] = useState('');
  const [description, setDescription] = useState('');
  const [jsonConfig, setJsonConfig] = useState('');

  if (!isOpen) return null;

  const jsonPlaceholder = `// Use JSON in this format:
// example:
{
  "mcpServers": {
    "your-tool": {
      "command": "npx",
      "args": ["-y", "@your-org/mcp-server"],
      "env": {
        "API_KEY": "your-api-key-here"
      }
    }
  }
}`;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl mx-4">
        <div className="flex items-center justify-between p-6 pb-2">
          <div>
            <h2 className="text-white text-xl font-bold">Configure New MCP</h2>
            <p className="text-zinc-500 text-sm mt-1">Enter the basic details and JSON configuration for your MCP server.</p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
            <X className="w-5 h-5 text-zinc-400" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <div>
            <label className="text-white text-sm font-semibold block mb-2">MCP Name</label>
            <div className="flex items-center gap-3 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3">
              <Link2 className="w-5 h-5 text-zinc-500" />
              <input
                type="text"
                value={mcpName}
                onChange={(e) => setMcpName(e.target.value)}
                placeholder="my-mcp-server"
                className="bg-transparent text-white text-sm outline-none flex-1 placeholder-zinc-500"
              />
            </div>
          </div>

          <div>
            <label className="text-white text-sm font-semibold block mb-2">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Brief description of your MCP server"
              className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-white text-sm outline-none placeholder-zinc-500"
            />
          </div>

          <div>
            <label className="text-white text-sm font-semibold block mb-2">JSON Configuration</label>
            <textarea
              value={jsonConfig}
              onChange={(e) => setJsonConfig(e.target.value)}
              placeholder={jsonPlaceholder}
              className="w-full bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 text-zinc-400 text-sm outline-none placeholder-zinc-600 resize-none font-mono min-h-[180px]"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 p-6 pt-2 border-t border-zinc-800">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-zinc-300 text-sm font-medium hover:text-white transition-colors"
          >
            Cancel
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-zinc-300 hover:bg-white text-black text-sm font-medium rounded-xl transition-colors">
            Verify and Save
            <span>→</span>
          </button>
        </div>
      </div>
    </div>
  );
};

const MCPModal = ({ isOpen, onClose }) => {
  const [mcpStates, setMcpStates] = useState({ memory: false });
  const [showConfigureNew, setShowConfigureNew] = useState(false);

  if (!isOpen) return null;

  const toggleMCP = (id) => {
    setMcpStates((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const getIcon = (id) => {
    switch (id) {
      case 'memory': return <MemoryIcon />;
      case 'supabase': return <SupabaseIcon />;
      case 'notion': return <NotionIcon />;
      default: return null;
    }
  };

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
        <div className="relative w-full max-w-lg bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-2xl shadow-2xl mx-4">
          {/* Header */}
          <div className="flex items-center justify-between p-6 pb-2">
            <div className="flex items-center gap-3">
              <Link2 className="w-5 h-5 text-white" />
              <h2 className="text-white text-lg font-bold">Select MCPs to use</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-zinc-800 transition-colors">
              <X className="w-5 h-5 text-zinc-400" />
            </button>
          </div>
          <p className="px-6 text-zinc-500 text-sm mb-4">
            Allow agent to directly interact with apps, data, and tools on your computer.
          </p>

          {/* New MCP Server */}
          <div className="px-6 mb-4">
            <button
              onClick={() => setShowConfigureNew(true)}
              className="w-full flex items-center gap-3 p-4 bg-zinc-800/40 border border-zinc-700/30 rounded-xl hover:bg-zinc-800/60 transition-colors"
            >
              <div className="w-10 h-10 rounded-xl border border-zinc-600 border-dashed flex items-center justify-center">
                <Plus className="w-5 h-5 text-zinc-400" />
              </div>
              <div className="text-left">
                <p className="text-white text-sm font-medium">New MCP Server</p>
                <p className="text-zinc-500 text-xs">Add a Custom MCP server</p>
              </div>
            </button>
          </div>

          {/* MCP List */}
          <div className="px-6 pb-6 space-y-3">
            {mcpServers.map((mcp) => (
              <div
                key={mcp.id}
                className="flex items-center justify-between p-4 rounded-xl hover:bg-zinc-800/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  {getIcon(mcp.id)}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="text-white text-sm font-medium">{mcp.name}</p>
                      {mcp.keyNeeded && (
                        <span className="flex items-center gap-1 px-2 py-0.5 bg-zinc-800 rounded-full text-zinc-400 text-[10px]">
                          <svg className="w-2.5 h-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" /></svg>
                          Key needed
                        </span>
                      )}
                    </div>
                    <p className="text-zinc-500 text-xs mt-0.5">{mcp.description}</p>
                  </div>
                </div>
                {mcp.hasToggle ? (
                  <button
                    onClick={() => toggleMCP(mcp.id)}
                    className={`w-11 h-6 rounded-full transition-colors relative ${
                      mcpStates[mcp.id] ? 'bg-emerald-600' : 'bg-zinc-700'
                    }`}
                  >
                    <div
                      className={`absolute top-1 w-4 h-4 rounded-full bg-white transition-transform ${
                        mcpStates[mcp.id] ? 'left-6' : 'left-1'
                      }`}
                    />
                  </button>
                ) : (
                  <button className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 rounded-lg text-zinc-300 text-xs hover:bg-zinc-700 transition-colors">
                    <Settings className="w-3.5 h-3.5" />
                    Configure
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <ConfigureNewMCPModal
        isOpen={showConfigureNew}
        onClose={() => setShowConfigureNew(false)}
      />
    </>
  );
};

export default MCPModal;
