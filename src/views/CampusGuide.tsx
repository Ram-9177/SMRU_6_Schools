"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  FaCheck,
  FaChevronLeft,
  FaChevronRight,
  FaChevronUp,
  FaChevronDown,
  FaDesktop,
  FaImage,
  FaMapMarkerAlt,
  FaPause,
  FaPlay,
  FaVolumeUp,
  FaWalking,
  FaSearch,
  FaRedo,
  FaMagic,
  FaCloudSun,
  FaMusic,
  FaClock,
  FaAward,
  FaWhatsapp,
  FaPhoneAlt,
  FaPaperPlane,
  FaQuestionCircle,
  FaFileDownload,
} from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import logo from "../assets/Logo.png";

type Language = "en" | "te" | "hi";
type LocalizedText = Partial<Record<Language, string>>;
type Screen = "welcome" | "language" | "tourType" | "preview" | "map";
type AudioKind = "point";

type GuidePoint = {
  id: string;
  title: LocalizedText;
  mapX: number;
  mapY: number;
  image?: string;
  audioFileName?: string;
  transcript: LocalizedText;
};

type GuideContent = {
  mapImage?: string;
  welcome: {
    title: LocalizedText;
    subtitle: LocalizedText;
    audioFileName?: string;
  };
  icons: {
    icon: [
      { url: string; type: string },
    ],
    shortcut: string,
    apple: string,
  };
  tour: {
    title: LocalizedText;
    description: LocalizedText;
  };
  pointOrder: string[];
  points: GuidePoint[];
};

const LANGUAGES: Array<{ code: Language; label: string; nativeLabel: string }> = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "te", label: "Telugu", nativeLabel: "తెలుగు" },
  { code: "hi", label: "Hindi", nativeLabel: "हिन्दी" },
];

const AUDIO_MISSING_MESSAGE = "Audio for this point will be added soon.";
const CONTENT_ERROR_MESSAGE = "Campus guide content is not available right now.";
const MAP_ZOOM_SCALE = 2.5;

function localized(value: LocalizedText | undefined, language: Language, fallback = "") {
  return value?.[language] || value?.en || fallback;
}

function validateGuide(data: unknown): GuideContent {
  const guide = data as GuideContent;
  if (
    !guide ||
    typeof guide !== "object" ||
    !guide.welcome ||
    !guide.tour ||
    !Array.isArray(guide.points) ||
    !Array.isArray(guide.pointOrder)
  ) {
    throw new Error("Invalid campus guide content");
  }
  return guide;
}

function pointAudioPath(language: Language, point?: GuidePoint) {
  if (!point?.audioFileName) return "";
  return `/campus-guide/audio/${language}/common/${point.audioFileName}`;
}

function MissingImage({ title }: { title: string }) {
  return (
    <div className="flex h-full min-h-[180px] w-full items-center justify-center bg-[linear-gradient(135deg,#f0f9ff,#e0f2fe)] text-[#0d315c] border-2 border-dashed border-blue-100 rounded-lg">
      <div className="text-center p-6">
        <div className="relative mx-auto mb-4 h-16 w-16 flex items-center justify-center rounded-2xl bg-white shadow-sm">
          <FaMagic className="text-2xl text-[#019e6e] animate-pulse" />
        </div>
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d315c] opacity-40">Coming Soon</p>
        <p className="mt-1 text-sm font-black uppercase tracking-[0.1em] text-[#019e6e]">{title || "Campus image"}</p>
      </div>
    </div>
  );
}

