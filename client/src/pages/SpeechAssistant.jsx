import { useEffect, useRef, useState } from 'react';
import { Mic, Volume2 } from 'lucide-react';
import { createRecognizer, speak } from '../utils/speech';

const languages = ['en-US', 'hi-IN', 'ta-IN', 'te-IN', 'kn-IN', 'ml-IN'];

export default function SpeechAssistant() {
  const [language, setLanguage] = useState('en-US');
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [text, setText] = useState('Welcome to OnePulse. How can I help you?');
  const recognizerRef = useRef(null);

  useEffect(() => () => recognizerRef.current?.stop(), []);

  function toggleListening() {
    if (listening) {
      recognizerRef.current?.stop();
      setListening(false);
      return;
    }
    const recognizer = createRecognizer(language);
    if (!recognizer) return setTranscript('Speech Recognition API is not supported in this browser.');
    recognizer.onresult = (event) => {
      const result = Array.from(event.results).map((item) => item[0].transcript).join(' ');
      setTranscript(result);
      if (/open sos|help me|emergency/i.test(result)) window.location.href = '/sos';
    };
    recognizer.start();
    recognizerRef.current = recognizer;
    setListening(true);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="card space-y-6">
        <h1 className="text-4xl font-black">Speech Assistant</h1>
        <select className="input max-w-xs" value={language} onChange={(e) => setLanguage(e.target.value)}>{languages.map((lang) => <option key={lang}>{lang}</option>)}</select>
        <div className="flex flex-wrap gap-4"><button className="btn-primary" onClick={toggleListening}><Mic /> {listening ? 'Stop listening' : 'Start speech-to-text'}</button><button className="btn-secondary" onClick={() => speak(text, language)}><Volume2 /> Read typed text</button></div>
        <textarea className="input min-h-36" value={text} onChange={(e) => setText(e.target.value)} />
        <section className="rounded-2xl bg-slate-100 p-5 dark:bg-slate-800"><h2 className="text-2xl font-bold">Transcript</h2><p className="mt-3 text-xl">{transcript || 'Your spoken words will appear here.'}</p></section>
      </div>
    </main>
  );
}
