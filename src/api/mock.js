/**
 * WakeWatch Mock API Data & Simulation Layer
 * Used when VITE_USE_MOCK=true during frontend development.
 * Represents data contracts expected from the Bitnox WakeWatch backend.
 */

export const DETECTION_STATES = {
  AWAKE: 'AWAKE',
  DROWSY: 'DROWSY',
  SLEEPING: 'SLEEPING',
};

// Mock User Accounts for Bitnox Roles
export const mockUsers = [
  {
    id: 'usr_admin',
    name: 'Engr. Babatunde O.',
    email: 'admin@bitnoxsolution.com',
    role: 'Admin',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    title: 'Lead Systems Architect & Hub Admin',
    location: 'Bitnox Hub Abeokuta',
  },
  {
    id: 'usr_instructor',
    name: 'Folashade Adeleke',
    email: 'instructor@bitnoxsolution.com',
    role: 'Instructor',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    title: 'Software Engineering Cohort Lead',
    location: 'Training Hall 1, Oke-Ilewo',
  },
];

// Mock People / Cohort Members List
export let mockPeopleList = [
  {
    id: 'p_1',
    name: 'Tunde Adeleke',
    email: 'tunde.adeleke@bitnoxsolution.com',
    role: 'Student Fellow',
    cohort: 'Software Eng Cohort 4',
    location: 'Room B - Desk Pod 1',
    status: DETECTION_STATES.AWAKE,
    alertnessScore: 96,
    monitoredHours: 142,
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    joinDate: '2026-09-15',
    recentIncidents: [
      { id: 'h_1', time: '14:20 WAT', status: DETECTION_STATES.DROWSY, duration: '3.2s', notes: 'Slight eye droop during algorithmic section' },
    ],
  },
  {
    id: 'p_2',
    name: 'Kehinde Balogun',
    email: 'kehinde.b@bitnoxsolution.com',
    role: 'Student Fellow',
    cohort: 'AI & Data Science C2',
    location: 'Training Hall 1 - Station 4',
    status: DETECTION_STATES.DROWSY,
    alertnessScore: 84,
    monitoredHours: 118,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    joinDate: '2026-09-18',
    recentIncidents: [
      { id: 'h_2', time: '14:18 WAT', status: DETECTION_STATES.DROWSY, duration: '4.6s', notes: 'Yawning MAR > 0.68' },
    ],
  },
  {
    id: 'p_3',
    name: 'Samuel Ogundipe',
    email: 'samuel.o@bitnoxsolution.com',
    role: 'Student Fellow',
    cohort: 'Cybersecurity Cohort 3',
    location: 'Room B - Lab Pod 3',
    status: DETECTION_STATES.SLEEPING,
    alertnessScore: 72,
    monitoredHours: 95,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    joinDate: '2026-10-01',
    recentIncidents: [
      { id: 'h_4', time: '14:24 WAT', status: DETECTION_STATES.SLEEPING, duration: '8.4s', notes: 'Head droop -14° & eyes closed' },
    ],
  },
  {
    id: 'p_4',
    name: 'Zainab Bello',
    email: 'zainab.bello@bitnoxsolution.com',
    role: 'Student Fellow',
    cohort: 'Software Eng Cohort 4',
    location: 'Training Hall 1 - Front Desk',
    status: DETECTION_STATES.AWAKE,
    alertnessScore: 92,
    monitoredHours: 130,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    joinDate: '2026-09-15',
    recentIncidents: [],
  },
];

