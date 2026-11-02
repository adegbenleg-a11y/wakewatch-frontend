# WakeWatch Backend API Contract & Specification

> **Product:** WakeWatch — AI Drowsiness and Alertness Detection System  
> **Client:** Front-End Web Application (React + Vite + Tailwind CSS)  
> **Organization:** Bitnox Technology Solutions Ltd., Abeokuta, Ogun State, Nigeria  
> **Audience:** Backend Engineer & ML Integration Team  

---

## 📌 1. Overview & Connection Architecture

The front-end client isolates **all** network calls to `src/api/client.js`.  
- **Production / Local Backend Mode:** Configured via `VITE_API_URL` (e.g. `http://localhost:8000/api`).
- **Mock Mode:** Enabled when `VITE_USE_MOCK=true` (front-end uses simulated data in `src/api/mock.js`).
- **Data Exchange Format:** `application/json` (UTF-8).
- **Authentication Standard:** Bearer JWT in the HTTP `Authorization` header.

```http
Authorization: Bearer <JWT_ACCESS_TOKEN>
Content-Type: application/json
Accept: application/json
```

---

## 🛡️ 2. Standard Error Response Format

All 4xx and 5xx responses must adhere to this standardized JSON error body:

```json
{
  "status": 400,
  "message": "Validation failed: Eye Aspect Ratio must be a positive float between 0.0 and 1.0",
  "error_code": "ERR_INVALID_THRESHOLD",
  "timestamp": "2026-11-01T15:30:00.000Z"
}
```

---

## 🔌 3. Endpoint Specifications

### 3.1. Authentication
#### `POST /auth/login`
Authenticates a Bitnox staff member (`Admin` or `Instructor`).

- **Request Body:**
```json
{
  "email": "admin@bitnoxsolution.com",
  "password": "super_secret_password"
}
```

