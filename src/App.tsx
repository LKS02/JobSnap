import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Deck from "./Deck";
import RecordIntro from "./RecordIntro";
import { MatchesView, ProfileView, BottomNav } from "./views";
import { JOBS, CANDIDATES, CANDIDATE_QUESTIONS, SAMPLE_MATCHES, type Card as CardT, type MatchEntry } from "./data";
import { IconGhost, IconBell, IconUser, IconBag } from "./icons";

type Mode = "applicant" | "recruiter";
type Tab = "swipe" | "matches" | "profile";

export default function App() {
  const [mode, setMode] = useState<Mode>("applicant");
  const [tab, setTab] = useState<Tab>("swipe");
  const [recording, setRecording] = useState(false);
  const [matches, setMatches] = useState<MatchEntry[]>(SAMPLE_MATCHES);

  const addMatch = (card: CardT) =>
    setMatches((m) => (m.find((x) => x.card.id === card.id) ? m
      : [{ card, when: "gerade eben", preview: "Ihr habt gematcht! Sag Hallo 👋", unread: true }, ...m]));

  return (
    <div className="app">
      <div className="phone">
        <header className="topbar">
          <div className="topbar-row">
            <div className="brand">
              <span className="ghost"><IconGhost /></span>
              Job<b>Snap</b>
            </div>
            <button className="icon-btn" title="Benachrichtigungen"><IconBell /></button>
          </div>

          {tab === "swipe" && (
            <div className="mode-toggle">
              <motion.div className="thumb"
                animate={{ left: mode === "applicant" ? 4 : "calc(50% + 0px)" }}
                transition={{ type: "spring", stiffness: 500, damping: 34 }} />
              <button className={mode === "applicant" ? "active" : ""} onClick={() => setMode("applicant")}>
                <IconUser /> Ich suche Job
              </button>
              <button className={mode === "recruiter" ? "active" : ""} onClick={() => setMode("recruiter")}>
                <IconBag /> Ich suche Talente
              </button>
            </div>
          )}
        </header>

        {tab === "swipe" && (mode === "applicant"
          ? <Deck key="applicant" cards={JOBS} mode="applicant" onMatch={addMatch} />
          : <Deck key="recruiter" cards={CANDIDATES} mode="recruiter" onMatch={addMatch} />)}

        {tab === "matches" && <MatchesView matches={matches} onRecord={() => setRecording(true)} />}
        {tab === "profile" && <ProfileView onRecord={() => setRecording(true)} matchCount={matches.length} />}

        <BottomNav tab={tab} setTab={setTab} onRecord={() => setRecording(true)} matchCount={matches.length} />

        <AnimatePresence>
          {recording && <RecordIntro questions={CANDIDATE_QUESTIONS} onClose={() => setRecording(false)} />}
        </AnimatePresence>
      </div>
    </div>
  );
}
