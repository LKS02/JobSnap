import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { Card } from "./data";
import { CANDIDATE_QUESTIONS } from "./data";
import RecordIntro from "./RecordIntro";
import { IconX, IconCheck } from "./icons";

type Q = { id: string; type: "text" | "choice"; question: string; placeholder?: string; options?: string[] };

const QUESTIONS: Q[] = [
  { id: "why", type: "text", question: "Warum interessiert dich diese Stelle?", placeholder: "In 1–2 Sätzen …" },
  { id: "start", type: "choice", question: "Wann kannst du starten?", options: ["Sofort", "In 1–3 Monaten", "Nach Absprache"] },
  { id: "time", type: "choice", question: "Wie viel Zeit bringst du mit?", options: ["Vollzeit-Praktikum", "~20 Std./Woche", "Ausbildung / Vollzeit"] },
];

type Phase = "questions" | "videoIntro" | "video" | "done";

/**
 * Bewerbungs-Flow: erst kurze Typeform-artige Fragen (eine pro Screen),
 * dann das Vorstellungsvideo (RecordIntro), dann Bestätigung.
 */
export default function ApplyFlow({ card, onClose }: { card: Card; onClose: () => void }) {
  const target = card.kind === "job" ? card.company : card.name;
  const role = card.kind === "job" ? card.title : card.headline;

  const [phase, setPhase] = useState<Phase>("questions");
  const [qi, setQi] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [text, setText] = useState("");

  const total = QUESTIONS.length;
  const q = QUESTIONS[qi];

  function answer(val: string) {
    if (!val.trim()) return;
    setAnswers((a) => ({ ...a, [q.id]: val }));
    if (qi < total - 1) { setQi(qi + 1); setText(""); }
    else setPhase("videoIntro");
  }
  function back() {
    if (qi > 0) { const prev = QUESTIONS[qi - 1]; setQi(qi - 1); setText(answers[prev.id] || ""); }
    else onClose();
  }

  // Video-Phase nutzt die bestehende Aufnahme-UI wieder
  if (phase === "video") {
    return (
      <RecordIntro
        questions={CANDIDATE_QUESTIONS}
        submitLabel="🚀 Bewerbung abschicken"
        onComplete={() => setPhase("done")}
        onClose={onClose}
      />
    );
  }

  return (
    <motion.div className="apply-screen"
      initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}>
      <div className="apply-top">
        <button className="icon-btn" onClick={phase === "questions" ? back : onClose}><IconX /></button>
        <div className="apply-target">Bewerbung · {target}</div>
        <div style={{ width: 40 }} />
      </div>

      {phase === "questions" && (
        <>
          <div className="apply-progress"><i style={{ width: `${(qi / total) * 100}%` }} /></div>
          <AnimatePresence mode="wait">
            <motion.div key={q.id} className="tf-question"
              initial={{ opacity: 0, y: 26 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -22 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}>
              <span className="tf-index">FRAGE {qi + 1} VON {total}</span>
              <h2>{q.question}</h2>

              {q.type === "text" ? (
                <>
                  <input className="tf-input" autoFocus value={text} placeholder={q.placeholder}
                    onChange={(e) => setText(e.target.value)}
                    onKeyDown={(e) => { if (e.key === "Enter") answer(text); }} />
                  <button className="btn-primary tf-ok" disabled={!text.trim()} onClick={() => answer(text)}>
                    OK <span className="tf-enter">↵ Enter</span>
                  </button>
                </>
              ) : (
                <div className="tf-options">
                  {q.options!.map((o, i) => (
                    <button className="tf-option" key={o} onClick={() => answer(o)}>
                      <span className="tf-key">{String.fromCharCode(65 + i)}</span>{o}
                    </button>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </>
      )}

      {phase === "videoIntro" && (
        <div className="apply-mid">
          <div className="apply-mid-emoji">🎬</div>
          <h2>Fast geschafft!</h2>
          <p>Jetzt noch ein kurzes <b>Vorstellungsvideo</b>: Beantworte {CANDIDATE_QUESTIONS.length} kurze Fragen per Video. Bewerbungen mit Video werden <b>3× häufiger</b> angesehen.</p>
          <button className="btn-primary" style={{ maxWidth: 320, width: "100%" }} onClick={() => setPhase("video")}>🎥 Video aufnehmen</button>
          <button className="btn-ghost" style={{ maxWidth: 320, width: "100%" }} onClick={() => setPhase("done")}>Ohne Video abschicken</button>
        </div>
      )}

      {phase === "done" && (
        <div className="apply-mid">
          <div className="apply-check"><IconCheck /></div>
          <h2>Bewerbung ist raus! 🎉</h2>
          <p>Deine Bewerbung {role ? <>als „<b>{role}</b>" </> : ""}bei <b>{target}</b> wurde abgeschickt. Antwort gibt's meist innerhalb von 3 Tagen.</p>
          <button className="btn-primary" style={{ maxWidth: 320, width: "100%" }} onClick={onClose}>Fertig</button>
        </div>
      )}
    </motion.div>
  );
}
