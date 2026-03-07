import React, { useState } from 'react';
import { Download, Check, Loader2, ArrowLeft, Github, FileArchive } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const DownloadPage = () => {
  const [downloading, setDownloading] = useState(false);
  const [downloaded, setDownloaded] = useState(false);
  const navigate = useNavigate();

  const handleDownload = async () => {
    setDownloading(true);
    try {
      const response = await fetch(`${BACKEND_URL}/api/download-project`);
      if (!response.ok) throw new Error('Download failed');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'scaled-project.zip';
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

      setDownloaded(true);
      setTimeout(() => setDownloaded(false), 4000);
    } catch (error) {
      console.error('Download error:', error);
    } finally {
      setDownloading(false);
    }
  };

  return (
    <div data-testid="download-page" className="min-h-screen bg-black relative overflow-hidden">
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-0 bg-black" />
        <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      </div>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <button onClick={() => navigate('/')} className="absolute top-6 left-6 flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 hover:border-zinc-700 transition-all duration-300 text-zinc-300 hover:text-white">
          <ArrowLeft className="w-4 h-4" />
          <span className="text-sm font-medium">Retour</span>
        </button>

        <div className="max-w-md w-full text-center">
          <div className="w-20 h-20 rounded-2xl bg-zinc-900/80 border border-zinc-700/50 flex items-center justify-center mx-auto mb-8">
            <FileArchive className="w-10 h-10 text-emerald-400" />
          </div>

          <h1 className="text-3xl font-bold text-white mb-3">Télécharger le projet</h1>
          <p className="text-zinc-400 text-base mb-8 max-w-sm mx-auto">
            Téléchargez le code source complet du projet au format ZIP, prêt à être push sur votre GitHub.
          </p>

          <button
            data-testid="download-btn"
            onClick={handleDownload}
            disabled={downloading}
            className={`inline-flex items-center gap-3 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-300 ${
              downloaded ? 'bg-emerald-600 text-white' : downloading ? 'bg-zinc-800 text-zinc-400 cursor-wait' : 'bg-zinc-100 text-black hover:bg-white hover:shadow-lg hover:shadow-white/10'
            }`}
          >
            {downloaded ? (<><Check className="w-5 h-5" />Téléchargé !</>) : downloading ? (<><Loader2 className="w-5 h-5 animate-spin" />Préparation...</>) : (<><Download className="w-5 h-5" />Télécharger le ZIP</>)}
          </button>

          <div className="mt-10 p-5 bg-zinc-900/60 border border-zinc-800/50 rounded-2xl text-left">
            <p className="text-zinc-300 text-sm font-semibold mb-3 flex items-center gap-2">
              <Github className="w-4 h-4" />
              Push sur GitHub
            </p>
            <div className="space-y-2 text-zinc-500 text-xs font-mono">
              <p className="bg-zinc-800/60 rounded-lg px-3 py-2">$ unzip scaled-project.zip</p>
              <p className="bg-zinc-800/60 rounded-lg px-3 py-2">$ cd scaled-project</p>
              <p className="bg-zinc-800/60 rounded-lg px-3 py-2">$ git init && git add .</p>
              <p className="bg-zinc-800/60 rounded-lg px-3 py-2">$ git commit -m "Initial commit"</p>
              <p className="bg-zinc-800/60 rounded-lg px-3 py-2">$ git remote add origin &lt;votre-repo&gt;</p>
              <p className="bg-zinc-800/60 rounded-lg px-3 py-2">$ git push -u origin main</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DownloadPage;
