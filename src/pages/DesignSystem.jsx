import React, { useState } from 'react';
import {
  Palette,
  Type,
  Layers,
  Sliders,
  CheckCircle,
  AlertTriangle,
  AlertOctagon,
  Eye,
  Camera,
  Search,
  Zap,
  Info,
  Maximize2,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';

import Button from '../components/common/Button';
import Card from '../components/common/Card';
import Badge from '../components/common/Badge';
import Input from '../components/common/Input';
import Modal from '../components/common/Modal';
import Table from '../components/common/Table';
import StatusPill from '../components/detection/StatusPill';
import { DETECTION_STATES } from '../api/client';

export default function DesignSystem() {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const sampleLogData = [
    {
      id: 'log_01',
      person: 'Tunde Adeleke',
      station: 'Lab Pod A',
      status: DETECTION_STATES.AWAKE,
      confidence: 0.98,
      ear: 0.34,
      mar: 0.11,
      time: '14:22:05',
    },
    {
      id: 'log_02',
      person: 'Amina Bello',
      station: 'Station 4 (Classroom)',
      status: DETECTION_STATES.DROWSY,
      confidence: 0.89,
      ear: 0.21,
      mar: 0.58,
      time: '14:21:40',
    },
    {
      id: 'log_03',
      person: 'Chidi Okafor',
      station: 'Overhead Cam 2',
      status: DETECTION_STATES.SLEEPING,
      confidence: 0.95,
      ear: 0.12,
      mar: 0.08,
      time: '14:19:12',
    },
  ];

  return (
    <div className="space-y-12 pb-16">
      {/* Hero / Header */}
      <div className="bitnox-glass rounded-2xl p-6 sm:p-10 border border-bitnox-border relative overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 bg-bitnox-primary/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-3xl">
          <Badge variant="primary" dot pulse className="mb-4">
            Bitnox Design Language System
          </Badge>
          <h1 className="font-heading text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
            WakeWatch Style Guide & Component Library
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Extracted from <span className="text-bitnox-primary font-medium">Bitnox Technology Solutions</span>, Abeokuta.
            Shared UI design tokens, accessibility standards, and reusable building blocks for our 4-person team.
          </p>

          <div className="flex flex-wrap items-center gap-3 mt-6">
            <Button
              variant="primary"
              size="sm"
              icon={<Maximize2 className="w-4 h-4" />}
              onClick={() => setModalOpen(true)}
            >
              Test Modal Dialog
            </Button>
            <a
              href="https://bitnoxsolution.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-mono text-bitnox-primary hover:underline px-3 py-2"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              bitnoxsolution.com Reference
            </a>
          </div>
        </div>
      </div>

      {/* SECTION 1: COLOR PALETTE */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <Palette className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            1. Bitnox Extracted Color Palette
          </h2>
        </div>

        {/* Brand Core Colors */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase text-slate-400 tracking-wider">
            Brand Core & Surfaces
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            <div className="p-3 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
              <div className="h-14 rounded-lg bg-bitnox-primary shadow-glow-primary"></div>
              <div className="text-xs font-bold text-white">Primary Cyan</div>
              <div className="text-[11px] font-mono text-slate-400">#05e4fc</div>
            </div>

            <div className="p-3 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
              <div className="h-14 rounded-lg bg-bitnox-primary-hover"></div>
              <div className="text-xs font-bold text-white">Hover Cyan</div>
              <div className="text-[11px] font-mono text-slate-400">#38edfd</div>
            </div>

            <div className="p-3 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
              <div className="h-14 rounded-lg bg-bitnox-accent border border-bitnox-border"></div>
              <div className="text-xs font-bold text-white">Accent Petrol</div>
              <div className="text-[11px] font-mono text-slate-400">#0d2b33</div>
            </div>

            <div className="p-3 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
              <div className="h-14 rounded-lg bg-bitnox-bg border border-slate-800"></div>
              <div className="text-xs font-bold text-white">Deep Background</div>
              <div className="text-[11px] font-mono text-slate-400">#0a0a0a</div>
            </div>

            <div className="p-3 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
              <div className="h-14 rounded-lg bg-bitnox-surface border border-bitnox-border"></div>
              <div className="text-xs font-bold text-white">Brand Surface</div>
              <div className="text-[11px] font-mono text-slate-400">#07141b</div>
            </div>

            <div className="p-3 rounded-xl bg-bitnox-surface border border-bitnox-border space-y-2">
              <div className="h-14 rounded-lg bg-bitnox-surface-elevated border border-bitnox-border"></div>
              <div className="text-xs font-bold text-white">Elevated Surface</div>
              <div className="text-[11px] font-mono text-slate-400">#0b1d27</div>
            </div>
          </div>
        </div>

        {/* Status Colors */}
        <div className="space-y-3">
          <h3 className="font-mono text-xs uppercase text-slate-400 tracking-wider">
            Detection Status Palette (Contrast-Optimized)
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-4 rounded-xl bg-bitnox-surface border border-status-awake-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-status-awake-light">AWAKE</span>
                <Badge variant="awake" size="sm">Normal</Badge>
              </div>
              <div className="h-12 rounded-lg bg-status-awake flex items-center justify-center text-xs font-bold text-black shadow-glow-awake">
                #10b981 (Emerald)
              </div>
              <p className="text-xs text-slate-400">Light: #34d399 • Background Tint: 12% opacity</p>
            </div>

            <div className="p-4 rounded-xl bg-bitnox-surface border border-status-drowsy-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-status-drowsy-light">DROWSY</span>
                <Badge variant="drowsy" size="sm">Warning</Badge>
              </div>
              <div className="h-12 rounded-lg bg-status-drowsy flex items-center justify-center text-xs font-bold text-black shadow-glow-drowsy">
                #f59e0b (Amber)
              </div>
              <p className="text-xs text-slate-400">Light: #fbbf24 • Background Tint: 12% opacity</p>
            </div>

            <div className="p-4 rounded-xl bg-bitnox-surface border border-status-sleeping-border space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-mono font-bold text-sm text-status-sleeping-light">SLEEPING</span>
                <Badge variant="sleeping" size="sm">Critical</Badge>
              </div>
              <div className="h-12 rounded-lg bg-status-sleeping flex items-center justify-center text-xs font-bold text-white shadow-glow-sleeping">
                #ef4444 (Crimson)
              </div>
              <p className="text-xs text-slate-400">Light: #f87171 • Background Tint: 15% opacity</p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: STATUS PILL COMPONENT */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <Eye className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            2. StatusPill (Detection Indicators)
          </h2>
        </div>

        <Card variant="glass" padding="md">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">All Three Model States</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <StatusPill status={DETECTION_STATES.AWAKE} confidence={0.96} />
                <StatusPill status={DETECTION_STATES.DROWSY} confidence={0.88} />
                <StatusPill status={DETECTION_STATES.SLEEPING} confidence={0.99} />
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">Sizes (sm, md, lg)</h4>
              <div className="flex flex-wrap gap-4 items-center">
                <StatusPill status={DETECTION_STATES.AWAKE} size="sm" />
                <StatusPill status={DETECTION_STATES.AWAKE} size="md" />
                <StatusPill status={DETECTION_STATES.AWAKE} size="lg" confidence={0.95} />
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* SECTION 3: BUTTONS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <Sliders className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            3. Buttons
          </h2>
        </div>

        <Card variant="glass" padding="md">
          <div className="space-y-6">
            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">Variants</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary">Primary Button</Button>
                <Button variant="secondary">Secondary Button</Button>
                <Button variant="outline">Outline Button</Button>
                <Button variant="ghost">Ghost Button</Button>
                <Button variant="danger">Danger Button</Button>
              </div>
            </div>

            <div>
              <h4 className="text-xs font-mono uppercase text-slate-400 mb-3">States & Icons</h4>
              <div className="flex flex-wrap gap-3 items-center">
                <Button variant="primary" icon={<Camera className="w-4 h-4" />}>
                  Start Camera Feed
                </Button>
                <Button variant="secondary" loading>
                  Connecting...
                </Button>
                <Button variant="primary" disabled>
                  Disabled State
                </Button>
                <Button variant="outline" size="sm">
                  Small Button
                </Button>
                <Button variant="primary" size="lg">
                  Large CTA Button
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </section>

      {/* SECTION 4: BADGES */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <ShieldCheck className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            4. Badges
          </h2>
        </div>

        <Card variant="glass" padding="md">
          <div className="flex flex-wrap gap-3 items-center">
            <Badge variant="primary" dot pulse>Bitnox AI</Badge>
            <Badge variant="awake" dot>Awake Active</Badge>
            <Badge variant="drowsy" dot pulse>Drowsy Warning</Badge>
            <Badge variant="sleeping" dot pulse>Sleeping Critical</Badge>
            <Badge variant="neutral">Offline</Badge>
            <Badge variant="accent">Cohort 4</Badge>
          </div>
        </Card>
      </section>

      {/* SECTION 5: INPUTS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <Sliders className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            5. Inputs
          </h2>
        </div>

        <Card variant="glass" padding="md">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Input
              label="Standard Text Input"
              placeholder="e.g. Abeokuta Lab Room 2"
              hint="Location or station identifier"
            />
            <Input
              label="With Prefix Icon"
              icon={<Search className="w-4 h-4" />}
              placeholder="Filter camera feeds..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Input
              label="Validation Error State"
              placeholder="rtsp://camera-stream..."
              error="Camera stream unreachable on port 554"
              defaultValue="rtsp://invalid-ip"
            />
          </div>
        </Card>
      </section>

      {/* SECTION 6: CARDS */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <Layers className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            6. Cards
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card variant="glass" interactive>
            <Card.Header>
              <Card.Title>Glassmorphic Card</Card.Title>
              <Card.Description>
                Signature Bitnox frosted glass with cyan hover glow.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-xs text-slate-300">
                Uses backdrop-filter blur with subtle 15% cyan border.
              </p>
            </Card.Content>
            <Card.Footer>
              <span>Interactive: Hover me</span>
              <span className="text-bitnox-primary font-mono text-[11px]">.bitnox-glass</span>
            </Card.Footer>
          </Card>

          <Card variant="solid">
            <Card.Header>
              <Card.Title>Solid Surface Card</Card.Title>
              <Card.Description>
                Opaque dark background for high telemetry density.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-xs text-slate-300">
                Container background #07141b with crisp contrast.
              </p>
            </Card.Content>
            <Card.Footer>
              <span>Variant: solid</span>
              <span className="text-bitnox-primary font-mono text-[11px]">#07141b</span>
            </Card.Footer>
          </Card>

          <Card variant="elevated">
            <Card.Header>
              <Card.Title>Elevated Card</Card.Title>
              <Card.Description>
                For popovers, dropdowns, and highlighted sections.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <p className="text-xs text-slate-300">
                Container background #0b1d27 with border-hover cyan.
              </p>
            </Card.Content>
            <Card.Footer>
              <span>Variant: elevated</span>
              <span className="text-bitnox-primary font-mono text-[11px]">#0b1d27</span>
            </Card.Footer>
          </Card>
        </div>
      </section>

      {/* SECTION 7: TABLE */}
      <section className="space-y-4">
        <div className="flex items-center gap-2 border-b border-bitnox-border pb-3">
          <Layers className="w-5 h-5 text-bitnox-primary" />
          <h2 className="font-heading font-bold text-xl sm:text-2xl text-white">
            7. Table (Detection Logs & Telemetry)
          </h2>
        </div>

        <Table>
          <Table.Header>
            <tr>
              <Table.Head>Person / Station</Table.Head>
              <Table.Head>Alertness State</Table.Head>
              <Table.Head>EAR Metric</Table.Head>
              <Table.Head>MAR (Yawn)</Table.Head>
              <Table.Head>Timestamp</Table.Head>
              <Table.Head className="text-right">Action</Table.Head>
            </tr>
          </Table.Header>
          <Table.Body>
            {sampleLogData.map((row) => (
              <Table.Row key={row.id}>
                <Table.Cell>
                  <div className="font-semibold text-white">{row.person}</div>
                  <div className="text-xs text-slate-400 font-mono">{row.station}</div>
                </Table.Cell>
                <Table.Cell>
                  <StatusPill status={row.status} size="sm" confidence={row.confidence} />
                </Table.Cell>
                <Table.Cell className="font-mono text-xs">{row.ear}</Table.Cell>
                <Table.Cell className="font-mono text-xs">{row.mar}</Table.Cell>
                <Table.Cell className="font-mono text-xs text-slate-400">{row.time}</Table.Cell>
                <Table.Cell className="text-right">
                  <Button variant="outline" size="sm">
                    Inspect
                  </Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </section>

      {/* MODAL DIALOG PREVIEW */}
      <Modal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        title="WakeWatch Alert Confirmation"
        description="Verify detection incident details before updating telemetry record."
        footer={
          <>
            <Button variant="ghost" onClick={() => setModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={() => setModalOpen(false)}>
              Acknowledge Incident
            </Button>
          </>
        }
      >
        <div className="space-y-4">
          <div className="p-4 rounded-xl bg-status-drowsy-bg border border-status-drowsy-border flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-status-drowsy-light shrink-0 mt-0.5" />
            <div>
              <div className="font-heading font-semibold text-status-drowsy-light text-sm">
                Microsleep Episode Flagged
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Eye Aspect Ratio dropped to 0.18 for 3.4 seconds. Classroom Station 4.
              </p>
            </div>
          </div>

          <Input
            label="Supervisor Notes"
            placeholder="e.g. Student offered short water break"
          />
        </div>
      </Modal>
    </div>
  );
}
