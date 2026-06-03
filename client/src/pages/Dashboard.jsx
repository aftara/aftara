import { Eye, Hand, ImageText, LifeBuoy, Mic, ScanEye } from 'lucide-react';
import FeatureCard from '../components/FeatureCard';
import { useAuth } from '../contexts/AuthContext';

const features = [
  { icon: Mic, title: 'Speech Assistant', description: 'Speech-to-text, text-to-speech, language switching, and voice commands.', to: '/speech' },
  { icon: ImageText, title: 'OCR Reader', description: 'Extract text from images with Tesseract.js and read it aloud.', to: '/ocr' },
  { icon: Eye, title: 'Object Detection', description: 'Detect people, vehicles, furniture, and daily objects in real time.', to: '/vision' },
  { icon: Hand, title: 'Gesture Recognition', description: 'Convert common hand gestures such as Help, Yes, No, and Stop into speech.', to: '/gesture' },
  { icon: LifeBuoy, title: 'Emergency SOS', description: 'Trigger GPS emergency alerts with contacts and Google Maps links.', to: '/sos' },
  { icon: ScanEye, title: 'Scene Description', description: 'Generate natural language descriptions from detected surroundings.', to: '/vision' },
];

export default function Dashboard() {
  const { user } = useAuth();
  return (
    <main className="mx-auto max-w-7xl px-4 py-10">
      <section className="rounded-[2rem] bg-gradient-to-br from-pulse-500 to-pulse-950 p-8 text-white shadow-glow">
        <p className="text-lg font-bold">Welcome, {user?.name}</p>
        <h1 className="mt-3 text-5xl font-black">AI-powered accessibility dashboard</h1>
        <p className="mt-4 max-w-3xl text-xl text-blue-100">Large controls, keyboard navigation, dark mode, high contrast, and voice feedback are built into every tool.</p>
      </section>
      <section className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">{features.map((feature) => <FeatureCard key={feature.title} {...feature} />)}</section>
    </main>
  );
}
