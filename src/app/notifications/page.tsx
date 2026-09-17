"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";
import { WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";

export type NotificationFrequency = "INSTANT" | "DAILY" | "WEEKLY" | "OFF";

export interface NotificationItem {
  id: string;
  category: "PRODUCTION" | "LOGISTICS" | "EDITORIAL" | "CALENDAR";
  categoryLabel: string;
  title: string;
  code: string;
  description: string;
  channels: ("WhatsApp" | "Email" | "SMS")[];
  defaultFrequency: NotificationFrequency;
  frequencyDescriptions: Record<NotificationFrequency, string>;
}

const NOTIFICATIONS: NotificationItem[] = [
  {
    id: "teaser_screening",
    category: "PRODUCTION",
    categoryLabel: "CINEMA PRODUCTION",
    title: "Narrative Teaser & First Look Screening",
    code: "NOTIF-01",
    description:
      "Direct password-protected screening links for the bride and groom to preview the 60-second 4K cinematic narrative teaser.",
    channels: ["WhatsApp", "Email"],
    defaultFrequency: "INSTANT",
    frequencyDescriptions: {
      INSTANT: "Instant VIP ping via WhatsApp (+91 9124885729) & Email as soon as the edit finishes final render.",
      DAILY: "Delivered in your consolidated daily evening production digest at 19:00 IST.",
      WEEKLY: "Included in your consolidated Monday morning studio production briefing.",
      OFF: "Muted. Access screening links manually via your VIP client screening portal.",
    },
  },
  {
    id: "master_4k_vault",
    category: "PRODUCTION",
    categoryLabel: "CINEMA PRODUCTION",
    title: "4K Master ProRes & Photo Archive Upload",
    code: "NOTIF-02",
    description:
      "Cryptographic download keys and streaming access for the full-length feature film, speech edits, and 1,000+ curated photo archive.",
    channels: ["Email", "WhatsApp"],
    defaultFrequency: "INSTANT",
    frequencyDescriptions: {
      INSTANT: "Instant alert the second full-resolution ProRes files and high-res stills finish AWS cloud synchronization.",
      DAILY: "Summarized in your end-of-day production log on upload completion date.",
      WEEKLY: "Included in the next scheduled weekly studio delivery summary.",
      OFF: "Muted. Download assets manually by entering your commission credentials.",
    },
  },
  {
    id: "color_grading_milestones",
    category: "PRODUCTION",
    categoryLabel: "CINEMA PRODUCTION",
    title: "Color Grading & Optical Sound Timing",
    code: "NOTIF-03",
    description:
      "Milestone progress reports as your footage advances through DaVinci Resolve color timing, acoustic cleanup, and custom score licensing.",
    channels: ["Email"],
    defaultFrequency: "DAILY",
    frequencyDescriptions: {
      INSTANT: "Real-time updates each time our senior colorist or sound designer completes a reel check.",
      DAILY: "Consolidated daily summary of editing progress from our Bhubaneswar grading suite.",
      WEEKLY: "Weekly progress summary delivered every Monday morning at 09:00 IST.",
      OFF: "Muted. No interim progress pings; wait for finished screening releases.",
    },
  },
  {
    id: "crew_call_sheets",
    category: "LOGISTICS",
    categoryLabel: "CEREMONY LOGISTICS",
    title: "Crew Call Sheets & Itinerary Sync",
    code: "NOTIF-04",
    description:
      "Arrival times, drone flight clearances, and lead cinematographer contact cards for Haldi, Mandap, and Grand Sangeet.",
    channels: ["WhatsApp", "SMS"],
    defaultFrequency: "INSTANT",
    frequencyDescriptions: {
      INSTANT: "Immediate WhatsApp dispatch 48h & 24h before each event with crew arrival times and venue contact.",
      DAILY: "Daily logistics summary sent the morning before each scheduled shoot day.",
      WEEKLY: "Weekly schedule outline sent 7 days prior to wedding week.",
      OFF: "Muted. Cinematography crew will coordinate solely with your on-site wedding planner.",
    },
  },
  {
    id: "weather_golden_hour",
    category: "LOGISTICS",
    categoryLabel: "CEREMONY LOGISTICS",
    title: "Weather Briefings & Golden Hour Light Windows",
    code: "NOTIF-05",
    description:
      "Atmospheric conditions, sunset timing, and natural light projections for outdoor mandap vows and seaside Puri pre-wedding portraiture.",
    channels: ["WhatsApp"],
    defaultFrequency: "DAILY",
    frequencyDescriptions: {
      INSTANT: "Real-time ambient light alerts 2 hours prior to sunset portrait sessions.",
      DAILY: "Morning atmospheric briefing with sunrise/sunset golden hour timestamps for Bhubaneswar & Puri.",
      WEEKLY: "7-day meteorological forecast before your multi-day celebration.",
      OFF: "Muted. Lighting conditions assessed on-site by the director of photography.",
    },
  },
  {
    id: "journal_essays",
    category: "EDITORIAL",
    categoryLabel: "STUDIO DISPATCHES",
    title: "Journal Monographs & Cinema Field Notes",
    code: "NOTIF-06",
    description:
      "Critical monographs on analog color science, mandap acoustics, and behind-the-scenes essays published by our studio atelier.",
    channels: ["Email"],
    defaultFrequency: "WEEKLY",
    frequencyDescriptions: {
      INSTANT: "Receive new essays and behind-the-scenes monographs immediately upon publication.",
      DAILY: "Sent with your evening studio digest whenever a new monograph goes live.",
      WEEKLY: "Curated weekly digest featuring newly published cinema essays.",
      OFF: "Muted. Read articles at your leisure on the WEDDING FILMS Journal page.",
    },
  },
  {
    id: "calendar_openings",
    category: "CALENDAR",
    categoryLabel: "ANNUAL RESERVATIONS",
    title: "Seasonal Calendar Openings & Booking Openings",
    code: "NOTIF-07",
    description:
      "Advance priority invitations when calendar commissions open for future wedding seasons (November through February).",
    channels: ["Email", "WhatsApp"],
    defaultFrequency: "INSTANT",
    frequencyDescriptions: {
      INSTANT: "Immediate priority alert when wedding booking dates open for the next season.",
      DAILY: "Included in the daily studio announcement digest on launch week.",
      WEEKLY: "Included in the general weekly studio availability briefing.",
      OFF: "Muted. Inquire manually via the Contact page.",
    },
  },
];

const FREQUENCY_OPTIONS: { value: NotificationFrequency; label: string; badge: string; hint: string }[] = [
  { value: "INSTANT", label: "Real-Time (Instant)", badge: "LIVE", hint: "Dispatched immediately upon event" },
  { value: "DAILY", label: "Daily Digest", badge: "19:00 IST", hint: "Combined evening summary" },
  { value: "WEEKLY", label: "Weekly Summary", badge: "MONDAY", hint: "Consolidated Monday report" },
  { value: "OFF", label: "Muted (Off)", badge: "MUTED", hint: "No automated pings sent" },
];

export default function NotificationSettingsPage() {
  const [preferences, setPreferences] = useState<Record<string, NotificationFrequency>>(() => {
    const initial: Record<string, NotificationFrequency> = {};
    NOTIFICATIONS.forEach((item) => {
      initial[item.id] = item.defaultFrequency;
    });
    return initial;
  });

  const [clientEmail, setClientEmail] = useState("concierge-client@weddingfilms.in");
  const [clientPhone, setClientPhone] = useState("+91 9124885729");
  const [viewMode, setViewMode] = useState<"CARDS" | "MATRIX">("CARDS");
  const [selectedCategory, setSelectedCategory] = useState<string>("ALL");
  const [saveStatus, setSaveStatus] = useState<string | null>(null);

  // Load from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wf_notification_preferences");
      if (saved) {
        setPreferences(JSON.parse(saved));
      }
    } catch {
      // Ignore local storage errors in private browsing
    }
  }, []);

  const handleFrequencyChange = (id: string, freq: NotificationFrequency) => {
    setPreferences((prev) => {
      const updated = { ...prev, [id]: freq };
      try {
        localStorage.setItem("wf_notification_preferences", JSON.stringify(updated));
      } catch {
        // storage fallback
      }
      return updated;
    });
    triggerSaveToast();
  };

  const applyPreset = (type: "RECOMMENDED" | "VIP_REALTIME" | "ESSENTIAL") => {
    const updated: Record<string, NotificationFrequency> = {};
    NOTIFICATIONS.forEach((item) => {
      if (type === "VIP_REALTIME") {
        updated[item.id] = "INSTANT";
      } else if (type === "ESSENTIAL") {
        if (item.category === "PRODUCTION") {
          updated[item.id] = "INSTANT";
        } else {
          updated[item.id] = "OFF";
        }
      } else {
        // RECOMMENDED
        updated[item.id] = item.defaultFrequency;
      }
    });

    setPreferences(updated);
    try {
      localStorage.setItem("wf_notification_preferences", JSON.stringify(updated));
    } catch {
      // fallback
    }
    triggerSaveToast("Preset applied and synced successfully");
  };

  const triggerSaveToast = (msg = "Preferences updated & synchronized") => {
    setSaveStatus(msg);
    setTimeout(() => {
      setSaveStatus(null);
    }, 2800);
  };

  const filteredNotifications =
    selectedCategory === "ALL"
      ? NOTIFICATIONS
      : NOTIFICATIONS.filter((n) => n.category === selectedCategory);

  // Calculate frequency counts
  const counts = {
    INSTANT: Object.values(preferences).filter((v) => v === "INSTANT").length,
    DAILY: Object.values(preferences).filter((v) => v === "DAILY").length,
    WEEKLY: Object.values(preferences).filter((v) => v === "WEEKLY").length,
    OFF: Object.values(preferences).filter((v) => v === "OFF").length,
  };

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-5xl">
          {/* Sub-Navigation */}
          <div className="mb-10">
            <HelpSuiteNav />
          </div>

          {/* Header */}
          <header className="mb-12">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="label label-accent tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
                CLIENT PREFERENCES // FREQUENCY LEDGER
              </span>
              <span className="hidden sm:inline-block w-8 h-px bg-champagne-deep/40" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-600" />
                </span>
                SYNC ACTIVE · VIP DISPATCH DESK
              </span>
            </div>
            <h1 className="font-display text-4xl sm:text-6xl lg:text-7xl mb-4 tracking-tight text-balance">
              NOTIFICATION SETTINGS.
            </h1>
            <p className="body-large text-charcoal/80 max-w-3xl font-ui leading-relaxed">
              Define the exact dispatch frequency for each notification type. Every setting is explicitly linked to its milestone channel so you never miss a screening cut or endure unnecessary pings.
            </p>
          </header>

          {/* Toast Notification */}
          {saveStatus && (
            <div className="fixed bottom-8 right-8 z-50 bg-ink text-paper px-5 py-3 rounded-md shadow-2xl border border-champagne-deep/40 font-mono text-xs flex items-center gap-3 animate-in fade-in slide-in-from-bottom-4 duration-300">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>{saveStatus}</span>
            </div>
          )}

          {/* Client Destination & Channel Bar */}
          <div className="mb-10 p-6 bg-paper-warm border border-ink/10 rounded-lg shadow-xs">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div className="space-y-1">
                <p className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold">
                  VERIFIED DISPATCH DESTINATIONS
                </p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-mono pt-1">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-paper border border-ink/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="text-charcoal/60">WHATSAPP:</span>
                    <strong className="text-ink">{clientPhone}</strong>
                  </div>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-paper border border-ink/10">
                    <span className="w-2 h-2 rounded-full bg-emerald-600" />
                    <span className="text-charcoal/60">EMAIL:</span>
                    <strong className="text-ink">{clientEmail}</strong>
                  </div>
                </div>
              </div>

              {/* Frequency Summary Chips */}
              <div className="flex items-center gap-2 flex-wrap text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded bg-paper border border-ink/10 text-charcoal/80">
                  <strong className="text-ink">{counts.INSTANT}</strong> Real-Time
                </span>
                <span className="px-2.5 py-1 rounded bg-paper border border-ink/10 text-charcoal/80">
                  <strong className="text-ink">{counts.DAILY}</strong> Daily
                </span>
                <span className="px-2.5 py-1 rounded bg-paper border border-ink/10 text-charcoal/80">
                  <strong className="text-ink">{counts.WEEKLY}</strong> Weekly
                </span>
                <span className="px-2.5 py-1 rounded bg-paper border border-ink/10 text-charcoal/80">
                  <strong className="text-ink">{counts.OFF}</strong> Muted
                </span>
              </div>
            </div>
          </div>

          {/* Presets & View Controls Bar */}
          <div className="mb-10 p-4 sm:p-5 bg-paper-warm/60 border border-ink/10 rounded-lg flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Quick Presets */}
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              <span className="font-mono text-xs uppercase tracking-wider text-charcoal/80 font-bold mr-1">
                PRESETS:
              </span>
              <button
                onClick={() => applyPreset("RECOMMENDED")}
                className="btn font-mono text-xs px-3.5 py-2 rounded-xs bg-paper border border-ink/25 hover:border-ink hover:bg-paper-warm !text-ink font-bold transition-all min-h-[38px] cursor-pointer touch-manipulation"
              >
                Studio Recommended
              </button>
              <button
                onClick={() => applyPreset("VIP_REALTIME")}
                className="btn font-mono text-xs px-3.5 py-2 rounded-xs bg-paper border border-ink/25 hover:border-ink hover:bg-paper-warm !text-ink font-bold transition-all min-h-[38px] cursor-pointer touch-manipulation"
              >
                VIP (All Instant)
              </button>
              <button
                onClick={() => applyPreset("ESSENTIAL")}
                className="btn font-mono text-xs px-3.5 py-2 rounded-xs bg-paper border border-ink/25 hover:border-ink hover:bg-paper-warm !text-ink font-bold transition-all min-h-[38px] cursor-pointer touch-manipulation"
              >
                Essential (Deliveries Only)
              </button>
            </div>

            {/* Layout Mode Toggle: Cards vs Matrix */}
            <div className="flex items-center gap-1 bg-paper p-1 rounded-xs border border-ink/15 self-start md:self-auto">
              <button
                onClick={() => setViewMode("CARDS")}
                className={`btn font-mono text-xs px-3.5 py-2 rounded-xs transition-all min-h-[36px] cursor-pointer touch-manipulation ${
                  viewMode === "CARDS"
                    ? "bg-ink !text-white font-bold shadow-xs"
                    : "!text-charcoal hover:!text-ink font-semibold"
                }`}
              >
                Card Layout
              </button>
              <button
                onClick={() => setViewMode("MATRIX")}
                className={`btn font-mono text-xs px-3.5 py-2 rounded-xs transition-all min-h-[36px] cursor-pointer touch-manipulation ${
                  viewMode === "MATRIX"
                    ? "bg-ink !text-white font-bold shadow-xs"
                    : "!text-charcoal hover:!text-ink font-semibold"
                }`}
              >
                Matrix Ledger
              </button>
            </div>
          </div>

          {/* Category Filter Tabs */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap pb-4 mb-8 border-b border-ink/10 font-mono text-xs">
            {["ALL", "PRODUCTION", "LOGISTICS", "EDITORIAL", "CALENDAR"].map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`btn px-4 py-2 rounded-full transition-all uppercase tracking-wider min-h-[38px] cursor-pointer touch-manipulation ${
                  selectedCategory === cat
                    ? "bg-ink !text-white font-bold shadow-xs"
                    : "bg-paper-warm !text-charcoal border border-ink/20 hover:border-ink hover:!text-ink font-semibold"
                }`}
              >
                {cat === "ALL" ? "All Notification Types" : cat}
              </button>
            ))}
          </div>

          {/* VIEW MODE 1: DEDICATED EDITORIAL CARDS (Maximum Clarity) */}
          {viewMode === "CARDS" && (
            <div className="space-y-8">
              {filteredNotifications.map((item) => {
                const currentFreq = preferences[item.id] || item.defaultFrequency;
                const activeDesc = item.frequencyDescriptions[currentFreq];

                return (
                  <article
                    key={item.id}
                    className="p-6 sm:p-8 bg-paper-warm/40 border border-ink/15 hover:border-champagne-deep/60 rounded-lg transition-all duration-300 shadow-xs"
                    aria-labelledby={`notif-heading-${item.id}`}
                  >
                    {/* Top Row: Code, Category, Channels */}
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-ink/10 mb-5">
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className="font-mono text-xs font-bold text-champagne-deep tracking-widest">
                          {item.code}
                        </span>
                        <span className="px-2.5 py-0.5 rounded-full bg-champagne/15 text-champagne-deep border border-champagne-deep/30 font-mono text-[10px] font-bold uppercase tracking-wider">
                          {item.categoryLabel}
                        </span>
                      </div>

                      {/* Delivery Channels */}
                      <div className="flex items-center gap-2 text-xs font-mono text-charcoal/70">
                        <span className="text-[10px] uppercase tracking-wider text-charcoal/50">CHANNELS:</span>
                        {item.channels.map((ch) => (
                          <span
                            key={ch}
                            className="px-2 py-0.5 rounded bg-paper border border-ink/10 text-charcoal/90 text-[10px] font-semibold"
                          >
                            {ch}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Middle Row: Title and Description */}
                    <div className="mb-6 space-y-2">
                      <h2
                        id={`notif-heading-${item.id}`}
                        className="font-display text-2xl sm:text-3xl text-ink tracking-tight"
                      >
                        {item.title}
                      </h2>
                      <p className="text-sm font-ui text-charcoal/80 leading-relaxed max-w-3xl">
                        {item.description}
                      </p>
                    </div>

                    {/* Explicit Frequency Selector Block */}
                    <div className="pt-5 border-t border-ink/10">
                      <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
                        <p className="font-mono text-[11px] uppercase tracking-widest text-champagne-deep font-bold flex items-center gap-1.5">
                          <span>⚙</span>
                          <span>ASSIGN FREQUENCY FOR THIS NOTIFICATION TYPE:</span>
                        </p>
                        <span className="font-mono text-xs text-charcoal/60">
                          Active: <strong className="text-ink">{currentFreq}</strong>
                        </span>
                      </div>

                      {/* The 4 Segmented Frequency Pills */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                        {FREQUENCY_OPTIONS.map((opt) => {
                          const isSelected = currentFreq === opt.value;
                          return (
                            <button
                              key={opt.value}
                              type="button"
                              onClick={() => handleFrequencyChange(item.id, opt.value)}
                              className={`btn p-3.5 rounded-xs text-left transition-all border flex flex-col justify-between gap-2 cursor-pointer touch-manipulation ${
                                isSelected
                                  ? "bg-ink !text-white border-ink ring-2 ring-champagne-deep/40 shadow-sm"
                                  : "bg-paper border-ink/15 !text-charcoal hover:border-ink hover:bg-paper-warm"
                              }`}
                            >
                              <div className="flex items-center justify-between w-full">
                                <span className={`font-mono text-xs font-bold tracking-wider ${isSelected ? "!text-white" : "!text-ink"}`}>
                                  {isSelected ? "✓ " : ""}{opt.label}
                                </span>
                                <span
                                  className={`font-mono text-[9px] px-1.5 py-0.5 rounded-xs uppercase font-bold ${
                                    isSelected
                                      ? "bg-white/20 !text-white"
                                      : "bg-ink/5 !text-charcoal"
                                  }`}
                                >
                                  {opt.badge}
                                </span>
                              </div>
                              <p className={`text-[11px] font-ui leading-relaxed ${isSelected ? "!text-white/85" : "text-charcoal/70"}`}>
                                {opt.hint}
                              </p>
                            </button>
                          );
                        })}
                      </div>

                      {/* Dynamic Explainer Banner */}
                      <div className="mt-4 p-3 bg-paper border-l-3 border-champagne-deep rounded-r-md text-xs font-mono text-charcoal/85 flex items-start gap-2.5">
                        <span className="text-champagne-deep font-bold mt-0.5">▶</span>
                        <div>
                          <strong className="text-ink font-semibold">
                            ACTIVE BEHAVIOR FOR {item.code}:
                          </strong>{" "}
                          <span>{activeDesc}</span>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* VIEW MODE 2: SCANNABLE FREQUENCY MATRIX LEDGER */}
          {viewMode === "MATRIX" && (
            <div className="overflow-x-auto border border-ink/15 rounded-lg bg-paper">
              <table className="w-full text-left border-collapse min-w-[720px]">
                <thead>
                  <tr className="bg-paper-warm border-b border-ink/10 font-mono text-[11px] uppercase tracking-wider text-charcoal/70">
                    <th className="py-4 px-6 w-2/5">Notification Type</th>
                    <th className="py-4 px-3 text-center">Real-Time</th>
                    <th className="py-4 px-3 text-center">Daily</th>
                    <th className="py-4 px-3 text-center">Weekly</th>
                    <th className="py-4 px-3 text-center">Muted</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-ink/10 text-xs font-ui">
                  {filteredNotifications.map((item) => {
                    const currentFreq = preferences[item.id] || item.defaultFrequency;

                    return (
                      <tr
                        key={item.id}
                        className="hover:bg-paper-warm/50 transition-colors group"
                      >
                        {/* Notification Details */}
                        <td className="py-4 px-6">
                          <div className="space-y-1">
                            <div className="flex items-center gap-2">
                              <span className="font-mono text-[10px] font-bold text-champagne-deep">
                                {item.code}
                              </span>
                              <span className="font-bold text-ink text-sm">
                                {item.title}
                              </span>
                            </div>
                            <p className="text-xs text-charcoal/70 line-clamp-1">
                              {item.description}
                            </p>
                            <div className="flex items-center gap-1.5 pt-1">
                              {item.channels.map((ch) => (
                                <span
                                  key={ch}
                                  className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-paper-warm border border-ink/10 text-charcoal/70"
                                >
                                  {ch}
                                </span>
                              ))}
                            </div>
                          </div>
                        </td>

                        {/* Frequency Cells */}
                        {(["INSTANT", "DAILY", "WEEKLY", "OFF"] as NotificationFrequency[]).map((freq) => {
                          const isSelected = currentFreq === freq;

                          return (
                            <td
                              key={freq}
                              onClick={() => handleFrequencyChange(item.id, freq)}
                              className="py-4 px-3 text-center cursor-pointer select-none"
                            >
                              <div
                                className={`inline-flex items-center justify-center px-3.5 py-1.5 rounded-full font-mono text-xs transition-all ${
                                  isSelected
                                    ? "bg-ink !text-white font-bold shadow-xs ring-2 ring-champagne-deep/40"
                                    : "bg-paper-warm/80 border border-ink/15 !text-charcoal hover:border-ink hover:!text-ink font-semibold"
                                }`}
                              >
                                {isSelected ? "● ACTIVE" : "○ SELECT"}
                              </div>
                            </td>
                          );
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Bottom Action Ledger */}
          <div className="mt-16 p-8 bg-paper-warm border border-ink/10 rounded-lg flex flex-col sm:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-display text-xl text-ink mb-1">
                Custom Dispatch Assistance
              </h3>
              <p className="text-xs font-ui text-charcoal/75 max-w-md">
                Have specific rehearsal dinner or travel itinerary dates? Our concierge team can manually configure customized timing directly with your family.
              </p>
            </div>
            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-6 py-3 bg-[#25D366] text-ink font-mono text-xs font-bold tracking-wider uppercase rounded-xs hover:opacity-95 transition-opacity"
            >
              <span>CHAT WITH CONCIERGE</span>
              <span>↗</span>
            </a>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
