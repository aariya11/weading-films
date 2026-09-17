"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  Clock,
  Truck,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  Search,
  ShieldCheck,
  PhoneCall,
  Video,
  FileCheck2,
  Share2,
} from "lucide-react";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";
import { WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

export type OrderStatus = "IN_PRODUCTION" | "SCREENING_READY" | "DISPATCHED" | "DELIVERED";

export interface TrackingStep {
  title: string;
  subtitle: string;
  timestamp: string;
  status: "COMPLETED" | "CURRENT" | "UPCOMING";
}

export interface DeliverableItem {
  name: string;
  status: "READY" | "IN_PROGRESS" | "PENDING";
  format: string;
}

export interface CommissionOrder {
  id: string;
  clientNames: string;
  commissionType: string;
  eventDate: string;
  venue: string;
  status: OrderStatus;
  statusLabel: string;
  statusDetail: string;
  progressPercent: number;
  estDelivery: string;
  daysRemaining?: number;
  courierProvider?: string;
  trackingNumber?: string;
  deliverables: DeliverableItem[];
  steps: TrackingStep[];
  leadProducer: string;
  screeningUrl?: string;
}

const ORDERS: CommissionOrder[] = [
  {
    id: "WF-8492",
    clientNames: "GIRIJA & SUMITRA",
    commissionType: "Master Wedding Cinema & Heritage 4K Archive",
    eventDate: "Nov 12, 2024",
    venue: "Bhubaneswar Heritage Estate & Puri Coastline",
    status: "IN_PRODUCTION",
    statusLabel: "COLOR GRADING & SOUND TIMING",
    statusDetail: "Senior colorist applying 35mm print film emulation in DaVinci Resolve suite.",
    progressPercent: 85,
    estDelivery: "Nov 28, 2024",
    daysRemaining: 8,
    leadProducer: "Subham Mohanty",
    screeningUrl: "/work/girija-sumitra",
    deliverables: [
      { name: "60-Sec 4K Narrative Teaser", status: "READY", format: "ProRes 422 HQ & Vimeo VIP" },
      { name: "25-Min Theatrical Feature Film", status: "IN_PROGRESS", format: "4K Master (Reel 03 in Grading)" },
      { name: "1,200 Curated Heritage Photo Suite", status: "READY", format: "AWS Vault High-Res Download" },
      { name: "SanDisk 4TB Extreme Pro RAW SSD", status: "IN_PROGRESS", format: "Offline Drive Preparation" },
      { name: "14×11 Italian Tuscan Leather Album", status: "IN_PROGRESS", format: "Handcrafted Bindery Suite" },
    ],
    steps: [
      {
        title: "Commission Signed & Retainer Settled",
        subtitle: "Master coverage agreement executed for Bhubaneswar mandap & pre-wedding.",
        timestamp: "Oct 02, 2024",
        status: "COMPLETED",
      },
      {
        title: "Principal Cinematography Wrapped",
        subtitle: "Captured across 4 ceremonial days with 4K cinema primes and aerial drone.",
        timestamp: "Nov 14, 2024",
        status: "COMPLETED",
      },
      {
        title: "Rough Cut Assembly & Audio De-Noising",
        subtitle: "Multi-track audio synchronized with live captured Vedic Sanskrit vows.",
        timestamp: "Nov 18, 2024",
        status: "COMPLETED",
      },
      {
        title: "DaVinci Resolve Color Timing & Score",
        subtitle: "Grading warm golden hour tones and custom licensed acoustic score.",
        timestamp: "Currently Active (85% Finished)",
        status: "CURRENT",
      },
      {
        title: "Private VIP Screening Link Release",
        subtitle: "Password-protected Vimeo VIP link emailed to bride and groom.",
        timestamp: "Est. Nov 24, 2024",
        status: "UPCOMING",
      },
      {
        title: "Physical Master SSD & Album Dispatch",
        subtitle: "Shipped via insured Bluedart Air Express in velvet presentation casing.",
        timestamp: "Est. Nov 28, 2024",
        status: "UPCOMING",
      },
    ],
  },
  {
    id: "WF-8501",
    clientNames: "ANANYA & ROHIT",
    commissionType: "The Bride Monograph & Mandap Vows Cinema",
    eventDate: "Oct 28, 2024",
    venue: "Mayfair Lagoon & Mukteshwar Enclave, Bhubaneswar",
    status: "DISPATCHED",
    statusLabel: "PHYSICAL DELIVERABLES IN TRANSIT",
    statusDetail: "Insured courier out for delivery to client residence. Signature required upon receipt.",
    progressPercent: 95,
    estDelivery: "Tomorrow by 18:00 IST",
    courierProvider: "Bluedart Air Express",
    trackingNumber: "BD-90218471",
    leadProducer: "Priyanka Mishra",
    deliverables: [
      { name: "60-Sec Narrative Teaser", status: "READY", format: "Delivered Online" },
      { name: "Theatrical Feature Film (22 Min)", status: "READY", format: "Vault Download Active" },
      { name: "Italian Leather Monograph Album", status: "READY", format: "In Courier Box" },
      { name: "Custom Engraved Gold USB Archive", status: "READY", format: "In Courier Box" },
    ],
    steps: [
      {
        title: "Commission & Ceremonial Shoot",
        subtitle: "Multi-camera wedding cinema and fine art bridal portraits.",
        timestamp: "Oct 28, 2024",
        status: "COMPLETED",
      },
      {
        title: "Complete Color Grading & Sound Mix",
        subtitle: "Full theatrical feature film approved by client.",
        timestamp: "Nov 10, 2024",
        status: "COMPLETED",
      },
      {
        title: "Digital Masters Released in Vault",
        subtitle: "All ProRes cuts and photo downloads delivered.",
        timestamp: "Nov 12, 2024",
        status: "COMPLETED",
      },
      {
        title: "Album & SSD Packaging Finalized",
        subtitle: "Hand-inspected, foil-stamped, and packed in luxury hardwood case.",
        timestamp: "Nov 15, 2024",
        status: "COMPLETED",
      },
      {
        title: "Dispatched via Bluedart Air Express",
        subtitle: "Tracking BD-90218471 out for delivery to client residence.",
        timestamp: "Nov 16, 2024 (Active In Transit)",
        status: "CURRENT",
      },
    ],
  },
  {
    id: "WF-8410",
    clientNames: "PRIYANKA & ABHISHEK",
    commissionType: "Coastal Romance & Royal Sangeet Theatrical Film",
    eventDate: "Oct 15, 2024",
    venue: "Puri Coastal Resort & Golden Beach, Odisha",
    status: "DELIVERED",
    statusLabel: "DELIVERED & PERMANENTLY VAULTED",
    statusDetail: "All digital masters, photo albums, and raw camera negatives successfully delivered.",
    progressPercent: 100,
    estDelivery: "Delivered on Nov 05, 2024",
    leadProducer: "Subham Mohanty",
    deliverables: [
      { name: "Complete Film Suite (Teaser + Feature)", status: "READY", format: "Vault Active (Permanent)" },
      { name: "1,500 Full-Resolution Photo Negative Archive", status: "READY", format: "Client SSD Vaulted" },
      { name: "Handcrafted 16×12 Royal Photo Album", status: "READY", format: "Delivered to Residence" },
    ],
    steps: [
      {
        title: "Wedding Cinema Commission Completed",
        subtitle: "Puri coastal sunset shoot and palace sangeet.",
        timestamp: "Oct 15, 2024",
        status: "COMPLETED",
      },
      {
        title: "Post-Production & Sound Design",
        subtitle: "10-bit color grading and live ceremony vows.",
        timestamp: "Oct 26, 2024",
        status: "COMPLETED",
      },
      {
        title: "Delivered to Client Hands",
        subtitle: "Signed delivery receipt confirmed.",
        timestamp: "Nov 05, 2024",
        status: "COMPLETED",
      },
    ],
  },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<"ALL" | "ACTIVE" | "DELIVERED">("ALL");
  const [expandedOrders, setExpandedOrders] = useState<Record<string, boolean>>({
    "WF-8492": true, // active order expanded by default for easy mobile viewing
  });
  const [copyToast, setCopyToast] = useState<string | null>(null);

  const orderRefs = useRef<Record<string, HTMLElement | null>>({});

  const toggleExpand = (id: string) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleCopy = (text: string, label = "Tracking number") => {
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(text);
      setCopyToast(`${label} copied to clipboard`);
      setTimeout(() => setCopyToast(null), 2500);
    }
  };

  const scrollToOrder = (id: string) => {
    setExpandedOrders((prev) => ({ ...prev, [id]: true }));
    const el = orderRefs.current[id];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const filteredOrders = ORDERS.filter((order) => {
    // Filter tab check
    if (selectedFilter === "ACTIVE" && (order.status === "DELIVERED")) return false;
    if (selectedFilter === "DELIVERED" && order.status !== "DELIVERED") return false;

    // Search query check
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      order.id.toLowerCase().includes(q) ||
      order.clientNames.toLowerCase().includes(q) ||
      order.venue.toLowerCase().includes(q) ||
      (order.trackingNumber && order.trackingNumber.toLowerCase().includes(q))
    );
  });

  const leadActiveOrder = ORDERS.find((o) => o.status === "IN_PRODUCTION" || o.status === "DISPATCHED") || ORDERS[0];

  return (
    <>
      <Navigation />
      <CustomCursor />

      {/* ─────────────────────────────────────────────────────────────
          STICKY MOBILE QUICK-STATUS THUMB CAPSULE (Mobile Only)
          Keeps order status and tracking 100% reachable within thumb reach
          ───────────────────────────────────────────────────────────── */}
      <div className="fixed bottom-4 inset-x-4 z-40 sm:hidden select-none">
        <div className="p-3 bg-ink/95 backdrop-blur-lg text-paper border border-champagne-deep/50 rounded-lg shadow-2xl flex items-center justify-between gap-3 animate-in fade-in slide-in-from-bottom-3 duration-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <span className="relative flex h-2.5 w-2.5 shrink-0">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 font-mono text-[10px] text-champagne">
                <span className="font-bold">{leadActiveOrder.id}</span>
                <span>·</span>
                <span className="truncate">{leadActiveOrder.clientNames}</span>
              </div>
              <p className="font-mono text-[11px] font-bold text-paper truncate">
                {leadActiveOrder.statusLabel} ({leadActiveOrder.progressPercent}%)
              </p>
            </div>
          </div>

          <button
            onClick={() => scrollToOrder(leadActiveOrder.id)}
            className="shrink-0 px-3.5 py-2 bg-champagne text-ink font-mono text-[11px] font-bold tracking-wider uppercase rounded-sm shadow-xs touch-manipulation min-h-[40px] flex items-center gap-1"
          >
            <span>TRACK ↓</span>
          </button>
        </div>
      </div>

      {/* Copy Toast Alert */}
      {copyToast && (
        <div className="fixed top-20 right-4 sm:right-8 z-50 bg-ink text-paper px-4 py-2.5 rounded-md shadow-2xl border border-champagne/40 font-mono text-xs flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{copyToast}</span>
        </div>
      )}

      <main id="main-content" className="flex-1 bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-4xl px-4 sm:px-6">
          {/* Sub Navigation */}
          <div className="mb-8">
            <HelpSuiteNav />
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-12">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="label label-accent tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
                CLIENT PORTAL // PRODUCTION DISPATCH LEDGER
              </span>
              <span className="hidden sm:inline-block w-8 h-px bg-champagne-deep/40" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                LIVE PRODUCTION TRACKING
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl mb-3 sm:mb-4 tracking-tight text-balance">
              COMMISSION ORDERS.
            </h1>
            <p className="body-large text-charcoal/80 max-w-2xl font-ui text-sm sm:text-base leading-relaxed">
              Track the live progress of your wedding films, 4K color grading, raw footage vaults, and physical Tuscan leather album deliveries.
            </p>
          </header>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE-FIRST FAST LOOKUP & SEARCH BAR
              ───────────────────────────────────────────────────────────── */}
          <div className="mb-8 p-4 sm:p-5 bg-paper-warm border border-ink/10 rounded-lg shadow-xs space-y-3">
            <label htmlFor="order-search" className="block font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold">
              QUICK ORDER LOOKUP // ENTER COMMISSION ID OR NAME:
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-charcoal/50 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="order-search"
                type="search"
                inputMode="text"
                placeholder="Search by ID (e.g. WF-8492) or couple name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink placeholder:text-charcoal/40 focus:outline-none focus:border-champagne-deep focus:ring-1 focus:ring-champagne-deep min-h-[44px] touch-manipulation"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-xs text-charcoal/50 hover:text-ink px-2 py-1"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Quick-Tap Order Chips (One-touch navigation on mobile) */}
            <div className="flex items-center gap-2 flex-wrap pt-1">
              <span className="font-mono text-[10px] uppercase text-charcoal/50">QUICK JUMP:</span>
              {ORDERS.map((o) => (
                <button
                  key={o.id}
                  onClick={() => scrollToOrder(o.id)}
                  className="px-2.5 py-1 rounded-full bg-paper border border-ink/10 hover:border-champagne-deep font-mono text-[11px] text-charcoal/80 flex items-center gap-1.5 touch-manipulation min-h-[32px]"
                >
                  <span className="font-bold text-ink">{o.id}</span>
                  <span className="text-[10px] text-charcoal/50 hidden xs:inline">({o.clientNames.split("&")[0].trim()})</span>
                </button>
              ))}
            </div>
          </div>

          {/* ─────────────────────────────────────────────────────────────
              MOBILE SWIPEABLE SEGMENTED FILTER TABS
              ───────────────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 pb-3 mb-6 border-b border-ink/10 overflow-x-auto no-scrollbar touch-pan-x">
            {[
              { id: "ALL", label: `ALL ORDERS (${ORDERS.length})` },
              { id: "ACTIVE", label: "IN PRODUCTION (2)" },
              { id: "DELIVERED", label: "DELIVERED & VAULTED (1)" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedFilter(tab.id as typeof selectedFilter)}
                className={cn(
                  "px-4 py-2 rounded-full font-mono text-xs tracking-wider uppercase whitespace-nowrap transition-all touch-manipulation min-h-[40px] flex items-center justify-center",
                  selectedFilter === tab.id
                    ? "bg-ink text-paper font-bold shadow-xs"
                    : "bg-paper-warm text-charcoal/70 border border-ink/10 hover:text-ink"
                )}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* ─────────────────────────────────────────────────────────────
              ORDER CARDS LIST (Optimized for Mobile Screens)
              ───────────────────────────────────────────────────────────── */}
          <div className="space-y-6 sm:space-y-8">
            {filteredOrders.length === 0 ? (
              <div className="p-10 text-center bg-paper-warm border border-ink/10 rounded-lg">
                <p className="font-mono text-sm text-charcoal/70 mb-2">No commission orders matched &ldquo;{searchQuery}&rdquo;</p>
                <button
                  onClick={() => setSearchQuery("")}
                  className="font-mono text-xs text-champagne-deep font-bold uppercase underline"
                >
                  Clear search query
                </button>
              </div>
            ) : (
              filteredOrders.map((order) => {
                const isExpanded = !!expandedOrders[order.id];

                // Badge styling by status
                const statusBadge = {
                  IN_PRODUCTION: "bg-amber-100 text-amber-900 border-amber-300/80",
                  SCREENING_READY: "bg-emerald-100 text-emerald-900 border-emerald-300/80",
                  DISPATCHED: "bg-blue-100 text-blue-900 border-blue-300/80",
                  DELIVERED: "bg-emerald-100 text-emerald-900 border-emerald-300/80",
                }[order.status];

                return (
                  <article
                    key={order.id}
                    ref={(el) => {
                      orderRefs.current[order.id] = el;
                    }}
                    className={cn(
                      "bg-paper-warm/50 border rounded-lg transition-all duration-300 overflow-hidden shadow-xs",
                      order.status === "IN_PRODUCTION"
                        ? "border-champagne-deep/40 hover:border-champagne-deep shadow-sm"
                        : "border-ink/10 hover:border-ink/30"
                    )}
                    aria-labelledby={`order-title-${order.id}`}
                  >
                    {/* Card Header Banner */}
                    <div className="p-5 sm:p-7 bg-paper border-b border-ink/10 space-y-4">
                      {/* Top Meta Line */}
                      <div className="flex items-center justify-between gap-3 flex-wrap">
                        <div className="flex items-center gap-2.5">
                          <span className="font-mono text-sm sm:text-base font-bold text-ink tracking-wider">
                            #{order.id}
                          </span>
                          <button
                            onClick={() => handleCopy(order.id, "Order ID")}
                            className="p-1 rounded text-charcoal/50 hover:text-ink hover:bg-paper-warm transition-colors"
                            title="Copy Order ID"
                            aria-label="Copy Order ID"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>

                        {/* Status Chip */}
                        <div className={cn("px-3 py-1 rounded-full font-mono text-[10px] sm:text-xs font-bold tracking-wider uppercase border inline-flex items-center gap-1.5", statusBadge)}>
                          <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
                          <span>{order.statusLabel}</span>
                        </div>
                      </div>

                      {/* Couple & Commission Details */}
                      <div>
                        <h2
                          id={`order-title-${order.id}`}
                          className="font-display text-2xl sm:text-3xl text-ink tracking-tight mb-1"
                        >
                          {order.clientNames}
                        </h2>
                        <p className="font-mono text-xs text-charcoal/70">
                          {order.commissionType}
                        </p>
                        <p className="text-xs text-charcoal/60 font-ui mt-1">
                          {order.venue} · Event: {order.eventDate}
                        </p>
                      </div>

                      {/* Progress Bar & ETA */}
                      <div className="pt-2 space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="text-charcoal/70">
                            PRODUCTION COMPLETION: <strong className="text-ink">{order.progressPercent}%</strong>
                          </span>
                          <span className="text-champagne-deep font-bold">
                            EST: {order.estDelivery}
                          </span>
                        </div>

                        {/* Visual Progress Bar */}
                        <div className="w-full h-2 rounded-full bg-ink/10 overflow-hidden">
                          <div
                            className="h-full bg-champagne-deep transition-all duration-700 rounded-full"
                            style={{ width: `${order.progressPercent}%` }}
                          />
                        </div>
                      </div>

                      {/* Courier Tracking Banner (If Dispatched) */}
                      {order.courierProvider && order.trackingNumber && (
                        <div className="p-3.5 bg-blue-50 border border-blue-200 rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
                          <div className="flex items-center gap-2">
                            <Truck className="w-4 h-4 text-blue-800 shrink-0" />
                            <div>
                              <span className="text-blue-900 font-bold">{order.courierProvider}</span>
                              <span className="text-blue-700 ml-1">Waybill: #{order.trackingNumber}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => handleCopy(order.trackingNumber || "", "Waybill number")}
                            className="px-3 py-1.5 bg-blue-800 text-white rounded text-[11px] font-bold uppercase tracking-wider hover:bg-blue-900 self-start sm:self-auto touch-manipulation min-h-[36px] flex items-center gap-1.5"
                          >
                            <Copy className="w-3 h-3" />
                            <span>COPY WAYBILL</span>
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Collapsible Action Header */}
                    <div className="px-5 sm:px-7 py-3.5 bg-paper-warm/80 border-b border-ink/10 flex items-center justify-between">
                      <button
                        onClick={() => toggleExpand(order.id)}
                        className="w-full flex items-center justify-between font-mono text-xs text-ink font-semibold touch-manipulation min-h-[44px]"
                      >
                        <span className="flex items-center gap-2">
                          <span>{isExpanded ? "HIDE COMPLETE TIMELINE & ASSETS" : "VIEW COMPLETE TIMELINE & ASSETS"}</span>
                          <span className="text-[10px] text-charcoal/60">({order.steps.length} Milestones)</span>
                        </span>
                        {isExpanded ? <ChevronUp className="w-4 h-4 text-charcoal" /> : <ChevronDown className="w-4 h-4 text-charcoal" />}
                      </button>
                    </div>

                    {/* Expandable Body (Vertical Timeline + Deliverables) */}
                    {isExpanded && (
                      <div className="p-5 sm:p-7 space-y-8 bg-paper/40 animate-in fade-in duration-200">
                        {/* ───────────────────────────────────────────────
                            VERTICAL TRACKING STEPPER (Mobile Optimized)
                            ─────────────────────────────────────────────── */}
                        <div>
                          <p className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold mb-4 flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5" />
                            <span>POST-PRODUCTION MILESTONES // AUDIT TRAIL</span>
                          </p>

                          <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-0.5 before:bg-ink/15">
                            {order.steps.map((step, idx) => {
                              const isDone = step.status === "COMPLETED";
                              const isCurrent = step.status === "CURRENT";

                              return (
                                <div key={idx} className="relative group">
                                  {/* Step Circle Indicator */}
                                  <div
                                    className={cn(
                                      "absolute -left-6 sm:-left-8 top-0.5 w-5 h-5 rounded-full flex items-center justify-center transition-all",
                                      isDone && "bg-emerald-600 text-white shadow-xs",
                                      isCurrent && "bg-champagne-deep text-white ring-4 ring-champagne-deep/20",
                                      !isDone && !isCurrent && "bg-paper border-2 border-ink/20 text-charcoal/40"
                                    )}
                                  >
                                    {isDone && <CheckCircle2 className="w-3.5 h-3.5" />}
                                    {isCurrent && <span className="w-2 h-2 rounded-full bg-white animate-pulse" />}
                                    {!isDone && !isCurrent && <span className="w-1.5 h-1.5 rounded-full bg-charcoal/30" />}
                                  </div>

                                  <div className="space-y-1">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                                      <h4
                                        className={cn(
                                          "font-display text-base text-ink",
                                          isCurrent && "font-bold text-champagne-deep"
                                        )}
                                      >
                                        {step.title}
                                      </h4>
                                      <span className="font-mono text-[10px] text-charcoal/60 uppercase">
                                        {step.timestamp}
                                      </span>
                                    </div>
                                    <p className="text-xs font-ui text-charcoal/75 leading-relaxed">
                                      {step.subtitle}
                                    </p>
                                  </div>
                                </div>
                              );
                            })}
                          </div>
                        </div>

                        {/* Deliverables Checklist */}
                        <div className="pt-6 border-t border-ink/10">
                          <p className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold mb-3 flex items-center gap-1.5">
                            <FileCheck2 className="w-3.5 h-3.5" />
                            <span>DELIVERABLE ASSETS CHECKLIST</span>
                          </p>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {order.deliverables.map((item, i) => (
                              <div
                                key={i}
                                className="p-3 bg-paper border border-ink/10 rounded-md flex items-center justify-between gap-3 text-xs"
                              >
                                <div>
                                  <p className="font-ui font-semibold text-ink">{item.name}</p>
                                  <p className="font-mono text-[10px] text-charcoal/60">{item.format}</p>
                                </div>
                                <span
                                  className={cn(
                                    "font-mono text-[9px] px-2 py-0.5 rounded font-bold uppercase shrink-0",
                                    item.status === "READY"
                                      ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                      : "bg-amber-50 text-amber-900 border border-amber-200"
                                  )}
                                >
                                  {item.status.replaceAll("_", " ")}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Producer & Contact Strip */}
                        <div className="pt-6 border-t border-ink/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-mono">
                          <div>
                            <span className="text-charcoal/60">LEAD CINEMA PRODUCER: </span>
                            <strong className="text-ink">{order.leadProducer}</strong>
                          </div>
                          <span className="text-champagne-deep">BHUBANESWAR POST-PRODUCTION SUITE</span>
                        </div>
                      </div>
                    )}

                    {/* Bottom Sticky Mobile Actions (Full Width Thumb Targets) */}
                    <div className="p-4 sm:p-5 bg-paper border-t border-ink/10 grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <a
                        href={`${WHATSAPP_LINK}&text=Hello%20WEDDING%20FILMS%20team,%20I%20would%20like%20a%20tracking%20update%20on%20Commission%20${order.id}%20(${encodeURIComponent(order.clientNames)})`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3.5 px-4 bg-[#25D366] text-ink font-mono text-xs font-bold tracking-wider uppercase rounded-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2 min-h-[48px] touch-manipulation shadow-xs"
                      >
                        <PhoneCall className="w-4 h-4" />
                        <span>TRACK VIA WHATSAPP (INSTANT) ↗</span>
                      </a>

                      {order.screeningUrl ? (
                        <Link
                          href={order.screeningUrl}
                          className="w-full py-3.5 px-4 bg-ink text-paper font-mono text-xs tracking-wider uppercase rounded-xs hover:bg-charcoal transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation shadow-xs"
                        >
                          <Video className="w-4 h-4" />
                          <span>VIEW SCREENING CUT →</span>
                        </Link>
                      ) : (
                        <button
                          onClick={() => handleCopy(order.id, "Commission ID")}
                          className="w-full py-3.5 px-4 bg-paper-warm text-charcoal border border-ink/15 font-mono text-xs font-semibold tracking-wider uppercase rounded-xs hover:text-ink hover:border-ink/40 transition-colors flex items-center justify-center gap-2 min-h-[48px] touch-manipulation"
                        >
                          <Copy className="w-4 h-4" />
                          <span>COPY COMMISSION ID</span>
                        </button>
                      )}
                    </div>
                  </article>
                );
              })
            )}
          </div>

          {/* Bottom Security & Concierge Assurance */}
          <div className="mt-16 p-6 sm:p-8 bg-paper-warm border border-ink/10 rounded-lg flex flex-col sm:flex-row items-center gap-5 text-center sm:text-left">
            <ShieldCheck className="w-10 h-10 text-champagne-deep shrink-0" />
            <div className="space-y-1">
              <h3 className="font-display text-lg text-ink">
                Encrypted Client Vault & Archive Policy
              </h3>
              <p className="text-xs font-ui text-charcoal/80 leading-relaxed max-w-xl">
                All finished wedding films and RAW digital camera footage are stored in redundant RAID-6 offline storage in our Bhubaneswar studio for 90 days following master delivery.
              </p>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
