export default function LoadingButton({ loading, children, className = 'btn-primary', ...props }) {
  return <button className={className} disabled={loading} {...props}>{loading ? 'Please wait...' : children}</button>;
}