function PointImage({ src, title }: { src?: string; title: string }) {
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    setFailed(false);
  }, [src]);

  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence mode="wait">
        {!src || failed ? (
          <motion.div
            key="missing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="h-full w-full"
          >
            <MissingImage title={title} />
          </motion.div>
        ) : (
          <motion.img
            key={src}
            src={src}
            alt={title}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full w-full object-cover"
            onError={() => setFailed(true)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function CampusGuide() {
  const [guide, setGuide] = useState<GuideContent | null>(null);
  const [contentError, setContentError] = useState(false);
  const [screen, setScreen] = useState<Screen>("welcome");
  const [language, setLanguage] = useState<Language>("en");
  const [tourType, setTourType] = useState<"physical" | "virtual">("physical");
  const [activePointId, setActivePointId] = useState("");
  const [footerMinimized, setFooterMinimized] = useState(true);
  const [completedIds, setCompletedIds] = useState<Set<string>>(() => new Set());
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioMessage, setAudioMessage] = useState("");
  const [endedAudio, setEndedAudio] = useState<{ kind: AudioKind; pointId?: string } | null>(null);
  const [mapFailed, setMapFailed] = useState(false);
  const [hyderabadTime, setHyderabadTime] = useState("");
  const [isMapZoomed, setIsMapZoomed] = useState(true);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [audioProgress, setAudioProgress] = useState(0);
  const [audioDuration, setAudioDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioKindRef = useRef<AudioKind>("point");
  const audioPointIdRef = useRef<string | undefined>();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);


  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      };
      setHyderabadTime(new Intl.DateTimeFormat("en-US", options).format(new Date()));
    };
    updateTime();
    const interval = setInterval(updateTime, 60000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    let cancelled = false;

    fetch("/campus-guide/data/guide.json", { cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Campus guide content missing");
        return response.json();
      })
      .then((data) => {
        if (!cancelled) setGuide(validateGuide(data));
      })
      .catch(() => {
        if (!cancelled) setContentError(true);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "none";

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (audio.duration) {
        setAudioProgress(audio.currentTime);
        setAudioDuration(audio.duration);
      }
    };
    const handleEnded = () => {
      setIsPlaying(false);
      setAudioProgress(0);
      const ended = { kind: audioKindRef.current, pointId: audioPointIdRef.current };
      setEndedAudio(ended);
      
      if (ended.kind === "point" && ended.pointId) {
        setCompletedIds((current) => new Set(current).add(ended.pointId));
      }
    };
    const handleError = () => {
      setIsPlaying(false);
      if (audioKindRef.current === "point") {
        setAudioMessage(AUDIO_MISSING_MESSAGE);
      }
    };

    audio.addEventListener("play", handlePlay);
    audio.addEventListener("pause", handlePause);
    audio.addEventListener("timeupdate", handleTimeUpdate);
    audio.addEventListener("ended", handleEnded);
    audio.addEventListener("error", handleError);
    audioRef.current = audio;

    return () => {
      audio.pause();
      audio.removeEventListener("play", handlePlay);
      audio.removeEventListener("pause", handlePause);
      audio.removeEventListener("timeupdate", handleTimeUpdate);
      audio.removeEventListener("ended", handleEnded);
      audio.removeEventListener("error", handleError);
      audioRef.current = null;
    };
  }, []);

  const orderedPoints = useMemo(() => {
    if (!guide) return [];
    const byId = new Map(guide.points.map((point) => [point.id, point]));
    const ordered = guide.pointOrder
      .map((id) => byId.get(id))
      .filter((point): point is GuidePoint => Boolean(point));
    return ordered;
  }, [guide]);

  const activeIndex = Math.max(
    0,
    orderedPoints.findIndex((point) => point.id === activePointId)
  );
  const activePoint = orderedPoints[activeIndex];
  const hasPrevious = activeIndex > 0;
  const hasNext = activeIndex >= 0 && activeIndex < orderedPoints.length - 1;
  const isTourComplete =
    orderedPoints.length > 0 && orderedPoints.every((point) => completedIds.has(point.id));
  const activeTitle = localized(activePoint?.title, language, "Campus point");
  const activeTranscript = localized(activePoint?.transcript, language);

  const progressPercentage = useMemo(() => {
    if (!orderedPoints.length) return 0;
    return Math.round((completedIds.size / orderedPoints.length) * 100);
  }, [completedIds.size, orderedPoints.length]);

  const filteredPoints = useMemo(() => {
    if (!searchQuery.trim()) return orderedPoints;
    const q = searchQuery.toLowerCase();
    return orderedPoints.filter((p) => {
      const title = localized(p.title, language).toLowerCase();
      return title.includes(q);
    });
  }, [orderedPoints, searchQuery, language]);

  const stopAudio = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.removeAttribute("src");
    audio.load();
    setIsPlaying(false);
  };

  const playAudio = async ({
    src,
    kind,
    pointId,
    silentOnMissing = false,
  }: {
    src: string;
    kind: AudioKind;
    pointId?: string;
    silentOnMissing?: boolean;
  }) => {
    const audio = audioRef.current;
    if (!audio || !src) {
      if (!silentOnMissing) setAudioMessage(AUDIO_MISSING_MESSAGE);
      return;
    }

    audioKindRef.current = kind;
    audioPointIdRef.current = pointId;
    setAudioMessage("");
    setEndedAudio(null);

    const absoluteSrc = new URL(src, window.location.href).href;
    if (audio.src !== absoluteSrc) {
      audio.pause();
      audio.src = src;
      audio.load();
    }

    try {
      await audio.play();
    } catch {
      setIsPlaying(false);
      if (!silentOnMissing) setAudioMessage(AUDIO_MISSING_MESSAGE);
    }
  };

  const startTour = () => {
    const firstPoint = orderedPoints[0];
    setCompletedIds(new Set());
    
    if (firstPoint) {
      setActivePointId(firstPoint.id);
      setScreen("map");
      setAudioMessage("");
      setEndedAudio(null);
    } else {
      setScreen("map");
    }
  };

  const activatePoint = (pointId: string) => {
    const point = orderedPoints.find((item) => item.id === pointId);
    stopAudio();
    setActivePointId(pointId);
    setAudioMessage("");
    setEndedAudio(null);
    setIsSidebarOpen(false); // Auto-close sidebar on mobile/interaction to clear map

    if (point) {
      void playAudio({
        src: pointAudioPath(language, point),
        kind: "point",
        pointId: point.id,
      });
    }
  };

  const movePoint = (direction: -1 | 1) => {
    const nextPoint = orderedPoints[activeIndex + direction];
    if (nextPoint) activatePoint(nextPoint.id);
  };

  const playCurrentPoint = () => {
    if (!activePoint) return;
    const audio = audioRef.current;
    const src = pointAudioPath(language, activePoint);
    const absoluteSrc = src ? new URL(src, window.location.href).href : "";

    if (
      audio &&
      audio.src === absoluteSrc &&
      audio.currentTime > 0 &&
      !audio.ended
    ) {
      void audio.play().catch(() => setAudioMessage(AUDIO_MISSING_MESSAGE));
      return;
    }

    void playAudio({ src, kind: "point", pointId: activePoint.id });
  };

  const toggleAudio = () => {
    if (isPlaying) {
      audioRef.current?.pause();
      return;
    }

    const audio = audioRef.current;
    if (audio?.src && audio.currentTime > 0 && !audio.ended) {
      void audio.play().catch(() => setAudioMessage(AUDIO_MISSING_MESSAGE));
      return;
    }

    playCurrentPoint();
  };

  if (contentError) {
    return (
      <main className="min-h-[60vh] bg-[#f8fbff] px-5 py-20">
        <div className="smru-container">
          <div className="cut-corner-panel border border-slate-200 bg-white p-8 text-center shadow-[0_18px_50px_rgba(13,49,92,0.08)]">
            <p className="text-lg font-black text-[#0d315c]">{CONTENT_ERROR_MESSAGE}</p>
          </div>
        </div>
      </main>
    );
  }

  if (!guide) {
    return (
      <main className="min-h-[60vh] bg-[#f8fbff] px-5 py-20">
        <div className="smru-container">
          <div className="h-56 animate-pulse cut-corner-panel bg-slate-100" />
        </div>
      </main>
    );
  }

  return (
    <div className="fixed inset-0 z-[5000] flex flex-col bg-white overflow-hidden font-outfit">
      {/* App Header / Navigation Bar */}
      <header className="flex h-16 shrink-0 items-center justify-between border-b border-slate-100 bg-white px-4 md:px-8">
        <div className="flex items-center gap-3">
          <img src={logo.src} alt="SMRU Logo" className="h-8 w-auto sm:h-10" />
          <div className="h-6 w-px bg-slate-200" />
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[#0d315c] sm:text-xs">
            Campus <span className="text-[#019e6e]">Expedition</span>
          </p>
        </div>
        
        <button
          type="button"
          onClick={() => {
            stopAudio();
            window.location.href = "/";
          }}
          className="flex items-center gap-2 rounded-full border border-slate-200 bg-white px-4 py-2 text-[10px] font-black uppercase tracking-widest text-[#0d315c] transition hover:bg-red-50 hover:text-red-600 hover:border-red-100 sm:px-6 sm:py-2.5 sm:text-xs"
        >
          <span>Exit App</span>
        </button>
      </header>

      {/* Main App Content Scroll Area */}
      <main className="flex-1 overflow-y-auto">
        {!guide ? (
          <div className="flex h-full flex-col items-center justify-center p-8 text-center">
            <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-[#019e6e] border-t-transparent" />
            <p className="text-sm font-bold text-slate-500">Initializing Experience...</p>
          </div>
        ) : screen === "welcome" ? (
          <section className="relative flex min-h-full flex-col items-center justify-center p-6 text-center">
            <div className="absolute inset-0 z-0 opacity-[0.15]">
              <img src={guide.mapImage} alt="" className="h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-white" />
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="relative z-10 max-w-2xl"
            >
              <span className="inline-block rounded-full bg-[#019e6e]/10 px-4 py-1 text-[10px] font-black uppercase tracking-[0.2em] text-[#019e6e]">
                Institutional Guide
              </span>
              <h1 className="mt-6 text-4xl font-black uppercase tracking-tight text-[#0d315c] md:text-6xl">
                Explore <br /> <span className="text-[#019e6e]">SMRU Campus</span>
              </h1>
              <p className="mx-auto mt-6 max-w-lg text-sm font-semibold leading-relaxed text-slate-600 md:text-lg">
                {localized(guide.welcome.subtitle, language)}
              </p>
              
              <button
                type="button"
                onClick={() => setScreen("tourType")}
                className="mt-10 inline-flex items-center gap-3 rounded-full bg-[#0d315c] px-10 py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-2xl transition hover:bg-[#019e6e] hover:scale-105 active:scale-95"
              >
                Enter Experience <FaChevronRight />
              </button>
            </motion.div>
          </section>
        ) : screen === "tourType" ? (
          <section className="flex min-h-full flex-col items-center justify-center p-6 bg-[#f8fbff]">
            <div className="w-full max-w-4xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black uppercase text-[#0d315c]">Choose Your Mode</h2>
                <p className="mt-2 text-sm font-bold text-slate-400">Select how you want to experience SMRU</p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  { id: "physical", icon: FaWalking, label: "Physical Tour", desc: "For visitors currently on campus with audio navigation." },
                  { id: "virtual", icon: FaDesktop, label: "Virtual Tour", desc: "Explore from anywhere with high-res imagery." }
                ].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => {
                      setTourType(type.id as any);
                      setScreen("language");
                    }}
                    className="group flex flex-col items-center rounded-3xl border-2 border-transparent bg-white p-8 text-center shadow-lg transition-all hover:border-[#019e6e] hover:shadow-2xl"
                  >
                    <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-50 text-2xl text-[#0d315c] transition-colors group-hover:bg-[#019e6e] group-hover:text-white">
                      <type.icon />
                    </div>
                    <h3 className="text-xl font-black uppercase text-[#0d315c]">{type.label}</h3>
                    <p className="mt-2 text-sm font-semibold text-slate-500">{type.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          </section>
        ) : screen === "language" ? (
          <section className="flex min-h-full flex-col items-center justify-center p-6 bg-[#f8fbff]">
            <div className="w-full max-w-xl">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-black uppercase text-[#0d315c]">Select Language</h2>
                <p className="mt-2 text-sm font-bold text-slate-400">Available narrations for your tour</p>
              </div>

              <div className="grid gap-3">
                {LANGUAGES.map((l) => (
                  <button
                    key={l.code}
                    onClick={() => {
                      setLanguage(l.code);
                      setScreen("preview");
                    }}
                    className="flex items-center justify-between rounded-2xl border-2 border-transparent bg-white px-6 py-5 text-left transition-all hover:border-[#019e6e] hover:shadow-xl"
                  >
                    <span className="text-lg font-black text-[#0d315c]">{l.label}</span>
                    <FaChevronRight className="text-slate-200" />
                  </button>
                ))}
              </div>
              
              <button 
                onClick={() => setScreen("tourType")}
                className="mt-8 w-full text-xs font-black uppercase tracking-widest text-slate-400 hover:text-[#0d315c]"
              >
                Go Back
              </button>
            </div>
          </section>
        ) : screen === "preview" ? (
          <section className="smru-container py-12">
            <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-[#019e6e]">Ready to Start</span>
                <h2 className="mt-4 text-4xl font-black uppercase text-[#0d315c] md:text-5xl">
                  {localized(guide.welcome.title, language, "SMRU Campus Guide")}
                </h2>
                <p className="mt-6 text-sm font-semibold leading-relaxed text-slate-600 md:text-lg">
                  {localized(guide.welcome.subtitle, language)}
                </p>
                
                <div className="mt-8 grid grid-cols-3 gap-4">
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400">Mode</p>
                    <p className="mt-1 text-xs font-black text-[#0d315c] uppercase">{tourType}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400">Voice</p>
                    <p className="mt-1 text-xs font-black text-[#0d315c] uppercase">{LANGUAGES.find(l => l.code === language)?.label}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4 text-center">
                    <p className="text-[9px] font-black uppercase text-slate-400">Points</p>
                    <p className="mt-1 text-xs font-black text-[#0d315c] uppercase">{orderedPoints.length}</p>
                  </div>
                </div>

                <div className="mt-10 flex gap-4">
                  <button
                    onClick={startTour}
                    className="flex-1 rounded-2xl bg-[#0d315c] py-5 text-sm font-black uppercase tracking-[0.2em] text-white shadow-xl transition hover:bg-[#019e6e]"
                  >
                    Start Experience
                  </button>
                  <button
                    onClick={() => setScreen("language")}
                    className="rounded-2xl border border-slate-200 bg-white px-8 py-5 text-sm font-black uppercase text-[#0d315c]"
                  >
                    Back
                  </button>
                </div>
              </div>

              <div className="overflow-hidden rounded-[2rem] shadow-2xl">
                <img src={guide.mapImage} alt="Map" className="h-full w-full object-cover" />
              </div>
            </div>
          </section>
        ) : (
          <section className="smru-container relative pb-48 pt-8">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#0d315c] text-white shadow-lg">
                  {tourType === "physical" ? <FaWalking /> : <FaDesktop />}
                </div>
                <div>
                  <h2 className="text-xl font-black uppercase text-[#0d315c]">
                    {tourType === "physical" ? "On-Ground Navigator" : "Virtual Experience"}
                  </h2>
                  <p className="text-[10px] font-black uppercase tracking-widest text-[#019e6e]">
                    Institutional Mode active
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-6 rounded-2xl bg-[#f8fbff] px-6 py-3 ring-1 ring-slate-100">
                <div className="flex flex-col items-end">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Global Progress</span>
                  <div className="mt-1.5 h-1 w-32 overflow-hidden rounded-full bg-slate-200">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${progressPercentage}%` }}
                      className="h-full bg-[#019e6e]" 
                    />
                  </div>
                </div>
                <span className="text-xl font-black text-[#0d315c]">{progressPercentage}%</span>
              </div>
            </div>

            <div className="grid gap-8 lg:grid-cols-[1fr_400px]">
              <div className="space-y-6">
                <div className="relative overflow-hidden border-y border-slate-200 bg-[#0d315c] shadow-2xl md:rounded-[3rem] md:border-x">
                  {/* Map Controls */}
                  <div className="absolute right-6 top-6 z-40 flex flex-col gap-3">
                    <button
                      type="button"
                      onClick={() => setIsMapZoomed(!isMapZoomed)}
                      className={["flex h-12 w-12 items-center justify-center rounded-2xl border border-white/50 bg-white/80 text-[#0d315c] shadow-xl backdrop-blur-md transition-all hover:scale-110", isMapZoomed ? "text-[#019e6e] ring-2 ring-[#019e6e]/20" : ""].join(" ")}
                      title="Toggle Zoom"
                    >
                      <FaMagic />
                    </button>
                  </div>

                  <div 
                    ref={mapContainerRef} 
                    className="relative aspect-[3/4] w-full overflow-hidden bg-[#0d315c] shadow-inner md:aspect-[1200/760] md:rounded-[3rem] flex items-center justify-center"
                  >
                    <motion.div
                      drag={isMapZoomed}
                      dragConstraints={mapContainerRef}
                      dragElastic={0.05}
                      animate={{
                        scale: isMapZoomed ? MAP_ZOOM_SCALE : 1,
                        x: isMapZoomed && activePoint ? `${(50 - activePoint.mapX) * MAP_ZOOM_SCALE}%` : "0%",
                        y: isMapZoomed && activePoint ? `${(50 - activePoint.mapY) * MAP_ZOOM_SCALE}%` : "0%",
                      }}
                      transition={{ type: "spring", stiffness: 45, damping: 25 }}
                      className="relative aspect-[1200/760] min-h-full min-w-full shrink-0 cursor-grab active:cursor-grabbing touch-none"
                    >
                      {!mapFailed && guide.mapImage ? (
                        <img 
                          src={guide.mapImage} 
                          alt="Campus Satellite" 
                          className="absolute inset-0 h-full w-full object-cover opacity-90 brightness-110 contrast-110" 
                        />
                      ) : (
                        <MissingImage title="Campus map" />
                      )}

                      {orderedPoints.map((point) => {
                        const originalIndex = orderedPoints.findIndex((p) => p.id === point.id);
                        const status = point.id === activePoint?.id ? "active" : completedIds.has(point.id) ? "completed" : "upcoming";
                        
                        return (
                          <button
                            key={point.id}
                            onClick={() => activatePoint(point.id)}
                            className={[
                              "absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center p-4 sm:p-6 transition-all duration-300 cursor-pointer group/marker",
                              status === "active" ? "z-30 scale-125" : status === "completed" ? "z-20" : "z-10 hover:z-[9999]",
                            ].join(" ")}
                            style={{ 
                              left: `${point.mapX}%`, 
                              top: `${point.mapY}%`,
                            }}
                          >
                            <span 
                              className={[
                                "flex items-center justify-center rounded-full transition-all duration-300 shadow-xl",
                                isMapZoomed ? "scale-[0.8] md:scale-[0.6]" : "scale-100",
                                status === "active" ? "h-9 w-9 border-2 border-white bg-[#019e6e] text-white ring-4 ring-[#019e6e]/20" :
                                status === "completed" ? "h-4 w-4 border border-white/50 bg-[#0d315c]" :
                                "h-3.5 w-3.5 border border-white/30 bg-white/50 backdrop-blur-sm group-hover/marker:scale-150 group-hover/marker:bg-white group-hover/marker:text-[#0d315c] group-hover/marker:ring-4 group-hover/marker:ring-white/30"
                              ].join(" ")}
                            >
                              <span className={["font-black transition-all", status === "active" ? "text-[10px]" : "group-hover/marker:text-[8px] text-[0px]"].join(" ")}>
                                {status === "completed" ? <FaCheck className="text-[6px]" /> : originalIndex + 1}
                              </span>
                            </span>
                          </button>
                        );
                      })}
                    </motion.div>
                  </div>
                </div>

                {activePoint && (
                  <article id="active-point-details" className="rounded-[2.5rem] border border-slate-100 bg-white p-6 shadow-xl scroll-mt-24 md:p-10">
                    <div className="grid gap-10 md:grid-cols-[1fr_1.5fr]">
                      <div className="h-64 overflow-hidden rounded-3xl shadow-lg md:h-full">
                        <PointImage src={activePoint.image} title={activeTitle} />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#019e6e] text-[10px] font-black text-white">
                            {activeIndex + 1}
                          </span>
                          <p className="text-[10px] font-black uppercase tracking-widest text-[#019e6e]">Location Detail</p>
                        </div>
                        <h2 className="mt-4 text-3xl font-black uppercase tracking-tight text-[#0d315c] md:text-4xl">
                          {activeTitle}
                        </h2>
                        <div className="mt-6 max-h-[300px] overflow-y-auto pr-4 text-sm font-semibold leading-relaxed text-slate-600 md:text-base">
                          {activeTranscript}
                        </div>
                        
                        <div className="mt-8 border-t border-slate-50 pt-8">
                           <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Campus Highlights</p>
                           <div className="flex flex-wrap gap-2">
                              {["Smart Infrastructure", "Safety Optimized", "Accessibility Ready", "Digital Enabled"].map(h => (
                                <span key={h} className="rounded-full bg-slate-50 px-4 py-2 text-[10px] font-bold text-[#0d315c] ring-1 ring-slate-100">{h}</span>
                              ))}
                           </div>
                        </div>
                      </div>
                    </div>
                  </article>
                )}
              </div>

              <aside className="space-y-6">
                <div className="rounded-[2.5rem] border border-slate-100 bg-white p-8 shadow-xl">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black uppercase tracking-[0.2em] text-[#0d315c]">Route Queue</h3>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-[10px] font-bold text-[#0d315c]">
                      {filteredPoints.length}
                    </div>
                  </div>
                  
                  <div className="relative mt-6">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300" />
                    <input
                      type="text"
                      placeholder="Search landmarks..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full rounded-2xl bg-slate-50 py-4 pl-12 pr-4 text-base font-bold outline-none ring-1 ring-slate-100 focus:ring-[#019e6e]/30 md:text-xs"
                    />
                  </div>

                  <div className="mt-6 max-h-[500px] space-y-2 overflow-y-auto pr-1">
                    {filteredPoints.map((point) => {
                      const idx = orderedPoints.findIndex(p => p.id === point.id);
                      const status = point.id === activePoint?.id ? "active" : completedIds.has(point.id) ? "completed" : "upcoming";
                      return (
                        <button
                          key={point.id}
                          onClick={() => activatePoint(point.id)}
                          className={["flex w-full items-center gap-4 rounded-2xl border p-4 text-left transition-all", status === "active" ? "border-[#019e6e] bg-[#019e6e]/5 shadow-sm" : "border-slate-50 bg-white hover:bg-slate-50"].join(" ")}
                        >
                          <span className={["flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-[10px] font-black", status === "active" ? "bg-[#019e6e] text-white" : status === "completed" ? "bg-[#0d315c] text-white" : "bg-slate-100 text-slate-400"].join(" ")}>
                            {status === "completed" ? <FaCheck className="text-[8px]" /> : idx + 1}
                          </span>
                          <span className={["truncate text-xs font-bold", status === "active" ? "text-[#0d315c]" : "text-slate-500"].join(" ")}>{localized(point.title, language)}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="rounded-[2.5rem] bg-[linear-gradient(135deg,#0d315c,#092342)] p-8 text-white shadow-2xl">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-60">Hyderabad Hub</p>
                  <div className="mt-4 flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-2xl text-[#ffaf3a]">
                      <FaCloudSun />
                    </div>
                    <div>
                      <p className="text-2xl font-black">{hyderabadTime}</p>
                      <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">32°C • Mostly Sunny</p>
                    </div>
                  </div>
                </div>
              </aside>
            </div>
          </section>
        )}
      </main>

      {/* Persistent App Controller - Only visible during the active tour */}
      {screen === "map" && (
        <footer className="fixed inset-x-4 bottom-4 z-[6000] mx-auto max-w-2xl lg:inset-x-auto lg:right-8 lg:max-w-md">
          <div className={["rounded-[2.5rem] border border-white/60 bg-white/95 shadow-[0_30px_100px_rgba(13,49,92,0.3)] backdrop-blur-2xl transition-all duration-500", footerMinimized ? "p-2" : "p-4"].join(" ")}>
            
            {/* Minimal State Toggle */}
            <button 
              onClick={() => setFooterMinimized(!footerMinimized)}
              className="absolute -top-3 left-1/2 -translate-x-1/2 flex h-6 w-12 items-center justify-center rounded-full bg-[#0d315c] text-white shadow-lg transition-transform hover:scale-110 active:scale-95"
            >
              {footerMinimized ? <FaChevronUp className="text-[10px]" /> : <FaChevronDown className="text-[10px]" />}
            </button>

            {!footerMinimized && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-4 px-2 pt-2"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-400">Expedition Timeline</span>
                  <span className="text-[10px] font-black text-[#019e6e]">{activeIndex + 1} / {orderedPoints.length}</span>
                </div>
                <div className="flex h-1.5 w-full gap-0.5 overflow-hidden rounded-full bg-slate-100">
                  {orderedPoints.map((p) => {
                    const status = p.id === activePoint?.id ? "active" : completedIds.has(p.id) ? "completed" : "upcoming";
                    return (
                      <button
                        key={p.id}
                        onClick={() => activatePoint(p.id)}
                        className={["h-full flex-1 transition-all duration-300", status === "active" ? "bg-[#019e6e] scale-y-150" : status === "completed" ? "bg-[#0d315c]" : "bg-slate-200"].join(" ")}
                      />
                    );
                  })}
                </div>
                {/* Audio Line */}
                <div className="relative mt-3 h-[1px] w-full bg-slate-100">
                  <motion.div animate={{ width: `${(audioProgress / (audioDuration || 1)) * 100}%` }} className="h-full bg-[#019e6e]" />
                </div>
              </motion.div>
            )}

            <div className="flex items-center gap-3">
              {!footerMinimized && (
                <button
                  onClick={() => movePoint(-1)}
                  disabled={!hasPrevious}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 disabled:opacity-30"
                >
                  <FaChevronLeft />
                </button>
              )}
              
              <div className={["flex flex-1 items-center gap-2 rounded-full bg-[#f8fbff] p-1 ring-1 ring-slate-100 overflow-hidden", footerMinimized ? "h-12" : ""].join(" ")}>
                <button
                  onClick={toggleAudio}
                  className={["flex items-center justify-center rounded-full bg-[#0d315c] text-white shadow-xl shrink-0", footerMinimized ? "h-10 w-10" : "h-12 w-12"].join(" ")}
                >
                  {isPlaying ? <FaPause className="text-[10px]" /> : <FaPlay className="ml-0.5 text-[10px]" />}
                </button>
                <div className="flex-1 overflow-hidden pr-4">
                  <p className="truncate text-[10px] font-black uppercase tracking-widest text-[#0d315c]">{activeTitle}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-[9px] font-bold text-slate-400">{Math.floor(audioProgress)}s / {Math.floor(audioDuration)}s</p>
                  </div>
                </div>
                {footerMinimized && (
                  <button 
                    onClick={() => setFooterMinimized(false)}
                    className="mr-2 text-[10px] font-black uppercase tracking-widest text-[#019e6e]"
                  >
                    Open
                  </button>
                )}
              </div>

              {!footerMinimized && (
                <button
                  onClick={() => movePoint(1)}
                  disabled={!hasNext}
                  className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-[#019e6e] text-white shadow-xl disabled:opacity-30"
                >
                  <FaChevronRight />
                </button>
              )}
            </div>
            
            {!footerMinimized && activePoint && (
              <motion.div 
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                className="mt-4 flex items-center gap-4 border-t border-slate-50 pt-4"
              >
                <div className="h-10 w-10 shrink-0 overflow-hidden rounded-xl bg-slate-50">
                  <PointImage src={activePoint.image} title={activeTitle} />
                </div>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate text-xs font-black uppercase text-[#0d315c]">{activeTitle}</p>
                  <button 
                    onClick={() => document.getElementById("active-point-details")?.scrollIntoView({ behavior: "smooth" })}
                    className="text-[9px] font-black text-[#019e6e] underline"
                  >
                    View Full Gallery
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </footer>
      )}

      {/* Collapsible Action Sidebar - Zero Gap Sticky */}
      <div className="fixed right-0 top-1/2 z-[7000] -translate-y-1/2">
        <motion.div
          animate={{ x: isSidebarOpen ? 0 : "100%" }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="relative flex items-center"
        >
          {/* Toggle Arrow - Perfectly Flush to Right-Full */}
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="absolute right-full flex h-12 w-8 items-center justify-center rounded-l-xl bg-[#0d315c] text-white shadow-xl transition-all hover:bg-[#019e6e] hover:w-10"
          >
            <motion.div animate={{ rotate: isSidebarOpen ? 180 : 0 }}>
              <FaChevronLeft className="text-xs" />
            </motion.div>
          </button>

          {/* Action Buttons - Compact Website Style */}
          <div className="flex flex-col gap-1 p-1 pr-0">
            {[
              { icon: <FaWhatsapp />, label: "WHATSAPP", color: "#d1f9d6", text: "#1b5e20", href: "https://wa.me/919010455590" },
              { icon: <FaPhoneAlt />, label: "CALL US", color: "#fff9c4", text: "#827717", href: "tel:+919010455590" },
              { icon: <FaPaperPlane />, label: "APPLY", color: "#e3f2fd", text: "#0d47a1", href: "https://apply.smru.edu.in" },
              { icon: <FaQuestionCircle />, label: "ENQUIRY", color: "#ffe0b2", text: "#e65100", href: "https://smru.edu.in/contact" },
              { icon: <FaFileDownload />, label: "BROCHURE", color: "#ffcdd2", text: "#b71c1c", href: "#" },
            ].map((action) => (
              <a
                key={action.label}
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{ 
                  backgroundColor: action.color, 
                  color: action.text,
                  clipPath: "polygon(0 0, 80% 0, 100% 20%, 100% 100%, 20% 100%, 0 80%)"
                }}
                className="group flex h-16 w-16 flex-col items-center justify-center gap-1 shadow-md transition-all hover:scale-105 active:scale-95"
              >
                <div className="text-xl transition-transform group-hover:scale-110">{action.icon}</div>
                <span className="text-[7px] font-black uppercase tracking-tight text-center px-1">{action.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