// System Settings Initial Configuration
export let mockSettingsData = {
  thresholds: {
    sleepDurationSeconds: 2.5, // How many seconds of sleeping before an alert
    earThreshold: 0.25,        // Eye Aspect Ratio cutoff
    marThreshold: 0.60,        // Mouth Opening Aspect Ratio for yawns
    headPitchThreshold: -12,   // Head tilt angle in degrees
  },
  notifications: {
    inApp: true,               // Toast & banner notifications in console
    email: true,               // Email dispatch on confirmed sleeping incident
    sound: true,               // Audio alert chime
    supervisorEmail: 'supervisor@bitnoxsolution.com',
    chimeVolume: 80,           // 0 to 100
    chimeTone: 'high-pitch',    // 'high-pitch' | 'subtle-chime' | 'pulse-beeps'
  },
  cameras: [
    {
      id: 'cam_01',
      name: 'Classroom Station A',
      location: 'Training Hall 1',
      type: 'Webcam',
      status: 'ONLINE',
      fps: 30,
      url: 'rtsp://hub.bitnox.internal:554/station_a',
    },
    {
      id: 'cam_02',
      name: 'Overhead Cam 2 - Room B',
      location: 'Room B - Lab Pod 3',
      type: 'IP Camera',
      status: 'ONLINE',
      fps: 24,
      url: 'rtsp://hub.bitnox.internal:554/overhead_2',
    },
    {
      id: 'cam_03',
      name: 'Training Room Broad View',
      location: 'Main Event Space',
      type: 'RTSP Stream',
      status: 'OFFLINE',
      fps: 0,
      url: 'rtsp://hub.bitnox.internal:554/event_space',
    },
  ],
  roles: [
    {
      role: 'Admin',
      description: 'Full administrative authority across Hub cameras, thresholds, and users.',
      canAcknowledge: true,
      canEditCameras: true,
      canExportReports: true,
      canModifySettings: true,
    },
    {
      role: 'Instructor',
      description: 'Supervises active cohort classrooms, monitors live stream, and acknowledges incidents.',
      canAcknowledge: true,
      canEditCameras: false,
      canExportReports: true,
      canModifySettings: false,
    },
    {
      role: 'Viewer',
      description: 'Read-only telemetry access to live dashboard and analytics.',
      canAcknowledge: false,
      canEditCameras: false,
      canExportReports: false,
      canModifySettings: false,
    },
  ],
  theme: 'dark', // 'dark' | 'light'
};

// Detailed Incidents List
export let mockIncidentsList = [
  {
    id: 'inc_101',
    timestamp: new Date(Date.now() - 1000 * 60 * 4).toISOString(),
    person: {
      name: 'Samuel Ogundipe',
      cohort: 'Cybersecurity Cohort 3',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
    },
    location: 'Room B - Lab Pod 3',
    status: DETECTION_STATES.SLEEPING,
    duration: 8.4,
    ear: 0.08,
    mar: 0.12,
    perclos: 72.4,
    snapshot: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
    acknowledged: false,
    dismissed: false,
    cameraName: 'Station B Overhead',
    notes: 'Immediate audio chime sounded. Student resumed upright posture.',
  },
  {
    id: 'inc_102',
    timestamp: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
    person: {
      name: 'Kehinde Balogun',
      cohort: 'AI & Data Science C2',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
    },
    location: 'Training Hall 1 - Station 4',
    status: DETECTION_STATES.DROWSY,
    duration: 4.6,
    ear: 0.19,
    mar: 0.68,
    perclos: 28.1,
    snapshot: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&auto=format&fit=crop&q=80',
    acknowledged: false,
    dismissed: false,
    cameraName: 'Classroom Station A',
    notes: 'Multiple consecutive yawns observed during lecture section.',
  },
  {
    id: 'inc_103',
    timestamp: new Date(Date.now() - 1000 * 60 * 35).toISOString(),
    person: {
      name: 'Chidi Okafor',
      cohort: 'Frontend Engineering C4',
      avatar: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=120&auto=format&fit=crop&q=80',
    },
    location: 'Room B - Desk Pod 4',
    status: DETECTION_STATES.DROWSY,
    duration: 3.2,
    ear: 0.21,
    mar: 0.54,
    perclos: 19.4,
    snapshot: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=600&auto=format&fit=crop&q=80',
    acknowledged: true,
    dismissed: false,
    cameraName: 'Desk Pod 4 WebCam',
    notes: 'Instructor Folashade checked in with student.',
  },
];

