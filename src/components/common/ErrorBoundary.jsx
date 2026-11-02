import React, { Component } from 'react';
import { AlertOctagon, RotateCcw, Home } from 'lucide-react';
import Button from './Button';
import Badge from './Badge';

export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });
    console.error('[WakeWatch ErrorBoundary]', error, errorInfo);
  }

  handleReset = () => {
    this.setState({ hasError: false, error: null, errorInfo: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-bitnox-bg text-slate-100 flex flex-col items-center justify-center p-6 select-none font-sans">
          <div className="max-w-lg w-full bitnox-glass rounded-2xl p-6 sm:p-8 border border-status-sleeping-border shadow-glow-sleeping text-center relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-status-sleeping-bg border border-status-sleeping-border flex items-center justify-center mx-auto mb-4 text-status-sleeping-light">
              <AlertOctagon className="w-7 h-7" />
            </div>

            <Badge variant="sleeping" dot size="sm" className="mb-3">
              UI Application Error
            </Badge>

            <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-white mb-2">
              Something Interrupted Telemetry
            </h2>

            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-6">
              A rendering exception occurred in this component. Front-end state has been contained safely.
            </p>

            {this.state.error && (
              <div className="p-3.5 rounded-xl bg-black/60 border border-bitnox-border text-left font-mono text-[11px] text-status-sleeping-light mb-6 overflow-x-auto max-h-36">
                {this.state.error.toString()}
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="primary"
                size="sm"
                icon={<RotateCcw className="w-4 h-4" />}
                onClick={this.handleReset}
              >
                Try Again
              </Button>

              <Button
                variant="secondary"
                size="sm"
                icon={<Home className="w-4 h-4" />}
                onClick={() => (window.location.href = '/')}
              >
                Return to Dashboard
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
