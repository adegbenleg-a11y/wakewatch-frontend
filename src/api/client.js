/**
 * WakeWatch API Client
 *
 * NOTE: ALL back-end network calls for the front-end reside exclusively in this file.
 * Driven by environment variables:
 * - VITE_API_URL: Base URL for the teammate's backend server (e.g. http://localhost:8000/api).
 * - VITE_USE_MOCK: Set to "true" to serve mock data during development.
 *
 * See API_CONTRACT.md for the complete schema specification for backend teammates.
 */

import { mockApi, mockUsers, DETECTION_STATES } from './mock';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';
const USE_MOCK = import.meta.env.VITE_USE_MOCK !== 'false'; // Defaults to true if unspecified

/**
 * Universal HTTP request helper for real backend calls
 * Automatically injects Bearer JWT from localStorage and enforces JSON headers.
 */
async function request(endpoint, options = {}) {
  const url = `${API_URL.replace(/\/$/, '')}/${endpoint.replace(/^\//, '')}`;
  const token = localStorage.getItem('wakewatch_token');
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    ...(options.headers || {}),
  };

  try {
    const response = await fetch(url, { ...options, headers });
    if (!response.ok) {
      const errorBody = await response.json().catch(() => ({}));
      throw new Error(
        errorBody.message || `API Error: ${response.status} ${response.statusText}`
      );
    }
    return await response.json();
  } catch (error) {
    console.error(`[WakeWatch API Error] ${endpoint}:`, error);
    throw error;
  }
}

/**
 * WakeWatch Unified API Client
 */
