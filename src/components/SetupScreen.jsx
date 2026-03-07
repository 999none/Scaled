import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { setupSteps } from '@/data/mockData';

const SetupScreen = ({ taskName, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState([]);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const stepDuration = 1200;
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 1.5;
      });
    }, 50);

    const stepTimers = setupSteps.map((_, index) => {
      return setTimeout(() => {
        if (index > 0) {
          setCompletedSteps((prev) => [...prev, index - 1]);
        }
        setCurrentStep(index);
      }, index * stepDuration);
    });

    const finalTimer = setTimeout(() => {
      setCompletedSteps((prev) => [...prev, setupSteps.length - 1]);
      setTimeout(() => {
        if (onComplete) onComplete();
      }, 600);
    }, setupSteps.length * stepDuration);

    return () => {
      clearInterval(progressInterval);
      stepTimers.forEach(clearTimeout);
      clearTimeout(finalTimer);
    };
  }, [onComplete]);

  return (
    <div data-testid="setup-screen" className="min-h-screen bg-black flex flex-col items-center justify-center">
      {/* Tab bar at top */}
      <div className="fixed top-0 left-0 right-0 z-30 flex items-center px-4 py-3 bg-black/80 backdrop-blur-xl border-b border-zinc-800/50">
        <div className="flex items-center gap-1">
          <button className="flex items-center gap-2 px-4 py-2 rounded-lg text-zinc-400 hover:text-white hover:bg-zinc-800/60 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>
            <span className="text-sm font-medium">Home</span>
          </button>
          <div className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-800/60 border border-zinc-700/40">
            <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span className="text-white text-sm font-medium ml-1">Setting up Task</span>
            <button className="ml-2 p-0.5 rounded hover:bg-zinc-700 transition-colors">
              <svg className="w-3 h-3 text-zinc-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12" /></svg>
            </button>
          </div>
          <button className="p-1.5 rounded-lg hover:bg-zinc-800/60 text-zinc-500 transition-colors">
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14" /></svg>
          </button>
        </div>
      </div>

      <div className="text-center max-w-lg">
        <h1 className="text-3xl font-bold text-cyan-400 mb-3 tracking-tight" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          Setting Up Safe Environment
        </h1>
        <p className="text-zinc-500 text-sm mb-8" style={{ fontFamily: "'JetBrains Mono', monospace" }}>
          // This usually takes around 1-2 mins
        </p>

        {/* Progress bar */}
        <div className="flex gap-1.5 mb-10 justify-center">
          {Array.from({ length: 16 }).map((_, i) => (
            <div
              key={i}
              className={`w-5 h-8 rounded-sm transition-all duration-300 ${
                i / 16 * 100 < progress
                  ? 'bg-cyan-400/80 shadow-[0_0_8px_rgba(34,211,238,0.4)]'
                  : 'bg-zinc-800'
              }`}
              style={{
                animationDelay: `${i * 50}ms`,
                opacity: i / 16 * 100 < progress ? (0.6 + Math.random() * 0.4) : 0.3,
              }}
            />
          ))}
        </div>

        {/* Steps */}
        <div className="space-y-4 text-left max-w-sm mx-auto">
          {setupSteps.map((step, index) => {
            const isCompleted = completedSteps.includes(index);
            const isCurrent = currentStep === index && !isCompleted;
            const isPending = index > currentStep;

            return (
              <div
                key={step.id}
                data-testid={`setup-step-${step.id}`}
                className={`flex items-center gap-3 transition-all duration-500 ${
                  isPending ? 'opacity-40' : 'opacity-100'
                }`}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-zinc-300 flex-shrink-0" />
                ) : isCurrent ? (
                  <Loader2 className="w-5 h-5 text-cyan-400 animate-spin flex-shrink-0" />
                ) : (
                  <div className="w-5 h-5 rounded-full border border-zinc-600 flex-shrink-0" />
                )}
                <span
                  className={`text-sm font-medium ${
                    isCompleted ? 'text-zinc-300' : isCurrent ? 'text-cyan-400' : 'text-zinc-600'
                  }`}
                  style={{ fontFamily: "'JetBrains Mono', monospace" }}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SetupScreen;
