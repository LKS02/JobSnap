import { useState } from "react";
import { motion, useMotionValue, useTransform, animate, AnimatePresence } from "framer-motion";
import type { Card as CardT } from "./data";
import Card from "./Card";
import {
  IconX, IconHeart, IconStar, IconRewind, IconBoost,
} from "./icons";

type Mode = "applicant" | "recruiter";
type Props = { cards: CardT[]; mode: Mode; onMatch?: (card: CardT) => void };

const SWIPE = 110; // px threshold

export default function Deck({ cards, mode, onMatch }: Props) {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [match, setMatch] = useState<{ card: CardT; superLike: boolean } | null>(null);
  const [boostMsg, setBoostMsg] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotate = useTransform(x, [-240, 240], [-16, 16]);
  const likeOp = useTransform(x, [30, 130], [0, 1]);
  const nopeOp = useTransform(x, [-30, -130], [0, 1]);
  const superOp = useTransform(y, [-30, -130], [0, 1]);

  const top = cards[index];
  const done = index >= cards.length;

  function reset() { x.set(0); y.set(0); }

  function commit(dir: "like" | "nope" | "super") {
    const card = cards[index];
    setFlipped(false);
    setIndex((i) => i + 1);
    reset();
    if (card && (dir === "like" || dir === "super")) {
      setMatch({ card, superLike: dir === "super" });
      onMatch?.(card);
    }
  }

  function fling(dir: "like" | "nope" | "super") {
    if (done || flipped) return;
    if (dir === "super") {
      animate(y, -700, { duration: 0.35, ease: "easeIn" });
      animate(x, 0, { duration: 0.35 });
    } else {
      animate(x, dir === "like" ? 520 : -520, { duration: 0.32, ease: "easeIn" });
    }
    setTimeout(() => commit(dir), 300);
  }

  function onDragEnd(_: unknown, info: { offset: { x: number; y: number }; velocity: { x: number; y: number } }) {
    const { offset, velocity } = info;
    if (offset.y < -SWIPE && Math.abs(offset.x) < 90) return fling("super");
    if (offset.x > SWIPE || velocity.x > 700) return fling("like");
    if (offset.x < -SWIPE || velocity.x < -700) return fling("nope");
    animate(x, 0, { type: "spring", stiffness: 500, damping: 32 });
    animate(y, 0, { type: "spring", stiffness: 500, damping: 32 });
  }

  function rewind() {
    if (index === 0) return;
    setFlipped(false);
    setIndex((i) => i - 1);
    reset();
  }

  function boost() { setBoostMsg(true); setTimeout(() => setBoostMsg(false), 1600); }

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
                  style={{ x, y, rotate, zIndex: 10 }}
                  drag={!flipped}
                  dragElastic={0.5}
                  dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
                  onDragEnd={onDragEnd as any}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <motion.div className="stamp stamp-like" style={{ opacity: likeOp }}>
                    {mode === "applicant" ? "BEWERBEN" : "PASST"}
                  </motion.div>
                  <motion.div className="stamp stamp-nope" style={{ opacity: nopeOp }}>NÖ</motion.div>
                  <motion.div className="stamp stamp-super" style={{ opacity: superOp }}>SUPER</motion.div>
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

        <AnimatePresence>
          {boostMsg && (
            <motion.div
              className="video-badge"
              style={{ position: "absolute", top: 14, left: "50%", x: "-50%", background: "var(--snap-purple)", color: "#fff", border: "none" }}
              initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            >
              ⚡ Boost aktiv — du bist 10× sichtbarer
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {!done && (
        <div className="actionbar">
          <button className="action-btn sm rewind" onClick={rewind} title="Zurück"><IconRewind /></button>
          <button className="action-btn lg nope" onClick={() => fling("nope")} title="Passt nicht"><IconX /></button>
          <button className="action-btn sm super" onClick={() => fling("super")} title="Direkt bewerben"><IconStar /></button>
          <button className="action-btn lg like" onClick={() => fling("like")} title={mode === "applicant" ? "Interessiert" : "Passt"}><IconHeart /></button>
          <button className="action-btn sm boost" onClick={boost} title="Boost"><IconBoost /></button>
        </div>
      )}

      <AnimatePresence>
        {match && <MatchOverlay data={match} mode={mode} onClose={() => setMatch(null)} />}
      </AnimatePresence>
    </>
  );
}

/* ---------------- Match overlay ---------------- */
function MatchOverlay({ data, mode, onClose }: { data: { card: CardT; superLike: boolean }; mode: Mode; onClose: () => void }) {
  const { card, superLike } = data;
  const other = card.kind === "job"
    ? { emoji: card.logo, color: card.logoColor, name: card.company }
    : { emoji: card.emoji, color: card.accent, name: card.name };
  const me = mode === "applicant"
    ? { emoji: "🙋", color: "var(--snap-yellow)", name: "Du" }
    : { emoji: "🏢", color: "var(--snap-yellow)", name: "Dein Team" };

  const sub = card.kind === "job"
    ? `Du und ${card.company} interessiert euch füreinander. Schlag ein Video-Kennenlernen für „${card.title}" vor.`
    : `Ihr passt zusammen! Lade ${card.name} zu einem ersten Video-Interview ein.`;

  return (
    <motion.div className="match-overlay"
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div initial={{ scale: 0.8, y: 20 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", stiffness: 300, damping: 22 }}
        style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
        <div className="burst">{superLike ? "⚡" : "🎉"}</div>
        <div className="match-title">{superLike ? "Super-Match!" : "It's a Match!"}</div>

        <div className="match-avatars" style={{ marginTop: 22 }}>
          <div className="av" style={{ background: me.color, color: "#050505" }}>{me.emoji}</div>
          <div className="match-heart">❤</div>
          <div className="av" style={{ background: other.color, color: "#fff" }}>{other.emoji}</div>
        </div>

        <div className="match-sub">{sub}</div>

        <div className="match-actions">
          <button className="btn-primary" onClick={onClose}>📹 Video-Interview vorschlagen</button>
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
