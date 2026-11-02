import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiClient, { DETECTION_STATES } from '../api/client';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Table from '../components/common/Table';
import Skeleton from '../components/common/Skeleton';
import StatusPill from '../components/detection/StatusPill';
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
import {
  ArrowLeft,
  User,
  MapPin,
  Mail,
  Calendar,
  Clock,
  TrendingUp,
  AlertTriangle,
  ShieldCheck,
  Video,
  Volume2,
} from 'lucide-react';
import audioAlert from '../utils/audioAlert';

export default function PersonProfile() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [person, setPerson] = useState(null);
  const [loading, setLoading] = useState(true);

  // Mock historical alertness data for this specific member
  const personalWeeklyTrend = [
    { day: 'Mon', alertness: 94, benchmark: 85 },
    { day: 'Tue', alertness: 96, benchmark: 85 },
    { day: 'Wed', alertness: 89, benchmark: 85 },
    { day: 'Thu', alertness: 82, benchmark: 85 }, // Post-lunch dip
    { day: 'Fri', alertness: 93, benchmark: 85 },
    { day: 'Sat', alertness: 97, benchmark: 85 },
  ];

  useEffect(() => {
    async function fetchPerson() {
      setLoading(true);
      try {
        const data = await apiClient.getPersonById(id);
        setPerson(data);
      } catch (err) {
        console.error('Failed to load person profile:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPerson();
  }, [id]);

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-6 bg-slate-800/80 rounded w-48 mb-4" />
        <div className="bitnox-glass rounded-2xl p-6 border border-bitnox-border/50">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
            <div className="w-20 h-20 rounded-2xl bg-slate-800" />
            <div className="space-y-2.5 flex-1">
              <div className="h-6 bg-slate-800 rounded w-1/3" />
              <div className="h-4 bg-slate-800/60 rounded w-1/4" />
              <div className="h-4 bg-slate-800/40 rounded w-1/2" />
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" className="h-80" />
          <Skeleton variant="card" className="h-80" />
        </div>
      </div>
    );
  }

  if (!person) {
    return (
      <Card variant="glass" padding="lg" className="text-center py-12">
        <User className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
        <h2 className="font-heading font-bold text-white text-lg">Person Not Found</h2>
        <p className="text-xs text-slate-400 mt-1 mb-6">
          The requested member record doesn't exist or was removed.
        </p>
        <Link to="/people">
          <Button variant="primary" size="sm" icon={<ArrowLeft className="w-4 h-4" />}>
            Back to People Directory
          </Button>
        </Link>
      </Card>
    );
  }

  return (
    <div className="space-y-6 select-none">
      {/* Top Back / Breadcrumb Nav */}
      <div className="flex items-center justify-between pb-2 border-b border-bitnox-border/60">
        <div className="flex items-center space-x-3 text-xs font-mono">
          <Link
            to="/people"
            className="text-slate-400 hover:text-bitnox-primary transition-colors flex items-center gap-1"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>People Directory</span>
          </Link>
          <span className="text-slate-600">/</span>
          <span className="text-white font-bold">{person.name}</span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            icon={<Volume2 className="w-3.5 h-3.5 text-bitnox-primary" />}
            onClick={() => {
              audioAlert.playAlarmChime();
              alert(`Alert chime tested for workstation: ${person.location}`);
            }}
          >
            Chime Station
          </Button>

          <Link to="/monitor">
            <Button variant="primary" size="sm" icon={<Video className="w-3.5 h-3.5" />}>
              Live Stream
            </Button>
          </Link>
        </div>
      </div>

      {/* Main Profile Header Card */}
      <div className="bitnox-glass rounded-2xl p-6 sm:p-8 border border-bitnox-border shadow-glass-card relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 relative z-10">
          <div className="flex items-center space-x-5">
            <img
              src={person.avatar}
              alt={person.name}
              className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover ring-2 ring-bitnox-primary/50 shadow-glow-primary/30"
            />
            <div className="space-y-1">
              <div className="flex items-center gap-2.5">
                <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight">
                  {person.name}
                </h1>
                <Badge variant="primary" size="sm">
                  {person.role}
                </Badge>
              </div>

              <p className="text-xs sm:text-sm text-slate-300 font-medium">
                {person.cohort}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-400 pt-1">
                <span className="flex items-center gap-1 text-bitnox-primary">
                  <MapPin className="w-3.5 h-3.5" /> {person.location}
                </span>
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" /> {person.email}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar className="w-3.5 h-3.5" /> Enrolled: {person.joinDate}
                </span>
              </div>
            </div>
          </div>

          {/* Right Status Pill */}
          <div className="flex flex-col items-start md:items-end space-y-2">
            <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">
              Live Monitor Status:
            </span>
            <StatusPill status={person.status} size="lg" confidence={0.96} />
          </div>
        </div>
      </div>

      {/* Metric Cards Row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Weekly Alertness Score</span>
            <TrendingUp className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-status-awake-light">
              {person.alertnessScore}%
            </span>
            <span className="text-xs font-mono text-slate-400">Benchmark: 85%</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">High-focus software engineering track</p>
        </Card>

        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Monitored Hub Hours</span>
            <Clock className="w-4 h-4 text-bitnox-primary" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-white">
              {person.monitoredHours}h
            </span>
            <span className="text-xs font-mono text-slate-400">total audited</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Active stream tracking in Room B</p>
        </Card>

        <Card variant="glass" padding="md">
          <div className="flex items-center justify-between text-xs font-mono text-slate-400 uppercase">
            <span>Historical Incidents</span>
            <AlertTriangle className="w-4 h-4 text-status-drowsy" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="font-heading font-black text-3xl text-status-drowsy-light">
              {person.recentIncidents?.length || 1}
            </span>
            <span className="text-xs font-mono text-slate-400">microsleep flags</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Average incident duration: 3.8s</p>
        </Card>
      </div>

      {/* Personal Trend Chart using Recharts */}
      <Card variant="glass" padding="md">
        <Card.Header>
          <Card.Title>Weekly Alertness Trend</Card.Title>
          <Card.Description>
            Personal 7-day focus curve vs Hub Benchmark (85%).
          </Card.Description>
        </Card.Header>

        <div className="w-full h-56 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={personalWeeklyTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(5, 228, 252, 0.08)" vertical={false} />
              <XAxis dataKey="day" stroke="#64748b" fontSize={11} fontFamily="Geist Mono" tickLine={false} />
              <YAxis domain={[70, 100]} stroke="#64748b" fontSize={11} fontFamily="Geist Mono" tickLine={false} tickFormatter={(v) => `${v}%`} />
              <Tooltip
                content={({ active, payload, label }) => {
                  if (active && payload && payload.length) {
                    return (
                      <div className="bitnox-glass rounded-xl p-2.5 text-xs font-mono border border-bitnox-border">
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
              <Line
                type="monotone"
                dataKey="alertness"
                stroke="#05e4fc"
                strokeWidth={3}
                dot={{ r: 4, fill: '#05e4fc' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Recent Fatigue & Alert History Table */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-heading font-bold text-lg text-white">
            Incident & Flag History
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Supervisor Audit Log
          </span>
        </div>

        <Table>
          <Table.Header>
            <tr>
              <Table.Head>Time</Table.Head>
              <Table.Head>Classified State</Table.Head>
              <Table.Head>Duration</Table.Head>
              <Table.Head>Trigger & Observation</Table.Head>
              <Table.Head className="text-right">Audit Status</Table.Head>
            </tr>
          </Table.Header>
          <Table.Body>
            {person.recentIncidents && person.recentIncidents.length > 0 ? (
              person.recentIncidents.map((inc) => (
                <Table.Row key={inc.id}>
                  <Table.Cell className="font-mono text-xs text-white">
                    {inc.time}
                  </Table.Cell>
                  <Table.Cell>
                    <StatusPill status={inc.status} size="sm" />
                  </Table.Cell>
                  <Table.Cell className="font-mono text-xs text-slate-300">
                    {inc.duration}
                  </Table.Cell>
                  <Table.Cell className="text-xs text-slate-300">
                    {inc.notes}
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <span className="inline-flex items-center gap-1 text-xs font-mono text-status-awake-light">
                      <ShieldCheck className="w-3.5 h-3.5 text-status-awake" />
                      Logged
                    </span>
                  </Table.Cell>
                </Table.Row>
              ))
            ) : (
              <Table.Empty message="No fatigue flags recorded for this member." colSpan={5} />
            )}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
}
