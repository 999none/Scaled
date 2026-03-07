import React, { useState, useEffect, useRef } from 'react';
import { Paperclip, Github, Mic, ArrowUp, Sparkles } from 'lucide-react';

const ChatInput = ({ onSend, isWaiting }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setMessage(e.target.value);
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
      textareaRef.current.style.height = Math.min(textareaRef.current.scrollHeight, 160) + 'px';
    }
  };

  const handleSubmit = () => {
    if (!message.trim() || isWaiting) return;
    onSend(message.trim());
    setMessage('');
    if (textareaRef.current) {
      textareaRef.current.style.height = '44px';
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div data-testid="chat-input" className="border-t border-zinc-800/50 bg-zinc-950/80 backdrop-blur-xl px-4 py-3">
      {isWaiting && (
        <div className="flex items-center gap-2 mb-3 px-1">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span className="text-cyan-400 text-sm font-medium">Agent is waiting...</span>
        </div>
      )}
      <div className="bg-zinc-900/80 border border-zinc-700/40 rounded-2xl overflow-hidden">
        <div className="p-3">
          <textarea
            ref={textareaRef}
            data-testid="chat-message-input"
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Message Agent"
            className="w-full bg-transparent text-white placeholder-zinc-500 resize-none outline-none text-sm min-h-[44px] max-h-[160px]"
            rows={1}
            style={{ height: '44px' }}
          />
        </div>
        <div className="flex items-center justify-between px-3 pb-3">
          <div className="flex items-center gap-1">
            <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors group" title="Joindre">
              <Paperclip className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors group">
              <Github className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
              <span className="text-zinc-500 group-hover:text-zinc-300 text-xs font-medium">Save</span>
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-full hover:bg-zinc-800 transition-colors group">
              <Sparkles className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300" />
              <span className="text-zinc-500 group-hover:text-zinc-300 text-xs font-medium">Summarize</span>
            </button>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 rounded-full hover:bg-zinc-800 transition-colors text-zinc-500 hover:text-zinc-300">
              <Mic className="w-4 h-4" />
            </button>
            <button
              data-testid="chat-send-btn"
              onClick={handleSubmit}
              disabled={!message.trim() || isWaiting}
              className={`p-2 rounded-full transition-all duration-200 ${
                message.trim() && !isWaiting
                  ? 'bg-white text-black hover:bg-zinc-200'
                  : 'bg-zinc-700 text-zinc-500 cursor-not-allowed'
              }`}
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
