import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../common/Card';
import Button from '../common/Button';
import Badge from '../common/Badge';
import StatusPill from '../detection/StatusPill';
import { AlertTriangle, User, ArrowRight, BellRing, ExternalLink } from 'lucide-react';
import audioAlert from '../../utils/audioAlert';

export default function NeedsAttentionList({ people = [] }) {
  const handleWakeChime = (personName) => {
    audioAlert.playAlarmChime();
    alert(`Auditory alert chime sent to workstation of ${personName}.`);
  };

  return (
    <Card variant="solid" padding="none">
      <div className="p-4 sm:p-5 border-b border-bitnox-border flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="p-1.5 rounded-lg bg-status-sleeping-bg border border-status-sleeping-border text-status-sleeping">
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-base text-white">
              Needs Immediate Attention
            </h3>
            <p className="text-xs text-slate-400">
              Cohort members currently flagged for microsleep or multiple drowsiness spikes.
            </p>
          </div>
        </div>

        <Link to="/alerts">
          <span className="text-xs font-mono text-bitnox-primary hover:underline flex items-center gap-1">
            View All Alerts <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </Link>
      </div>

      <div className="divide-y divide-bitnox-border/50">
        {people.length === 0 ? (
          <div className="p-8 text-center text-xs font-mono text-slate-500">
            No subjects currently require intervention. All active stations optimal.
          </div>
        ) : (
          people.map((person) => (
            <div
              key={person.id}
              className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-bitnox-surface-elevated/40 transition-colors"
            >
              {/* Person Identity & Workstation */}
              <div className="flex items-center space-x-3.5">
                <img
                  src={person.avatar}
                  alt={person.name}
                  className="w-10 h-10 rounded-xl object-cover ring-1 ring-bitnox-border"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-heading font-bold text-sm text-white">
                      {person.name}
                    </span>
                    <Badge variant={person.status === 'SLEEPING' ? 'sleeping' : 'drowsy'} size="sm">
                      {person.incidentCount} Incidents
                    </Badge>
                  </div>
                  <div className="text-xs text-slate-400 mt-0.5 flex items-center gap-2">
                    <span>{person.cohort}</span>
                    <span className="text-slate-600">&bull;</span>
                    <span className="font-mono text-[11px] text-bitnox-primary">
                      {person.location}
                    </span>
                  </div>
                </div>
              </div>

              {/* Status Pill & Alert Message */}
              <div className="flex items-center gap-3">
                <div className="text-right hidden md:block">
                  <div className="text-xs font-mono text-slate-300">
                    {person.alertMessage}
                  </div>
                  <div className="text-[10px] font-mono text-slate-500">
                    Last flag: {person.lastIncident} (EAR {person.ear})
                  </div>
                </div>

                <StatusPill status={person.status} size="sm" />

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<BellRing className="w-3.5 h-3.5 text-bitnox-primary" />}
                    onClick={() => handleWakeChime(person.name)}
                    title="Send wake chime to workstation"
                  >
                    Wake Chime
                  </Button>

                  <Link to="/monitor">
                    <Button variant="secondary" size="sm">
                      View Stream
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="p-3 bg-bitnox-surface-elevated/30 border-t border-bitnox-border/50 text-center text-xs text-slate-400 font-mono">
        Interventions are logged automatically into supervisor audit records
      </div>
    </Card>
  );
}
