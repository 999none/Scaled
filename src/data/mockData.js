import { Layers, Smartphone, Folder } from 'lucide-react';

export const projects = [
  {
    id: '1',
    name: "None's Project",
    color: 'linear-gradient(135deg, #4ade80, #f97316)',
    role: 'Propriétaire',
    members: 1,
    plan: 'Free Plan',
  },
];

export const appTypes = [
  { id: 'fullstack', label: 'Application Full Stack', icon: Layers },
  { id: 'mobile', label: 'Application mobile', icon: Smartphone },
  { id: 'landing', label: "Page d'atterrissage", icon: Folder },
];

export const models = [
  {
    id: 'claude-4.6-sonnet',
    name: 'Claude 4.6 Sonnet',
    description: "Anthropic's Latest Model (200k Context)",
    provider: 'anthropic',
    icon: 'claude',
  },
  {
    id: 'claude-4.6-opus',
    name: 'Claude 4.6 Opus',
    description: "Anthropic's Most Advanced Model",
    provider: 'anthropic',
    icon: 'claude',
  },
  {
    id: 'gpt-5.4',
    name: 'GPT 5.4',
    description: "OpenAI's Latest Model",
    provider: 'openai',
    icon: 'openai',
  },
  {
    id: 'gpt-5.3-codex',
    name: 'GPT 5.3 Codex',
    description: "OpenAI's Flagship Model",
    provider: 'openai',
    icon: 'openai',
  },
  {
    id: 'gemini-3-pro',
    name: 'Gemini 3 Pro',
    description: "Google's Latest Model",
    provider: 'google',
    icon: 'google',
  },
];

export const templates = [
  { id: 'fullstack', name: 'Full Stack Template' },
  { id: 'python', name: 'Base Python Template' },
];

export const mcpServers = [
  {
    id: 'memory',
    name: 'Memory MCP',
    description: 'Enable memory for your agent',
    icon: 'memory',
    hasToggle: true,
    enabled: false,
  },
  {
    id: 'supabase',
    name: 'Supabase MCP',
    description: 'Connect your Agent to Supabase using MCP',
    icon: 'supabase',
    keyNeeded: true,
  },
  {
    id: 'notion',
    name: 'Notion MCP',
    description: 'Connect your Agent to Notion',
    icon: 'notion',
    keyNeeded: true,
  },
];

export const languages = [
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt-br', name: 'Português (Brazil)', flag: '🇧🇷' },
  { code: 'pt', name: 'Português (Portugal)', flag: '🇵🇹' },
];

export const userProfile = {
  email: 'virojag566@hopesx.com',
  name: 'none',
  avatar: 'N',
  language: 'fr',
};

export const setupSteps = [
  { id: 'init', label: 'Initializing cloud environment' },
  { id: 'provision', label: 'Provisioning resources' },
  { id: 'configure', label: 'Configuring environment' },
  { id: 'agent', label: 'Starting the agent' },
];

export const generateSessionId = () => {
  const chars = '0123456789abcdef';
  const sections = [8, 4, 4, 4, 12];
  return sections.map(len =>
    Array.from({ length: len }, () => chars[Math.floor(Math.random() * chars.length)]).join('')
  ).join('-');
};

export const mockChatFlow = (userPrompt) => {
  return [
    {
      id: 'welcome',
      type: 'agent',
      delay: 1500,
      content: `Welcome to Emergent—your launchpad for ambitious apps.\n\nWhether you're building a marketplace, a SaaS tool, a real-time collaboration platform, or something entirely new—Emergent is built for builders with real ambitions. Whatever vision brought you here, you're in the right place to turn it into something that actually works in production from day one.\n\nI'll set up your core structure now and we'll iterate from there. Let's build.`,
    },
    {
      id: 'question',
      type: 'agent-question',
      delay: 3000,
      header: 'Agent is asking a question, Please answer it to further continue :',
      content: `Hi there!\n\nYour problem statement just says **"${userPrompt}"** — I'd love to help you build something awesome, but I need a bit more detail first!\n\n1. **What would you like to build?** (e.g., a dashboard, SaaS app, portfolio, e-commerce site, landing page, etc.)\n2. **Any specific features or integrations** you have in mind? (e.g., authentication, AI/LLM, payments, etc.)\n3. **Any design preferences?** (e.g., dark/light theme, minimal, bold, specific colors, etc.)\n\nPlease share your idea and I'll get started right away!`,
      isWaiting: true,
    },
  ];
};
