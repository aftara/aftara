import { useEffect, useRef, useState } from 'react';
import * as cocoSsd from '@tensorflow-models/coco-ssd';
import '@tensorflow/tfjs';
import { Camera, ScanEye, Volume2 } from 'lucide-react';
import { useCamera } from '../hooks/useCamera';
import { speak } from '../utils/speech';

export default function VisionAssistant() {
  const [enabled, setEnabled] = useState(false);
  const [model, setModel] = useState(null);
  const [detections, setDetections] = useState([]);
  const [description, setDescription] = useState('');
  const { videoRef, error } = useCamera(enabled);
  const intervalRef = useRef(null);

  useEffect(() => {
    cocoSsd.load().then(setModel);
    return () => clearInterval(intervalRef.current);
  }, []);

  useEffect(() => {
    clearInterval(intervalRef.current);
    if (!enabled || !model) return;
    intervalRef.current = setInterval(async () => {
      if (videoRef.current?.readyState === 4) {
        const results = await model.detect(videoRef.current);
        setDetections(results.filter((item) => item.score > 0.55));
      }
    }, 1500);
  }, [enabled, model, videoRef]);

  // Browser-side AI keeps camera frames local while creating assistive narration.
  function describeScene() {
    const names = detections.map((item) => item.class);
    const unique = [...new Set(names)];
    const sentence = unique.length ? `I can see ${unique.join(', ')}. There are ${detections.length} visible objects around you.` : 'No clear objects detected yet. Please slowly move the camera.';
    setDescription(sentence);
    speak(sentence);
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <section className="card space-y-5"><h1 className="text-4xl font-black">Object Detection & Scene Description</h1><button className="btn-primary" onClick={() => setEnabled(!enabled)}><Camera /> {enabled ? 'Stop camera' : 'Start camera'}</button>{error && <p className="font-bold text-red-600">{error}</p>}<video ref={videoRef} autoPlay playsInline muted className="aspect-video w-full rounded-3xl bg-black object-cover" /></section>
        <aside className="card space-y-5"><h2 className="text-3xl font-black">Detected Objects</h2><ul className="space-y-2">{detections.map((item, index) => <li key={`${item.class}-${index}`} className="rounded-xl bg-slate-100 p-3 font-bold dark:bg-slate-800">{item.class} – {(item.score * 100).toFixed(0)}%</li>)}</ul><button className="btn-secondary" onClick={() => speak(detections.map((d) => d.class).join(', '))}><Volume2 /> Speak objects</button><button className="btn-primary" onClick={describeScene}><ScanEye /> Generate scene</button><p className="text-xl">{description}</p></aside>
      </div>
    </main>
  );
}
