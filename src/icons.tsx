// Minimal inline SVG icon set (stroke = currentColor)
type P = { className?: string };
const s = (children: React.ReactNode) => (p: P) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2}
       strokeLinecap="round" strokeLinejoin="round" className={p.className}>{children}</svg>
);

export const IconX = s(<><path d="M18 6 6 18" /><path d="M6 6l12 12" /></>);
export const IconHeart = s(<path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 1 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" fill="currentColor" stroke="none" />);
export const IconStar = s(<path d="m12 2 3 6.5 7 .8-5.2 4.8 1.5 7L12 17.8 5.2 21l1.5-7L1.5 9.3l7-.8L12 2Z" fill="currentColor" stroke="none" />);
export const IconRewind = s(<><path d="M3 12a9 9 0 1 0 3-6.7L3 8" /><path d="M3 3v5h5" /></>);
export const IconBoost = s(<path d="M13 2 4.5 13.5H11l-1 8.5L19.5 10H13l0-8Z" fill="currentColor" stroke="none" />);
export const IconInfo = s(<><path d="M12 8v.01" /><path d="M11 12h1v5h1" /><circle cx="12" cy="12" r="9.5" /></>);
export const IconFlip = s(<><path d="M3 7h13a4 4 0 0 1 0 8h-1" /><path d="M6 4 3 7l3 3" /><path d="M21 17H8a4 4 0 0 1 0-8h1" /><path d="M18 20l3-3-3-3" /></>);
export const IconPin = s(<><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></>);
export const IconBag = s(<><rect x="3" y="7" width="18" height="14" rx="2.5" /><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></>);
export const IconClock = s(<><circle cx="12" cy="12" r="9.5" /><path d="M12 7v5l3 2" /></>);
export const IconCheck = s(<path d="M20 6 9 17l-5-5" />);
export const IconBell = s(<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.7 21a2 2 0 0 1-3.4 0" /></>);
export const IconUser = s(<><circle cx="12" cy="8" r="4" /><path d="M4 21c0-4 3.6-7 8-7s8 3 8 7" /></>);
export const IconVerified = s(<path d="m9 12 2 2 4-4m-3-6.5 1.9 1.4 2.3-.2 1 2.1 2 1.2-.6 2.3.6 2.3-2 1.2-1 2.1-2.3-.2L12 20.5l-1.9-1.4-2.3.2-1-2.1-2-1.2.6-2.3L5.4 11l2-1.2 1-2.1 2.3.2L12.5 6.5Z" fill="currentColor" stroke="none" />);
export const IconGhost = s(<path d="M12 2c-4 0-7 3.2-7 7.4V20l2.3-1.6L9.6 20l2.4-1.6L14.4 20l2.3-1.6L19 20V9.4C19 5.2 16 2 12 2Z M9.3 9.2v.01 M14.7 9.2v.01" />);
export const IconCards = s(<><rect x="6" y="3.5" width="12" height="17" rx="3" /><path d="M3.5 7.5v9" /><path d="M20.5 7.5v9" /></>);
export const IconChat = s(<path d="M4 5h16a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1H9l-4 4v-4H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Z" />);
export const IconCamera = s(<><path d="M3 8a2 2 0 0 1 2-2h1.5l1-1.6a1 1 0 0 1 .9-.5h7.2a1 1 0 0 1 .9.5l1 1.6H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2Z" /><circle cx="12" cy="12.5" r="3.6" /></>);
