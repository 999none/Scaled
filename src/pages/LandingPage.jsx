import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Github, Apple, Mail, ChevronLeft, ChevronRight } from 'lucide-react';

const SHOWCASE_IMG = "https://static.prod-images.emergentagent.com/jobs/8a819a07-2853-4c5f-9c3f-77bbe08dd3fc/images/64f51ccb99935341fa0b2d8b60f5d141cc5e00c18d8e99ade2660a7bc35ce251.png";

const GoogleIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18A10.96 10.96 0 0 0 1 12c0 1.77.42 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const DiscordIcon = () => (
  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189z"/>
  </svg>
);

const ScaledLogo = () => (
  <div className="flex items-center gap-2">
    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
      <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    </div>
    <span className="text-white text-lg font-semibold tracking-tight">Scaled</span>
  </div>
);

const LandingPage = () => {
  const navigate = useNavigate();
  const [activeSlide, setActiveSlide] = useState(0);

  const handleLogin = () => {
    localStorage.setItem('scaled_auth', 'true');
    navigate('/home');
  };

  const slides = [
    {
      title: "Concu pour les equipes",
      subtitle: "Construisez, testez et deployez avec vos collegues en temps reel, du concept au lancement.",
    },
    {
      title: "IA de derniere generation",
      subtitle: "Exploitez les meilleurs modeles d'IA pour generer du code fonctionnel en quelques minutes.",
    },
    {
      title: "Deploiement instantane",
      subtitle: "Mettez en production vos applications en un clic, avec un pipeline CI/CD integre.",
    },
  ];

  const nextSlide = () => setActiveSlide((p) => (p + 1) % slides.length);
  const prevSlide = () => setActiveSlide((p) => (p - 1 + slides.length) % slides.length);

  return (
    <div className="min-h-screen bg-black flex" data-testid="landing-page">
      {/* LEFT SIDE - Auth */}
      <div className="w-full lg:w-[45%] min-h-screen flex flex-col relative overflow-hidden">
        {/* Matrix code rain background */}
        <div className="absolute inset-0 overflow-hidden opacity-[0.07] select-none pointer-events-none" aria-hidden="true">
          <pre className="text-emerald-400 text-[11px] leading-[1.6] font-mono whitespace-pre-wrap break-all p-4">
{`Q  ZATQLQ   B        P+K.IYu
+Q aMQTq  ZP .T    +Sv.V.TYBdL
QB.+QXA.R..M.        V.Q>TT7
C  NxZ C+N  al      M.Kt.MN
+UN..  QOK.       <Q  M  DaKf7
HUNL.  D.Q.T        Q.N+WK-
AqNN~ MUNQ       KQOB6w.T.Tv
IYYU  & SXZQUL     PrQ9.W+N
s  B  &Q.R +1      ZHkQ&X.N
XQZQ H+1W6z      V+NzT.M8XQ
Q  ZATQLQ   B        P+K.IYu
+Q aMQTq  ZP .T    +Sv.V.TYBdL
QB.+QXA.R..M.        V.Q>TT7
C  NxZ C+N  al      M.Kt.MN
+UN..  QOK.       <Q  M  DaKf7
HUNL.  D.Q.T        Q.N+WK-
AqNN~ MUNQ       KQOB6w.T.Tv
IYYU  & SXZQUL     PrQ9.W+N
s  B  &Q.R +1      ZHkQ&X.N
XQZQ H+1W6z      V+NzT.M8XQ
Q  ZATQLQ   B        P+K.IYu
+Q aMQTq  ZP .T    +Sv.V.TYBdL
QB.+QXA.R..M.        V.Q>TT7
C  NxZ C+N  al      M.Kt.MN
+UN..  QOK.       <Q  M  DaKf7
HUNL.  D.Q.T        Q.N+WK-
AqNN~ MUNQ       KQOB6w.T.Tv`}
          </pre>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-8 py-12">
          {/* Logo */}
          <div className="absolute top-6 left-6">
            <ScaledLogo />
          </div>

          {/* Main content */}
          <div className="w-full max-w-[340px] flex flex-col items-center">
            {/* 3D Icon */}
            <div className="mb-8">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-zinc-600 via-zinc-400 to-zinc-600 flex items-center justify-center shadow-2xl shadow-zinc-500/20 rotate-[-8deg] hover:rotate-0 transition-transform duration-500">
                <svg className="w-9 h-9 text-white drop-shadow-lg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                  <path d="M2 17l10 5 10-5"/>
                  <path d="M2 12l10 5 10-5"/>
                </svg>
              </div>
            </div>

            {/* Headline */}
            <h1 className="text-center mb-10">
              <span className="block text-white text-[28px] font-bold leading-tight tracking-tight">
                Construisez des apps
              </span>
              <span className="block text-[28px] font-bold leading-tight tracking-tight">
                <span className="text-white">Full-Stack </span>
                <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">
                  en quelques minutes
                </span>
              </span>
            </h1>

            {/* Continue with Google */}
            <button
              onClick={handleLogin}
              data-testid="google-login-btn"
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-white rounded-full text-zinc-800 font-medium text-sm hover:bg-zinc-100 transition-all duration-200 shadow-lg shadow-white/5 mb-4"
            >
              <GoogleIcon />
              Continuer avec Google
            </button>

            {/* Social icons row */}
            <div className="flex items-center gap-3 mb-4">
              <button
                onClick={handleLogin}
                data-testid="github-login-btn"
                className="w-14 h-14 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700 transition-all duration-200 hover:border-zinc-600"
              >
                <Github className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogin}
                data-testid="apple-login-btn"
                className="w-14 h-14 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-white hover:bg-zinc-700 transition-all duration-200 hover:border-zinc-600"
              >
                <Apple className="w-5 h-5" />
              </button>
              <button
                onClick={handleLogin}
                data-testid="discord-login-btn"
                className="w-14 h-14 rounded-full bg-zinc-800/80 border border-zinc-700/50 flex items-center justify-center text-[#5865F2] hover:bg-zinc-700 transition-all duration-200 hover:border-zinc-600"
              >
                <DiscordIcon />
              </button>
            </div>

            {/* Continue with Email */}
            <button
              onClick={handleLogin}
              data-testid="email-login-btn"
              className="w-full flex items-center justify-center gap-3 px-6 py-3.5 bg-zinc-800/80 border border-zinc-700/50 rounded-full text-white font-medium text-sm hover:bg-zinc-700 transition-all duration-200 mb-8"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              Continuer avec Email
            </button>

            {/* Terms */}
            <p className="text-zinc-500 text-xs text-center leading-relaxed">
              En continuant, vous acceptez nos{' '}
              <span className="text-zinc-400 underline underline-offset-2 cursor-pointer hover:text-white transition-colors">
                Conditions d'utilisation
              </span>{' '}
              et notre{' '}
              <span className="text-zinc-400 underline underline-offset-2 cursor-pointer hover:text-white transition-colors">
                Politique de confidentialite
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE - Showcase */}
      <div className="hidden lg:flex w-[55%] min-h-screen relative overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-sky-400 via-blue-500 to-teal-400" />
        <div className="absolute inset-0 bg-gradient-to-t from-blue-600/30 via-transparent to-white/20" />

        {/* Light rays effect */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            background: 'radial-gradient(ellipse at 30% 20%, rgba(255,255,255,0.4) 0%, transparent 60%), radial-gradient(ellipse at 70% 80%, rgba(0,200,200,0.3) 0%, transparent 50%)',
          }}
        />

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center flex-1 px-12 py-12">
          {/* Team avatars + Title */}
          <div className="flex flex-col items-center mb-6">
            <div className="flex items-center gap-1 mb-4">
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
              <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/40 flex items-center justify-center -ml-2">
                <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>
              </div>
            </div>
            <h2 className="text-white text-3xl font-bold mb-2 drop-shadow-lg text-center">
              {slides[activeSlide].title}
            </h2>
            <p className="text-white/80 text-sm text-center max-w-md leading-relaxed drop-shadow">
              {slides[activeSlide].subtitle}
            </p>
          </div>

          {/* Browser mockup */}
          <div className="w-full max-w-[560px] rounded-xl overflow-hidden shadow-2xl shadow-black/30 border border-white/10">
            {/* Browser chrome */}
            <div className="bg-zinc-900 px-4 py-2.5 flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="bg-zinc-800 rounded-lg px-4 py-1 flex items-center gap-2 min-w-[200px]">
                  <svg className="w-3 h-3 text-zinc-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
                  <span className="text-zinc-500 text-xs">scaled.app</span>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <div className="w-4 h-4 text-zinc-500">+</div>
              </div>
            </div>
            {/* Browser content - screenshot */}
            <div className="relative">
              <img
                src={SHOWCASE_IMG}
                alt="App showcase"
                className="w-full object-cover"
                style={{ maxHeight: '380px' }}
              />
              {/* Collaboration cursors overlay */}
              <div className="absolute top-12 right-8 flex flex-col items-end gap-1 animate-pulse">
                <div className="bg-blue-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-lg">
                  Alex
                </div>
              </div>
              <div className="absolute bottom-20 left-8 flex flex-col items-start gap-1">
                <div className="bg-emerald-500 text-white text-xs font-medium px-2.5 py-1 rounded-lg shadow-lg animate-pulse" style={{ animationDelay: '1s' }}>
                  Marie
                </div>
              </div>
            </div>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center gap-4 mt-8">
            <button
              onClick={prevSlide}
              data-testid="carousel-prev"
              className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2">
              {slides.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveSlide(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeSlide
                      ? 'w-8 h-2 bg-white'
                      : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={nextSlide}
              data-testid="carousel-next"
              className="w-10 h-10 rounded-full border-2 border-white/30 flex items-center justify-center text-white hover:bg-white/10 transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
