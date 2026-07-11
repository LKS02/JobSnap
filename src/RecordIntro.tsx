import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { IconX, IconCheck, IconRewind } from "./icons";

type Props = { questions: string[]; onClose: () => void; onComplete?: () => void; submitLabel?: string };

const MAX = 30; // Sekunden pro Antwort

/**
 * Aufnahme-UI (Sample): nimm ein Vorstellungsvideo auf, das die Leitfragen beantwortet.
 * Echte Kamera-Vorschau via getUserMedia, mit Fallback in den Sample-Modus.
 * Die eigentliche Aufnahme ist simuliert (Timer/States) – "nur als Sample".
 */
export default function RecordIntro({ questions, onClose, onComplete, submitLabel }: Props) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<number | null>(null);

  const [cam, setCam] = useState<"loading" | "ok" | "denied">("loading");
  const [q, setQ] = useState(0);
  const [recording, setRecording] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [done, setDone] = useState<boolean[]>(questions.map(() => false));
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: "user" }, audio: true });
        if (cancelled) { stream.getTracks().forEach((t) => t.stop()); return; }
        streamRef.current = stream;
        if (videoRef.current) { videoRef.current.srcObject = stream; videoRef.current.play().catch(() => {}); }
        setCam("ok");
      } catch { setCam("denied"); }
    })();
    return () => { cancelled = true; stopTimer(); streamRef.current?.getTracks().forEach((t) => t.stop()); };
  }, []);

  function stopTimer() { if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; } }

  function startRec() {
    setRecording(true); setElapsed(0);
    timerRef.current = window.setInterval(() => {
      setElapsed((e) => { if (e + 1 >= MAX) { finishRec(); return MAX; } return e + 1; });
    }, 1000);
  }
  function finishRec() {
    stopTimer(); setRecording(false);
    setDone((d) => { const n = [...d]; n[q] = true; return n; });
  }
  function retake() { setDone((d) => { const n = [...d]; n[q] = false; return n; }); setElapsed(0); }
  function next() {
    if (q < questions.length - 1) { setQ(q + 1); setElapsed(0); }
    else setFinished(true);
  }

  const isDone = done[q];
  const mmss = `0:${String(elapsed).padStart(2, "0")}`;
  const ring = 2 * Math.PI * 34;
  const offset = ring * (1 - elapsed / MAX);

  return (
    <motion.div className="record-screen"
      initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 30 }}>
      {/* camera preview / fallback */}
      {cam === "ok" ? (
        <video ref={videoRef} className="cam-preview" muted playsInline autoPlay />
      ) : (
        <div className="cam-fallback">
          <div className="cam-emoji">🎥</div>
          <p>{cam === "loading" ? "Kamera wird gestartet …" : "Kamera nicht verfügbar"}</p>
          <span>Sample-Modus – Aufnahme wird simuliert</span>
        </div>
      )}
      <div className="cam-scrim" />

      {/* top bar */}
      <div className="rec-top">
        <button className="icon-btn" onClick={onClose}><IconX /></button>
        <div className="rec-title">Dein Vorstellungsvideo</div>
        <div style={{ width: 40 }} />
      </div>

      {/* chapter dots */}
      <div className="rec-chapters">
        {questions.map((_, i) => (
          <span key={i} className={`ch ${done[i] ? "done" : ""} ${i === q ? "cur" : ""}`} />
        ))}
      </div>

      {/* teleprompter */}
      <div className="teleprompter">
        <span className="tp-index">FRAGE {q + 1} VON {questions.length}</span>
        <h2>{questions[q]}</h2>
      </div>

      {/* recording indicator */}
      <AnimatePresence>
        {recording && (
          <motion.div className="rec-live" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <span className="rec-dot" /> REC {mmss}
          </motion.div>
        )}
      </AnimatePresence>

      {/* controls */}
      <div className="rec-controls">
        {!isDone ? (
          <>
            <div className="rec-hint">{recording ? "Tippe zum Stoppen" : "Tippe zum Aufnehmen"}</div>
            <button className="rec-btn" onClick={recording ? finishRec : startRec} aria-label="Aufnehmen">
              <svg viewBox="0 0 80 80" className="rec-ring">
                <circle cx="40" cy="40" r="34" className="ring-bg" />
                {recording && (
                  <circle cx="40" cy="40" r="34" className="ring-fg"
                    style={{ strokeDasharray: ring, strokeDashoffset: offset }} />
                )}
              </svg>
              <span className={`rec-core ${recording ? "sq" : ""}`} />
            </button>
          </>
        ) : (
          <div className="rec-after">
            <div className="rec-saved"><IconCheck /> Antwort aufgenommen</div>
            <div className="rec-after-btns">
              <button className="btn-ghost" onClick={retake}><IconRewind /> Neu aufnehmen</button>
              <button className="btn-primary" onClick={next}>
                {q < questions.length - 1 ? "Nächste Frage →" : "Video fertigstellen ✓"}
              </button>
            </div>
          </div>
        )}
      </div>

      {/* finished */}
      <AnimatePresence>
        {finished && (
          <motion.div className="rec-done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="burst">🎬</div>
            <div className="match-title" style={{ fontSize: 34 }}>Video steht!</div>
            <p className="rec-done-sub">
              Sample – im echten Produkt würdest du die Clips jetzt zuschneiden, zusammenfügen und hochladen.
            </p>
            <div className="rec-done-list">
              {questions.map((qq) => (
                <div className="rec-done-item" key={qq}><span className="tick"><IconCheck /></span>{qq}</div>
              ))}
            </div>
            <button className="btn-primary" style={{ maxWidth: 320, width: "100%" }} onClick={onComplete ?? onClose}>{submitLabel ?? "Fertig"}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
