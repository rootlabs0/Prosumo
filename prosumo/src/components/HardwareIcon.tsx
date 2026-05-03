type IconKind = 'gateway' | 'sensor' | 'control'

export default function HardwareIcon({ kind }: { kind: IconKind }) {
  if (kind === 'gateway') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
        <rect x="3" y="6" width="18" height="12" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="7" cy="12" r="1" fill="currentColor" />
        <circle cx="11" cy="12" r="1" fill="currentColor" />
        <line x1="15" y1="10" x2="19" y2="10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="15" y1="14" x2="19" y2="14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="6" y1="3" x2="6" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="18" y1="3" x2="18" y2="6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  if (kind === 'sensor') {
    return (
      <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
        <circle cx="12" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <circle cx="12" cy="12" r="3" fill="none" stroke="currentColor" strokeWidth="1.6" />
        <path d="M12 5 L14 3 L18 3" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="12" y1="19" x2="12" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    )
  }
  // control module
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" aria-hidden>
      <rect x="3" y="5" width="18" height="14" rx="2" fill="none" stroke="currentColor" strokeWidth="1.6" />
      <line x1="3" y1="10" x2="21" y2="10" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="7" cy="14.5" r="1.2" fill="currentColor" />
      <circle cx="11" cy="14.5" r="1.2" fill="currentColor" />
      <circle cx="15" cy="14.5" r="1.2" fill="currentColor" />
      <circle cx="19" cy="14.5" r="1.2" fill="currentColor" />
    </svg>
  )
}
