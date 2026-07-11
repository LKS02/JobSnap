import { useEffect, useRef, useState } from "react";

type Props = {
  accent: string;
  emoji: string;
  videoUrl?: string;
  active?: boolean; // only the top card autoplays
  captions?: string[]; // Leitfragen, die im Vorstellungsvideo beantwortet werden
};

/**
 * Video-first media surface with a graceful poster fallback.
 * - If a videoUrl can play, the muted intro loop fades in.
 * - Cycling caption reinforces that it's a Vorstellungsvideo answering guiding questions.
 * - Falls back to an animated gradient "story" poster if the clip fails.
 */
export default function VideoLoop({ accent, emoji, videoUrl, active = false, captions }: Props) {
  const ref = useRef<HTMLVideoElement | null>(null);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    const v = ref.current;
    if (!v || !videoUrl) return;
    if (active) v.play().catch(() => {});
    else v.pause();
  }, [active, videoUrl]);

  useEffect(() => {
    if (!active || !captions || captions.length < 2) return;
    const id = setInterval(() => setCi((c) => (c + 1) % captions.length), 3400);
    return () => clearInterval(id);
  }, [active, captions]);

  const showVideo = !!videoUrl && !failed;
  const playing = showVideo && ready;

  return (
    <div className="media-wrap">
      {/* animated gradient poster (fallback + backdrop while loading) */}
      <div
        className="card-poster kenburns"
        style={{
          background: `radial-gradient(120% 90% at 25% 15%, ${accent}cc, transparent 55%),
                       radial-gradient(120% 90% at 85% 90%, ${accent}66, transparent 50%),
                       linear-gradient(160deg, #16161b 0%, #0c0c0f 100%)`,
        }}
      >
        <div className="poster-emoji">{emoji}</div>
      </div>

      {showVideo && (
        <video
          ref={ref}
          className="card-video"
          style={{ opacity: ready ? 1 : 0, transition: "opacity .5s ease" }}
          src={videoUrl}
          muted
          loop
          playsInline
          preload="metadata"
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
        />
      )}

      {/* story progress bar */}
      <div className="story-progress">
        <i className={active ? "run" : ""} />
      </div>

      {/* live / video badge */}
      <div className="video-badge">
        <span className="dot" />
        {playing ? "LIVE" : "VORSTELLUNG"}
      </div>

      {/* cycling Leitfrage caption (compact single-line pill) */}
      {active && captions && captions.length > 0 && (
        <div className="vid-caption" key={ci}>
          <span className="q-index">🎬 {ci + 1}/{captions.length}</span>
          <span className="q-text">„{captions[ci]}"</span>
        </div>
      )}
    </div>
  );
}
