import React, { useState, useEffect, useRef } from 'react';
import useWebcam from '../hooks/useWebcam';
import apiClient, { DETECTION_STATES } from '../api/client';
import CameraViewport from '../components/detection/CameraViewport';
import StatusDurationBanner from '../components/detection/StatusDurationBanner';
import DetectionLogPanel from '../components/detection/DetectionLogPanel';
import LiveControlsBar from '../components/detection/LiveControlsBar';
import audioAlert from '../utils/audioAlert';
import Badge from '../components/common/Badge';

export default function LiveMonitor() {
  // 1. Controls state
  const [isMonitoring, setIsMonitoring] = useState(true);
  const [sensitivity, setSensitivity] = useState(3);
  const [audioAlertEnabled, setAudioAlertEnabled] = useState(true);
  const [isSimulated, setIsSimulated] = useState(false);

  // 2. Detection & History state
  const [currentPrediction, setCurrentPrediction] = useState(null);
  const [detectionLogs, setDetectionLogs] = useState([]);

  // 3. State duration timer (tracks how many seconds current state has persisted)
  const [currentState, setCurrentState] = useState(DETECTION_STATES.AWAKE);
  const [stateDurationSeconds, setStateDurationSeconds] = useState(0);

  // 4. Webcam hook
  const {
    videoRef,
    stream,
    devices,
    activeDeviceId,
    setActiveDeviceId,
    isLoading: isCameraLoading,
    error: cameraError,
    startCamera,
    hasCamera,
  } = useWebcam({ enabled: isMonitoring && !isSimulated });

  // Auto-switch to simulated feed if camera fails or no devices found
  useEffect(() => {
    if (cameraError && !hasCamera) {
      setIsSimulated(true);
    }
  }, [cameraError, hasCamera]);

  // Timer: Increments every second while monitoring is active
  useEffect(() => {
    if (!isMonitoring) return;

    const timerInterval = setInterval(() => {
      setStateDurationSeconds((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(timerInterval);
  }, [isMonitoring]);

  // Polling Stream: Calls apiClient.getPrediction() every 1.5 seconds
  useEffect(() => {
    if (!isMonitoring) return;

    let isSubscribed = true;

    const pollInference = async () => {
      try {
        const pred = await apiClient.getPrediction({ sensitivity });
        if (!isSubscribed) return;

        setCurrentPrediction(pred);

        // Check if state changed -> reset timer and optionally play audio alert
        if (pred.status !== currentState) {
          setCurrentState(pred.status);
          setStateDurationSeconds(0);

          if (audioAlertEnabled) {
            if (pred.status === DETECTION_STATES.SLEEPING) {
              audioAlert.playAlarmChime();
            } else if (pred.status === DETECTION_STATES.DROWSY) {
              audioAlert.playWarningChime();
            }
          }
        }

        // Prepend to detections log (keep last 10, newest first)
        setDetectionLogs((prev) => [pred, ...prev.slice(0, 9)]);
      } catch (err) {
        console.error('Inference polling error:', err);
      }
    };

    // Run first immediately
    pollInference();

    // Setup interval for 1.5s
    const pollInterval = setInterval(pollInference, 1500);

    return () => {
      isSubscribed = false;
      clearInterval(pollInterval);
    };
  }, [isMonitoring, sensitivity, currentState, audioAlertEnabled]);

  return (
    <div className="space-y-6">
      {/* Page Title & Status Indicator */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Badge
              variant={isMonitoring ? 'awake' : 'neutral'}
              dot={isMonitoring}
              pulse={isMonitoring}
              size="sm"
            >
              {isMonitoring ? 'Telemetry Stream Active' : 'Monitoring Paused'}
            </Badge>
            <span className="text-xs font-mono text-slate-400">
              Station A • Bitnox Hub Abeokuta
            </span>
          </div>
          <h1 className="font-heading font-extrabold text-2xl sm:text-3xl text-white tracking-tight mt-1">
            Live Drowsiness & Alertness Monitor
          </h1>
        </div>

        <div className="flex items-center gap-2">
          {isSimulated && (
            <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/80 border border-bitnox-primary/40 text-bitnox-primary flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-bitnox-primary animate-pulse" />
              Simulated Feed Active
            </span>
          )}
        </div>
      </div>

      {/* Large StatusPill and State Duration Timer Banner */}
      <StatusDurationBanner
        status={currentState}
        durationSeconds={stateDurationSeconds}
        confidence={currentPrediction?.confidence}
      />

      {/* Main Monitoring Grid: Video Viewport (Left) + Last 10 Detections (Right) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Camera Panel with Bounding Box Overlay (8 cols) */}
        <div className="lg:col-span-8 space-y-4">
          <CameraViewport
            videoRef={videoRef}
            isMonitoring={isMonitoring}
            isLoading={isCameraLoading}
            error={cameraError}
            hasStream={!!stream}
            isSimulated={isSimulated}
            prediction={currentPrediction}
            onRetryCamera={startCamera}
            onToggleSimulated={() => setIsSimulated(true)}
          />
        </div>

        {/* Right Column: Last 10 Detections Panel (4 cols) */}
        <div className="lg:col-span-4">
          <DetectionLogPanel detections={detectionLogs} />
        </div>
      </div>

      {/* Controls Bar: Start/Stop, Camera selector, Sensitivity slider, Audio chime */}
      <LiveControlsBar
        isMonitoring={isMonitoring}
        onToggleMonitoring={() => setIsMonitoring(!isMonitoring)}
        devices={devices}
        activeDeviceId={activeDeviceId}
        onSelectDevice={setActiveDeviceId}
        sensitivity={sensitivity}
        onChangeSensitivity={setSensitivity}
        audioAlertEnabled={audioAlertEnabled}
        onToggleAudioAlert={() => setAudioAlertEnabled(!audioAlertEnabled)}
        isSimulated={isSimulated}
        onToggleSimulated={setIsSimulated}
      />
    </div>
  );
}
