import { motion } from "framer-motion";
import type { Card as CardT } from "./data";
import { JOB_QUESTIONS, CANDIDATE_QUESTIONS } from "./data";
import VideoLoop from "./VideoLoop";
import {
  IconVerified, IconPin, IconBag, IconClock, IconInfo, IconFlip,
} from "./icons";

type Props = {
  card: CardT;
  flipped: boolean;
  onFlip: (v: boolean) => void;
  active: boolean;
};

export default function Card({ card, flipped, onFlip, active }: Props) {
  return (
    <motion.div
      className="flip-inner"
      animate={{ rotateY: flipped ? 180 : 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="face front">
        {card.kind === "job" ? <JobFront card={card} onFlip={onFlip} active={active} />
                             : <CandidateFront card={card} onFlip={onFlip} active={active} />}
      </div>
      <div className="face back">
        {card.kind === "job" ? <JobBack card={card} onFlip={onFlip} />
                             : <CandidateBack card={card} onFlip={onFlip} />}
      </div>
    </motion.div>
  );
}

/* ---------------- JOB — front ---------------- */
function JobFront({ card, onFlip, active }: { card: Extract<CardT, { kind: "job" }>; onFlip: (v: boolean) => void; active: boolean }) {
  return (
    <>
      <VideoLoop accent={card.accent} emoji={card.emoji} videoUrl={card.videoUrl} active={active} captions={JOB_QUESTIONS} />
      <div className="card-gradient" />
      <div className="score-badge"><b>{card.matchScore}%</b><span>MATCH</span></div>

      <div className="card-front-body">
        <div className="employer-row">
          <div className="employer-logo" style={{ background: card.logoColor }}>{card.logo}</div>
          <div className="employer-name">
            {card.company}
            {card.verified && <span className="verified"><IconVerified /></span>}
            <span style={{ color: "var(--muted)", fontWeight: 600 }}>· {card.industry}</span>
          </div>
        </div>

        <div className="card-title">{card.title}</div>

        <div className="card-sub">
          <span className="meta"><IconBag />{card.employmentType} · {card.seniority}</span>
          <span className="meta"><IconPin />{card.location} · {card.remote}</span>
          <span className="meta pay">💶 {card.payRange}</span>
        </div>

        <div className="chip-row">
          {card.topSkills.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>

        <button className="details-btn" onClick={() => onFlip(true)}>
          <IconInfo /> Arbeitgeber & Benefits
        </button>
      </div>
    </>
  );
}

/* ---------------- JOB — back (Ebene 2) ---------------- */
function JobBack({ card, onFlip }: { card: Extract<CardT, { kind: "job" }>; onFlip: (v: boolean) => void }) {
  return (
    <div className="card-back-inner">
      <div className="back-head">
        <div className="employer-logo" style={{ background: card.logoColor }}>{card.logo}</div>
        <div>
          <h3>{card.company}</h3>
          <p>{card.industry} · {card.size}</p>
        </div>
        <div className="rating"><b>★ {card.rating.toFixed(1)}</b><span>{card.ratingCount} Bewertungen</span></div>
      </div>

      <div className="back-body">
        <div className="sect">
          <h4>Warum wir</h4>
          <p className="lead">{card.companyPitch}</p>
        </div>

        <div className="sect">
          <h4>🎬 Im Vorstellungsvideo beantwortet</h4>
          <ol className="q-list">{JOB_QUESTIONS.map((q) => <li key={q}>{q}</li>)}</ol>
        </div>

        <div className="sect">
          <h4>Kultur</h4>
          <div className="chip-row">
            {card.cultureTags.map((t) => <span className="chip line" key={t}>{t}</span>)}
          </div>
        </div>

        <div className="sect">
          <h4>Benefits</h4>
          <div className="benefit-grid">
            {card.benefits.map((b) => (
              <div className="benefit" key={b.label}><span className="emoji">{b.emoji}</span><span>{b.label}</span></div>
            ))}
          </div>
        </div>

        <div className="sect">
          <h4>Eckdaten</h4>
          <div className="stat-row">
            <div className="stat"><b>{card.payRange}</b><span>Gehalt</span></div>
            <div className="stat"><b>{card.founded}</b><span>gegründet</span></div>
            <div className="stat"><b>{card.startDate}</b><span>Start</span></div>
          </div>
        </div>

        <div className="sect">
          <h4>Tech / Tools</h4>
          <div className="chip-row">
            {card.techStack.map((t) => <span className="chip blue" key={t}>{t}</span>)}
          </div>
        </div>
      </div>

      <button className="back-flip" onClick={() => onFlip(false)}><IconFlip /> Zurück zum Video</button>
    </div>
  );
}

/* ---------------- CANDIDATE — front ---------------- */
function CandidateFront({ card, onFlip, active }: { card: Extract<CardT, { kind: "candidate" }>; onFlip: (v: boolean) => void; active: boolean }) {
  return (
    <>
      <VideoLoop accent={card.accent} emoji={card.emoji} videoUrl={card.videoUrl} active={active} captions={CANDIDATE_QUESTIONS} />
      <div className="card-gradient" />
      <div className="score-badge"><b>{card.matchScore}%</b><span>MATCH</span></div>

      <div className="card-front-body">
        <div className="employer-row">
          <div className="employer-logo" style={{ background: card.accent, fontSize: 18 }}>{card.emoji}</div>
          <div className="employer-name">
            {card.seniority}
            {card.verified && <span className="verified"><IconVerified /></span>}
          </div>
        </div>

        <div className="card-title">{card.name}, {card.age}</div>

        <div className="card-sub">
          <span className="meta"><IconBag />{card.headline}</span>
        </div>
        <div className="card-sub">
          <span className="meta"><IconPin />{card.location} · {card.remote}</span>
          <span className="meta pay">💶 {card.payWish}</span>
        </div>

        <div className="chip-row">
          {card.topSkills.map((s) => <span className="chip" key={s}>{s}</span>)}
        </div>

        <button className="details-btn" onClick={() => onFlip(true)}>
          <IconInfo /> Profil & Erfahrung
        </button>
      </div>
    </>
  );
}

/* ---------------- CANDIDATE — back (Ebene 2) ---------------- */
function CandidateBack({ card, onFlip }: { card: Extract<CardT, { kind: "candidate" }>; onFlip: (v: boolean) => void }) {
  return (
    <div className="card-back-inner">
      <div className="back-head">
        <div className="employer-logo" style={{ background: card.accent, fontSize: 22 }}>{card.emoji}</div>
        <div>
          <h3>{card.name}, {card.age}</h3>
          <p>{card.headline}</p>
        </div>
        <div className="rating"><b>{card.matchScore}%</b><span>Match</span></div>
      </div>

      <div className="back-body">
        <div className="sect">
          <h4>Über mich</h4>
          <p className="lead">{card.bio}</p>
        </div>

        <div className="sect">
          <h4>🎬 Im Vorstellungsvideo beantwortet</h4>
          <ol className="q-list">{CANDIDATE_QUESTIONS.map((q) => <li key={q}>{q}</li>)}</ol>
        </div>

        <div className="sect">
          <h4>Erfahrung</h4>
          {card.highlights.map((h) => (
            <div className="benefit" key={h.role} style={{ marginBottom: 8 }}>
              <span className="emoji">💼</span>
              <span>{h.role} · <span style={{ color: "var(--muted)" }}>{h.org}, {h.span}</span></span>
            </div>
          ))}
        </div>

        <div className="sect">
          <h4>Ausbildung</h4>
          {card.education.map((e) => (
            <div className="benefit" key={e.degree} style={{ marginBottom: 8 }}>
              <span className="emoji">🎓</span>
              <span>{e.degree} · <span style={{ color: "var(--muted)" }}>{e.school}, {e.span}</span></span>
            </div>
          ))}
        </div>

        <div className="sect">
          <h4>Skills</h4>
          <div className="chip-row">
            {card.skills.map((s) => <span className="chip blue" key={s}>{s}</span>)}
          </div>
        </div>

        <div className="sect">
          <h4>Zertifikate & Weiterbildungen</h4>
          <div className="chip-row">
            {card.certificates.map((c) => <span className="chip line" key={c}>🏅 {c}</span>)}
          </div>
        </div>

        <div className="sect">
          <h4>Sprachen</h4>
          <div className="chip-row">
            {card.languages.map((l) => <span className="chip line" key={l}>{l}</span>)}
          </div>
        </div>

        <div className="sect">
          <h4>Passt zu</h4>
          <div className="chip-row">
            {card.cultureTags.map((t) => <span className="chip line" key={t}>{t}</span>)}
          </div>
        </div>

        <div className="sect">
          <h4>Verfügbarkeit</h4>
          <div className="stat-row">
            <div className="stat"><b>{card.availability}</b><span>Start</span></div>
            <div className="stat"><b>{card.payWish}</b><span>Wunsch</span></div>
          </div>
        </div>
      </div>

      <button className="back-flip" onClick={() => onFlip(false)}><IconFlip /> Zurück zum Video</button>
    </div>
  );
}
