import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, ArrowRight, Loader2, Eye, EyeOff } from 'lucide-react';
import DotBackground from '../components/DotBackground';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);
    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register(email, password, name);
      }
      navigate('/home');
    } catch (err) {
      const msg = err?.response?.data?.detail || 'Une erreur est survenue';
      setError(msg);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative overflow-hidden flex items-center justify-center">
      <DotBackground />

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Logo / Brand */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900/80 backdrop-blur-xl border border-zinc-800/50 mb-6">
            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="text-white text-sm font-semibold tracking-wide">Scaled</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2 tracking-tight">
            {isLogin ? 'Bon retour' : 'Créer un compte'}
          </h1>
          <p className="text-zinc-500 text-sm">
            {isLogin
              ? 'Connectez-vous pour accéder à votre espace'
              : 'Inscrivez-vous pour commencer'}
          </p>
        </div>

        {/* Card */}
        <div className="bg-zinc-900/80 border border-zinc-700/50 rounded-2xl backdrop-blur-xl shadow-2xl p-6">
          {/* Tabs */}
          <div className="flex gap-1 p-1 bg-zinc-800/60 rounded-xl mb-6">
            <button
              data-testid="login-tab"
              onClick={() => { setIsLogin(true); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                isLogin ? 'bg-zinc-700/80 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Connexion
            </button>
            <button
              data-testid="register-tab"
              onClick={() => { setIsLogin(false); setError(''); }}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                !isLogin ? 'bg-zinc-700/80 text-white shadow-lg' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              Inscription
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <label className="text-zinc-400 text-xs font-medium block mb-1.5">Nom</label>
                <div className="flex items-center gap-3 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 focus-within:border-zinc-500 transition-colors">
                  <User className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <input
                    data-testid="register-name-input"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Votre nom"
                    className="bg-transparent text-white text-sm outline-none flex-1 placeholder-zinc-600"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-zinc-400 text-xs font-medium block mb-1.5">Email</label>
              <div className="flex items-center gap-3 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 focus-within:border-zinc-500 transition-colors">
                <Mail className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input
                  data-testid="email-input"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre@email.com"
                  required
                  className="bg-transparent text-white text-sm outline-none flex-1 placeholder-zinc-600"
                />
              </div>
            </div>

            <div>
              <label className="text-zinc-400 text-xs font-medium block mb-1.5">Mot de passe</label>
              <div className="flex items-center gap-3 bg-zinc-800/60 border border-zinc-700/50 rounded-xl px-4 py-3 focus-within:border-zinc-500 transition-colors">
                <Lock className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                <input
                  data-testid="password-input"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="bg-transparent text-white text-sm outline-none flex-1 placeholder-zinc-600"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  className="text-zinc-500 hover:text-zinc-300 transition-colors"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {error && (
              <div data-testid="auth-error" className="bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
                <p className="text-red-400 text-sm">{error}</p>
              </div>
            )}

            <button
              data-testid="auth-submit-btn"
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-semibold transition-all duration-200 bg-zinc-100 text-black hover:bg-white hover:shadow-lg hover:shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <>
                  {isLogin ? 'Se connecter' : "S'inscrire"}
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <p className="text-center text-zinc-600 text-xs mt-6">
          En continuant, vous acceptez nos conditions d'utilisation
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
