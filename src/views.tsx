import type { Card as CardT } from "./data";
import { IconCards, IconChat, IconCamera, IconUser, IconVerified, IconCheck } from "./icons";

type Tab = "swipe" | "matches" | "profile";

/* ---------------- Matches ---------------- */
export function MatchesView({ matches, onRecord }: { matches: CardT[]; onRecord: () => void }) {
  if (matches.length === 0) {
    return (
      <div className="view-scroll">
        <div className="empty-state" style={{ position: "relative", inset: "auto", paddingTop: 80 }}>
          <div className="big">💬</div>
          <h3>Noch keine Matches</h3>
          <p>Swipe nach rechts oder tippe ★, um dich vorzustellen. Bei einem Match landet ihr hier.</p>
        </div>
      </div>
    );
  }
  return (
    <div className="view-scroll">
      <h2 className="view-title">Matches <span className="count">{matches.length}</span></h2>
      <div className="match-list">
        {matches.map((m, i) => {
          const title = m.kind === "job" ? m.title : `${m.name}, ${m.age}`;
          const sub = m.kind === "job" ? m.company : m.headline;
          const badge = m.kind === "job" ? m.logo : m.emoji;
          const color = m.kind === "job" ? m.logoColor : m.accent;
          return (
            <div className="match-row" key={m.id + i}>
              <div className="match-av" style={{ background: color }}>{badge}</div>
              <div className="match-meta">
                <b>{title} {m.verified && <span className="verified"><IconVerified /></span>}</b>
                <span>{sub} · {m.matchScore}% Match</span>
              </div>
              <button className="chip solid" style={{ padding: "8px 12px" }}>📹 Interview</button>
            </div>
          );
        })}
      </div>
      <button className="btn-ghost" style={{ margin: "6px 4px 0", width: "calc(100% - 8px)" }} onClick={onRecord}>
        🎬 Vorstellungsvideo aktualisieren
      </button>
    </div>
  );
}

/* ---------------- Profile ---------------- */
export function ProfileView({ onRecord, matchCount }: { onRecord: () => void; matchCount: number }) {
  return (
    <div className="view-scroll">
      <div className="profile-head">
        <div className="profile-av">🙋</div>
        <h2>Du <span className="verified"><IconVerified /></span></h2>
        <p>Senior Product Designer · Berlin</p>
      </div>

      <div className="profile-stats">
        <div className="stat"><b>{matchCount}</b><span>Matches</span></div>
        <div className="stat"><b>87%</b><span>Profil-Score</span></div>
        <div className="stat"><b>12</b><span>Views heute</span></div>
      </div>

      <div className="video-cta" onClick={onRecord}>
        <div className="video-cta-icon"><IconCamera /></div>
        <div className="video-cta-text">
          <b>Dein Vorstellungsvideo</b>
          <span>Beantworte 3 Leitfragen per Video – so wirst du 3× öfter gematcht.</span>
        </div>
        <span className="video-cta-go">Aufnehmen ›</span>
      </div>

      <h4 className="sect-label">Deine Skills</h4>
      <div className="chip-row" style={{ padding: "0 4px" }}>
        {["Figma", "Design Systems", "Prototyping", "UX Research", "Framer"].map((s) => (
          <span className="chip line" key={s}>{s}</span>
        ))}
      </div>

      <h4 className="sect-label">Einstellungen</h4>
      <div className="settings">
        {["Gehaltsvorstellung", "Remote-Präferenz", "Benachrichtigungen", "Sichtbarkeit"].map((r) => (
          <div className="settings-row" key={r}>{r} <span>›</span></div>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Bottom nav ---------------- */
export function BottomNav({ tab, setTab, onRecord, matchCount }:
  { tab: Tab; setTab: (t: Tab) => void; onRecord: () => void; matchCount: number }) {
  return (
    <nav className="bottom-nav">
      <button className={`nav-item ${tab === "swipe" ? "active" : ""}`} onClick={() => setTab("swipe")}>
        <IconCards /><span>Swipen</span>
      </button>
      <button className={`nav-item ${tab === "matches" ? "active" : ""}`} onClick={() => setTab("matches")}>
        <div className="nav-badge-wrap">
          <IconChat />
          {matchCount > 0 && <span className="nav-badge">{matchCount}</span>}
        </div>
        <span>Matches</span>
      </button>
      <button className="nav-record" onClick={onRecord} aria-label="Video aufnehmen"><IconCamera /></button>
      <button className={`nav-item ${tab === "profile" ? "active" : ""}`} onClick={() => setTab("profile")}>
        <IconUser /><span>Profil</span>
      </button>
    </nav>
  );
}
