import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ReferenceLine,
} from 'recharts';
import {
  Calendar,
  Download,
  Printer,
  BarChart3,
  TrendingUp,
  Clock,
  AlertTriangle,
  FileSpreadsheet,
  CheckCircle2,
  Filter,
} from 'lucide-react';

export default function Reports() {
  const [activeView, setActiveView] = useState('daily'); // 'daily' | 'weekly' | 'monthly'
  const [dateRange, setDateRange] = useState({
    start: '2026-10-25',
    end: '2026-11-01',
  });
  const [reportData, setReportData] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load report data from client/mock
  const fetchReport = async (view) => {
    setLoading(true);
    try {
      const data = await apiClient.getReports(view);
      setReportData(data);
    } catch (err) {
      console.error('Failed to load reports:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReport(activeView);
  }, [activeView]);

  // Export CSV Action
  const handleExportCSV = () => {
    if (!reportData || !reportData.trend) return;

    const headers = ['Time/Period', 'Alertness Score (%)', 'Benchmark (%)', 'Incidents Count'];
    const rows = reportData.trend.map((item) => [
      item.time,
      item.alertness,
      item.benchmark,
      item.incidents || 0,
    ]);

    const csvContent = [
      `# WakeWatch Alertness Report - Bitnox Technology Solutions (Abeokuta)`,
      `# View: ${activeView.toUpperCase()} | Generated: ${new Date().toLocaleString()}`,
      headers.join(','),
      ...rows.map((r) => r.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `WakeWatch_Report_${activeView}_${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Print / PDF Action
  const handlePrint = () => {
    window.print();
  };

  const summary = reportData?.summary || {
    auditedHours: 142,
    averageScore: 88,
    drowsyCount: 18,
    sleepingCount: 4,
  };

  return (
    <div className="space-y-6 select-none print:space-y-4">
      {/* Page Header (Hidden in Print) */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bitnox-border/60 print:border-none">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot size="sm">
              Analytics Engine
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Bitnox Hub Abeokuta • Cohort Auditing
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Alertness & Fatigue Reports
          </h1>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center gap-2.5 print:hidden">
          <Button
            variant="outline"
            size="sm"
            icon={<FileSpreadsheet className="w-3.5 h-3.5 text-bitnox-primary" />}
            onClick={handleExportCSV}
          >
            Export CSV
          </Button>

          <Button
            variant="primary"
            size="sm"
            icon={<Printer className="w-3.5 h-3.5" />}
            onClick={handlePrint}
          >
            Print / Save PDF
          </Button>
        </div>
      </div>

      {/* Date Range Picker & View Selector Bar */}
      <Card variant="solid" padding="sm" className="print:hidden">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Daily / Weekly / Monthly View Tabs */}
          <div className="flex items-center bg-bitnox-surface p-1 rounded-xl border border-bitnox-border w-full md:w-auto">
            {['daily', 'weekly', 'monthly'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveView(tab)}
                className={`flex-1 md:flex-initial px-4 py-1.5 rounded-lg text-xs font-mono font-bold uppercase transition-all ${
                  activeView === tab
                    ? 'bg-bitnox-accent text-bitnox-primary border border-bitnox-border shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab} View
              </button>
            ))}
          </div>

          {/* Date Range Controls */}
          <div className="flex items-center gap-2.5 w-full md:w-auto text-xs font-mono">
            <div className="flex items-center gap-2 bg-bitnox-surface px-3 py-1.5 rounded-xl border border-bitnox-border">
              <Calendar className="w-3.5 h-3.5 text-bitnox-primary" />
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="bg-transparent text-slate-200 outline-none text-xs"
              />
              <span className="text-slate-500">to</span>
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="bg-transparent text-slate-200 outline-none text-xs"
              />
            </div>
          </div>
        </div>
      </Card>

      {/* Report Period Title in Print */}
      <div className="hidden print:block text-xs font-mono text-slate-400">
        Report Scope: {reportData?.periodLabel || 'Daily Telemetry'} | Generated for Bitnox Hub Abeokuta
      </div>

      {/* Summary Stat Cards */}
      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Skeleton variant="card" className="h-24" />
            <Skeleton variant="card" className="h-24" />
            <Skeleton variant="card" className="h-24" />
            <Skeleton variant="card" className="h-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton variant="card" className="h-72" />
            <Skeleton variant="card" className="h-72" />
          </div>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <Card variant="glass" padding="sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Audited Hours</span>
            <Clock className="w-4 h-4 text-bitnox-primary" />
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-white mt-1">
            {summary.auditedHours}h
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Inference time</span>
        </Card>

        <Card variant="glass" padding="sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Avg Alertness</span>
            <TrendingUp className="w-4 h-4 text-status-awake" />
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-status-awake-light mt-1">
            {summary.averageScore}%
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Benchmark: 85%</span>
        </Card>

        <Card variant="glass" padding="sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Drowsy Warnings</span>
            <AlertTriangle className="w-4 h-4 text-status-drowsy" />
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-status-drowsy-light mt-1">
            {summary.drowsyCount}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Microsleep events</span>
        </Card>

        <Card variant="glass" padding="sm">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400">
            <span>Sleeping Flags</span>
            <AlertTriangle className="w-4 h-4 text-status-sleeping" />
          </div>
          <div className="font-heading font-black text-2xl sm:text-3xl text-status-sleeping-light mt-1">
            {summary.sleepingCount}
          </div>
          <span className="text-[10px] text-slate-400 font-mono">Chimes intervened</span>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Chart 1: Alertness Curve Area Chart */}
        <Card variant="glass" padding="md">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>Alertness Index Trajectory</Card.Title>
              <Badge variant="primary" size="sm">
                {activeView.toUpperCase()}
              </Badge>
            </div>
            <Card.Description>
              Mean alertness level vs Hub Optimal Target (85%).
            </Card.Description>
          </Card.Header>

          <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={reportData?.trend || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorAlertness" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#05e4fc" stopOpacity={0.6} />
                    <stop offset="95%" stopColor="#05e4fc" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(5, 228, 252, 0.08)" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="Geist Mono" tickLine={false} />
                <YAxis domain={[60, 100]} stroke="#64748b" fontSize={11} fontFamily="Geist Mono" tickLine={false} tickFormatter={(v) => `${v}%`} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bitnox-glass rounded-xl p-3 border border-bitnox-border text-xs font-mono">
                          <div className="text-white font-bold">{label}</div>
                          <div className="text-bitnox-primary font-bold">
                            Alertness: {payload[0].value}%
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <ReferenceLine y={85} stroke="#10b981" strokeDasharray="3 3" />
                <Area
                  type="monotone"
                  dataKey="alertness"
                  stroke="#05e4fc"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#colorAlertness)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Chart 2: Cumulative Incidents Bar Chart */}
        <Card variant="glass" padding="md">
          <Card.Header>
            <div className="flex items-center justify-between">
              <Card.Title>Cumulative Incident Volume</Card.Title>
              <Badge variant="drowsy" size="sm">
                Incidents
              </Badge>
            </div>
            <Card.Description>
              Volume of fatigue flags captured across this period.
            </Card.Description>
          </Card.Header>

          <div className="w-full h-64 mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={reportData?.trend || []}
                margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(5, 228, 252, 0.08)" vertical={false} />
                <XAxis dataKey="time" stroke="#64748b" fontSize={11} fontFamily="Geist Mono" tickLine={false} />
                <YAxis stroke="#64748b" fontSize={11} fontFamily="Geist Mono" tickLine={false} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      return (
                        <div className="bitnox-glass rounded-xl p-3 border border-bitnox-border text-xs font-mono">
                          <div className="text-white font-bold">{label}</div>
                          <div className="text-status-drowsy-light font-bold">
                            Incidents: {payload[0].value}
                          </div>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="incidents"
                  fill="#f59e0b"
                  radius={[4, 4, 0, 0]}
                  maxBarSize={32}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
      </>
      )}

      {/* Fatigue Trigger Breakdown Section */}
      <Card variant="solid" padding="md">
        <Card.Header>
          <Card.Title>Primary Fatigue Classification Triggers</Card.Title>
          <Card.Description>
            Relative contribution of computer vision features leading to flagged incidents.
          </Card.Description>
        </Card.Header>
        <Card.Content>
          <div className="space-y-4 pt-2">
            {(reportData?.triggers || []).map((trigger, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-slate-300 font-semibold">{trigger.name}</span>
                  <span className="text-bitnox-primary font-bold">{trigger.percentage}%</span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-bitnox-primary to-cyan-500 rounded-full"
                    style={{ width: `${trigger.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </Card.Content>
      </Card>
    </div>
  );
}
