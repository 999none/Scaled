import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Plus } from 'lucide-react';
import { projects } from '@/data/mockData';

const ProjectSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(projects[0]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        data-testid="project-selector"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-3 px-5 py-2.5 rounded-xl bg-zinc-900/80 backdrop-blur-xl border transition-all duration-300 border-zinc-700/50 hover:border-zinc-600"
      >
        <span className="w-5 h-5 rounded-full flex-shrink-0" style={{ background: selectedProject.color }} />
        <span className="text-white text-sm font-medium">{selectedProject.name}</span>
        <ChevronDown className={`w-4 h-4 text-zinc-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-72 bg-zinc-900/95 backdrop-blur-xl border border-zinc-700/50 rounded-xl shadow-2xl overflow-hidden z-50">
          {projects.map((project) => (
            <button
              key={project.id}
              onClick={() => { setSelectedProject(project); setIsOpen(false); }}
              className={`w-full flex items-center justify-between px-4 py-3.5 hover:bg-zinc-800/60 transition-colors ${selectedProject.id === project.id ? 'bg-zinc-800/40' : ''}`}
            >
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-full flex-shrink-0" style={{ background: project.color }} />
                <div className="text-left">
                  <p className="text-white text-sm font-medium">{project.name}</p>
                  <p className="text-zinc-500 text-xs">{project.role} • {project.members} membre</p>
                </div>
              </div>
              {selectedProject.id === project.id && <Check className="w-5 h-5 text-emerald-400" />}
            </button>
          ))}
          <div className="border-t border-zinc-800">
            <button className="flex items-center gap-3 px-4 py-3.5 w-full hover:bg-zinc-800/60 transition-colors">
              <Plus className="w-5 h-5 text-zinc-400" />
              <span className="text-white text-sm">Créer un nouveau projet</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectSelector;
