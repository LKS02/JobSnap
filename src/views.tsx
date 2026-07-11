import type { MatchEntry } from "./data";
import { ME } from "./data";
import { IconCards, IconChat, IconCamera, IconUser, IconVerified } from "./icons";

type Tab = "swipe" | "matches" | "profile";

/* ---------------- Matches ---------------- */
export function MatchesView({ matches, onRecord }: { matches: MatchEntry[]; onRecord: () => void }) {
  if (matches.length === 0) {
    return (
      <div className="view-scroll">
        <div className="empty-state" style={{ position: "relative", inset: "auto", paddingTop: 80 }}>
          <div className="big">💬</div>
          <h3>Noch keine Matches</h3>
          <p>Swipe nach rechts, um dich vorzustellen. Bei einem Match landet ihr hier.</p>
        </div>
      </div>
    );
  }
  const unread = matches.filter((m) => m.unread).length;
  return (
    <div className="view-scroll">
      <h2 className="view-title">Matches <span className="count">{matches.length}</span></h2>
      {unread > 0 && <p className="view-hint">{unread} neue Nachricht{unread > 1 ? "en" : ""} · tippe zum Antworten</p>}

      <div className="match-list">
        {matches.map((m, i) => {
          const c = m.card;
          const title = c.kind === "job" ? c.company : `${c.name}, ${c.age}`;
          const sub = c.kind === "job" ? c.title : c.headline;
          const badge = c.kind === "job" ? c.logo : c.emoji;
          const color = c.kind === "job" ? c.logoColor : c.accent;
          return (
            <div className={`match-row ${m.unread ? "unread" : ""}`} key={c.id + i}>
              <div className="match-av" style={{ background: color }}>{badge}</div>
              <div className="match-meta">
                <div className="match-top">
                  <b>{title} {c.verified && <span className="verified"><IconVerified /></span>}</b>
                  <span className="match-when">{m.when}</span>
                </div>
                <span className="match-role">{sub} · {c.matchScore}% Match</span>
                <span className="match-preview">{m.preview}</span>
              </div>
            </div>
          );
        })}
      </div>

      <button className="btn-ghost" style={{ margin: "14px 4px 0", width: "calc(100% - 8px)" }} onClick={onRecord}>
        🎬 Vorstellungsvideo aktualisieren
      </button>
    </div>
  );
}

/* ---------------- Profile ("Du") ---------------- */
export function ProfileView({ onRecord, matchCount }: { onRecord: () => void; matchCount: number }) {
  const me = ME;
  return (
    <div className="view-scroll">
      <div className="profile-head">
        <div className="profile-av">{me.emoji}</div>
        <h2>{me.name} <span className="verified"><IconVerified /></span></h2>
        <p>{me.headline} · {me.location}</p>
      </div>

      <div className="profile-stats">
        <div className="stat"><b>{matchCount}</b><span>Matches</span></div>
        <div className="stat"><b>{me.matchScore}%</b><span>Profil-Score</span></div>
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

      <h4 className="sect-label">Über mich</h4>
      <p className="profile-lead">{me.bio}</p>

      <h4 className="sect-label">Berufserfahrung</h4>
      <div className="cv-list">
        {me.highlights.map((h) => (
          <div className="benefit" key={h.role}>
            <span className="emoji">💼</span>
            <span>{h.role} · <span style={{ color: "var(--muted)" }}>{h.org}, {h.span}</span></span>
          </div>
        ))}
      </div>

      <h4 className="sect-label">Ausbildung</h4>
      <div className="cv-list">
        {me.education.map((e) => (
          <div className="benefit" key={e.degree}>
            <span className="emoji">🎓</span>
            <span>{e.degree} · <span style={{ color: "var(--muted)" }}>{e.school}, {e.span}</span></span>
          </div>
        ))}
      </div>

      <h4 className="sect-label">Skills</h4>
      <div className="chip-row" style={{ padding: "0 4px" }}>
        {me.skills.map((s) => <span className="chip line" key={s}>{s}</span>)}
      </div>

      <h4 className="sect-label">Zertifikate & Weiterbildungen</h4>
      <div className="chip-row" style={{ padding: "0 4px" }}>
        {me.certificates.map((c) => <span className="chip line" key={c}>🏅 {c}</span>)}
      </div>

      <h4 className="sect-label">Sprachen</h4>
      <div className="chip-row" style={{ padding: "0 4px" }}>
        {me.languages.map((l) => <span className="chip line" key={l}>{l}</span>)}
      </div>

      <h4 className="sect-label">Einstellungen</h4>
      <div className="settings">
        <div className="settings-row">Gehaltsvorstellung <span className="settings-val">{me.payWish} ›</span></div>
        <div className="settings-row">Standort <span className="settings-val">{me.location} · {me.remote} ›</span></div>
        <div className="settings-row">Verfügbar <span className="settings-val">{me.availability} ›</span></div>
        <div className="settings-row">Benachrichtigungen <span className="settings-val">An ›</span></div>
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
