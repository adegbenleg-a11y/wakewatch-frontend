import React from 'react';
import Card from '../common/Card';
import Badge from '../common/Badge';
import StatusPill from './StatusPill';
import { History, Activity, Radio, AlertOctagon } from 'lucide-react';

/**
 * DetectionLogPanel
 * Displays the stream of the last 10 predictions, ordered newest first.
 */
export default function DetectionLogPanel({ detections = [] }) {
  return (
    <Card variant="solid" padding="none" className="h-full flex flex-col">
      {/* Panel Header */}
      <div className="p-4 border-b border-bitnox-border flex items-center justify-between">
        <div className="flex items-center gap-2">
          <History className="w-4 h-4 text-bitnox-primary" />
          <h3 className="font-heading font-bold text-sm text-white">
            Recent Detections
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-[10px] font-mono text-slate-400">
            {detections.length}/10 Max
          </span>
          <span className="w-2 h-2 rounded-full bg-bitnox-primary animate-ping" />
        </div>
      </div>

      {/* Detection List */}
      <div className="flex-1 p-3 space-y-2.5 overflow-y-auto max-h-[520px]">
        {detections.length === 0 ? (
          <div className="text-center py-12 px-4 text-xs font-mono text-slate-500">
            <Activity className="w-8 h-8 mx-auto mb-2 opacity-40 animate-pulse text-bitnox-primary" />
            <p>Awaiting live inferences...</p>
            <span className="text-[10px] text-slate-600 block mt-1">
              Frames polled every 1.5s
            </span>
          </div>
        ) : (
          detections.map((item, index) => {
            const isLatest = index === 0;
            const timeStr = item.timestamp
              ? new Date(item.timestamp).toLocaleTimeString()
              : '--:--:--';

            return (
              <div
                key={item.id || index}
                className={`
                  p-3 rounded-xl border transition-all duration-200
                  ${
                    isLatest
                      ? 'bg-bitnox-surface-elevated border-bitnox-primary/40 shadow-sm'
                      : 'bg-bitnox-surface/70 border-bitnox-border/70 hover:border-bitnox-border'
                  }
                `}
              >
                <div className="flex items-center justify-between mb-1.5">
                  <StatusPill
                    status={item.status}
                    confidence={item.confidence}
                    size="sm"
                    showGlow={isLatest}
                  />

                  <div className="flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                    {isLatest && (
                      <span className="text-[9px] font-mono uppercase px-1 rounded bg-bitnox-primary/20 text-bitnox-primary font-bold">
                        NEW
                      </span>
                    )}
                    <span>{timeStr}</span>
                  </div>
                </div>

                {/* Telemetry Microstrip */}
                <div className="flex items-center justify-between text-[10px] font-mono text-slate-400 pt-1 border-t border-bitnox-border/40">
                  <span>
                    EAR: <strong className="text-slate-200">{item.metrics?.ear || '--'}</strong>
                  </span>
                  <span>
                    MAR: <strong className="text-slate-200">{item.metrics?.mar || '--'}</strong>
                  </span>
                  <span>
                    PERCLOS: <strong className="text-emerald-400">{item.metrics?.perclos || '--'}%</strong>
                  </span>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Panel Footer */}
      <div className="p-3 border-t border-bitnox-border/60 text-center text-[11px] font-mono text-slate-500 bg-bitnox-surface-elevated/40">
        Inference buffer updates in real-time
      </div>
    </Card>
  );
}
