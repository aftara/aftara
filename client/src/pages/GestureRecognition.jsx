import { useEffect, useState } from 'react';
import { Hands } from '@mediapipe/hands';
import { Hand } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { speak } from '../utils/speech';

const gestures = ['Hello', 'Help', 'Yes', 'No', 'Stop'];

export default function GestureRecognition() {
  const [enabled, setEnabled] = useState(false);
  const [gesture, setGesture] = useState('Waiting for gesture');
  const { videoRef, error } = useCamera(enabled);

  useEffect(() => {
    if (!enabled) return;
    const hands = new Hands({ locateFile: (file) => `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}` });
    hands.setOptions({ maxNumHands: 1, modelComplexity: 1, minDetectionConfidence: 0.7, minTrackingConfidence: 0.7 });
    hands.onResults((results) => {
      if (!results.multiHandLandmarks?.length) return setGesture('No hand detected');
      const landmarks = results.multiHandLandmarks[0];
      // Lightweight rule-based mapping for demo gestures; replace with a trained classifier for research extensions.
      const openPalm = landmarks[8].y < landmarks[6].y && landmarks[12].y < landmarks[10].y;
      const thumbUp = landmarks[4].y < landmarks[3].y && landmarks[8].y > landmarks[6].y;
      const inferred = openPalm ? 'Hello' : thumbUp ? 'Yes' : 'Help';
      setGesture(inferred);
    });
    const interval = setInterval(() => videoRef.current && hands.send({ image: videoRef.current }), 500);
    return () => clearInterval(interval);
  }, [enabled, videoRef]);

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-2">
        <section className="card space-y-5"><h1 className="text-4xl font-black">Gesture Recognition</h1><button className="btn-primary" onClick={() => setEnabled(!enabled)}><Hand /> {enabled ? 'Stop recognition' : 'Start recognition'}</button>{error && <p className="font-bold text-red-600">{error}</p>}<video ref={videoRef} autoPlay playsInline muted className="aspect-video w-full rounded-3xl bg-black object-cover" /></section>
        <aside className="card space-y-5"><h2 className="text-3xl font-black">Recognized Gesture</h2><p className="rounded-3xl bg-pulse-500 p-8 text-center text-5xl font-black text-white">{gesture}</p><button className="btn-secondary" onClick={() => speak(gesture)}>Speak gesture</button><div className="grid grid-cols-2 gap-3">{gestures.map((item) => <button key={item} className="btn-secondary" onClick={() => { setGesture(item); speak(item); }}>{item}</button>)}</div></aside>
      </div>
    </main>
  );
}