// Reports Data for Daily, Weekly, and Monthly
export const mockReportsData = {
  daily: {
    periodLabel: 'Today (08:00 - 18:00 WAT)',
    summary: { auditedHours: 142, averageScore: 88, drowsyCount: 18, sleepingCount: 4 },
    trend: [
      { time: '08:00', alertness: 96, benchmark: 85, incidents: 0 },
      { time: '10:00', alertness: 95, benchmark: 85, incidents: 1 },
      { time: '12:00', alertness: 88, benchmark: 85, incidents: 2 },
      { time: '14:00', alertness: 76, benchmark: 85, incidents: 7 },
      { time: '16:00', alertness: 87, benchmark: 85, incidents: 2 },
      { time: '18:00', alertness: 89, benchmark: 85, incidents: 0 },
    ],
    triggers: [
      { name: 'Slow Eye Blink Duration', percentage: 46 },
      { name: 'Frequent Yawning (MAR > 0.6)', percentage: 34 },
      { name: 'Head Pitch Droop (-10°)', percentage: 20 },
    ],
  },
  weekly: {
    periodLabel: 'This Week (Mon - Sat)',
    summary: { auditedHours: 850, averageScore: 90, drowsyCount: 64, sleepingCount: 11 },
    trend: [
      { time: 'Mon', alertness: 94, benchmark: 85, incidents: 8 },
      { time: 'Tue', alertness: 92, benchmark: 85, incidents: 12 },
      { time: 'Wed', alertness: 89, benchmark: 85, incidents: 18 },
      { time: 'Thu', alertness: 86, benchmark: 85, incidents: 22 },
      { time: 'Fri', alertness: 91, benchmark: 85, incidents: 10 },
      { time: 'Sat', alertness: 95, benchmark: 85, incidents: 5 },
    ],
    triggers: [
      { name: 'Slow Eye Blink Duration', percentage: 48 },
      { name: 'Frequent Yawning (MAR > 0.6)', percentage: 32 },
      { name: 'Head Pitch Droop (-10°)', percentage: 20 },
    ],
  },
  monthly: {
    periodLabel: 'This Month (October 2026)',
    summary: { auditedHours: 3420, averageScore: 91, drowsyCount: 215, sleepingCount: 38 },
    trend: [
      { time: 'Week 1', alertness: 93, benchmark: 85, incidents: 52 },
      { time: 'Week 2', alertness: 90, benchmark: 85, incidents: 68 },
      { time: 'Week 3', alertness: 88, benchmark: 85, incidents: 84 },
      { time: 'Week 4', alertness: 92, benchmark: 85, incidents: 49 },
    ],
    triggers: [
      { name: 'Slow Eye Blink Duration', percentage: 44 },
      { name: 'Frequent Yawning (MAR > 0.6)', percentage: 36 },
      { name: 'Head Pitch Droop (-10°)', percentage: 20 },
    ],
  },
};

const delay = (ms = 180) => new Promise((resolve) => setTimeout(resolve, ms));

