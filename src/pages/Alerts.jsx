import React, { useState, useEffect, useMemo } from 'react';
import apiClient, { DETECTION_STATES } from '../api/client';
import Table from '../components/common/Table';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Card from '../components/common/Card';
import StatusPill from '../components/detection/StatusPill';
import IncidentSideDrawer from '../components/alerts/IncidentSideDrawer';
import Skeleton from '../components/common/Skeleton';
import audioAlert from '../utils/audioAlert';
import {
  AlertTriangle,
  Search,
  Filter,
  Calendar,
  Volume2,
  VolumeX,
  Sparkles,
  ChevronLeft,
  ChevronRight,
  Eye,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  X,
  BellRing,
} from 'lucide-react';

export default function Alerts() {
  const [incidents, setIncidents] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search & Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [dateFilter, setDateFilter] = useState('ALL');
  const [personFilter, setPersonFilter] = useState('ALL');

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Selected Incident for Side Drawer
  const [selectedIncident, setSelectedIncident] = useState(null);
  const [drawerOpen, setDrawerOpen] = useState(false);

  // Toast & Audio Alert State
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [activeToast, setActiveToast] = useState(null);

  // Load incidents from API
  const loadIncidents = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getIncidents();
      setIncidents(data);
    } catch (err) {
      console.error('Failed to load incidents:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadIncidents();
  }, []);

  // Filtered & Searched data
  const filteredIncidents = useMemo(() => {
    return incidents.filter((item) => {
      // 1. Text Search across Person name, room location, or ID
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = item.person.name.toLowerCase().includes(query);
        const matchesRoom = item.location.toLowerCase().includes(query);
        const matchesCohort = item.person.cohort.toLowerCase().includes(query);
        const matchesId = item.id.toLowerCase().includes(query);
        if (!matchesName && !matchesRoom && !matchesCohort && !matchesId) {
          return false;
        }
      }

      // 2. Status Filter
      if (statusFilter === 'UNACKNOWLEDGED') {
        if (item.acknowledged || item.dismissed) return false;
      } else if (statusFilter === 'ACKNOWLEDGED') {
        if (!item.acknowledged) return false;
      } else if (statusFilter !== 'ALL') {
        if (item.status !== statusFilter) return false;
      }

      // 3. Person Filter
      if (personFilter !== 'ALL' && item.person.name !== personFilter) {
        return false;
      }

      return true;
    });
  }, [incidents, searchQuery, statusFilter, personFilter]);

  // Unique list of people for the person filter dropdown
  const uniquePeople = useMemo(() => {
    const names = new Set(incidents.map((i) => i.person.name));
    return Array.from(names);
  }, [incidents]);

  // Pagination slicing
  const totalPages = Math.ceil(filteredIncidents.length / itemsPerPage) || 1;
  const paginatedIncidents = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredIncidents.slice(start, start + itemsPerPage);
  }, [filteredIncidents, currentPage, itemsPerPage]);

  // Reset to page 1 whenever filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery, statusFilter, dateFilter, personFilter]);

  // Handle row click -> open drawer
  const handleRowClick = (incident) => {
    setSelectedIncident(incident);
    setDrawerOpen(true);
  };

  // Handle Acknowledge Action
  const handleAcknowledge = async (id) => {
    try {
      await apiClient.acknowledgeIncident(id);
      setIncidents((prev) =>
        prev.map((i) => (i.id === id ? { ...i, acknowledged: true } : i))
      );
      if (selectedIncident && selectedIncident.id === id) {
        setSelectedIncident((prev) => ({ ...prev, acknowledged: true }));
      }
    } catch (err) {
      console.error('Failed to acknowledge incident:', err);
    }
  };

  // Handle Dismiss Action
  const handleDismiss = async (id, reason = 'False Positive / Manual Override') => {
    try {
      await apiClient.dismissIncident(id, reason);
      setIncidents((prev) =>
        prev.map((i) => (i.id === id ? { ...i, dismissed: true, notes: reason } : i))
      );
      if (selectedIncident && selectedIncident.id === id) {
        setSelectedIncident((prev) => ({ ...prev, dismissed: true, notes: reason }));
      }
    } catch (err) {
      console.error('Failed to dismiss incident:', err);
    }
  };

  // Simulate a New Incoming SLEEPING Alert (triggers Toast & Audio chime)
  const handleSimulateAlert = async () => {
    try {
      const newAlert = await apiClient.simulateNewAlert();
      setIncidents((prev) => [newAlert, ...prev]);

      // Play alert chime if sound enabled
      if (soundEnabled) {
        audioAlert.playAlarmChime();
      }

      // Show Toast Notification
      setActiveToast(newAlert);

      // Auto-hide toast after 7s
      setTimeout(() => {
        setActiveToast((current) => (current?.id === newAlert.id ? null : current));
      }, 7000);
    } catch (e) {
      console.error('Simulate alert error:', e);
    }
  };

  return (
    <div className="space-y-6 select-none">
      {/* FLOATING TOAST NOTIFICATION ON NEW SLEEPING ALERT */}
      {activeToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 max-w-sm w-full animate-bounceOnce">
          <div className="bitnox-glass rounded-2xl p-4 border border-status-sleeping-border shadow-glow-sleeping bg-status-sleeping-bg/90 backdrop-blur-md relative overflow-hidden">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-status-sleeping text-white shrink-0 mt-0.5 animate-pulse">
                  <BellRing className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-black text-sm text-status-sleeping-light">
                      CRITICAL: SLEEPING DETECTED
                    </span>
                    <Badge variant="sleeping" size="sm">
                      ALERT
                    </Badge>
                  </div>
                  <p className="text-xs text-white font-medium mt-1">
                    {activeToast.person.name} ({activeToast.location})
                  </p>
                  <p className="text-[11px] font-mono text-slate-300 mt-0.5">
                    Eye closure: {activeToast.duration}s &bull; EAR {activeToast.ear}
                  </p>
                </div>
              </div>

              <button
                onClick={() => setActiveToast(null)}
                className="text-slate-400 hover:text-white p-1"
                aria-label="Dismiss toast"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="mt-3 pt-2 border-t border-status-sleeping-border/60 flex items-center justify-between">
              <span className="text-[10px] font-mono text-status-sleeping-light">
                Chime Sounded on Station
              </span>
              <button
                onClick={() => {
                  handleRowClick(activeToast);
                  setActiveToast(null);
                }}
                className="text-xs font-mono text-white font-bold hover:underline flex items-center gap-1"
              >
                Inspect Incident &rarr;
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bitnox-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot size="sm">
              Supervisor Incident Console
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Bitnox Hub Abeokuta • Live Logs
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Incident Alerts & Drowsiness Log
          </h1>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          {/* Sound Toggle Button */}
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-mono border transition-all ${
              soundEnabled
                ? 'bg-bitnox-accent text-bitnox-primary border-bitnox-border shadow-sm'
                : 'bg-bitnox-surface text-slate-400 border-bitnox-border/60 hover:text-white'
            }`}
            title="Audio alerts on incoming critical episodes"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-bitnox-primary" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-500" />
            )}
            <span>{soundEnabled ? 'Chime Alert: ON' : 'Chime Alert: OFF'}</span>
          </button>

          {/* Simulate New Incident Button for Pair-Programming Testing */}
          <Button
            variant="primary"
            size="sm"
            icon={<Sparkles className="w-3.5 h-3.5" />}
            onClick={handleSimulateAlert}
          >
            Simulate Incoming Alert
          </Button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <Card variant="solid" padding="sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          {/* Search Box */}
          <div className="lg:col-span-5">
            <Input
              placeholder="Search by student name, room, or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          {/* Date Filter Dropdown */}
          <div className="lg:col-span-2">
            <select
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary transition-colors cursor-pointer"
            >
              <option value="ALL">📅 All Dates</option>
              <option value="TODAY">Today (Abeokuta)</option>
              <option value="YESTERDAY">Yesterday</option>
              <option value="WEEK">Last 7 Days</option>
            </select>
          </div>

          {/* Status Filter Tabs */}
          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary transition-colors cursor-pointer"
            >
              <option value="ALL">All Statuses</option>
              <option value="UNACKNOWLEDGED">⚠️ Unacknowledged Only</option>
              <option value="ACKNOWLEDGED">✅ Acknowledged Only</option>
              <option value={DETECTION_STATES.DROWSY}>DROWSY Flags</option>
              <option value={DETECTION_STATES.SLEEPING}>SLEEPING Critical</option>
            </select>
          </div>

          {/* Person Filter Dropdown */}
          <div className="lg:col-span-2">
            <select
              value={personFilter}
              onChange={(e) => setPersonFilter(e.target.value)}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary transition-colors cursor-pointer"
            >
              <option value="ALL">All Persons</option>
              {uniquePeople.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </Card>

      {/* Incidents Table */}
      <Table>
        <Table.Header>
          <tr>
            <Table.Head className="w-16">Snapshot</Table.Head>
            <Table.Head>Time</Table.Head>
            <Table.Head>Person & Cohort</Table.Head>
            <Table.Head>Location / Room</Table.Head>
            <Table.Head>Status</Table.Head>
            <Table.Head>Duration</Table.Head>
            <Table.Head className="text-right">Action</Table.Head>
          </tr>
        </Table.Header>
        <Table.Body>
          {loading ? (
            [1, 2, 3, 4, 5].map((idx) => (
              <tr key={idx} className="border-b border-bitnox-border/40 animate-pulse">
                <td className="p-4"><div className="w-12 h-9 rounded-lg bg-slate-800" /></td>
                <td className="p-4"><div className="w-16 h-4 rounded bg-slate-800" /></td>
                <td className="p-4">
                  <div className="flex items-center space-x-2.5">
                    <div className="w-7 h-7 rounded-lg bg-slate-800 shrink-0" />
                    <div className="space-y-1 w-24">
                      <div className="h-3.5 bg-slate-800 rounded" />
                      <div className="h-2.5 bg-slate-800/60 rounded" />
                    </div>
                  </div>
                </td>
                <td className="p-4"><div className="w-20 h-4 rounded bg-slate-800" /></td>
                <td className="p-4"><div className="w-24 h-6 rounded-full bg-slate-800" /></td>
                <td className="p-4"><div className="w-10 h-4 rounded bg-slate-800" /></td>
                <td className="p-4 text-right"><div className="w-16 h-4 rounded bg-slate-800 ml-auto" /></td>
              </tr>
            ))
          ) : paginatedIncidents.length === 0 ? (
            <Table.Empty
              message="No incident records match your active search and filters."
              colSpan={7}
            />
          ) : (
            paginatedIncidents.map((incident) => {
              const timeString = new Date(incident.timestamp).toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
              });

              return (
                <Table.Row
                  key={incident.id}
                  onClick={() => handleRowClick(incident)}
                  className="cursor-pointer group hover:bg-bitnox-accent/30"
                >
                  {/* Thumbnail Snapshot */}
                  <Table.Cell>
                    <div className="w-12 h-9 rounded-lg overflow-hidden border border-bitnox-border relative shrink-0">
                      <img
                        src={incident.snapshot}
                        alt="Snapshot"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                    </div>
                  </Table.Cell>

                  {/* Time */}
                  <Table.Cell>
                    <div className="font-mono text-xs text-white font-semibold">
                      {timeString}
                    </div>
                    <div className="font-mono text-[10px] text-slate-500">
                      WAT
                    </div>
                  </Table.Cell>

                  {/* Person */}
                  <Table.Cell>
                    <div className="flex items-center space-x-2.5">
                      <img
                        src={incident.person.avatar}
                        alt={incident.person.name}
                        className="w-7 h-7 rounded-lg object-cover ring-1 ring-bitnox-border"
                      />
                      <div>
                        <div className="font-bold text-white text-xs sm:text-sm">
                          {incident.person.name}
                        </div>
                        <div className="text-[11px] text-slate-400">
                          {incident.person.cohort}
                        </div>
                      </div>
                    </div>
                  </Table.Cell>

                  {/* Location */}
                  <Table.Cell>
                    <div className="text-xs text-slate-300 font-mono">
                      {incident.location}
                    </div>
                    <div className="text-[10px] text-slate-500">
                      {incident.cameraName}
                    </div>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <StatusPill status={incident.status} size="sm" />
                  </Table.Cell>

                  {/* Duration */}
                  <Table.Cell className="font-mono text-xs text-white">
                    {incident.duration}s
                  </Table.Cell>

                  {/* Action / State */}
                  <Table.Cell className="text-right">
                    {incident.acknowledged ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-status-awake-light">
                        <CheckCircle2 className="w-3.5 h-3.5 text-status-awake" />
                        Acknowledged
                      </span>
                    ) : incident.dismissed ? (
                      <span className="inline-flex items-center gap-1 text-xs font-mono text-slate-500">
                        <XCircle className="w-3.5 h-3.5" />
                        Dismissed
                      </span>
                    ) : (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleRowClick(incident);
                        }}
                      >
                        Inspect &rarr;
                      </Button>
                    )}
                  </Table.Cell>
                </Table.Row>
              );
            })
          )}
        </Table.Body>
      </Table>

      {/* Pagination Controls */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-slate-400 pt-2">
        <div>
          Showing{' '}
          <strong className="text-white">
            {filteredIncidents.length === 0 ? 0 : (currentPage - 1) * itemsPerPage + 1}
          </strong>{' '}
          to{' '}
          <strong className="text-white">
            {Math.min(currentPage * itemsPerPage, filteredIncidents.length)}
          </strong>{' '}
          of <strong className="text-white">{filteredIncidents.length}</strong> incidents
        </div>

        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            icon={<ChevronLeft className="w-4 h-4" />}
          >
            Previous
          </Button>

          <span className="px-3 py-1 rounded-lg bg-bitnox-surface border border-bitnox-border text-white font-bold">
            Page {currentPage} of {totalPages}
          </span>

          <Button
            variant="outline"
            size="sm"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            iconRight={<ChevronRight className="w-4 h-4" />}
          >
            Next
          </Button>
        </div>
      </div>

      {/* Slide-Over Side Drawer for Row Details */}
      <IncidentSideDrawer
        incident={selectedIncident}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        onAcknowledge={handleAcknowledge}
        onDismiss={handleDismiss}
      />
    </div>
  );
}
