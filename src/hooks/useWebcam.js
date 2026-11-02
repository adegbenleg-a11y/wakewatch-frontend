import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook to manage browser webcam access via getUserMedia
 */
export function useWebcam(options = {}) {
  const { enabled = true } = options;

  const [stream, setStream] = useState(null);
  const [devices, setDevices] = useState([]);
  const [activeDeviceId, setActiveDeviceId] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [permissionState, setPermissionState] = useState('prompt'); // 'prompt' | 'granted' | 'denied'
  const videoRef = useRef(null);

  // Enumerate connected cameras
  const loadDevices = useCallback(async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.enumerateDevices) {
      setError('Media devices API not supported by your browser.');
      return;
    }

    try {
      const allDevices = await navigator.mediaDevices.enumerateDevices();
      const videoInputs = allDevices.filter((d) => d.kind === 'videoinput');

      const formatted = videoInputs.map((d, index) => ({
        deviceId: d.deviceId,
        label: d.label || `Camera ${index + 1} (${d.deviceId ? d.deviceId.slice(0, 6) : 'Default'})`,
      }));

      setDevices(formatted);
      if (formatted.length > 0 && !activeDeviceId) {
        setActiveDeviceId(formatted[0].deviceId);
      }
    } catch (err) {
      console.warn('Could not enumerate devices:', err);
    }
  }, [activeDeviceId]);

  // Start webcam stream
  const startCamera = useCallback(async () => {
    if (!enabled) return;

    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      setError('Webcam access (getUserMedia) is not supported in this browser.');
      setPermissionState('denied');
      return;
    }

    setIsLoading(true);
    setError(null);

    // Stop any existing stream
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
    }

    try {
      const constraints = {
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
          ...(activeDeviceId ? { deviceId: { exact: activeDeviceId } } : {}),
        },
        audio: false,
      };

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      setPermissionState('granted');
      setError(null);

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }

      // Re-enumerate to get device labels now that permission is granted
      await loadDevices();
    } catch (err) {
      console.error('getUserMedia error:', err);
      if (err.name === 'NotAllowedError' || err.name === 'PermissionDeniedError') {
        setError('Camera permission was denied. Please allow camera access in your browser address bar.');
        setPermissionState('denied');
      } else if (err.name === 'NotFoundError' || err.name === 'DevicesNotFoundError') {
        setError('No video camera was detected on this workstation.');
        setPermissionState('denied');
      } else if (err.name === 'NotReadableError' || err.name === 'TrackStartError') {
        setError('Camera is currently in use by another application or video call.');
      } else {
        setError(err.message || 'Unable to access camera feed.');
      }
      setStream(null);
    } finally {
      setIsLoading(false);
    }
  }, [enabled, activeDeviceId, loadDevices]);

  // Stop camera tracks
  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
    }
    if (videoRef.current) {
      videoRef.current.srcObject = null;
    }
  }, [stream]);

  // Attach stream to video element whenever videoRef or stream updates
  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  // Initial startup and device enumeration
  useEffect(() => {
    loadDevices();
  }, [loadDevices]);

  useEffect(() => {
    if (enabled) {
      startCamera();
    } else {
      stopCamera();
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, [enabled, activeDeviceId]);

  return {
    videoRef,
    stream,
    devices,
    activeDeviceId,
    setActiveDeviceId,
    isLoading,
    error,
    permissionState,
    startCamera,
    stopCamera,
    hasCamera: devices.length > 0 || !!stream,
  };
}

export default useWebcam;
