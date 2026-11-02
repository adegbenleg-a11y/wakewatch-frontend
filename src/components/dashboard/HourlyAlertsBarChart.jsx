import React from 'react';
import Card from '../common/Card';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from 'recharts';
import { BarChart3, AlertTriangle } from 'lucide-react';

function CustomBarTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    const drowsyVal = payload.find((p) => p.dataKey === 'drowsy')?.value || 0;
    const sleepingVal = payload.find((p) => p.dataKey === 'sleeping')?.value || 0;

    return (
      <div className="bitnox-glass rounded-xl p-3 border border-bitnox-border text-xs font-mono shadow-glass-card">
        <div className="text-white font-bold mb-1 border-b border-bitnox-border/50 pb-1">
          Hour: {label}
        </div>
        <div className="text-status-drowsy-light flex items-center justify-between gap-4">
          <span>Drowsy Warnings:</span>
          <span className="font-bold">{drowsyVal}</span>
        </div>
        <div className="text-status-sleeping-light flex items-center justify-between gap-4">
          <span>Sleeping Critical:</span>
          <span className="font-bold">{sleepingVal}</span>
        </div>
      </div>
    );
  }
  return null;
}

export default function HourlyAlertsBarChart({ data = [] }) {
  return (
    <Card variant="glass" padding="md" className="h-full flex flex-col justify-between">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4 text-status-drowsy" />
            <Card.Title>Alert Incidents Per Hour</Card.Title>
          </div>
          <span className="text-[11px] font-mono text-status-drowsy-light bg-amber-950/60 border border-amber-800/40 px-2 py-0.5 rounded-full">
            Peak: 14:00 (Post-Lunch)
          </span>
        </div>
        <Card.Description>
          Hourly distribution of Drowsy (Amber) vs Sleeping (Red) flags.
        </Card.Description>
      </Card.Header>

      <div className="w-full h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(5, 228, 252, 0.08)" vertical={false} />

            <XAxis
              dataKey="hour"
              stroke="#64748b"
              fontSize={11}
              fontFamily="Geist Mono, monospace"
              tickLine={false}
              axisLine={{ stroke: 'rgba(5, 228, 252, 0.15)' }}
            />

            <YAxis
              stroke="#64748b"
              fontSize={11}
              fontFamily="Geist Mono, monospace"
              tickLine={false}
              axisLine={{ stroke: 'rgba(5, 228, 252, 0.15)' }}
              allowDecimals={false}
            />

            <Tooltip content={<CustomBarTooltip />} />

            <Bar
              dataKey="drowsy"
              name="Drowsy Warnings"
              fill="#f59e0b"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />

            <Bar
              dataKey="sleeping"
              name="Sleeping Incidents"
              fill="#ef4444"
              radius={[4, 4, 0, 0]}
              maxBarSize={28}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <Card.Footer>
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-status-drowsy rounded-sm" />
            Drowsy Flags
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 bg-status-sleeping rounded-sm" />
            Sleeping Episodes
          </span>
        </div>
        <span className="text-slate-500 font-mono text-[10px]">Recharts Engine</span>
      </Card.Footer>
    </Card>
  );
}
