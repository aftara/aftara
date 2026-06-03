import { useState } from 'react';
import { api } from '../services/api';
import { useAuth } from '../contexts/AuthContext';

export default function Profile() {
  const { user, setUser } = useAuth();
  const [form, setForm] = useState(user);
  const [saved, setSaved] = useState(false);

  async function submit(event) {
    event.preventDefault();
    const { data } = await api.put('/auth/profile', form);
    setUser(data.user);
    setSaved(true);
  }

  return (
    <main className="mx-auto max-w-4xl px-4 py-10">
      <form onSubmit={submit} className="card space-y-5"><h1 className="text-4xl font-black">User Profile & Accessibility</h1>{saved && <p className="rounded-xl bg-green-100 p-3 font-bold text-green-700">Profile saved successfully.</p>}<input className="input" value={form.name || ''} onChange={(e) => setForm({ ...form, name: e.target.value })} /><input className="input" value={form.phone || ''} onChange={(e) => setForm({ ...form, phone: e.target.value })} /><select className="input" value={form.disabilityType || 'other'} onChange={(e) => setForm({ ...form, disabilityType: e.target.value })}><option value="visual">Visual</option><option value="speech">Speech</option><option value="mobility">Mobility</option><option value="hearing">Hearing</option><option value="multiple">Multiple</option><option value="other">Other</option></select><label className="flex gap-3 text-xl"><input type="checkbox" checked={form.accessibility?.voiceNavigation || false} onChange={(e) => setForm({ ...form, accessibility: { ...form.accessibility, voiceNavigation: e.target.checked } })} /> Voice navigation</label><label className="flex gap-3 text-xl"><input type="checkbox" checked={form.accessibility?.highContrast || false} onChange={(e) => setForm({ ...form, accessibility: { ...form.accessibility, highContrast: e.target.checked } })} /> High contrast preferred</label><button className="btn-primary">Save profile</button></form>
    </main>
  );
}
