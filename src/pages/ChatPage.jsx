import React, { useState, useEffect, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Plus, X, Info, Code, Eye, Rocket, Bell } from 'lucide-react';
import SetupScreen from '@/components/SetupScreen';
import ChatMessages from '@/components/chat/ChatMessages';
import ChatInput from '@/components/chat/ChatInput';
import PreviewPanel from '@/components/chat/PreviewPanel';
import InfoPanel from '@/components/chat/InfoPanel';
import CodeModal from '@/components/chat/CodeModal';
import { mockChatFlow, generateSessionId } from '@/data/mockData';

const ChatPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userPrompt, model } = location.state || {};

  const [phase, setPhase] = useState('setup'); // 'setup' | 'chat'
  const [messages, setMessages] = useState([]);
  const [isWaiting, setIsWaiting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [sessionId] = useState(generateSessionId());
  const [taskName] = useState(userPrompt || 'test');

  const modelName = model?.name || 'claude-opus-4-6';

  const handleSetupComplete = useCallback(() => {
    setPhase('chat');
    // Add user message
    const userMsg = {
      id: 'user-1',
      type: 'user',
      content: userPrompt || 'test',
    };
    setMessages([userMsg]);

    // Start mock chat flow
    const flow = mockChatFlow(userPrompt || 'test');
    let typingTimer;

    flow.forEach((msg, index) => {
      // Show typing indicator before each agent message
      setTimeout(() => {
        setMessages((prev) => [...prev, { id: `typing-${index}`, type: 'typing' }]);
      }, msg.delay - 1000);

      // Replace typing with actual message
      setTimeout(() => {
        setMessages((prev) => {
          const filtered = prev.filter((m) => m.id !== `typing-${index}`);
          return [...filtered, { ...msg, id: msg.id }];
        });
        if (msg.isWaiting) {
          setIsWaiting(true);
        }
      }, msg.delay);
    });
  }, [userPrompt]);

  // If no prompt, redirect to home
  useEffect(() => {
    if (!userPrompt) {
      navigate('/');
    }
  }, [userPrompt, navigate]);

  const handleSendMessage = (content) => {
    const newMsg = {
      id: `user-${Date.now()}`,
      type: 'user',
      content,
    };
    setMessages((prev) => [...prev, newMsg]);
    setIsWaiting(false);

    // Mock agent response
    setTimeout(() => {
      setMessages((prev) => [...prev, { id: `typing-reply`, type: 'typing' }]);
    }, 500);

    setTimeout(() => {
      setMessages((prev) => {
        const filtered = prev.filter((m) => m.id !== 'typing-reply');
        return [
          ...filtered,
          {
            id: `agent-${Date.now()}`,
            type: 'agent',
            content: `Thank you for the details! I'm now analyzing your requirements and preparing the workspace. I'll start building based on what you've shared.\n\nLet me set up the project structure and begin implementation...`,
          },
        ];
      });
    }, 2500);
  };

  if (phase === 'setup') {
    return <SetupScreen taskName={taskName} onComplete={handleSetupComplete} />;
  }

  return (
    <div data-testid="chat-page" className="h-screen bg-black flex flex-col">
      {/* Top bar with tabs */}
      <div className="flex items-center justify-between px-3 py-2 bg-zinc-950 border-b border-zinc-800/50 flex-shrink-0">
        {/* Left: Tabs */}
        <div className="flex items-center gap-1">
          <button
            data-testid="home-tab-btn"
            onClick={() => navigate('/')}
            className="flex items-center gap-2 px-3 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors"
          >
            <LayoutGrid className="w-4 h-4" />
            <span className="text-sm font-medium">Home</span>
          </button>

          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span className="text-white text-sm font-medium ml-1 max-w-[200px] truncate">{taskName}</span>
            <button
              data-testid="close-tab-btn"
              onClick={() => navigate('/')}
              className="ml-2 p-0.5 rounded hover:bg-zinc-700 transition-colors"
            >
              <X className="w-3 h-3 text-zinc-400" />
            </button>
          </div>

          <button className="p-1.5 rounded-lg hover:bg-zinc-800/60 text-zinc-500 transition-colors">
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {/* Right: Action buttons */}
        <div className="flex items-center gap-2">
          <button
            data-testid="info-btn"
            onClick={() => { setShowInfo(!showInfo); setShowPreview(false); }}
            className={`p-2 rounded-full transition-colors ${showInfo ? 'bg-zinc-700 text-white' : 'hover:bg-zinc-800/60 text-zinc-400'}`}
          >
            <Info className="w-4 h-4" />
          </button>

          <button
            data-testid="code-btn"
            onClick={() => setShowCode(true)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800/60 border border-zinc-700/40 hover:bg-zinc-700/60 transition-colors"
          >
            <Code className="w-4 h-4 text-cyan-400" />
            <span className="text-white text-sm font-medium">Code</span>
          </button>

          <button
            data-testid="preview-btn"
            onClick={() => { setShowPreview(!showPreview); setShowInfo(false); }}
            className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border transition-colors ${
              showPreview
                ? 'bg-zinc-700/60 border-zinc-600 text-white'
                : 'bg-zinc-800/60 border-zinc-700/40 hover:bg-zinc-700/60 text-white'
            }`}
          >
            <Eye className="w-4 h-4 text-cyan-400" />
            <span className="text-sm font-medium">Preview</span>
          </button>

          <button
            data-testid="deploy-btn"
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-zinc-800/40 border border-zinc-700/30 text-zinc-600 cursor-not-allowed opacity-50"
            disabled
          >
            <Rocket className="w-4 h-4" />
            <span className="text-sm font-medium">Deploy</span>
          </button>

          <button className="p-2 rounded-full hover:bg-zinc-800/60 transition-colors text-zinc-400">
            <Bell className="w-4 h-4" />
          </button>
          <div className="w-7 h-7 rounded-full bg-zinc-700 flex items-center justify-center text-white text-xs font-medium">
            N
          </div>
        </div>
      </div>

      {/* Main content area */}
      <div className="flex-1 flex min-h-0">
        {/* Chat area */}
        <div className={`flex flex-col flex-1 transition-all duration-300 ${showPreview ? 'w-1/2' : showInfo ? 'flex-1' : 'flex-1'}`}>
          <ChatMessages messages={messages} />
          <ChatInput onSend={handleSendMessage} isWaiting={isWaiting} />
        </div>

        {/* Side panels */}
        <PreviewPanel isOpen={showPreview} onClose={() => setShowPreview(false)} />
        <InfoPanel
          isOpen={showInfo}
          onClose={() => setShowInfo(false)}
          sessionId={sessionId}
          modelName={modelName}
        />
      </div>

      {/* Code Modal */}
      <CodeModal isOpen={showCode} onClose={() => setShowCode(false)} />
    </div>
  );
};

export default ChatPage;