export const apiClient = {
  /**
   * Check if the frontend is currently running with simulated mock data.
   * @returns {boolean}
   */
  isMockMode: () => USE_MOCK,

  /**
   * 1. User Authentication
   * Authenticates a Bitnox personnel account (Admin or Instructor) and returns user profile + JWT.
   *
   * @param {string} email
   * @param {string} password
   * @returns {Promise<{ user: Object, token: string }>}
   *
   * @example
   * Request Body:
   * { "email": "admin@bitnoxsolution.com", "password": "secure_password" }
   *
   * Response JSON:
   * {
   *   "user": {
   *     "id": "usr_admin",
   *     "name": "Engr. Babatunde O.",
   *     "email": "admin@bitnoxsolution.com",
   *     "role": "Admin",
   *     "avatar": "https://..."
   *   },
   *   "token": "eyJhbGciOiJIUzI1NiIsIn..."
   * }
   */
  login: async (email, password) => {
    if (USE_MOCK) return mockApi.login(email, password);
    return request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  },

  /**
   * User Sign-Out
   * Invalidates active session token on backend.
   * @returns {Promise<{ success: boolean }>}
   */
  logout: async () => {
    if (USE_MOCK) return mockApi.logout();
    return request('/auth/logout', { method: 'POST' });
  },

  /**
   * 2. Live Stream Prediction & Classification
   * Polls or pushes live video frame/inference options to the ML model.
   *
   * @param {Object} options - { sensitivity?: number, frame?: string }
   * @returns {Promise<{ id: string, status: 'AWAKE'|'DROWSY'|'SLEEPING', confidence: number, metrics: Object, bbox: Object, timestamp: string }>}
   *
   * @example
   * Request Body:
   * { "sensitivity": 3, "camera_id": "cam_01" }
   *
   * Response JSON:
   * {
   *   "id": "pred_173000000",
   *   "status": "AWAKE",
   *   "confidence": 0.96,
   *   "metrics": {
   *     "ear": 0.32,
   *     "mar": 0.12,
   *     "blinkRate": 18,
   *     "perclos": 4.2,
   *     "pitch": -2.1,
   *     "yaw": 1.4
   *   },
   *   "bbox": { "x": 28, "y": 19, "width": 44, "height": 58 },
   *   "timestamp": "2026-11-01T15:30:00.000Z"
   * }
   */
  getPrediction: async (options = {}) => {
    if (USE_MOCK) return mockApi.getPrediction(options);
    return request('/detection/predict', {
      method: 'POST',
      body: JSON.stringify(options),
    });
  },

  /**
   * 3. Incidents & Alerts Log
   * Fetches historical incident records with optional status or date filters.
   *
   * @param {Object} filters - { status?: string, date?: string, search?: string }
   * @returns {Promise<Array<Object>>}
   *
   * @example
   * Response JSON:
   * [
   *   {
   *     "id": "inc_101",
   *     "timestamp": "2026-11-01T14:24:00.000Z",
   *     "person": {
   *       "name": "Samuel Ogundipe",
   *       "cohort": "Cybersecurity Cohort 3",
   *       "avatar": "https://..."
   *     },
   *     "location": "Room B - Lab Pod 3",
   *     "status": "SLEEPING",
   *     "duration": 8.4,
   *     "ear": 0.08,
   *     "mar": 0.12,
   *     "perclos": 72.4,
   *     "snapshot": "https://...",
   *     "acknowledged": false,
   *     "dismissed": false,
   *     "cameraName": "Station B Overhead",
   *     "notes": "Immediate audio chime sounded."
   *   }
   * ]
   */
  getAlerts: async (filters = {}) => {
    if (USE_MOCK) return mockApi.getIncidents(filters);
    const query = new URLSearchParams(filters).toString();
    return request(`/alerts${query ? `?${query}` : ''}`);
  },

  // Alias for backward compatibility
  getIncidents: async (filters = {}) => {
    return apiClient.getAlerts(filters);
  },

  /**
   * 4. Acknowledge Alert
   * Marks a flagged drowsiness or sleeping incident as acknowledged by instructor.
   *
   * @param {string} alertId
   * @returns {Promise<{ success: boolean, alertId: string }>}
   *
   * @example
   * Request: POST /api/alerts/inc_101/ack
   * Response JSON:
   * { "success": true, "alertId": "inc_101" }
   */
  acknowledgeAlert: async (alertId) => {
    if (USE_MOCK) return mockApi.acknowledgeAlert(alertId);
    return request(`/alerts/${alertId}/ack`, { method: 'POST' });
  },

  acknowledgeIncident: async (incidentId) => {
    return apiClient.acknowledgeAlert(incidentId);
  },

  /**
   * Dismiss an incident as a false positive
   * @param {string} incidentId
   * @param {string} reason
   * @returns {Promise<{ success: boolean, id: string }>}
   */
  dismissIncident: async (incidentId, reason) => {
    if (USE_MOCK) return mockApi.dismissIncident(incidentId, reason);
    return request(`/incidents/${incidentId}/dismiss`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  },

  /**
   * Simulate a live incoming alert (for test triggers)
   */
  simulateNewAlert: async () => {
    if (USE_MOCK) return mockApi.simulateNewAlert();
    return request('/incidents/simulate', { method: 'POST' });
  },

  /**
   * 5. Cohort Members / People Directory
   * Fetches all registered students, engineers, and fellows in the Hub.
   *
   * @returns {Promise<Array<Object>>}
   *
   * @example
   * Response JSON:
   * [
   *   {
   *     "id": "p_1",
   *     "name": "Tunde Adeleke",
   *     "email": "tunde.adeleke@bitnoxsolution.com",
   *     "role": "Student Fellow",
   *     "cohort": "Software Eng Cohort 4",
   *     "location": "Room B - Desk Pod 1",
   *     "status": "AWAKE",
   *     "alertnessScore": 96,
   *     "monitoredHours": 142,
   *     "avatar": "https://...",
   *     "joinDate": "2026-09-15"
   *   }
   * ]
   */
  getPeople: async () => {
    if (USE_MOCK) return mockApi.getPeople();
    return request('/people');
  },

  getPersonById: async (id) => {
    if (USE_MOCK) return mockApi.getPersonById(id);
    return request(`/people/${id}`);
  },

  addPerson: async (personData) => {
    if (USE_MOCK) return mockApi.addPerson(personData);
    return request('/people', {
      method: 'POST',
      body: JSON.stringify(personData),
    });
  },

  updatePerson: async (id, personData) => {
    if (USE_MOCK) return mockApi.updatePerson(id, personData);
    return request(`/people/${id}`, {
      method: 'PUT',
      body: JSON.stringify(personData),
    });
  },

  /**
   * 6. Alertness Reports & Trends
   * Aggregates focus curves, incident densities, and trigger breakdowns across a timeframe.
   *
   * @param {'daily' | 'weekly' | 'monthly'} view
   * @returns {Promise<Object>}
   *
   * @example
   * Response JSON:
   * {
   *   "periodLabel": "Today (08:00 - 18:00 WAT)",
   *   "summary": {
   *     "auditedHours": 142,
   *     "averageScore": 88,
   *     "drowsyCount": 18,
   *     "sleepingCount": 4
   *   },
   *   "trend": [
   *     { "time": "08:00", "alertness": 96, "benchmark": 85, "incidents": 0 },
   *     { "time": "14:00", "alertness": 76, "benchmark": 85, "incidents": 7 }
   *   ],
   *   "triggers": [
   *     { "name": "Slow Eye Blink Duration", "percentage": 46 },
   *     { "name": "Frequent Yawning (MAR > 0.6)", "percentage": 34 }
   *   ]
   * }
   */
  getReports: async (view = 'daily') => {
    if (USE_MOCK) return mockApi.getReports(view);
    return request(`/reports?view=${view}`);
  },

  /**
   * 7. Get System Settings & Thresholds
   * Retrieves active sensitivity cutoffs, notification preferences, cameras, and user roles.
   *
   * @returns {Promise<Object>}
   *
   * @example
   * Response JSON:
   * {
   *   "thresholds": {
   *     "sleepDurationSeconds": 2.5,
   *     "earThreshold": 0.25,
   *     "marThreshold": 0.60,
   *     "headPitchThreshold": -12
   *   },
   *   "notifications": {
   *     "inApp": true,
   *     "email": true,
   *     "sound": true,
   *     "supervisorEmail": "supervisor@bitnoxsolution.com",
   *     "chimeVolume": 80,
   *     "chimeTone": "high-pitch"
   *   },
   *   "cameras": [ ... ],
   *   "roles": [ ... ],
   *   "theme": "dark"
   * }
   */
  getSettings: async () => {
    if (USE_MOCK) return mockApi.getSettings();
    return request('/settings');
  },

  /**
   * 8. Save System Settings
   * Updates global detection thresholds and dispatch channels.
   *
   * @param {Object} settingsData
   * @returns {Promise<{ success: boolean, settings: Object }>}
   *
   * @example
   * Request Body:
   * {
   *   "thresholds": { "sleepDurationSeconds": 3.0, "earThreshold": 0.26 },
   *   "notifications": { "sound": true, "chimeVolume": 85 }
   * }
   *
   * Response JSON:
   * {
   *   "success": true,
   *   "settings": { ... }
   * }
   */
  saveSettings: async (settingsData) => {
    if (USE_MOCK) return mockApi.saveSettings(settingsData);
    return request('/settings', {
      method: 'POST',
      body: JSON.stringify(settingsData),
    });
  },

  // Auxiliary Dashboard Helpers
  getDashboardMetrics: async () => {
    if (USE_MOCK) return mockApi.getDashboardMetrics();
    return request('/dashboard/metrics');
  },

  getAlertnessTrends: async () => {
    if (USE_MOCK) return mockApi.getAlertnessTrends();
    return request('/dashboard/alertness-trends');
  },

  getHourlyAlerts: async () => {
    if (USE_MOCK) return mockApi.getHourlyAlerts();
    return request('/dashboard/hourly-alerts');
  },

  getNeedsAttention: async () => {
    if (USE_MOCK) return mockApi.getNeedsAttention();
    return request('/dashboard/needs-attention');
  },

  getCameras: async () => {
    if (USE_MOCK) return mockApi.getCameras();
    return request('/cameras');
  },

  getNotifications: async () => {
    if (USE_MOCK) return mockApi.getNotifications();
    return request('/notifications');
  },

  sendFrame: async (base64Image) => {
    if (USE_MOCK) return mockApi.getPrediction();
    return request('/detection/classify', {
      method: 'POST',
      body: JSON.stringify({ frame: base64Image }),
    });
  },
};

export { DETECTION_STATES, mockUsers };
export default apiClient;