export const mockApi = {
  // Settings API
  async getSettings() {
    await delay(150);
    return JSON.parse(JSON.stringify(mockSettingsData));
  },

  async saveSettings(updatedSettings) {
    await delay(200);
    mockSettingsData = {
      ...mockSettingsData,
      ...updatedSettings,
      thresholds: { ...mockSettingsData.thresholds, ...(updatedSettings.thresholds || {}) },
      notifications: { ...mockSettingsData.notifications, ...(updatedSettings.notifications || {}) },
    };
    return { success: true, settings: JSON.parse(JSON.stringify(mockSettingsData)) };
  },

  // People API Methods
  async getPeople() {
    await delay(150);
    return [...mockPeopleList];
  },

  async getPersonById(id) {
    await delay(120);
    const person = mockPeopleList.find((p) => p.id === id);
    if (!person) throw new Error(`Person with id ${id} not found`);
    return { ...person };
  },

  async addPerson(personData) {
    await delay(150);
    const newPerson = {
      id: `p_${Date.now()}`,
      name: personData.name || 'New Member',
      email: personData.email || 'member@bitnoxsolution.com',
      role: personData.role || 'Student Fellow',
      cohort: personData.cohort || 'Software Eng Cohort 4',
      location: personData.location || 'Room B - Desk Station',
      status: DETECTION_STATES.AWAKE,
      alertnessScore: 95,
      monitoredHours: 0,
      avatar: personData.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
      joinDate: new Date().toISOString().split('T')[0],
      recentIncidents: [],
    };
    mockPeopleList = [newPerson, ...mockPeopleList];
    return newPerson;
  },

  async updatePerson(id, updateData) {
    await delay(150);
    mockPeopleList = mockPeopleList.map((p) => (p.id === id ? { ...p, ...updateData } : p));
    return mockPeopleList.find((p) => p.id === id);
  },

  // Reports API Methods
  async getReports(view = 'daily') {
    await delay(180);
    return mockReportsData[view] || mockReportsData.daily;
  },

  // Alerts & Incidents
  async getIncidents(filters = {}) {
    await delay(150);
    return [...mockIncidentsList];
  },

  async acknowledgeAlert(alertId) {
    await delay(150);
    mockIncidentsList = mockIncidentsList.map((inc) =>
      inc.id === alertId ? { ...inc, acknowledged: true } : inc
    );
    return { success: true, alertId };
  },

  async dismissIncident(id, reason) {
    await delay(150);
    mockIncidentsList = mockIncidentsList.map((inc) =>
      inc.id === id ? { ...inc, dismissed: true, notes: reason } : inc
    );
    return { success: true, id };
  },

  async simulateNewAlert() {
    await delay(120);
    const newAlert = {
      id: `inc_live_${Date.now()}`,
      timestamp: new Date().toISOString(),
      person: {
        name: 'Samuel Ogundipe',
        cohort: 'Cybersecurity Cohort 3',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
      },
      location: 'Room B - Lab Pod 3',
      status: DETECTION_STATES.SLEEPING,
      duration: 3.6,
      ear: 0.08,
      mar: 0.11,
      perclos: 71.2,
      snapshot: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&auto=format&fit=crop&q=80',
      acknowledged: false,
      dismissed: false,
      cameraName: 'Station B Overhead Cam',
      notes: 'Real-time alert triggered via ML inference threshold.',
    };
    mockIncidentsList = [newAlert, ...mockIncidentsList];
    return newAlert;
  },

  // Prediction Stream
  async getPrediction(options = {}) {
    await delay(100);
    return {
      id: `pred_${Date.now()}`,
      status: DETECTION_STATES.AWAKE,
      confidence: 0.96,
      metrics: { ear: 0.32, mar: 0.12, blinkRate: 18, perclos: 4.2 },
      bbox: { x: 28, y: 19, width: 44, height: 58 },
      timestamp: new Date().toISOString(),
    };
  },

  // Auth Methods
  async login(email, password) {
    await delay(250);
    const normalizedEmail = (email || '').toLowerCase().trim();
    const matchedUser = mockUsers.find((u) => u.email.toLowerCase() === normalizedEmail);
    if (matchedUser) {
      return { user: matchedUser, token: `mock_jwt_token_${matchedUser.id}_${Date.now()}` };
    }
    return {
      user: {
        id: `usr_${Date.now()}`,
        name: normalizedEmail.split('@')[0] || 'Bitnox Member',
        email: normalizedEmail,
        role: normalizedEmail.includes('admin') ? 'Admin' : 'Instructor',
      },
      token: `mock_jwt_token_fallback_${Date.now()}`,
    };
  },

  async logout() {
    await delay(100);
    return { success: true };
  },

  async getDashboardMetrics() {
    await delay(150);
    return {
      peopleMonitored: mockPeopleList.length,
      awakeNow: mockPeopleList.filter((p) => p.status === 'AWAKE').length,
      drowsyNow: mockPeopleList.filter((p) => p.status === 'DROWSY').length,
      sleepingNow: mockPeopleList.filter((p) => p.status === 'SLEEPING').length,
      alertsToday: mockIncidentsList.length,
    };
  },

  async getAlertnessTrends() {
    await delay(150);
    return [
      { hour: '08:00', alertness: 96, benchmark: 85 },
      { hour: '10:00', alertness: 95, benchmark: 85 },
      { hour: '12:00', alertness: 88, benchmark: 85 },
      { hour: '14:00', alertness: 76, benchmark: 85 },
      { hour: '16:00', alertness: 87, benchmark: 85 },
      { hour: '18:00', alertness: 89, benchmark: 85 },
    ];
  },

  async getHourlyAlerts() {
    await delay(150);
    return [
      { hour: '09:00', drowsy: 0, sleeping: 0 },
      { hour: '11:00', drowsy: 1, sleeping: 0 },
      { hour: '13:00', drowsy: 3, sleeping: 1 },
      { hour: '14:00', drowsy: 5, sleeping: 2 },
      { hour: '16:00', drowsy: 2, sleeping: 0 },
    ];
  },

  async getNeedsAttention() {
    await delay(120);
    return mockPeopleList
      .filter((p) => p.status !== 'AWAKE')
      .map((p) => ({
        id: `attn_${p.id}`,
        name: p.name,
        avatar: p.avatar,
        cohort: p.cohort,
        location: p.location,
        status: p.status,
        duration: p.status === 'SLEEPING' ? '12.4s' : '5.2s',
        ear: p.status === 'SLEEPING' ? 0.09 : 0.18,
        incidentCount: 2,
        lastIncident: '4m ago',
        alertMessage: p.status === 'SLEEPING' ? 'Prolonged eye closure > 10s' : 'Repetitive yawning',
      }));
  },

  async getSessionSummary() {
    await delay(120);
    return {
      activeSessionDurationMinutes: 142,
      awakePercentage: 91.5,
      drowsyIncidents: 4,
      sleepingIncidents: 1,
      totalAuditedMinutes: 380,
      averageAlertnessScore: 89,
    };
  },

  async getAlertHistory() {
    await delay(150);
    return [...mockIncidentsList];
  },

  async getCameras() {
    await delay(100);
    return mockSettingsData.cameras;
  },

  async getNotifications() {
    await delay(100);
    return [
      {
        id: 'notif_01',
        title: 'Fatigue Spike in Lab Pod A',
        description: '3 drowsiness signals detected in the last 15 minutes.',
        time: '5m ago',
        unread: true,
        type: 'warning',
      },
      {
        id: 'notif_02',
        title: 'Camera Feed Restored',
        description: 'Classroom Station A reconnected at 30 FPS.',
        time: '24m ago',
        unread: false,
        type: 'info',
      },
    ];
  },
};
