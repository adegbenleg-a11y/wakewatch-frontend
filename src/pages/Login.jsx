import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { mockUsers } from '../api/client';
import Button from '../components/common/Button';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Badge from '../components/common/Badge';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  UserCheck,
  Building2,
  AlertCircle,
  HelpCircle,
  ArrowRight,
} from 'lucide-react';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isAuthenticated } = useAuth();

  const [email, setEmail] = useState('admin@bitnoxsolution.com');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [forgotModalOpen, setForgotModalOpen] = useState(false);

  // Where to redirect after login
  const from = location.state?.from?.pathname || '/';

  // If already authenticated, redirect
  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, from]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please provide your Bitnox email address.');
      return;
    }
    if (!password) {
      setError('Please enter your password.');
      return;
    }

    setLoading(true);
    const result = await login(email, password);
    setLoading(false);

    if (result.success) {
      navigate(from, { replace: true });
    } else {
      setError(result.error || 'Authentication failed. Please verify credentials.');
    }
  };

  // Quick switch role buttons for teammates
  const handleSelectMockRole = (mockUser) => {
    setEmail(mockUser.email);
    setPassword('bitnox2026!');
    setError('');
  };

  return (
    <div className="min-h-screen bg-bitnox-bg text-slate-100 flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden font-sans">
      {/* Background Decorative Cyan Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-bitnox-primary/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-cyan-900/15 rounded-full blur-3xl pointer-events-none" />

      <div className="sm:mx-auto sm:w-full sm:max-w-md relative z-10">
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-bitnox-primary via-cyan-500 to-cyan-800 shadow-glow-primary text-bitnox-foreground font-heading font-extrabold text-2xl mb-1">
            B
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight flex items-center justify-center gap-2">
            WakeWatch
            <Badge variant="primary" size="sm">
              AI Vision
            </Badge>
          </h1>
          <p className="text-xs sm:text-sm text-slate-400">
            Bitnox Technology Solutions • Abeokuta, Ogun State
          </p>
        </div>

        {/* Login Box */}
        <div className="mt-8">
          <div className="bitnox-glass rounded-2xl p-6 sm:p-8 border border-bitnox-border relative shadow-glass-card">
            <div className="mb-6 pb-4 border-b border-bitnox-border/60">
              <h2 className="font-heading font-bold text-lg text-white">
                Sign in to Console
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Enter your credentials to access live camera feeds & drowsiness telemetry.
              </p>
            </div>

            {error && (
              <div className="mb-5 p-3.5 rounded-xl bg-status-sleeping-bg border border-status-sleeping-border flex items-start gap-2.5 text-xs text-status-sleeping-light">
                <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-status-sleeping" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Email */}
              <Input
                label="Email Address"
                type="email"
                autoComplete="email"
                placeholder="name@bitnoxsolution.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                icon={<Mail className="w-4 h-4" />}
                required
              />

              {/* Password */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-medium text-slate-300 tracking-wide uppercase">
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotModalOpen(true)}
                    className="text-xs font-mono text-bitnox-primary hover:text-bitnox-primary-hover hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                </div>

                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    placeholder="Enter password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    icon={<Lock className="w-4 h-4" />}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-200"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded bg-bitnox-surface border-bitnox-border text-bitnox-primary focus:ring-bitnox-primary"
                />
                <label
                  htmlFor="remember-me"
                  className="ml-2 block text-xs text-slate-300 font-normal select-none"
                >
                  Remember this workstation for 30 days
                </label>
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                variant="primary"
                size="md"
                fullWidth
                loading={loading}
                iconRight={<ArrowRight className="w-4 h-4" />}
              >
                Sign In to WakeWatch
              </Button>
            </form>

            {/* Quick Role Hint Selector (For Team Demo) */}
            <div className="mt-6 pt-5 border-t border-bitnox-border/60 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-bitnox-primary" />
                  Role Hints (One-Click Demo):
                </span>
                <span className="text-[10px] text-slate-500 font-mono">Mock Auth</span>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {mockUsers.map((u) => {
                  const isCurrent = email.toLowerCase() === u.email.toLowerCase();
                  return (
                    <button
                      key={u.id}
                      type="button"
                      onClick={() => handleSelectMockRole(u)}
                      className={`
                        p-2.5 rounded-xl border text-left transition-all duration-200
                        ${
                          isCurrent
                            ? 'bg-bitnox-accent/70 border-bitnox-primary shadow-glow-primary/20'
                            : 'bg-bitnox-surface/70 border-bitnox-border hover:border-bitnox-border-hover'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-heading font-bold text-xs text-white">
                          {u.role}
                        </span>
                        <Badge
                          variant={u.role === 'Admin' ? 'primary' : 'awake'}
                          size="sm"
                        >
                          {u.role === 'Admin' ? 'Full' : 'Cohort'}
                        </Badge>
                      </div>
                      <div className="text-[11px] text-slate-400 truncate mt-0.5">
                        {u.email}
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Footer Subtext */}
          <div className="text-center mt-6 text-xs text-slate-500 space-y-1">
            <p>Authorized for Bitnox Technology personnel & cohort mentors.</p>
            <p className="font-mono text-[11px] text-slate-600">
              Majek Kembo Plaza, Oke-Ilewo, Abeokuta
            </p>
          </div>
        </div>
      </div>

      {/* Forgot Password Modal */}
      <Modal
        isOpen={forgotModalOpen}
        onClose={() => setForgotModalOpen(false)}
        title="Reset WakeWatch Password"
        description="Password recovery instructions for Bitnox staff and supervisors."
        footer={
          <Button variant="primary" size="sm" onClick={() => setForgotModalOpen(false)}>
            Close
          </Button>
        }
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
            <div className="flex items-center gap-2 text-bitnox-primary font-heading font-semibold text-sm">
              <Building2 className="w-4 h-4" />
              <span>Bitnox Internal IT Support</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              WakeWatch accounts are provisioned and managed centrally by the Bitnox Systems Administration unit in Abeokuta.
            </p>
          </div>

          <div className="text-xs text-slate-300 space-y-2 font-mono">
            <div className="flex justify-between py-1.5 border-b border-bitnox-border/50">
              <span className="text-slate-500">Support Desk:</span>
              <span className="text-slate-200">info@bitnoxsolution.com</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-bitnox-border/50">
              <span className="text-slate-500">Internal Ext:</span>
              <span className="text-slate-200">+234 813 719 2766</span>
            </div>
            <div className="flex justify-between py-1.5">
              <span className="text-slate-500">Physical Office:</span>
              <span className="text-slate-200">Last Floor, Majek Kembo Plaza, Oke-Ilewo</span>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
