import { Link, NavLink } from 'react-router-dom';
import { HeartPulse, LogOut, Moon, Sun } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const links = [
  ['/', 'Dashboard'], ['/speech', 'Speech'], ['/ocr', 'OCR'], ['/vision', 'Vision'], ['/gesture', 'Gestures'], ['/sos', 'SOS'], ['/profile', 'Profile'],
];

export default function Navbar({ dark, setDark, highContrast, setHighContrast }) {
  const { user, logout } = useAuth();
  return (
    <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/80 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center gap-4 px-4 py-4">
        <Link to="/" className="flex items-center gap-2 text-2xl font-black text-pulse-500" aria-label="OnePulse home">
          <HeartPulse /> OnePulse
        </Link>
        {user && <div className="flex flex-1 flex-wrap gap-2">{links.map(([to, label]) => <NavLink key={to} to={to} className={({ isActive }) => `rounded-xl px-3 py-2 font-semibold ${isActive ? 'bg-pulse-500 text-white' : 'hover:bg-slate-100 dark:hover:bg-slate-800'}`}>{label}</NavLink>)}</div>}
        <button className="btn-secondary !px-4 !py-2" onClick={() => setDark(!dark)} aria-label="Toggle dark mode">{dark ? <Sun /> : <Moon />}</button>
        <button className="btn-secondary !px-4 !py-2" onClick={() => setHighContrast(!highContrast)}>Contrast</button>
        {user && <button className="btn-secondary !px-4 !py-2" onClick={logout}><LogOut size={18} /> Logout</button>}
      </nav>
    </header>
  );
}
