import React, { useState, useEffect } from 'react';
import apiClient from '../api/client';
import Card from '../components/common/Card';
import Input from '../components/common/Input';
import Button from '../components/common/Button';
import Badge from '../components/common/Badge';
import Table from '../components/common/Table';
import Skeleton from '../components/common/Skeleton';
import audioAlert from '../utils/audioAlert';
import {
  Sliders,
  Bell,
  Camera,
  Shield,
  Sun,
  Moon,
  Save,
  CheckCircle2,
  Volume2,
  Mail,
  Plus,
  Trash2,
  RotateCcw,
  Sparkles,
  Laptop,
} from 'lucide-react';

export default function Settings() {
  const [loading, setLoading] = useState(true);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [activeTab, setActiveTab] = useState('thresholds'); // 'thresholds' | 'notifications' | 'cameras' | 'roles' | 'theme'

  // Settings State
  const [settings, setSettings] = useState({
    thresholds: {
      sleepDurationSeconds: 2.5,
      earThreshold: 0.25,
      marThreshold: 0.60,
      headPitchThreshold: -12,
    },
    notifications: {
      inApp: true,
      email: true,
      sound: true,
      supervisorEmail: 'supervisor@bitnoxsolution.com',
      chimeVolume: 80,
      chimeTone: 'high-pitch',
    },
    cameras: [],
    roles: [],
    theme: 'dark',
  });

  // Modal for adding a new camera
  const [newCamera, setNewCamera] = useState({
    name: '',
    location: '',
    type: 'Webcam',
    url: '',
  });
  const [showAddCamera, setShowAddCamera] = useState(false);

  // Load settings on mount
  useEffect(() => {
    async function loadSettingsData() {
      setLoading(true);
      try {
        const data = await apiClient.getSettings();
        setSettings(data);
      } catch (err) {
        console.error('Failed to load settings:', err);
      } finally {
        setLoading(false);
      }
    }
    loadSettingsData();
  }, []);

  // Save Settings handler
  const handleSave = async (e) => {
    if (e) e.preventDefault();
    try {
      await apiClient.saveSettings(settings);
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 3000);
    } catch (err) {
      console.error('Failed to save settings:', err);
    }
  };

  // Theme Switcher Handler
  const handleThemeToggle = (newTheme) => {
    setSettings((prev) => ({ ...prev, theme: newTheme }));
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
      localStorage.setItem('wakewatch_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('wakewatch_theme', 'light');
    }
  };

  // Add camera handler
  const handleAddCamera = () => {
    if (!newCamera.name.trim()) return;
    const cam = {
      id: `cam_${Date.now()}`,
      name: newCamera.name,
      location: newCamera.location || 'Abeokuta Hub Room',
      type: newCamera.type,
      status: 'ONLINE',
      fps: 30,
      url: newCamera.url || 'rtsp://hub.bitnox.internal/cam',
    };
    setSettings((prev) => ({
      ...prev,
      cameras: [...prev.cameras, cam],
    }));
    setNewCamera({ name: '', location: '', type: 'Webcam', url: '' });
    setShowAddCamera(false);
  };

  // Delete camera handler
  const handleDeleteCamera = (camId) => {
    setSettings((prev) => ({
      ...prev,
      cameras: prev.cameras.filter((c) => c.id !== camId),
    }));
  };

  // Test sound chime
  const handleTestChime = () => {
    audioAlert.playAlarmChime();
  };

  if (loading) {
    return (
      <div className="space-y-6 animate-pulse">
        <div className="h-8 bg-slate-800 rounded w-64" />
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div key={idx} className="h-9 bg-slate-800 rounded-xl w-28" />
          ))}
        </div>
        <div className="bitnox-glass rounded-2xl p-6 border border-bitnox-border/50 space-y-4">
          <div className="h-6 bg-slate-800 rounded w-1/4" />
          <div className="h-4 bg-slate-800/60 rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
            <Skeleton variant="card" className="h-32" />
            <Skeleton variant="card" className="h-32" />
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'thresholds', label: 'Alert Thresholds', icon: <Sliders className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'cameras', label: 'Camera Management', icon: <Camera className="w-4 h-4" /> },
    { id: 'roles', label: 'User Roles & Access', icon: <Shield className="w-4 h-4" /> },
    { id: 'theme', label: 'Appearance & Theme', icon: <Sun className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-6 select-none max-w-5xl">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pb-2 border-b border-bitnox-border/60">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="primary" dot size="sm">
              Console Preferences
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Bitnox Hub Abeokuta • Global Config
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            System Settings & Calibration
          </h1>
        </div>

        <div className="flex items-center gap-2.5">
          {saveSuccess && (
            <span className="inline-flex items-center gap-1.5 text-xs font-mono text-status-awake-light bg-status-awake-bg px-3 py-1.5 rounded-xl border border-status-awake-border animate-fadeIn">
              <CheckCircle2 className="w-4 h-4 text-status-awake" />
              Settings Saved
            </span>
          )}

          <Button
            variant="primary"
            size="sm"
            icon={<Save className="w-4 h-4" />}
            onClick={handleSave}
          >
            Save All Changes
          </Button>
        </div>
      </div>

      {/* Settings Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-bitnox-border/50">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-mono font-medium whitespace-nowrap transition-all ${
              activeTab === tab.id
                ? 'bg-bitnox-accent text-bitnox-primary border border-bitnox-border shadow-sm font-bold'
                : 'text-slate-400 hover:text-white hover:bg-bitnox-surface-elevated'
            }`}
          >
            {tab.icon}
            <span>{tab.label}</span>
          </button>
        ))}
      </div>

      {/* 1. ALERT THRESHOLDS TAB */}
      {activeTab === 'thresholds' && (
        <div className="space-y-6">
          <Card variant="solid" padding="md">
            <Card.Header>
              <Card.Title>Drowsiness & Sleeping Trigger Thresholds</Card.Title>
              <Card.Description>
                Calibrate inference sensitivity parameters to match Abeokuta hub lighting and classroom distances.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                {/* Sleep Duration Seconds */}
                <div className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Sleeping Alert Delay (Seconds)
                      </span>
                      <span className="text-xs text-slate-400">
                        How many continuous seconds of eye closure trigger a critical sleeping alarm.
                      </span>
                    </div>
                    <span className="font-mono font-black text-xl text-status-sleeping-light">
                      {settings.thresholds.sleepDurationSeconds}s
                    </span>
                  </div>

                  <input
                    type="range"
                    min="1.0"
                    max="6.0"
                    step="0.5"
                    value={settings.thresholds.sleepDurationSeconds}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          sleepDurationSeconds: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-bitnox-primary bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>1.0s (Strict)</span>
                    <span>2.5s (Standard)</span>
                    <span>6.0s (Relaxed)</span>
                  </div>
                </div>

                {/* EAR Cutoff Threshold */}
                <div className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Eye Aspect Ratio (EAR) Threshold
                      </span>
                      <span className="text-xs text-slate-400">
                        Geometric eye ratio cutoff. Values below this classify eye as closed.
                      </span>
                    </div>
                    <span className="font-mono font-black text-xl text-bitnox-primary">
                      {settings.thresholds.earThreshold}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.18"
                    max="0.32"
                    step="0.01"
                    value={settings.thresholds.earThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          earThreshold: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-bitnox-primary bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>0.18 (Deep Closure)</span>
                    <span>0.25 (Default)</span>
                    <span>0.32 (High Sensitivity)</span>
                  </div>
                </div>

                {/* MAR Yawn Threshold */}
                <div className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Mouth Aspect Ratio (MAR) Yawn Cutoff
                      </span>
                      <span className="text-xs text-slate-400">
                        Mouth vertical-to-horizontal opening ratio indicative of fatigue yawning.
                      </span>
                    </div>
                    <span className="font-mono font-black text-xl text-status-drowsy-light">
                      {settings.thresholds.marThreshold}
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0.45"
                    max="0.80"
                    step="0.05"
                    value={settings.thresholds.marThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          marThreshold: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-status-drowsy bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>0.45</span>
                    <span>0.60 (Standard)</span>
                    <span>0.80</span>
                  </div>
                </div>

                {/* Head Pitch Tilt */}
                <div className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Head Droop Pitch Angle
                      </span>
                      <span className="text-xs text-slate-400">
                        Forward neck tilt angle indicating head nod off or microsleep slouch.
                      </span>
                    </div>
                    <span className="font-mono font-black text-xl text-white">
                      {settings.thresholds.headPitchThreshold}&deg;
                    </span>
                  </div>

                  <input
                    type="range"
                    min="-25"
                    max="-5"
                    step="1"
                    value={settings.thresholds.headPitchThreshold}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        thresholds: {
                          ...settings.thresholds,
                          headPitchThreshold: Number(e.target.value),
                        },
                      })
                    }
                    className="w-full accent-bitnox-primary bg-slate-800 h-2 rounded-lg cursor-pointer"
                  />
                  <div className="flex justify-between text-[10px] font-mono text-slate-500">
                    <span>-25&deg; (Severe)</span>
                    <span>-12&deg; (Standard)</span>
                    <span>-5&deg; (Subtle)</span>
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* 2. NOTIFICATIONS TAB */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <Card variant="solid" padding="md">
            <Card.Header>
              <Card.Title>Incident Dispatch & Sound Options</Card.Title>
              <Card.Description>
                Configure which communication channels activate upon confirmed drowsiness or sleeping.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4 pt-2">
                {/* In-app Toast Switch */}
                <div className="flex items-center justify-between p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border">
                  <div>
                    <span className="font-heading font-semibold text-white text-sm block">
                      In-App Real-Time Toasts
                    </span>
                    <span className="text-xs text-slate-400">
                      Show immediate floating warning banner in top-right corner of console.
                    </span>
                  </div>
                  <input
                    type="checkbox"
                    checked={settings.notifications.inApp}
                    onChange={(e) =>
                      setSettings({
                        ...settings,
                        notifications: { ...settings.notifications, inApp: e.target.checked },
                      })
                    }
                    className="h-5 w-5 rounded bg-bitnox-surface border-bitnox-border text-bitnox-primary focus:ring-bitnox-primary cursor-pointer"
                  />
                </div>

                {/* Email Dispatch Switch */}
                <div className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Email Incident Dispatch
                      </span>
                      <span className="text-xs text-slate-400">
                        Send automated summary alerts on prolonged sleeping incidents.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.email}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, email: e.target.checked },
                        })
                      }
                      className="h-5 w-5 rounded bg-bitnox-surface border-bitnox-border text-bitnox-primary focus:ring-bitnox-primary cursor-pointer"
                    />
                  </div>

                  {settings.notifications.email && (
                    <div className="pt-2 border-t border-bitnox-border/50">
                      <Input
                        label="Supervisor Dispatch Email"
                        type="email"
                        value={settings.notifications.supervisorEmail}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              supervisorEmail: e.target.value,
                            },
                          })
                        }
                        icon={<Mail className="w-4 h-4" />}
                      />
                    </div>
                  )}
                </div>

                {/* Audio Chime Switch & Volume */}
                <div className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-heading font-semibold text-white text-sm block">
                        Workstation Audio Alarm Chime
                      </span>
                      <span className="text-xs text-slate-400">
                        Plays synthesized audio tone to physically awaken subject during sleeping episodes.
                      </span>
                    </div>
                    <input
                      type="checkbox"
                      checked={settings.notifications.sound}
                      onChange={(e) =>
                        setSettings({
                          ...settings,
                          notifications: { ...settings.notifications, sound: e.target.checked },
                        })
                      }
                      className="h-5 w-5 rounded bg-bitnox-surface border-bitnox-border text-bitnox-primary focus:ring-bitnox-primary cursor-pointer"
                    />
                  </div>

                  {settings.notifications.sound && (
                    <div className="pt-3 border-t border-bitnox-border/50 space-y-3">
                      <div className="flex items-center justify-between text-xs font-mono">
                        <span className="text-slate-400">Chime Output Volume:</span>
                        <span className="text-bitnox-primary font-bold">
                          {settings.notifications.chimeVolume}%
                        </span>
                      </div>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={settings.notifications.chimeVolume}
                        onChange={(e) =>
                          setSettings({
                            ...settings,
                            notifications: {
                              ...settings.notifications,
                              chimeVolume: Number(e.target.value),
                            },
                          })
                        }
                        className="w-full accent-bitnox-primary bg-slate-800 h-2 rounded-lg cursor-pointer"
                      />

                      <Button
                        variant="outline"
                        size="sm"
                        icon={<Volume2 className="w-3.5 h-3.5 text-bitnox-primary" />}
                        onClick={handleTestChime}
                      >
                        Play Sample Alarm Tone
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* 3. CAMERAS TAB */}
      {activeTab === 'cameras' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-heading font-bold text-lg text-white">
                Camera Feed Management
              </h3>
              <p className="text-xs text-slate-400">
                Configure classroom RTSP IP feeds, overhead cameras, and station webcams.
              </p>
            </div>

            <Button
              variant="primary"
              size="sm"
              icon={<Plus className="w-3.5 h-3.5" />}
              onClick={() => setShowAddCamera(true)}
            >
              Add Camera Feed
            </Button>
          </div>

          {/* Add Camera Inline Form */}
          {showAddCamera && (
            <Card variant="solid" padding="md" className="border-bitnox-primary/40 animate-fadeIn">
              <h4 className="font-heading font-bold text-white text-sm mb-3">
                Connect New Camera Source
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <Input
                  label="Camera Display Name"
                  placeholder="e.g. Lab Pod Overhead 3"
                  value={newCamera.name}
                  onChange={(e) => setNewCamera({ ...newCamera, name: e.target.value })}
                />
                <Input
                  label="Room / Station Location"
                  placeholder="e.g. Training Room B - Station 2"
                  value={newCamera.location}
                  onChange={(e) => setNewCamera({ ...newCamera, location: e.target.value })}
                />
                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-medium text-slate-300 uppercase">
                    Feed Type
                  </label>
                  <select
                    value={newCamera.type}
                    onChange={(e) => setNewCamera({ ...newCamera, type: e.target.value })}
                    className="w-full bg-bitnox-surface border border-bitnox-border rounded-lg px-3 py-2 text-xs font-mono text-slate-200 outline-none"
                  >
                    <option value="Webcam">USB / Integrated Webcam</option>
                    <option value="RTSP Stream">RTSP Network Stream</option>
                    <option value="IP Camera">ONVIF / IP Camera</option>
                  </select>
                </div>
                <Input
                  label="Stream URL / Device ID"
                  placeholder="rtsp://192.168.1.100:554/live"
                  value={newCamera.url}
                  onChange={(e) => setNewCamera({ ...newCamera, url: e.target.value })}
                />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost" size="sm" onClick={() => setShowAddCamera(false)}>
                  Cancel
                </Button>
                <Button variant="primary" size="sm" onClick={handleAddCamera}>
                  Connect Camera
                </Button>
              </div>
            </Card>
          )}

          {/* Connected Cameras Table */}
          <Table>
            <Table.Header>
              <tr>
                <Table.Head>Camera Name</Table.Head>
                <Table.Head>Location</Table.Head>
                <Table.Head>Feed Type</Table.Head>
                <Table.Head>Status</Table.Head>
                <Table.Head>FPS</Table.Head>
                <Table.Head className="text-right">Action</Table.Head>
              </tr>
            </Table.Header>
            <Table.Body>
              {settings.cameras.map((cam) => (
                <Table.Row key={cam.id}>
                  <Table.Cell className="font-semibold text-white">
                    {cam.name}
                  </Table.Cell>
                  <Table.Cell className="text-xs font-mono text-slate-300">
                    {cam.location}
                  </Table.Cell>
                  <Table.Cell className="text-xs font-mono text-slate-400">
                    {cam.type}
                  </Table.Cell>
                  <Table.Cell>
                    <Badge variant={cam.status === 'ONLINE' ? 'awake' : 'neutral'} size="sm" dot>
                      {cam.status}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell className="font-mono text-xs text-white">
                    {cam.fps} FPS
                  </Table.Cell>
                  <Table.Cell className="text-right">
                    <button
                      onClick={() => handleDeleteCamera(cam.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-status-sleeping transition-colors"
                      title="Disconnect camera"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      )}

      {/* 4. ROLES TAB */}
      {activeTab === 'roles' && (
        <div className="space-y-6">
          <Card variant="solid" padding="md">
            <Card.Header>
              <Card.Title>User Roles & Access Permissions</Card.Title>
              <Card.Description>
                Define operational capabilities across Hub Admins, Cohort Instructors, and Observers.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="space-y-4 pt-2">
                {settings.roles.map((r, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl bg-bitnox-surface-elevated border border-bitnox-border space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Badge
                          variant={r.role === 'Admin' ? 'primary' : r.role === 'Instructor' ? 'awake' : 'neutral'}
                          size="md"
                        >
                          {r.role}
                        </Badge>
                        <span className="text-xs text-slate-300">{r.description}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2 border-t border-bitnox-border/50 text-xs font-mono">
                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2
                          className={`w-4 h-4 ${r.canAcknowledge ? 'text-status-awake' : 'text-slate-600'}`}
                        />
                        <span>Acknowledge Alerts</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2
                          className={`w-4 h-4 ${r.canEditCameras ? 'text-status-awake' : 'text-slate-600'}`}
                        />
                        <span>Manage Cameras</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2
                          className={`w-4 h-4 ${r.canExportReports ? 'text-status-awake' : 'text-slate-600'}`}
                        />
                        <span>Export CSV & PDF</span>
                      </div>

                      <div className="flex items-center gap-1.5 text-slate-300">
                        <CheckCircle2
                          className={`w-4 h-4 ${r.canModifySettings ? 'text-status-awake' : 'text-slate-600'}`}
                        />
                        <span>System Settings</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card.Content>
          </Card>
        </div>
      )}

      {/* 5. THEME TAB */}
      {activeTab === 'theme' && (
        <div className="space-y-6">
          <Card variant="solid" padding="md">
            <Card.Header>
              <Card.Title>Visual Theme & Display Mode</Card.Title>
              <Card.Description>
                Toggle between Bitnox signature dark cyber mode and high-contrast light mode.
              </Card.Description>
            </Card.Header>
            <Card.Content>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Dark Theme Option */}
                <div
                  onClick={() => handleThemeToggle('dark')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    settings.theme === 'dark'
                      ? 'border-bitnox-primary bg-bitnox-surface-elevated shadow-glow-primary'
                      : 'border-bitnox-border bg-bitnox-surface hover:border-bitnox-border-hover'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Moon className="w-5 h-5 text-bitnox-primary" />
                      <span className="font-heading font-bold text-white text-base">
                        Bitnox Dark Mode (Default)
                      </span>
                    </div>
                    {settings.theme === 'dark' && (
                      <CheckCircle2 className="w-5 h-5 text-bitnox-primary" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    Optimized for 24/7 vision monitoring rooms. Reduces glare and emphasizes neon status telemetry.
                  </p>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#0a0a0a] border border-white/20" />
                    <span className="w-4 h-4 rounded-full bg-[#07141b] border border-white/20" />
                    <span className="w-4 h-4 rounded-full bg-[#05e4fc]" />
                  </div>
                </div>

                {/* Light Theme Option */}
                <div
                  onClick={() => handleThemeToggle('light')}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                    settings.theme === 'light'
                      ? 'border-bitnox-primary bg-slate-900 shadow-glow-primary'
                      : 'border-bitnox-border bg-bitnox-surface hover:border-bitnox-border-hover'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sun className="w-5 h-5 text-amber-400" />
                      <span className="font-heading font-bold text-white text-base">
                        Bitnox Day / Light Mode
                      </span>
                    </div>
                    {settings.theme === 'light' && (
                      <CheckCircle2 className="w-5 h-5 text-bitnox-primary" />
                    )}
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed mb-4">
                    High ambient light classroom environments with crisp contrast ratios.
                  </p>
                  <div className="flex gap-2">
                    <span className="w-4 h-4 rounded-full bg-[#f8fafc] border border-black/20" />
                    <span className="w-4 h-4 rounded-full bg-[#e2e8f0] border border-black/20" />
                    <span className="w-4 h-4 rounded-full bg-[#0284c7]" />
                  </div>
                </div>
              </div>
            </Card.Content>
          </Card>
        </div>
      )}
    </div>
  );
}
