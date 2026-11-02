import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import apiClient, { DETECTION_STATES } from '../api/client';
import Table from '../components/common/Table';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Skeleton from '../components/common/Skeleton';
import StatusPill from '../components/detection/StatusPill';
import PersonModal from '../components/people/PersonModal';
import {
  Users,
  UserPlus,
  Search,
  LayoutGrid,
  List,
  Edit2,
  ExternalLink,
  GraduationCap,
  MapPin,
  Clock,
  TrendingUp,
  Filter,
} from 'lucide-react';

export default function People() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'

  // Search & Filter
  const [searchQuery, setSearchQuery] = useState('');
  const [cohortFilter, setCohortFilter] = useState('ALL');
  const [statusFilter, setStatusFilter] = useState('ALL');

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingPerson, setEditingPerson] = useState(null);

  const loadPeople = async () => {
    setLoading(true);
    try {
      const data = await apiClient.getPeople();
      setPeople(data);
    } catch (err) {
      console.error('Failed to load people:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPeople();
  }, []);

  // Filtered List
  const filteredPeople = useMemo(() => {
    return people.filter((p) => {
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase();
        const matchesName = p.name.toLowerCase().includes(query);
        const matchesCohort = p.cohort.toLowerCase().includes(query);
        const matchesLoc = p.location.toLowerCase().includes(query);
        if (!matchesName && !matchesCohort && !matchesLoc) return false;
      }
      if (cohortFilter !== 'ALL' && p.cohort !== cohortFilter) return false;
      if (statusFilter !== 'ALL' && p.status !== statusFilter) return false;
      return true;
    });
  }, [people, searchQuery, cohortFilter, statusFilter]);

  // Unique cohorts for filter dropdown
  const uniqueCohorts = useMemo(() => {
    return Array.from(new Set(people.map((p) => p.cohort)));
  }, [people]);

  // Save (Add or Edit) Handler
  const handleSavePerson = async (formData) => {
    try {
      if (editingPerson) {
        const updated = await apiClient.updatePerson(editingPerson.id, formData);
        setPeople((prev) =>
          prev.map((p) => (p.id === editingPerson.id ? updated : p))
        );
      } else {
        const created = await apiClient.addPerson(formData);
        setPeople((prev) => [created, ...prev]);
      }
    } catch (err) {
      console.error('Save person error:', err);
    }
  };

  const handleOpenAdd = () => {
    setEditingPerson(null);
    setModalOpen(true);
  };

  const handleOpenEdit = (person, e) => {
    if (e) e.stopPropagation();
    setEditingPerson(person);
    setModalOpen(true);
  };

  return (
    <div className="space-y-6 select-none">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bitnox-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot size="sm">
              Cohort Directory
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Bitnox Hub Abeokuta • {people.length} Members Enrolled
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            People & Cohorts
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {/* Grid vs Table Toggle */}
          <div className="flex items-center bg-bitnox-surface p-1 rounded-xl border border-bitnox-border">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'grid'
                  ? 'bg-bitnox-accent text-bitnox-primary font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded-lg text-xs font-mono transition-colors ${
                viewMode === 'table'
                  ? 'bg-bitnox-accent text-bitnox-primary font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>

          <Button
            variant="primary"
            size="sm"
            icon={<UserPlus className="w-4 h-4" />}
            onClick={handleOpenAdd}
          >
            Register Person
          </Button>
        </div>
      </div>

      {/* Search and Filters Bar */}
      <Card variant="solid" padding="sm">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-3 items-center">
          <div className="lg:col-span-6">
            <Input
              placeholder="Search by name, class, cohort, or pod..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              icon={<Search className="w-4 h-4" />}
            />
          </div>

          <div className="lg:col-span-3">
            <select
              value={cohortFilter}
              onChange={(e) => setCohortFilter(e.target.value)}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary cursor-pointer"
            >
              <option value="ALL">All Cohorts / Classes</option>
              {uniqueCohorts.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div className="lg:col-span-3">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none focus:border-bitnox-primary cursor-pointer"
            >
              <option value="ALL">All Current States</option>
              <option value={DETECTION_STATES.AWAKE}>AWAKE Only</option>
              <option value={DETECTION_STATES.DROWSY}>DROWSY Only</option>
              <option value={DETECTION_STATES.SLEEPING}>SLEEPING Only</option>
            </select>
          </div>
        </div>
      </Card>

      {/* Content: Grid View or Table View */}
      {loading ? (
        viewMode === 'grid' ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="bitnox-glass rounded-2xl p-5 border border-bitnox-border/50 space-y-4 animate-pulse"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 rounded-xl bg-slate-800" />
                  <div className="space-y-2 flex-1">
                    <div className="h-4 bg-slate-800 rounded w-3/4" />
                    <div className="h-3 bg-slate-800/60 rounded w-1/2" />
                  </div>
                </div>
                <div className="space-y-2 pt-2 border-t border-bitnox-border/30">
                  <div className="h-3 bg-slate-800/60 rounded w-5/6" />
                  <div className="h-3 bg-slate-800/60 rounded w-2/3" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="bitnox-glass rounded-2xl border border-bitnox-border/50 p-6 space-y-3">
            {[1, 2, 3, 4, 5].map((idx) => (
              <Skeleton key={idx} variant="tableRow" className="h-12" />
            ))}
          </div>
        )
      ) : filteredPeople.length === 0 ? (
        <Card variant="glass" padding="lg" className="text-center">
          <Users className="w-10 h-10 text-slate-500 mx-auto mb-2 opacity-50" />
          <h3 className="font-heading font-bold text-white text-base">
            No Members Match Criteria
          </h3>
          <p className="text-xs text-slate-400 mt-1">
            Try adjusting your search query or status filter.
          </p>
        </Card>
      ) : viewMode === 'grid' ? (
        /* GRID VIEW OF PEOPLE */
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredPeople.map((person) => {
            const isSleeping = person.status === 'SLEEPING';
            const isDrowsy = person.status === 'DROWSY';

            return (
              <Card
                key={person.id}
                variant="glass"
                padding="md"
                className={`relative border transition-all hover:-translate-y-0.5 ${
                  isSleeping
                    ? 'border-status-sleeping-border shadow-glow-sleeping'
                    : isDrowsy
                    ? 'border-status-drowsy-border shadow-glow-drowsy'
                    : 'border-bitnox-border'
                }`}
              >
                {/* Top Card Row */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-12 h-12 rounded-xl object-cover ring-1 ring-bitnox-border"
                    />
                    <div>
                      <h3 className="font-heading font-bold text-base text-white">
                        {person.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-mono block">
                        {person.role}
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={(e) => handleOpenEdit(person, e)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated transition-colors"
                    title="Edit Member"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Cohort & Workstation Details */}
                <div className="space-y-2 text-xs font-mono text-slate-300 py-3 border-y border-bitnox-border/50">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Class/Cohort:</span>
                    <span className="text-white font-semibold">{person.cohort}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Location:</span>
                    <span className="text-bitnox-primary">{person.location}</span>
                  </div>
                </div>

                {/* Live Status & Alertness Meter */}
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400 uppercase">
                      Current Status:
                    </span>
                    <StatusPill status={person.status} size="sm" />
                  </div>

                  <div className="space-y-1">
                    <div className="flex justify-between text-xs font-mono">
                      <span className="text-slate-400">Avg Alertness:</span>
                      <span
                        className={`font-bold ${
                          person.alertnessScore > 88
                            ? 'text-status-awake-light'
                            : person.alertnessScore > 75
                            ? 'text-status-drowsy-light'
                            : 'text-status-sleeping-light'
                        }`}
                      >
                        {person.alertnessScore}%
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          person.alertnessScore > 88
                            ? 'bg-status-awake'
                            : person.alertnessScore > 75
                            ? 'bg-status-drowsy'
                            : 'bg-status-sleeping'
                        }`}
                        style={{ width: `${person.alertnessScore}%` }}
                      />
                    </div>
                  </div>
                </div>

                {/* Card Action Link */}
                <div className="mt-5 pt-3 border-t border-bitnox-border/50 flex items-center justify-between">
                  <span className="text-[11px] font-mono text-slate-500">
                    {person.monitoredHours}h monitored
                  </span>
                  <Link
                    to={`/people/${person.id}`}
                    className="text-xs font-mono text-bitnox-primary hover:underline flex items-center gap-1 font-bold"
                  >
                    View History & Profile &rarr;
                  </Link>
                </div>
              </Card>
            );
          })}
        </div>
      ) : (
        /* TABLE VIEW OF PEOPLE */
        <Table>
          <Table.Header>
            <tr>
              <Table.Head>Member</Table.Head>
              <Table.Head>Role / Class</Table.Head>
              <Table.Head>Workstation</Table.Head>
              <Table.Head>Current Status</Table.Head>
              <Table.Head>Alertness Score</Table.Head>
              <Table.Head className="text-right">Actions</Table.Head>
            </tr>
          </Table.Header>
          <Table.Body>
            {filteredPeople.map((person) => (
              <Table.Row key={person.id}>
                <Table.Cell>
                  <div className="flex items-center space-x-3">
                    <img
                      src={person.avatar}
                      alt={person.name}
                      className="w-9 h-9 rounded-xl object-cover ring-1 ring-bitnox-border"
                    />
                    <div>
                      <div className="font-bold text-white text-sm">
                        {person.name}
                      </div>
                      <div className="text-[11px] text-slate-400 font-mono">
                        {person.email}
                      </div>
                    </div>
                  </div>
                </Table.Cell>

                <Table.Cell className="text-xs font-mono text-slate-300">
                  {person.cohort}
                </Table.Cell>

                <Table.Cell className="text-xs font-mono text-bitnox-primary">
                  {person.location}
                </Table.Cell>

                <Table.Cell>
                  <StatusPill status={person.status} size="sm" />
                </Table.Cell>

                <Table.Cell>
                  <Badge
                    variant={
                      person.alertnessScore > 88
                        ? 'awake'
                        : person.alertnessScore > 75
                        ? 'drowsy'
                        : 'sleeping'
                    }
                    size="sm"
                  >
                    {person.alertnessScore}%
                  </Badge>
                </Table.Cell>

                <Table.Cell className="text-right">
                  <div className="inline-flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleOpenEdit(person)}
                    >
                      Edit
                    </Button>
                    <Link to={`/people/${person.id}`}>
                      <Button variant="outline" size="sm">
                        Profile &rarr;
                      </Button>
                    </Link>
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      {/* Add / Edit Person Modal */}
      <PersonModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSavePerson}
        initialData={editingPerson}
      />
    </div>
  );
}
