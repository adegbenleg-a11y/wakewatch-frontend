import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Camera,
  Cpu,
  BellRing,
  ShieldCheck,
  Zap,
  Activity,
  BarChart3,
  Lock,
  ArrowRight,
  Eye,
  CheckCircle2,
  AlertTriangle,
  Play,
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import StatusPill from '../components/detection/StatusPill';
import { DETECTION_STATES } from '../api/client';

export default function Landing() {
  const [activeTabState, setActiveTabState] = useState(DETECTION_STATES.AWAKE);

  return (
    <div className="min-h-screen bg-bitnox-bg text-slate-100 font-sans selection:bg-bitnox-primary selection:text-bitnox-foreground relative overflow-hidden">
      {/* Ambient Cyber Lighting / Glow Orbs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-gradient-to-b from-bitnox-primary/15 via-cyan-900/10 to-transparent rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[600px] -left-48 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-[1200px] -right-48 w-96 h-96 bg-bitnox-accent/40 rounded-full blur-3xl pointer-events-none" />

      {/* Top Public Landing Header */}
      <header className="border-b border-bitnox-border/70 bg-bitnox-surface/75 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bitnox-primary via-cyan-500 to-cyan-800 flex items-center justify-center font-heading font-extrabold text-bitnox-foreground shadow-glow-primary text-lg transition-transform group-hover:scale-105">
              B
            </div>
            <div className="flex flex-col">
              <span className="font-heading font-bold text-lg tracking-tight text-white flex items-center gap-2">
                WakeWatch
                <span className="text-[10px] uppercase font-mono tracking-wider px-1.5 py-0.5 rounded bg-bitnox-primary/10 border border-bitnox-primary/30 text-bitnox-primary">
                  Bitnox AI
                </span>
              </span>
              <span className="text-[11px] text-slate-400 font-medium hidden sm:inline">
                Bitnox Technology • Abeokuta
              </span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center space-x-6 text-xs font-mono text-slate-300">
            <a href="#how-it-works" className="hover:text-bitnox-primary transition-colors">
              How It Works
            </a>
            <a href="#features" className="hover:text-bitnox-primary transition-colors">
              Features
            </a>
            <a href="#privacy" className="hover:text-bitnox-primary transition-colors">
              Privacy & Consent
            </a>
            <Link to="/design" className="hover:text-bitnox-primary transition-colors">
              Style Guide
            </Link>
          </nav>

          <div className="flex items-center space-x-3">
            <Link to="/login" className="text-xs font-heading font-semibold text-slate-300 hover:text-white px-3 py-2 hidden sm:inline-block">
              Sign In
            </Link>
            <Link to="/dashboard">
              <Button
                variant="primary"
                size="sm"
                iconRight={<ArrowRight className="w-3.5 h-3.5" />}
              >
                Launch Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* 1. HERO SECTION */}
      <section className="relative pt-12 pb-20 sm:pt-20 sm:pb-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-bitnox-accent/80 border border-bitnox-border text-bitnox-primary text-xs font-mono shadow-sm">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-bitnox-primary" />
            <span>Trained ML Vision Model • Built for Bitnox Hub Abeokuta</span>
          </div>

          <h1 className="font-heading font-black text-3xl sm:text-5xl lg:text-6xl text-white tracking-tight leading-[1.12]">
            Keep Your Tech Teams & Classrooms{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bitnox-primary via-cyan-300 to-cyan-500">
              Alert, Awake & Focused
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-lg leading-relaxed max-w-2xl mx-auto">
            WakeWatch uses computer vision to continuously analyze camera feeds, detecting{' '}
            <strong className="text-white">AWAKE</strong>,{' '}
            <strong className="text-amber-400">DROWSY</strong>, and{' '}
            <strong className="text-rose-400">SLEEPING</strong> states with sub-second accuracy before focus drops.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link to="/dashboard" className="w-full sm:w-auto">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Launch Dashboard
              </Button>
            </Link>
            <a href="#how-it-works" className="w-full sm:w-auto">
              <Button variant="secondary" size="lg" fullWidth>
                See How It Works
              </Button>
            </a>
          </div>

          <div className="flex items-center justify-center gap-6 pt-4 text-xs font-mono text-slate-400">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-status-awake" />
              Real-time 30 FPS
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-status-awake" />
              Samsara PERCLOS Standard
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-status-awake" />
              Edge Privacy-Safe
            </span>
          </div>
        </div>

        {/* HERO MOCK CONSOLE / SCREENSHOT ILLUSTRATION */}
        <div className="mt-12 sm:mt-16 max-w-5xl mx-auto">
          <div className="bitnox-glass rounded-2xl sm:rounded-3xl border border-bitnox-border overflow-hidden shadow-glass-card relative">
            {/* Top Mock Window Bar */}
            <div className="h-10 bg-bitnox-surface border-b border-bitnox-border/80 px-4 flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="text-[11px] font-mono text-slate-400 ml-2">
                  wakewatch.bitnoxsolution.com/monitor
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-status-awake animate-pulse" />
                <span className="text-[10px] font-mono text-emerald-400">LIVE FEED</span>
              </div>
            </div>

            {/* Mock Screen Viewport */}
            <div className="p-4 sm:p-8 bg-gradient-to-b from-bitnox-surface/90 to-bitnox-bg">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Camera Viewport Simulation */}
                <div className="lg:col-span-2 rounded-2xl bg-black border border-bitnox-border overflow-hidden relative aspect-video flex flex-col justify-between p-4 sm:p-6 shadow-inner">
                  {/* Subtle video scanline effect */}
                  <div className="absolute inset-0 bg-[radial-gradient(#05e4fc_1px,transparent_1px)] [background-size:24px_24px] opacity-15 pointer-events-none" />

                  {/* Viewport Top Header */}
                  <div className="flex items-center justify-between z-10">
                    <span className="text-xs font-mono text-white bg-black/60 px-2.5 py-1 rounded-md border border-white/10">
                      CAM_01 • Desk Pod 2 (Abeokuta Lab)
                    </span>
                    <StatusPill status={activeTabState} confidence={0.97} size="sm" />
                  </div>

                  {/* Bounding Box Simulation HUD */}
                  <div className="relative mx-auto my-auto z-10 text-center">
                    <div className="relative inline-block border-2 border-dashed border-bitnox-primary/70 rounded-2xl p-6 sm:p-10 bg-bitnox-surface/50 backdrop-blur-sm shadow-glow-primary">
                      <Camera className="w-10 h-10 text-bitnox-primary mx-auto mb-2 animate-pulse" />
                      <div className="text-sm font-heading font-bold text-white">
                        Facial Landmark Matrix
                      </div>
                      <div className="text-[11px] font-mono text-slate-300">
                        Subject: Engr. Tunde Adeleke
                      </div>

                      {/* HUD Corners */}
                      <span className="absolute -top-1.5 -left-1.5 w-3 h-3 border-t-2 border-l-2 border-bitnox-primary" />
                      <span className="absolute -top-1.5 -right-1.5 w-3 h-3 border-t-2 border-r-2 border-bitnox-primary" />
                      <span className="absolute -bottom-1.5 -left-1.5 w-3 h-3 border-b-2 border-l-2 border-bitnox-primary" />
                      <span className="absolute -bottom-1.5 -right-1.5 w-3 h-3 border-b-2 border-r-2 border-bitnox-primary" />
                    </div>
                  </div>

                  {/* Viewport Telemetry Bottom */}
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-300 z-10 bg-black/60 px-3 py-1.5 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4">
                      <span>EAR: <strong className="text-bitnox-primary">{activeTabState === 'SLEEPING' ? '0.12' : activeTabState === 'DROWSY' ? '0.21' : '0.34'}</strong></span>
                      <span>MAR: <strong className="text-white">{activeTabState === 'DROWSY' ? '0.62' : '0.11'}</strong></span>
                      <span>PERCLOS: <strong className="text-emerald-400">{activeTabState === 'SLEEPING' ? '68%' : '3.8%'}</strong></span>
                    </div>
                    <span className="text-[10px] text-slate-400 hidden sm:inline">Confidence: 97.4%</span>
                  </div>
                </div>

                {/* Right Interactive Telemetry Sidecard */}
                <div className="space-y-4 flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="text-xs font-mono uppercase text-slate-400 tracking-wider">
                      Interactive Simulation Mode:
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setActiveTabState(DETECTION_STATES.AWAKE)}
                        className={`p-2 rounded-xl text-center border font-mono text-xs transition-all ${
                          activeTabState === DETECTION_STATES.AWAKE
                            ? 'bg-status-awake-bg border-status-awake-border text-status-awake-light shadow-glow-awake font-bold'
                            : 'bg-bitnox-surface border-bitnox-border text-slate-400 hover:text-white'
                        }`}
                      >
                        AWAKE
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTabState(DETECTION_STATES.DROWSY)}
                        className={`p-2 rounded-xl text-center border font-mono text-xs transition-all ${
                          activeTabState === DETECTION_STATES.DROWSY
                            ? 'bg-status-drowsy-bg border-status-drowsy-border text-status-drowsy-light shadow-glow-drowsy font-bold'
                            : 'bg-bitnox-surface border-bitnox-border text-slate-400 hover:text-white'
                        }`}
                      >
                        DROWSY
                      </button>
                      <button
                        type="button"
                        onClick={() => setActiveTabState(DETECTION_STATES.SLEEPING)}
                        className={`p-2 rounded-xl text-center border font-mono text-xs transition-all ${
                          activeTabState === DETECTION_STATES.SLEEPING
                            ? 'bg-status-sleeping-bg border-status-sleeping-border text-status-sleeping-light shadow-glow-sleeping font-bold'
                            : 'bg-bitnox-surface border-bitnox-border text-slate-400 hover:text-white'
                        }`}
                      >
                        SLEEPING
                      </button>
                    </div>

                    <div className="p-3.5 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2 text-xs">
                      <div className="font-heading font-semibold text-white">
                        {activeTabState === 'AWAKE' && 'State: Optimal Focus'}
                        {activeTabState === 'DROWSY' && 'State: Fatigue Warning'}
                        {activeTabState === 'SLEEPING' && 'State: Critical Sleeping'}
                      </div>
                      <p className="text-slate-400 leading-snug">
                        {activeTabState === 'AWAKE' && 'Subject exhibits open eyelids (EAR > 0.25) and standard blink intervals.'}
                        {activeTabState === 'DROWSY' && 'Slow blink duration and yawning (MAR > 0.60) flagged. Visual pill triggered.'}
                        {activeTabState === 'SLEEPING' && 'Eyelids closed for >2.5s. Auditory alert chime sounding through hub.'}
                      </p>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-bitnox-accent/50 border border-bitnox-border text-xs text-slate-300 flex items-center justify-between">
                    <span className="font-mono text-[11px]">Cohort 4 Hub Session</span>
                    <span className="text-bitnox-primary font-mono font-bold">142m Logged</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. HOW IT WORKS IN 3 STEPS */}
      <section id="how-it-works" className="py-20 border-t border-bitnox-border/60 bg-bitnox-surface/30 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="primary" size="sm">
            Intelligent Workflow
          </Badge>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            How WakeWatch Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            A three-stage vision pipeline tailored for high-focus technology and education hubs.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Step 1 */}
          <div className="bitnox-glass rounded-2xl p-6 sm:p-8 border border-bitnox-border relative group hover:border-bitnox-border-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-bitnox-accent border border-bitnox-border flex items-center justify-center text-bitnox-primary mb-6 shadow-glow-primary/20 group-hover:scale-105 transition-transform">
              <Camera className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-bitnox-primary uppercase font-bold tracking-wider block mb-1">
              Step 01
            </span>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              Camera Sees
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Standard webcams or classroom RTSP overhead feeds capture video frames at 30 FPS without requiring proprietary or expensive hardware.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bitnox-glass rounded-2xl p-6 sm:p-8 border border-bitnox-border relative group hover:border-bitnox-border-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-bitnox-accent border border-bitnox-border flex items-center justify-center text-bitnox-primary mb-6 shadow-glow-primary/20 group-hover:scale-105 transition-transform">
              <Cpu className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-bitnox-primary uppercase font-bold tracking-wider block mb-1">
              Step 02
            </span>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              Model Detects
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Trained computer vision models compute facial landmark geometries, evaluating Eye Aspect Ratio (EAR), yawning (MAR), and head pitch.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bitnox-glass rounded-2xl p-6 sm:p-8 border border-bitnox-border relative group hover:border-bitnox-border-hover transition-all">
            <div className="w-12 h-12 rounded-xl bg-bitnox-accent border border-bitnox-border flex items-center justify-center text-bitnox-primary mb-6 shadow-glow-primary/20 group-hover:scale-105 transition-transform">
              <BellRing className="w-6 h-6" />
            </div>
            <span className="text-xs font-mono text-bitnox-primary uppercase font-bold tracking-wider block mb-1">
              Step 03
            </span>
            <h3 className="font-heading font-bold text-xl text-white mb-2">
              Team is Alerted
            </h3>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Supervisors receive real-time telemetry pills. If a prolonged sleeping threshold (&gt; 2.5s) is confirmed, an instant audio chime awakens the user.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FEATURE CARDS */}
      <section id="features" className="py-20 border-t border-bitnox-border/60 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16">
          <Badge variant="primary" size="sm">
            Core Capabilities
          </Badge>
          <h2 className="font-heading font-extrabold text-2xl sm:text-4xl text-white tracking-tight">
            Engineered for Precision & Accountability
          </h2>
          <p className="text-xs sm:text-sm text-slate-400">
            Four pillars powering Bitnox Technology's intelligent alertness infrastructure.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1 */}
          <Card variant="glass" padding="md" interactive>
            <Card.Header>
              <div className="w-10 h-10 rounded-lg bg-status-awake-bg border border-status-awake-border flex items-center justify-center text-status-awake mb-3">
                <Activity className="w-5 h-5" />
              </div>
              <Card.Title>Real-Time Detection</Card.Title>
              <Card.Description>
                Sub-second classification of micro-expressions, blink duration, and eye aspect ratios at 30 FPS.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <span className="text-[11px] font-mono text-bitnox-primary">
                &bull; Zero lag on edge streams
              </span>
            </Card.Content>
          </Card>

          {/* Card 2 */}
          <Card variant="glass" padding="md" interactive>
            <Card.Header>
              <div className="w-10 h-10 rounded-lg bg-status-drowsy-bg border border-status-drowsy-border flex items-center justify-center text-status-drowsy mb-3">
                <Zap className="w-5 h-5" />
              </div>
              <Card.Title>Instant Multi-Stage Alerts</Card.Title>
              <Card.Description>
                Drowsy warning badges for gentle supervisor intervention, and auditory chimes for critical sleep episodes.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <span className="text-[11px] font-mono text-status-drowsy-light">
                &bull; Configurable thresholds
              </span>
            </Card.Content>
          </Card>

          {/* Card 3 */}
          <Card variant="glass" padding="md" interactive>
            <Card.Header>
              <div className="w-10 h-10 rounded-lg bg-bitnox-accent border border-bitnox-border flex items-center justify-center text-bitnox-primary mb-3">
                <BarChart3 className="w-5 h-5" />
              </div>
              <Card.Title>Attendance & Reports</Card.Title>
              <Card.Description>
                Detailed analytics on fatigue curves, peak drowsiness times, and cohort alertness history for training leads.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <span className="text-[11px] font-mono text-slate-300">
                &bull; Samsara PERCLOS scoring
              </span>
            </Card.Content>
          </Card>

          {/* Card 4 */}
          <Card variant="glass" padding="md" interactive>
            <Card.Header>
              <div className="w-10 h-10 rounded-lg bg-cyan-950 border border-bitnox-primary/40 flex items-center justify-center text-bitnox-primary mb-3">
                <Lock className="w-5 h-5" />
              </div>
              <Card.Title>Privacy-First Design</Card.Title>
              <Card.Description>
                Facial landmarks are processed strictly in volatile RAM. No raw facial video footage is ever stored or uploaded.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <span className="text-[11px] font-mono text-emerald-400">
                &bull; Ephemeral landmark memory
              </span>
            </Card.Content>
          </Card>
        </div>
      </section>

      {/* 4. PRIVACY & CONSENT NOTE */}
      <section id="privacy" className="py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <div className="bitnox-glass rounded-2xl p-6 sm:p-8 border border-bitnox-border/80 flex flex-col sm:flex-row items-start gap-5 shadow-glass-card">
          <div className="w-12 h-12 rounded-xl bg-bitnox-accent border border-bitnox-border flex items-center justify-center text-bitnox-primary shrink-0 shadow-glow-primary/20">
            <ShieldCheck className="w-6 h-6 text-bitnox-primary" />
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <h3 className="font-heading font-bold text-base sm:text-lg text-white">
                Privacy, Transparency & Ethical AI Note
              </h3>
              <Badge variant="awake" size="sm">Consensual</Badge>
            </div>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              WakeWatch is designed exclusively for workplace wellness, student safety, and alertness assistance within authorized Bitnox training programs. All facial landmark vectors (EAR and MAR calculations) exist only in memory buffers during real-time classification.
            </p>
            <p className="text-xs text-slate-400 font-mono">
              Raw video is never recorded, never sold to advertisers, and never shared outside the Bitnox Technology Abeokuta administrative perimeter.
            </p>
          </div>
        </div>
      </section>

      {/* 5. FOOTER */}
      <footer className="border-t border-bitnox-border/70 bg-bitnox-surface/70 mt-16 pt-12 pb-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-bitnox-primary to-cyan-800 flex items-center justify-center font-heading font-extrabold text-bitnox-foreground shadow-glow-primary text-base">
                B
              </div>
              <span className="font-heading font-bold text-lg text-white">
                WakeWatch
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed max-w-md">
              AI Alertness and Drowsiness Detection System. Proprietary software developed for{' '}
              <strong className="text-white">Bitnox Technology Solutions Ltd.</strong>, Abeokuta.
            </p>
            <div className="flex items-start gap-2 text-xs text-slate-400 font-mono pt-1">
              <MapPin className="w-4 h-4 text-bitnox-primary shrink-0 mt-0.5" />
              <span>
                Last Floor, Majek Kembo Plaza (beside Chicken Republic), 24 Lalubu Road, Oke-Ilewo, Abeokuta, Ogun State, Nigeria
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-slate-300 font-bold uppercase tracking-wider mb-2 font-heading">
              Application
            </div>
            <div>
              <Link to="/dashboard" className="text-slate-400 hover:text-bitnox-primary transition-colors">
                Launch Dashboard
              </Link>
            </div>
            <div>
              <Link to="/login" className="text-slate-400 hover:text-bitnox-primary transition-colors">
                Console Sign In
              </Link>
            </div>
            <div>
              <Link to="/design" className="text-slate-400 hover:text-bitnox-primary transition-colors">
                Style Guide (/design)
              </Link>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-2 text-xs font-mono">
            <div className="text-slate-300 font-bold uppercase tracking-wider mb-2 font-heading">
              Contact Bitnox
            </div>
            <div className="text-slate-400">
              Email:{' '}
              <a href="mailto:info@bitnoxsolution.com" className="text-bitnox-primary hover:underline">
                info@bitnoxsolution.com
              </a>
            </div>
            <div className="text-slate-400">
              WhatsApp / Tel:{' '}
              <span className="text-slate-300">+234 813 719 2766</span>
            </div>
            <div>
              <a
                href="https://bitnoxsolution.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-bitnox-primary hover:underline mt-1"
              >
                <span>bitnoxsolution.com</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto pt-6 border-t border-bitnox-border/50 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 font-mono">
          <div>
            &copy; {new Date().getFullYear()} Bitnox Technology Solutions Ltd. All rights reserved.
          </div>
          <div className="mt-2 sm:mt-0 text-[11px]">
            WakeWatch • Front-End Vision Console
          </div>
        </div>
      </footer>
    </div>
  );
}
