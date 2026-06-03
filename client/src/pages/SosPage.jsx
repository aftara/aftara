import { useEffect, useState } from 'react';
import { LifeBuoy, MapPin, Plus, Trash2 } from 'lucide-react';
import { api } from '../services/api';
import { speak } from '../utils/speech';

export default function SosPage() {
  const [contacts, setContacts] = useState([]);
  const [form, setForm] = useState({ name: '', relationship: '', phone: '', email: '' });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  async function loadContacts() {
    const { data } = await api.get('/contacts');
    setContacts(data.contacts);
  }

  useEffect(() => { loadContacts(); }, []);

  async function addContact(event) {
    event.preventDefault();
    await api.post('/contacts', form);
    setForm({ name: '', relationship: '', phone: '', email: '' });
    loadContacts();
  }

  async function deleteContact(id) {
    await api.delete(`/contacts/${id}`);
    loadContacts();
  }

  // Geolocation is requested only at SOS time so users stay in control of privacy-sensitive data.
  async function triggerSos() {
    setLoading(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude, accuracy } = position.coords;
      const { data } = await api.post('/sos', { latitude, longitude, accuracy, message });
      speak('Emergency SOS alert generated. Share the displayed message with emergency contacts.');
      window.alert(data.message);
      setLoading(false);
    }, () => {
      speak('Location permission is required to send SOS.');
      setLoading(false);
    });
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-10">
      <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr]">
        <section className="card space-y-5"><h1 className="text-4xl font-black text-rescue">Emergency SOS</h1><textarea className="input min-h-32" placeholder="Optional emergency message" value={message} onChange={(e) => setMessage(e.target.value)} /><button className="flex w-full items-center justify-center gap-3 rounded-3xl bg-rescue px-8 py-8 text-3xl font-black text-white shadow-2xl" onClick={triggerSos} disabled={loading}><LifeBuoy /> {loading ? 'Locating...' : 'SEND SOS'}</button><p className="flex gap-2 text-lg text-slate-600 dark:text-slate-300"><MapPin /> SOS creates a Google Maps location link and stores SOS history in MongoDB.</p></section>
        <section className="card space-y-5"><h2 className="text-3xl font-black">Emergency Contacts</h2><form onSubmit={addContact} className="grid gap-3 md:grid-cols-2"><input className="input" placeholder="Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required /><input className="input" placeholder="Relationship" value={form.relationship} onChange={(e) => setForm({ ...form, relationship: e.target.value })} /><input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /><input className="input" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /><button className="btn-primary md:col-span-2"><Plus /> Add contact</button></form><ul className="space-y-3">{contacts.map((contact) => <li key={contact._id} className="flex items-center justify-between rounded-2xl bg-slate-100 p-4 dark:bg-slate-800"><span><b>{contact.name}</b><br />{contact.phone}</span><button className="btn-secondary !p-3" onClick={() => deleteContact(contact._id)}><Trash2 /></button></li>)}</ul></section>
      </div>
    </main>
  );
}
