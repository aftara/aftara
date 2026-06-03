import { useState } from 'react';
import { createWorker } from 'tesseract.js';
import { Download, Volume2 } from 'lucide-react';
import { speak } from '../utils/speech';

export default function OcrReader() {
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);

  async function extractText() {
    if (!image) return;
    setLoading(true);
    const worker = await createWorker('eng');
    const { data } = await worker.recognize(image);
    setText(data.text.trim());
    await worker.terminate();
    setLoading(false);
  }

  function downloadText() {
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = 'onepulse-ocr-text.txt';
    link.click();
    URL.revokeObjectURL(url);
  }

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="card space-y-6">
        <h1 className="text-4xl font-black">OCR Reader</h1>
        <input className="input" type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        <div className="flex flex-wrap gap-4"><button className="btn-primary" onClick={extractText} disabled={loading}>{loading ? 'Extracting...' : 'Extract text'}</button><button className="btn-secondary" onClick={() => speak(text)}><Volume2 /> Read aloud</button><button className="btn-secondary" onClick={downloadText}><Download /> Download</button></div>
        <textarea className="input min-h-72" value={text} onChange={(e) => setText(e.target.value)} placeholder="Extracted text appears here." />
      </div>
    </main>
  );
}
