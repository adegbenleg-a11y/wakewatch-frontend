import React from 'react';
import Card from '../common/Card';
import { Users, ShieldCheck, AlertTriangle, Moon, Bell, TrendingUp } from 'lucide-react';

export default function StatCards({ metrics }) {
  const data = metrics || {
    peopleMonitored: 24,
    awakeNow: 21,
    drowsyNow: 2,
    sleepingNow: 1,
    alertsToday: 7,
  };

  const cards = [
    {
      label: 'People Monitored',
      value: data.peopleMonitored,
      subtext: 'Active in Abeokuta Hub',
      icon: <Users className="w-5 h-5 text-bitnox-primary" />,
      border: 'border-bitnox-border',
      glow: 'shadow-glow-primary/20',
      textColor: 'text-white',
    },
    {
      label: 'Awake Now',
      value: data.awakeNow,
      subtext: 'Optimal Focus (EAR > 0.25)',
      icon: <ShieldCheck className="w-5 h-5 text-status-awake" />,
      border: 'border-status-awake-border',
      glow: 'shadow-glow-awake',
      textColor: 'text-status-awake-light',
    },
    {
      label: 'Drowsy Now',
      value: data.drowsyNow,
      subtext: 'Microsleep Warning',
      icon: <AlertTriangle className="w-5 h-5 text-status-drowsy" />,
      border: 'border-status-drowsy-border',
      glow: 'shadow-glow-drowsy',
      textColor: 'text-status-drowsy-light',
    },
    {
      label: 'Sleeping Now',
      value: data.sleepingNow,
      subtext: 'Critical Alert Intervened',
      icon: <Moon className="w-5 h-5 text-status-sleeping animate-pulse" />,
      border: 'border-status-sleeping-border',
      glow: 'shadow-glow-sleeping',
      textColor: 'text-status-sleeping-light',
    },
    {
      label: 'Alerts Today',
      value: data.alertsToday,
      subtext: 'Total Flags Recorded',
      icon: <Bell className="w-5 h-5 text-cyan-400" />,
      border: 'border-bitnox-border',
      glow: 'shadow-glow-primary/20',
      textColor: 'text-white',
    },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5">
      {cards.map((card, index) => (
        <Card
          key={index}
          variant="glass"
          padding="sm"
          className={`relative border ${card.border} ${card.glow} transition-transform hover:-translate-y-0.5`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 truncate">
              {card.label}
            </span>
            <div className="p-1.5 rounded-lg bg-bitnox-surface border border-bitnox-border/80">
              {card.icon}
            </div>
          </div>

          <div className="flex items-baseline gap-1.5">
            <span className={`font-heading font-black text-2xl sm:text-3xl tracking-tight ${card.textColor}`}>
              {card.value}
            </span>
          </div>

          <p className="text-[10px] text-slate-400 font-mono mt-1 truncate">
            {card.subtext}
          </p>
        </Card>
      ))}
    </div>
  );
}
