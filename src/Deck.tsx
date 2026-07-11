import { useState } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import type { Card as CardT } from "./data";
import Card from "./Card";
import { IconX, IconHeart, IconRewind } from "./icons";

type Mode = "applicant" | "recruiter";
type Props = { cards: CardT[]; mode: Mode; onMatch?: (card: CardT) => void };

const SWIPE = 110; // px threshold

export default function Deck({ cards, mode, onMatch }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [match, setMatch] = useState<CardT | null>(null);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-16, 16]);
  const likeOp = useTransform(x, [30, 130], [0, 1]);
  const nopeOp = useTransform(x, [-30, -130], [0, 1]);

  const done = index >= cards.length;

  function commit(dir: "like" | "nope") {
    const card = cards[index];
    setFlipped(false);
    setIndex((i) => i + 1);
    x.set(0);
    if (card && dir === "like") {
      setMatch(card);
      onMatch?.(card);
    }
  }

  function fling(dir: "like" | "nope") {
    if (done || flipped) return;
    animate(x, dir === "like" ? 520 : -520, { duration: 0.32, ease: "easeIn" });
    setTimeout(() => commit(dir), 300);
  }

  function onDragEnd(_: unknown, info: { offset: { x: number }; velocity: { x: number } }) {
    const { offset, velocity } = info;
    if (offset.x > SWIPE || velocity.x > 700) return fling("like");
    if (offset.x < -SWIPE || velocity.x < -700) return fling("nope");
    animate(x, 0, { type: "spring", stiffness: 500, damping: 32 });
  }

  function rewind() {
    if (index === 0) return;
    setFlipped(false);
    setIndex((i) => i - 1);
    x.set(0);
  }

  const stack = cards.slice(index, index + 3);

  return (
    <>
      <div className="deck-area">
        <div className="card-stack">
          {done && <EmptyState mode={mode} onReset={() => setIndex(0)} />}

          {stack.map((card, i) => {
            const isTop = i === 0;
            const depth = i;
            if (isTop) {
              return (
                <motion.div
                  key={card.id}
                  className="swipe-card"
                  style={{ x, rotate, zIndex: 10 }}
                  drag={flipped ? false : "x"}
                  dragElastic={0.6}
                  dragConstraints={{ left: 0, right: 0 }}
                  onDragEnd={onDragEnd as any}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <motion.div className="stamp stamp-like" style={{ opacity: likeOp }}>
                    {mode === "applicant" ? "BEWERBEN" : "PASST"}
                  </motion.div>
                  <motion.div className="stamp stamp-nope" style={{ opacity: nopeOp }}>NÖ</motion.div>
                  <Card card={card} flipped={flipped} onFlip={setFlipped} active />
                </motion.div>
              );
            }
            return (
              <div
                key={card.id}
                className="swipe-card"
                style={{
                  zIndex: 10 - depth,
                  transform: `scale(${1 - depth * 0.05}) translateY(${depth * 14}px)`,
                  filter: "brightness(0.75)",
                  pointerEvents: "none",
                }}
              >
                <Card card={card} flipped={false} onFlip={() => {}} active={false} />
              </div>
            );
          })}
        </div>
      </div>

      {!done && (
        <div className="actionbar">
          <button className="action-btn sm rewind" onClick={rewind} title="Zurück"><IconRewind /></button>
          <button className="action-btn lg nope" onClick={() => fling("nope")} title="Passt nicht"><IconX /></button>
          <button className="action-btn lg like" onClick={() => fling("like")} title={mode === "applicant" ? "Interessiert" : "Passt"}><IconHeart /></button>
        </div>
      )}

      <AnimatePresence>
        {match && <MatchOverlay card={match} mode={mode} onClose={() => setMatch(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Match overlay ---------------- */
function MatchOverlay({ card, mode, onClose }: { card: CardT; mode: Mode; onClose: () => void }) {
  const other = card.kind === "job"
    ? { emoji: card.logo, color: card.logoColor }
    : { emoji: card.emoji, color: card.accent };
  const me = mode === "applicant"
    ? { emoji: "🙋", color: "var(--snap-yellow)" }
    : { emoji: "🏢", color: "var(--snap-yellow)" };

  const sub = card.kind === "job"
    ? `Du und ${card.company} interessiert euch füreinander — bewirb dich jetzt für „${card.title}".`
    : `Ihr passt zusammen! ${card.name} kann sich jetzt bei euch bewerben.`;

  return (
    <motion.div className="match-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="burst">🎉</div>
        <div className="match-title">It's a Match!</div>

        <div className="match-avatars" style={{ marginTop: 22 }}>
          <div className="av" style={{ background: me.color, color: "#050505" }}>{me.emoji}</div>
          <div className="match-heart">❤</div>
          <div className="av" style={{ background: other.color, color: "#fff" }}>{other.emoji}</div>
        </div>

        <div className="match-sub">{sub}</div>

        <div className="match-actions">
          <button className="btn-primary" onClick={onClose}>🚀 Jetzt bewerben</button>
          <button className="btn-ghost" onClick={onClose}>Weiter swipen</button>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ---------------- Empty state ---------------- */
function EmptyState({ mode, onReset }: { mode: Mode; onReset: () => void }) {
  return (
    <div className="empty-state">
      <div className="big">{mode === "applicant" ? "🗂️" : "🔍"}</div>
      <h3>Alles durchgeswipet!</h3>
      <p>{mode === "applicant"
        ? "Für heute keine neuen Jobs mehr. Schau später wieder rein — oder starte den Stapel neu."
        : "Keine neuen Kandidat:innen. Erweitere deine Suche oder starte neu."}</p>
      <button className="btn-primary" style={{ padding: "13px 22px" }} onClick={onReset}>Stapel neu starten</button>
    </div>
  );
}
