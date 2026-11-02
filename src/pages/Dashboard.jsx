import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiClient from '../api/client';
import StatCards from '../components/dashboard/StatCards';
import AlertnessLineChart from '../components/dashboard/AlertnessLineChart';
import HourlyAlertsBarChart from '../components/dashboard/HourlyAlertsBarChart';
import NeedsAttentionList from '../components/dashboard/NeedsAttentionList';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Skeleton from '../components/common/Skeleton';
import { Video, AlertTriangle, RefreshCw, Sparkles, ArrowRight } from 'lucide-react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [alertnessTrends, setAlertnessTrends] = useState([]);
  const [hourlyAlerts, setHourlyAlerts] = useState([]);
  const [needsAttention, setNeedsAttention] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [met, trends, hourly, attn] = await Promise.all([
        apiClient.getDashboardMetrics(),
        apiClient.getAlertnessTrends(),
        apiClient.getHourlyAlerts(),
        apiClient.getNeedsAttention(),
      ]);

      setMetrics(met);
      setAlertnessTrends(trends);
      setHourlyAlerts(hourly);
      setNeedsAttention(attn);
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  return (
    <div className="space-y-7">
      {/* Top Welcome & Context Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bitnox-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot pulse size="sm">
              Hub Perimeter Online
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Bitnox Hub Abeokuta • Room B & Training Hall 1
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Workplace Alertness Overview
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          <Button
            variant="outline"
            size="sm"
            icon={<RefreshCw className="w-3.5 h-3.5" />}
            onClick={loadDashboardData}
            loading={loading}
          >
            Refresh Data
          </Button>

          <Link to="/monitor">
            <Button
              variant="primary"
              size="sm"
              icon={<Video className="w-3.5 h-3.5" />}
              iconRight={<ArrowRight className="w-3.5 h-3.5" />}
            >
              Open Live Monitor
            </Button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="space-y-6">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3.5">
            <Skeleton variant="card" count={1} className="h-24" />
            <Skeleton variant="card" count={1} className="h-24" />
            <Skeleton variant="card" count={1} className="h-24" />
            <Skeleton variant="card" count={1} className="h-24" />
            <Skeleton variant="card" count={1} className="h-24" />
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Skeleton variant="card" className="h-80" />
            <Skeleton variant="card" className="h-80" />
          </div>
        </div>
      ) : (
        <>
          {/* 1. TOP STAT CARDS */}
          <StatCards metrics={metrics} />

          {/* 2. RECHARTS SECTION: Line Chart & Bar Chart */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <AlertnessLineChart data={alertnessTrends} />
            <HourlyAlertsBarChart data={hourlyAlerts} />
          </div>

          {/* 3. NEEDS ATTENTION LIST */}
          <NeedsAttentionList people={needsAttention} />
        </>
      )}
    </div>
  );
}
