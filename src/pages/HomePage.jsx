import React, { useState } from 'react';
import DotBackground from '@/components/DotBackground';
import Navbar from '@/components/Navbar';
import ProjectSelector from '@/components/ProjectSelector';
import AppTypeTabs from '@/components/AppTypeTabs';
import PromptInput from '@/components/PromptInput';
import SettingsModal from '@/components/SettingsModal';

const HomePage = () => {
  const [showSettings, setShowSettings] = useState(false);

  return (
    <div data-testid="home-page" className="min-h-screen bg-black relative overflow-hidden">
      <DotBackground />
      <Navbar onOpenSettings={() => setShowSettings(true)} />

      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 pt-20">
        <div className="mb-12">
          <ProjectSelector />
        </div>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-5 tracking-tight">
            Là où les idées deviennent réalité
          </h1>
          <p className="text-zinc-400 text-lg md:text-xl max-w-2xl mx-auto">
            Créez des applications et sites web entièrement fonctionnels grâce à de simples conversations
          </p>
        </div>

        <div className="mb-6">
          <AppTypeTabs />
        </div>

        <PromptInput />
      </main>

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
    </div>
  );
};

export default HomePage;
