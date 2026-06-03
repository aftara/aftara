import { Link } from 'react-router-dom';

export default function FeatureCard({ icon: Icon, title, description, to }) {
  return (
    <Link to={to} className="card group block transition hover:-translate-y-1 hover:border-pulse-500">
      <Icon className="mb-4 h-10 w-10 text-pulse-500" />
      <h3 className="text-2xl font-black">{title}</h3>
      <p className="mt-3 text-slate-600 dark:text-slate-300">{description}</p>
      <span className="mt-5 inline-block font-bold text-pulse-500 group-hover:underline">Open tool →</span>
    </Link>
  );
}
