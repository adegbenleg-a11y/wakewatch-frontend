import React from 'react';
import Card from '../common/Card';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import { TrendingUp, Activity } from 'lucide-react';

// Custom Bitnox Tooltip
function CustomTooltip({ active, payload, label }) {
  if (active && payload && payload.length) {
    return (
      <div className="bitnox-glass rounded-xl p-3 border border-bitnox-border text-xs font-mono shadow-glass-card">
        <div className="text-white font-bold mb-1 border-b border-bitnox-border/50 pb-1">
          Time: {label} WAT
        </div>
        <div className="text-bitnox-primary flex items-center justify-between gap-4">
          <span>Alertness Index:</span>
          <span className="font-bold">{payload[0].value}%</span>
        </div>
        {payload[1] && (
          <div className="text-slate-400 flex items-center justify-between gap-4 text-[10px]">
            <span>Benchmark:</span>
            <span>{payload[1].value}%</span>
          </div>
        )}
      </div>
    );
  }
  return null;
}

export default function AlertnessLineChart({ data = [] }) {
  return (
    <Card variant="glass" padding="md" className="h-full flex flex-col justify-between">
      <Card.Header>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-bitnox-primary" />
            <Card.Title>Alertness Index Over the Day</Card.Title>
          </div>
          <span className="text-[11px] font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-800/40 px-2 py-0.5 rounded-full">
            Average: 88.4%
          </span>
        </div>
        <Card.Description>
          Aggregated cohort eye closure and blink rates (08:00 - 18:00 WAT).
        </Card.Description>
      </Card.Header>

      <div className="w-full h-64 mt-4">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="alertnessGlow" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#05e4fc" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#05e4fc" stopOpacity={0.0} />
              </linearGradient>
            </defs>

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
              domain={[60, 100]}
              stroke="#64748b"
              fontSize={11}
              fontFamily="Geist Mono, monospace"
              tickLine={false}
              axisLine={{ stroke: 'rgba(5, 228, 252, 0.15)' }}
              tickFormatter={(v) => `${v}%`}
            />

            <Tooltip content={<CustomTooltip />} />

            {/* Benchmark Target Line (85%) */}
            <ReferenceLine
              y={85}
              stroke="#10b981"
              strokeDasharray="4 4"
              strokeOpacity={0.7}
              label={{
                value: 'Target 85%',
                position: 'insideBottomRight',
                fill: '#34d399',
                fontSize: 10,
                fontFamily: 'Geist Mono',
              }}
            />

            <Line
              type="monotone"
              dataKey="alertness"
              stroke="#05e4fc"
              strokeWidth={3}
              dot={{ r: 4, fill: '#05e4fc', strokeWidth: 1, stroke: '#07141b' }}
              activeDot={{ r: 6, fill: '#38edfd', stroke: '#03181d', strokeWidth: 2 }}
              animationDuration={800}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <Card.Footer>
        <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-bitnox-primary rounded-full" />
            Live Cohort Alertness
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-0.5 bg-status-awake border-b border-dashed" />
            Optimal Benchmark
          </span>
        </div>
        <span className="text-slate-500 font-mono text-[10px]">Recharts Engine</span>
      </Card.Footer>
    </Card>
  );
}
