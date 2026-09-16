const ICON_ELEMENTS = {
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></>,
  file: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></>,
  filePlus: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M12 18v-6"/><path d="M9 15h6"/></>,
  tag: <><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><path d="M7 7h.01"/></>,
  send: <><path d="M22 2L11 13"/><path d="M22 2l-7 20-4-9-9-4z"/></>,
  checkCir: <><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></>,
  right: <><path d="M5 12h14"/><path d="M13 6l6 6-6 6"/></>,
  scale: <><path d="M12 3v18"/><path d="M8 21h8"/><path d="M6.5 8L3 14h7z"/><path d="M17.5 8L14 14h7z"/></>,
  building: <><rect x="4" y="21" width="16" height="2"/><path d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"/><path d="M10 8h4M10 12h4M10 16h4"/></>,
  refresh: <><path d="M21 12a9 9 0 1 1-2.6-6.4"/><path d="M21 3v6h-6"/></>,
  bars: <><path d="M4 20V10M12 20V4M20 20v-6"/><path d="M2 22h20"/></>,
  dollar: <><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8 8h6a2.5 2.5 0 0 1 0 5H8a2.5 2.5 0 0 0 0 5h6"/></>,
  ask: <><circle cx="12" cy="12" r="10"/><path d="M9.5 9a2.5 2.5 0 0 1 5 .2c0 1.6-2.5 1.8-2.5 3.3"/><path d="M12 17h.01"/></>,
  dollar2: <><circle cx="12" cy="12" r="10"/><path d="M12 6v12M8.5 9.5c.8-1 1.9-1.5 3.5-1.5 1.7 0 3 .8 3 2 0 2.7-6.5 1.6-6.5 4.4 0 1.3 1.4 2.1 3 2.1 1.6 0 2.9-.7 3.6-1.5"/></>,
  percent: <><path d="M19 5L5 19"/><circle cx="6.5" cy="6.5" r="2.5"/><circle cx="17.5" cy="17.5" r="2.5"/></>,
  check: <><path d="M4 12l5 5L20 6"/></>,
  lock: <><rect x="5" y="11" width="14" height="10" rx="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4"/></>,
  cart: <><circle cx="10" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M3 3h3l2.6 12.5a2 2 0 0 0 2 1.5h7.3a2 2 0 0 0 2-1.5L21 8H6"/></>,
  fileCheck: <><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/><path d="M9 13l2 2 4-4"/></>,
  fork: <><path d="M6 3v12"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/></>,
  truck: <><path d="M1 3h15v13H1z"/><path d="M16 8h4l3 3v5h-7V8z"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/></>,
  pin: <><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></>,
  shield: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
  pkg: <><path d="M21 8l-9-5-9 5v8l9 5 9-5V8z"/><path d="M3 8l9 5 9-5"/><path d="M12 21v-8"/></>,
  flask: <><path d="M9 3h6M10 3v5L4.5 19a2 2 0 0 0 1.8 3h11.4a2 2 0 0 0 1.8-3L14 8V3"/><path d="M7.5 15h9"/></>,
  layers: <><path d="M12 2l10 6-10 6L2 8z"/><path d="M2 14l10 6 10-6"/></>,
  flag: <><path d="M5 21V3"/><path d="M5 5c6-3 8 3 14 0"/></>,
  clip: <><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><path d="M9 13l2 2 4-4"/></>,
  warn: <><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><path d="M12 9v4M12 17h.01"/></>,
  bolt: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
  gauge: <><path d="M12 15l3.5-3.5"/><path d="M20.3 18a10 10 0 1 0-16.6 0"/></>,
  clock: <><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></>,
  alert: <><circle cx="12" cy="12" r="10"/><path d="M12 7v6"/><path d="M12 17h.01"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z"/><circle cx="12" cy="12" r="3"/></>,
  route: <><circle cx="6" cy="19" r="3"/><circle cx="18" cy="5" r="3"/><path d="M8 19h6a4 4 0 0 0 0-8H9a4 4 0 0 1 0-8h7"/></>,
  zap: <><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></>,
  flow: <><path d="M4 6h9a4 4 0 0 1 0 8H6a4 4 0 0 0 0 8h14"/></>,
  shuffle: <><path d="M16 3h5v5"/><path d="M4 20L21 3"/><path d="M21 16v5h-5"/><path d="M15 15l6 6"/><path d="M4 4l5 5"/></>,
  archive: <><path d="M21 8v13H3V8"/><path d="M1 3h22v5H1z"/><path d="M10 12h4"/></>,
  list: <><path d="M8 6h13M8 12h13M8 18h13"/><path d="M3 6h.01M3 12h.01M3 18h.01"/></>,
  coins: <><circle cx="8" cy="8" r="6"/><path d="M18.1 15.2a6 6 0 0 1-8.6 6.1"/><path d="M16 20h5v-5"/></>,
  box: <><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><path d="M3.3 7l8.7 5 8.7-5"/><path d="M12 22V12"/></>,
  users: <><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></>,
  phone: <><path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2.1L8 9.6a16 16 0 0 0 6 6l1.2-1.2a2 2 0 0 1 2.1-.5c.8.3 1.7.5 2.6.6a2 2 0 0 1 1.7 2z"/></>,
  chart: <><path d="M3 3v18h18"/><path d="M8 17V9M13 17V5M18 17v-7"/></>,
  shieldCheck: <><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></>,
  repeat: <><path d="M17 2l4 4-4 4"/><path d="M3 11v-1a4 4 0 0 1 4-4h14"/><path d="M7 22l-4-4 4-4"/><path d="M21 13v1a4 4 0 0 1-4 4H3"/></>,
  search: <><circle cx="11" cy="11" r="8"/><path d="M21 21l-4.35-4.35"/></>,
  layers2: <><path d="M12 2l10 6-10 6L2 8z"/><path d="M2 14l10 6 10-6"/><path d="M2 20l10 6 10-6"/></>,
  bell: <><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></>
}

export function Icon({ name, size = 16, sw = 1.8, className = '' }) {
  const body = ICON_ELEMENTS[name] || ICON_ELEMENTS.file
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor"
      strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" className={className}>
      {body}
    </svg>
  )
}

export const IC_CHECK = (
  <svg viewBox="0 0 24 24" width={14} height={14} fill="none" stroke="currentColor" strokeWidth={3} strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
)