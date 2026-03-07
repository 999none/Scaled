import React, { useEffect, useRef } from 'react';

const AgentIcon = () => (
  <div className="w-7 h-7 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center flex-shrink-0">
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="4" stroke="#71717a" strokeWidth="1.5" />
      <circle cx="9" cy="11" r="1.5" fill="#71717a" />
      <circle cx="15" cy="11" r="1.5" fill="#71717a" />
      <path d="M9 15.5c0 0 1.5 1.5 3 1.5s3-1.5 3-1.5" stroke="#71717a" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  </div>
);

const renderMarkdown = (text) => {
  const lines = text.split('\n');
  return lines.map((line, i) => {
    // Bold
    let processed = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-white font-semibold">$1</strong>');
    // Numbered list
    const listMatch = processed.match(/^(\d+)\.\s(.*)/);
    if (listMatch) {
      return (
        <div key={i} className="flex gap-2 ml-2 my-1.5">
          <span className="text-zinc-500 flex-shrink-0">{listMatch[1]}.</span>
          <span className="text-zinc-300" dangerouslySetInnerHTML={{ __html: listMatch[2] }} />
        </div>
      );
    }
    if (line.trim() === '') return <div key={i} className="h-3" />;
    return <p key={i} className="text-zinc-300 leading-relaxed" dangerouslySetInnerHTML={{ __html: processed }} />;
  });
};

const ChatMessages = ({ messages }) => {
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div
      ref={scrollRef}
      data-testid="chat-messages"
      className="flex-1 overflow-y-auto px-6 py-6 space-y-6"
    >
      {messages.map((msg) => {
        if (msg.type === 'user') {
          return (
            <div key={msg.id} className="flex justify-end" data-testid={`msg-${msg.id}`}>
              <div className="bg-zinc-800/80 border border-zinc-700/40 rounded-2xl px-5 py-3 max-w-[70%]">
                <p className="text-white text-sm">{msg.content}</p>
              </div>
            </div>
          );
        }

        if (msg.type === 'agent') {
          return (
            <div key={msg.id} className="flex gap-3" data-testid={`msg-${msg.id}`}>
              <AgentIcon />
              <div className="flex-1 max-w-[85%]">
                <div className="space-y-1">
                  {renderMarkdown(msg.content)}
                </div>
              </div>
            </div>
          );
        }

        if (msg.type === 'agent-question') {
          return (
            <div key={msg.id} className="flex gap-3" data-testid={`msg-${msg.id}`}>
              <AgentIcon />
              <div className="flex-1 max-w-[85%]">
                <div className="bg-zinc-900/80 border border-zinc-700/40 rounded-2xl overflow-hidden">
                  {/* Question header */}
                  <div className="bg-teal-900/30 border-b border-teal-800/30 px-4 py-2.5 flex items-center gap-2">
                    <div className="w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
                      <span className="text-teal-400 text-xs font-bold">?</span>
                    </div>
                    <span className="text-teal-300/90 text-sm font-medium">{msg.header}</span>
                  </div>
                  {/* Question content */}
                  <div className="p-4 space-y-1">
                    {renderMarkdown(msg.content)}
                  </div>
                </div>
              </div>
            </div>
          );
        }

        if (msg.type === 'typing') {
          return (
            <div key={msg.id} className="flex gap-3" data-testid="typing-indicator">
              <AgentIcon />
              <div className="flex items-center gap-1.5 px-4 py-3">
                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '0ms' }} />
                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '150ms' }} />
                <div className="w-2 h-2 rounded-full bg-zinc-500 animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          );
        }

        return null;
      })}
    </div>
  );
};

export default ChatMessages;
