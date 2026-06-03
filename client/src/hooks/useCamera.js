import { useEffect, useRef, useState } from 'react';

export function useCamera(enabled = false) {
  const videoRef = useRef(null);
  const [error, setError] = useState('');

  useEffect(() => {
    let stream;
    async function startCamera() {
      if (!enabled) return;
      try {
        stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' }, audio: false });
        if (videoRef.current) videoRef.current.srcObject = stream;
      } catch {
        setError('Camera permission is required for this feature.');
      }
    }
    startCamera();
    return () => stream?.getTracks().forEach((track) => track.stop());
  }, [enabled]);

  return { videoRef, error };
}
