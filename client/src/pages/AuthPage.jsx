import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import LoadingButton from '../components/LoadingButton';
import { useAuth } from '../contexts/AuthContext';

export default function AuthPage({ mode }) {
  const navigate = useNavigate();
  const { login, register } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', phone: '', disabilityType: 'visual' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const isRegister = mode === 'register';

  async function submit(event) {
    event.preventDefault();
    setLoading(true);
    setError('');
    try {
      await (isRegister ? register(form) : login({ email: form.email, password: form.password }));
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="mx-auto grid min-h-[80vh] max-w-6xl items-center gap-8 px-4 py-10 lg:grid-cols-2">
      <section>
        <p className="text-lg font-bold text-pulse-500">AI accessibility + emergency support</p>
        <h1 className="mt-3 text-5xl font-black leading-tight">OnePulse keeps assistance one action away.</h1>
        <p className="mt-5 text-xl text-slate-600 dark:text-slate-300">Use speech, OCR, object detection, gesture recognition, and GPS SOS tools from one accessible platform.</p>
      </section>
      <form onSubmit={submit} className="card space-y-4" aria-label={isRegister ? 'Register form' : 'Login form'}>
        <h2 className="text-3xl font-black">{isRegister ? 'Create account' : 'Login'}</h2>
        {error && <p className="rounded-xl bg-red-100 p-3 font-bold text-red-700">{error}</p>}
        {isRegister && <input className="input" placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />}
        <input className="input" type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <input className="input" type="password" placeholder="Password (minimum 8 characters)" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        {isRegister && <input className="input" placeholder="Phone" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />}
        {isRegister && <select className="input" value={form.disabilityType} onChange={(e) => setForm({ ...form, disabilityType: e.target.value })}><option value="visual">Visual impairment</option><option value="speech">Speech impairment</option><option value="mobility">Mobility support</option><option value="multiple">Multiple needs</option><option value="other">Other</option></select>}
        <LoadingButton loading={loading} className="btn-primary w-full">{isRegister ? 'Register' : 'Login'}</LoadingButton>
        <p>{isRegister ? 'Already registered?' : 'New user?'} <Link className="font-bold text-pulse-500" to={isRegister ? '/login' : '/register'}>{isRegister ? 'Login' : 'Create account'}</Link></p>
      </form>
    </main>
  );
}