- **Response (200 OK):**
```json
{
  "user": {
    "id": "usr_admin",
    "name": "Engr. Babatunde O.",
    "email": "admin@bitnoxsolution.com",
    "role": "Admin",
    "avatar": "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    "title": "Lead Systems Architect & Hub Admin",
    "location": "Bitnox Hub Abeokuta"
  },
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

- **Errors:**
  - `401 Unauthorized`: Invalid credentials.

---

### 3.2. Live Stream Prediction & Classification
#### `POST /detection/predict`
Invoked every 1 to 2 seconds by the live monitoring console to receive latest model inference.

- **Request Body:**
```json
{
  "sensitivity": 3,
  "camera_id": "cam_01",
  "frame_base64": "optional_data_url_or_jpeg_base64_string"
}
```

- **Response (200 OK):**
```json
{
  "id": "pred_1730472000000",
  "status": "AWAKE",
  "confidence": 0.96,
  "metrics": {
    "ear": 0.32,
    "mar": 0.12,
    "blinkRate": 18,
    "perclos": 4.2,
    "pitch": -2.1,
    "yaw": 1.4
  },
  "bbox": {
    "x": 28.4,
    "y": 18.2,
    "width": 44.0,
    "height": 58.0
  },
  "person": {
    "name": "Tunde Adeleke",
    "cohort": "Software Eng Cohort 4"
  },
  "station": "Classroom Station A",
  "timestamp": "2026-11-01T15:30:00.000Z"
}
```

> **Note on States:** `status` must be one of:  
> - `"AWAKE"` (Normal focus, EAR > 0.25)  
> - `"DROWSY"` (Microsleep warning, slow blink, MAR > 0.60)  
> - `"SLEEPING"` (Continuous eye closure > threshold duration)

---

### 3.3. Incidents & Alerts Log
#### `GET /alerts`
Fetches historical fatigue logs with optional query parameters.

- **Query Parameters:**
  - `status` *(optional)*: `AWAKE` | `DROWSY` | `SLEEPING` | `UNACKNOWLEDGED`
  - `date` *(optional)*: `TODAY` | `YESTERDAY` | `WEEK`
  - `search` *(optional)*: string query

- **Response (200 OK):**
```json
[
  {
    "id": "inc_101",
    "timestamp": "2026-11-01T14:24:00.000Z",
    "person": {
      "name": "Samuel Ogundipe",
      "cohort": "Cybersecurity Cohort 3",
      "avatar": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120"
    },
    "location": "Room B - Lab Pod 3",
    "status": "SLEEPING",
    "duration": 8.4,
    "ear": 0.08,
    "mar": 0.12,
    "perclos": 72.4,
    "snapshot": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600",
    "acknowledged": false,
    "dismissed": false,
    "cameraName": "Station B Overhead",
    "notes": "Immediate audio chime sounded. Student resumed upright posture."
  }
]
```

---

### 3.4. Acknowledge Alert
#### `POST /alerts/:id/ack`
Marks an incident as acknowledged by supervisor or instructor.

- **URL Parameter:** `id` (e.g. `inc_101`)
- **Response (200 OK):**
```json
{
  "success": true,
  "alertId": "inc_101",
  "acknowledged_at": "2026-11-01T15:32:00.000Z",
  "acknowledged_by": "usr_instructor"
}
```

---

### 3.5. Cohort Directory & People
#### `GET /people`
Returns all registered students, fellows, and engineers.

- **Response (200 OK):**
```json
[
  {
    "id": "p_1",
    "name": "Tunde Adeleke",
    "email": "tunde.adeleke@bitnoxsolution.com",
    "role": "Student Fellow",
    "cohort": "Software Eng Cohort 4",
    "location": "Room B - Desk Pod 1",
    "status": "AWAKE",
    "alertnessScore": 96,
    "monitoredHours": 142,
    "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
    "joinDate": "2026-09-15"
  }
]
```

#### `GET /people/:id`
Returns a specific person's profile, including their historical incidents.

- **Response (200 OK):**
```json
{
  "id": "p_1",
  "name": "Tunde Adeleke",
  "email": "tunde.adeleke@bitnoxsolution.com",
  "role": "Student Fellow",
  "cohort": "Software Eng Cohort 4",
  "location": "Room B - Desk Pod 1",
  "status": "AWAKE",
  "alertnessScore": 96,
  "monitoredHours": 142,
  "avatar": "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150",
  "joinDate": "2026-09-15",
  "recentIncidents": [
    {
      "id": "h_1",
      "time": "14:20 WAT",
      "status": "DROWSY",
      "duration": "3.2s",
      "notes": "Slight eye droop during algorithmic section"
    }
  ]
}
```

#### `POST /people`
Creates / registers a new person.

- **Request Body:**
```json
{
  "name": "Adewale Adeleke",
  "email": "adewale@bitnoxsolution.com",
  "role": "Student Fellow",
  "cohort": "Software Eng Cohort 4",
  "location": "Room B - Desk Pod 2",
  "avatar": "https://..."
}
```

---

### 3.6. Reports & Aggregations
#### `GET /reports?view=daily`
Returns aggregated alertness curves, benchmark targets, and fatigue trigger contributions.

- **Query Parameter:** `view` = `daily` | `weekly` | `monthly`
- **Response (200 OK):**
```json
{
  "periodLabel": "Today (08:00 - 18:00 WAT)",
  "summary": {
    "auditedHours": 142,
    "averageScore": 88,
    "drowsyCount": 18,
    "sleepingCount": 4
  },
  "trend": [
    { "time": "08:00", "alertness": 96, "benchmark": 85, "incidents": 0 },
    { "time": "14:00", "alertness": 76, "benchmark": 85, "incidents": 7 }
  ],
  "triggers": [
    { "name": "Slow Eye Blink Duration", "percentage": 46 },
    { "name": "Frequent Yawning (MAR > 0.6)", "percentage": 34 },
    { "name": "Head Pitch Droop (-10°)", "percentage": 20 }
  ]
}
```

---

### 3.7. Get System Settings
#### `GET /settings`
Fetches active ML trigger thresholds, dispatch channels, and camera inventories.

- **Response (200 OK):**
```json
{
  "thresholds": {
    "sleepDurationSeconds": 2.5,
    "earThreshold": 0.25,
    "marThreshold": 0.60,
    "headPitchThreshold": -12
  },
  "notifications": {
    "inApp": true,
    "email": true,
    "sound": true,
    "supervisorEmail": "supervisor@bitnoxsolution.com",
    "chimeVolume": 80,
    "chimeTone": "high-pitch"
  },
  "cameras": [
    {
      "id": "cam_01",
      "name": "Classroom Station A",
      "location": "Training Hall 1",
      "type": "Webcam",
      "status": "ONLINE",
      "fps": 30,
      "url": "rtsp://hub.bitnox.internal:554/station_a"
    }
  ],
  "roles": [
    {
      "role": "Admin",
      "canAcknowledge": true,
      "canEditCameras": true,
      "canExportReports": true,
      "canModifySettings": true
    }
  ],
  "theme": "dark"
}
```

---

### 3.8. Save System Settings
#### `POST /settings`
Updates global thresholds and notification parameters.

- **Request Body:**
```json
{
  "thresholds": {
    "sleepDurationSeconds": 3.0,
    "earThreshold": 0.26,
    "marThreshold": 0.65,
    "headPitchThreshold": -14
  },
  "notifications": {
    "inApp": true,
    "email": true,
    "sound": true,
    "supervisorEmail": "lead.mentor@bitnoxsolution.com",
    "chimeVolume": 90
  }
}
```

- **Response (200 OK):**
```json
{
  "success": true,
  "settings": { ... }
}
```

---

## ⚡ 4. Real-time Ingestion & WebSocket Option

For production high-throughput camera feeds, the backend teammate may expose a WebSocket stream at `ws://localhost:8000/ws/detection`:
- **Client Frame Push:** Client pushes JPEG ArrayBuffer or Base64 payload.
- **Server Broadcast:** Server pushes inference JSON matching the `POST /detection/predict` schema directly to connected frontend clients.
