"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Building2,
  Gift,
  CheckCircle2,
  Lock,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  PhoneCall,
  Copy,
  Check,
  Printer,
  Calendar,
  MapPin,
  Clock,
  Info,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

export type PaymentMethod = "UPI" | "CARD" | "NETBANKING";

interface GiftOptionsState {
  isGift: boolean;
  recipientNames: string;
  senderName: string;
  calligraphyNote: string;
  boxPackaging: boolean;
  deliveryMethod: "HOME_DELIVERY" | "EVENT_PRESENTATION" | "DIGITAL_VIP";
}

const MAX_CALLIGRAPHY_CHARS = 240;

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("UPI");
  const [upiId] = useState("weddingfilms@hdfcbank");
  const [clientUpiId, setClientUpiId] = useState("");
  const [copiedUpi, setCopiedUpi] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [cardExp, setCardExp] = useState("");
  const [cardCsc, setCardCsc] = useState("");

  // NetBanking fields
  const [selectedBank, setSelectedBank] = useState("HDFC");
  const [otherBank, setOtherBank] = useState("");

  // Gift Options
  const [giftOptions, setGiftOptions] = useState<GiftOptionsState>({
    isGift: false,
    recipientNames: "Sumitra & Girija",
    senderName: "The Mohapatra & Das Family",
    calligraphyNote: "May your sacred vows shine as eternal as the stone spires of Bhubaneswar. With all our love and blessings.",
    boxPackaging: true,
    deliveryMethod: "HOME_DELIVERY",
  });
  const [isGiftExpanded, setIsGiftExpanded] = useState(false);

  // Processing & Success State
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPaymentComplete, setIsPaymentComplete] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  // Order Details
  const order = {
    commissionNumber: "WF-8492",
    packageName: "Master Wedding Cinema & Heritage 4K Archive",
    clientNames: "Sumitra & Girija",
    eventDates: "Nov 28 – Dec 01, 2024 (4 Ceremonial Days)",
    venue: "Bhubaneswar Heritage Estate, Odisha",
    totalFee: 250000,
    retainerDueNow: 75000,
    balanceUponDelivery: 175000,
    deliverables: [
      "25-Min Theatrical 4K Feature Film (DaVinci Resolve Grade)",
      "60-Sec High-Energy Cinematic Narrative Teaser",
      "1,200 Curated Full-Resolution Photo Negative Suite",
      "4TB SanDisk Extreme Pro SSD with RAW 4K Camera Negatives",
      "14×11 Handcrafted Italian Tuscan Leather Heirloom Album",
    ],
  };

  // Card Brand Detection
  const getCardBrand = (num: string) => {
    const clean = num.replace(/\s/g, "");
    if (/^4/.test(clean)) return "VISA";
    if (/^(5[1-5]|2[2-7])/.test(clean)) return "MASTERCARD";
    if (/^(34|37)/.test(clean)) return "AMEX";
    if (/^(60|65|81|82|508)/.test(clean)) return "RUPAY";
    return null;
  };

  const cardBrand = getCardBrand(cardNumber);

  // Handlers for tactile input formatting
  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, "$1 ");
    setCardNumber(formatted);
  };

  const handleCardExpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    if (raw.length >= 3) {
      raw = `${raw.slice(0, 2)}/${raw.slice(2)}`;
    }
    setCardExp(raw);
  };

  const handleCardCscChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setCardCsc(raw);
  };

  const handleCopyUpi = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(upiId);
      setCopiedUpi(true);
      setTimeout(() => setCopiedUpi(false), 2200);
    }
  };

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setTransactionId(`TXN-${Math.random().toString(36).substring(2, 9).toUpperCase()}`);
      setIsPaymentComplete(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 1200);
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  return (
    <>
      <Navigation />
      <CustomCursor />

      <main id="main-content" className="flex-1 bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-5xl px-4 sm:px-6">
          {/* Breadcrumb / Back Link */}
          <div className="mb-6">
            <Link
              href="/orders"
              className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-charcoal/60 hover:text-ink transition-colors group"
            >
              <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
              <span>Back to Commission Orders</span>
            </Link>
          </div>

          {/* Header */}
          <header className="mb-8 sm:mb-12 border-b border-ink/10 pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="flex items-center gap-2.5 mb-2 font-mono text-xs uppercase tracking-widest text-champagne-deep font-semibold">
                <Lock className="w-3.5 h-3.5 text-champagne-deep" />
                <span>ENCRYPTED COMMISSION CHECKOUT // 256-BIT SSL</span>
              </div>
              <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl tracking-tight text-ink">
                REVIEW &amp; PAY.
              </h1>
            </div>

            <div className="text-left md:text-right font-mono text-xs text-charcoal/70 space-y-1">
              <p>COMMISSION ID: <strong className="text-ink font-bold">#{order.commissionNumber}</strong></p>
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded text-[11px] font-semibold">
                <Clock className="w-3 h-3 text-emerald-700" />
                <span>CALENDAR DATES RESERVED FOR 48 HOURS</span>
              </div>
            </div>
          </header>

          {/* ─────────────────────────────────────────────────────────────
              PAYMENT SUCCESS RECEIPT VIEW
              ───────────────────────────────────────────────────────────── */}
          {isPaymentComplete ? (
            <div className="p-8 sm:p-12 bg-paper-warm border-2 border-champagne-deep rounded-lg shadow-xl space-y-8 animate-in fade-in duration-500 text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <p className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold">
                  COMMISSION RETAINER SETTLED // CALENDAR LOCKED
                </p>
                <h2 className="font-display text-3xl sm:text-4xl text-ink">
                  Congratulations, {order.clientNames}!
                </h2>
                <p className="body-small text-charcoal/80 font-ui leading-relaxed">
                  Your ₹{order.retainerDueNow.toLocaleString("en-IN")} production retainer has been securely received. Our cinematography crew is officially reserved for your multi-day celebration in Bhubaneswar.
                </p>
              </div>

              {/* Receipt Ledger Card */}
              <div className="p-5 bg-paper border border-ink/10 rounded-md text-left font-mono text-xs space-y-2.5">
                <div className="flex items-center justify-between pb-2 border-b border-ink/10">
                  <span className="text-charcoal/60">TRANSACTION ID:</span>
                  <strong className="text-ink font-bold tracking-wide">{transactionId}</strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">RETAINER SETTLED:</span>
                  <span className="text-emerald-800 font-bold">₹{order.retainerDueNow.toLocaleString("en-IN")} (PAID)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">BALANCE UPON DELIVERY:</span>
                  <span className="text-charcoal/90">₹{order.balanceUponDelivery.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">COUPLE NAMES:</span>
                  <span className="text-ink font-semibold">{order.clientNames}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">CELEBRATION DATES:</span>
                  <span className="text-ink">{order.eventDates}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-charcoal/60">PAYMENT RAIL:</span>
                  <span className="text-champagne-deep font-bold">{paymentMethod} ESCROW</span>
                </div>
                {giftOptions.isGift && (
                  <div className="pt-2 border-t border-ink/10 text-champagne-deep text-[11px] leading-relaxed">
                    ★ Includes Velvet Hardwood Gift Box &amp; Calligraphy Note from: <strong>{giftOptions.senderName}</strong>
                  </div>
                )}
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="w-full sm:w-auto px-5 py-3.5 bg-paper border border-ink/20 text-ink font-mono text-xs tracking-widest uppercase rounded-xs hover:border-ink hover:bg-paper-warm transition-colors flex items-center justify-center gap-2"
                >
                  <Printer className="w-3.5 h-3.5 text-charcoal/80" />
                  <span>PRINT OFFICIAL RECEIPT</span>
                </button>
                <Link
                  href="/orders"
                  className="w-full sm:w-auto px-6 py-3.5 bg-ink text-paper font-mono text-xs tracking-widest uppercase rounded-xs hover:bg-charcoal transition-colors flex items-center justify-center gap-2"
                >
                  <span>TRACK PRODUCTION STATUS</span>
                  <ArrowRight className="w-3.5 h-3.5 text-champagne" />
                </Link>
                <a
                  href={`${WHATSAPP_LINK}&text=Hello%20WEDDING%20FILMS%20team,%20I%20have%20settled%20the%20retainer%20for%20${encodeURIComponent(order.clientNames)}%20(TXN:%20${transactionId})`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-5 py-3.5 bg-[#25D366] text-ink font-mono text-xs font-bold tracking-widest uppercase rounded-xs hover:opacity-95 transition-opacity flex items-center justify-center gap-2"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>WHATSAPP CONCIERGE ↗</span>
                </a>
              </div>
            </div>
          ) : (
            /* ─────────────────────────────────────────────────────────────
                DISTILLED CHECKOUT VIEW: 2-COLUMN REVIEW & PAY FOCUS
                ───────────────────────────────────────────────────────────── */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
              {/* ─────────────────────────────────────────────────────────
                  FOCUS 1: REVIEW THE ORDER (Left Column, 6 Cols)
                  ───────────────────────────────────────────────────────── */}
              <section
                aria-labelledby="order-review-heading"
                className="lg:col-span-6 space-y-6"
              >
                <div className="p-6 sm:p-8 bg-paper-warm border border-ink/15 rounded-lg space-y-6 shadow-xs">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold">
                        FOCUS 01 // COMMISSION REVIEW
                      </span>
                      <span className="px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase bg-champagne-deep/10 text-champagne-deep font-semibold rounded">
                        CONFIRMED SCOPE
                      </span>
                    </div>
                    <h2
                      id="order-review-heading"
                      className="font-display text-2xl sm:text-3xl text-ink tracking-tight"
                    >
                      {order.packageName}
                    </h2>
                    <div className="mt-2 space-y-1 font-mono text-xs text-charcoal/80">
                      <p className="flex items-center gap-1.5">
                        <span className="font-semibold text-ink">{order.clientNames}</span>
                        <span className="text-charcoal/40">·</span>
                        <span className="flex items-center gap-1 text-charcoal/70">
                          <MapPin className="w-3 h-3 text-champagne-deep" />
                          {order.venue}
                        </span>
                      </p>
                      <p className="flex items-center gap-1 text-champagne-deep font-semibold">
                        <Calendar className="w-3 h-3" />
                        <span>{order.eventDates}</span>
                      </p>
                    </div>
                  </div>

                  {/* Included Deliverables List */}
                  <div className="pt-4 border-t border-ink/10 space-y-3">
                    <div className="flex items-center justify-between">
                      <p className="font-mono text-xs uppercase tracking-wider text-charcoal/70 font-semibold">
                        INCLUDED IN COMMISSION:
                      </p>
                      <span className="font-mono text-[10px] text-charcoal/50">
                        {order.deliverables.length} Deliverables
                      </span>
                    </div>
                    <ul className="space-y-2.5 text-xs font-ui text-charcoal/85">
                      {order.deliverables.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 group">
                          <div className="w-4 h-4 rounded-full bg-emerald-100/70 border border-emerald-300 flex items-center justify-center shrink-0 mt-0.5">
                            <Check className="w-2.5 h-2.5 text-emerald-800" />
                          </div>
                          <span className="group-hover:text-ink transition-colors leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Financial Breakdown Ledger */}
                  <div className="pt-4 border-t border-ink/10 space-y-3 font-mono text-xs">
                    <div className="flex items-center justify-between text-charcoal/70">
                      <span>Full Commission Package:</span>
                      <span className="font-semibold text-ink">₹{order.totalFee.toLocaleString("en-IN")}</span>
                    </div>
                    <div className="flex items-center justify-between text-charcoal/70">
                      <span className="flex items-center gap-1">
                        <span>GST (18% Included):</span>
                        <Info className="w-3 h-3 text-charcoal/40" />
                      </span>
                      <span className="text-emerald-800 font-medium">₹0 (All Taxes Included)</span>
                    </div>
                    <div className="flex items-center justify-between text-charcoal/70">
                      <span>Balance (Due upon Master Delivery):</span>
                      <span className="text-charcoal/90">₹{order.balanceUponDelivery.toLocaleString("en-IN")}</span>
                    </div>

                    {/* Retainer Due Now Callout */}
                    <div className="pt-3.5 border-t border-ink/15 flex items-baseline justify-between text-ink bg-paper/60 p-3.5 rounded border border-champagne-deep/20">
                      <div>
                        <p className="font-bold text-sm sm:text-base tracking-tight">INITIAL PRODUCTION RETAINER</p>
                        <p className="text-[10px] text-charcoal/60 font-mono mt-0.5">30% to confirm exclusive date lock</p>
                      </div>
                      <div className="text-right">
                        <span className="font-display text-2xl sm:text-3xl font-bold text-champagne-deep block leading-none">
                          ₹{order.retainerDueNow.toLocaleString("en-IN")}
                        </span>
                        <span className="font-mono text-[9px] uppercase tracking-widest text-emerald-800 font-bold mt-1 block">
                          DUE TODAY
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* ─────────────────────────────────────────────────────────
                    GIFT OPTIONS (Kept Available, Distilled & Unobtrusive)
                    ───────────────────────────────────────────────────────── */}
                <div className="p-5 sm:p-6 bg-paper border border-ink/15 rounded-lg space-y-4">
                  <div className="flex items-center justify-between gap-3">
                    <label
                      htmlFor="gift-toggle"
                      className="flex items-center gap-3 cursor-pointer select-none group"
                    >
                      <input
                        id="gift-toggle"
                        type="checkbox"
                        checked={giftOptions.isGift}
                        onChange={(e) => {
                          setGiftOptions({ ...giftOptions, isGift: e.target.checked });
                          if (e.target.checked) setIsGiftExpanded(true);
                        }}
                        className="w-4 h-4 rounded border-ink/30 text-ink accent-champagne-deep cursor-pointer focus:ring-1 focus:ring-champagne-deep"
                      />
                      <div className="flex items-center gap-2">
                        <Gift className="w-4 h-4 text-champagne-deep group-hover:scale-110 transition-transform" />
                        <span className="font-mono text-xs uppercase font-bold text-ink tracking-wider">
                          SEND AS A WEDDING GIFT OR REGISTRY COMMISSION
                        </span>
                      </div>
                    </label>

                    {giftOptions.isGift && (
                      <button
                        type="button"
                        onClick={() => setIsGiftExpanded(!isGiftExpanded)}
                        className="text-charcoal/60 hover:text-ink p-1 rounded hover:bg-paper-warm transition-colors"
                        aria-label="Toggle gift options details"
                      >
                        {isGiftExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {giftOptions.isGift && isGiftExpanded && (
                    <div className="pt-3 border-t border-ink/10 space-y-4 text-xs font-ui animate-in fade-in duration-200">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <label htmlFor="gift-sender" className="font-mono text-[11px] text-charcoal/70 uppercase block font-medium">
                            Gift From (Your Name / Family):
                          </label>
                          <input
                            id="gift-sender"
                            type="text"
                            value={giftOptions.senderName}
                            onChange={(e) => setGiftOptions({ ...giftOptions, senderName: e.target.value })}
                            className="w-full px-3 py-2.5 bg-paper-warm border border-ink/15 rounded text-xs font-ui focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 transition-colors min-h-[40px]"
                            placeholder="e.g. The Mohapatra Family"
                          />
                        </div>

                        <div className="space-y-1">
                          <label htmlFor="gift-recipient" className="font-mono text-[11px] text-charcoal/70 uppercase block font-medium">
                            Recipient Couple Names:
                          </label>
                          <input
                            id="gift-recipient"
                            type="text"
                            value={giftOptions.recipientNames}
                            onChange={(e) => setGiftOptions({ ...giftOptions, recipientNames: e.target.value })}
                            className="w-full px-3 py-2.5 bg-paper-warm border border-ink/15 rounded text-xs font-ui focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 transition-colors min-h-[40px]"
                            placeholder="e.g. Sumitra & Girija"
                          />
                        </div>
                      </div>

                      {/* Calligraphy Card Message with Live Character Count */}
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <label htmlFor="gift-note" className="font-mono text-[11px] text-charcoal/70 uppercase block font-medium">
                            Personalized Calligraphy Card Message:
                          </label>
                          <span
                            className={cn(
                              "font-mono text-[10px]",
                              giftOptions.calligraphyNote.length > 210
                                ? "text-amber-800 font-semibold"
                                : "text-charcoal/50"
                            )}
                          >
                            {giftOptions.calligraphyNote.length} / {MAX_CALLIGRAPHY_CHARS}
                          </span>
                        </div>
                        <textarea
                          id="gift-note"
                          rows={3}
                          maxLength={MAX_CALLIGRAPHY_CHARS}
                          value={giftOptions.calligraphyNote}
                          onChange={(e) => setGiftOptions({ ...giftOptions, calligraphyNote: e.target.value })}
                          className="w-full px-3 py-2 bg-paper-warm border border-ink/15 rounded text-xs font-ui leading-relaxed focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 transition-colors"
                          placeholder="Your custom wedding blessings for the couple..."
                        />
                      </div>

                      {/* Delivery Presentation Selection */}
                      <div className="space-y-1.5">
                        <span className="font-mono text-[11px] text-charcoal/70 uppercase block font-medium">
                          Presentation &amp; Handover Method:
                        </span>
                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 font-mono text-[11px]">
                          <button
                            type="button"
                            onClick={() => setGiftOptions({ ...giftOptions, deliveryMethod: "HOME_DELIVERY" })}
                            className={cn(
                              "p-2.5 rounded border text-left transition-colors",
                              giftOptions.deliveryMethod === "HOME_DELIVERY"
                                ? "border-champagne-deep bg-champagne-deep/10 text-ink font-semibold"
                                : "border-ink/10 hover:border-ink/20 text-charcoal/70 bg-paper-warm"
                            )}
                          >
                            <p className="font-bold">HOME COURIER</p>
                            <p className="text-[10px] text-charcoal/60 font-ui font-normal mt-0.5">Pre-wedding gift box</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setGiftOptions({ ...giftOptions, deliveryMethod: "EVENT_PRESENTATION" })}
                            className={cn(
                              "p-2.5 rounded border text-left transition-colors",
                              giftOptions.deliveryMethod === "EVENT_PRESENTATION"
                                ? "border-champagne-deep bg-champagne-deep/10 text-ink font-semibold"
                                : "border-ink/10 hover:border-ink/20 text-charcoal/70 bg-paper-warm"
                            )}
                          >
                            <p className="font-bold">STAGE CEREMONY</p>
                            <p className="text-[10px] text-charcoal/60 font-ui font-normal mt-0.5">Handed at reception</p>
                          </button>

                          <button
                            type="button"
                            onClick={() => setGiftOptions({ ...giftOptions, deliveryMethod: "DIGITAL_VIP" })}
                            className={cn(
                              "p-2.5 rounded border text-left transition-colors",
                              giftOptions.deliveryMethod === "DIGITAL_VIP"
                                ? "border-champagne-deep bg-champagne-deep/10 text-ink font-semibold"
                                : "border-ink/10 hover:border-ink/20 text-charcoal/70 bg-paper-warm"
                            )}
                          >
                            <p className="font-bold">DIGITAL SUITE</p>
                            <p className="text-[10px] text-charcoal/60 font-ui font-normal mt-0.5">Private portal invite</p>
                          </button>
                        </div>
                      </div>

                      {/* Complimentary Box Perk */}
                      <div className="p-3 bg-paper-warm border border-champagne-deep/30 rounded flex items-center justify-between text-xs font-mono">
                        <span className="flex items-center gap-2 text-champagne-deep font-semibold">
                          <Sparkles className="w-3.5 h-3.5" />
                          <span>Handcrafted Velvet Box &amp; Wax Seal Included</span>
                        </span>
                        <span className="text-emerald-800 font-bold">COMPLIMENTARY</span>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* ─────────────────────────────────────────────────────────
                  FOCUS 2: PAYING FOR THE ORDER (Right Column, 6 Cols)
                  ───────────────────────────────────────────────────────── */}
              <section
                aria-labelledby="payment-heading"
                className="lg:col-span-6 space-y-6"
              >
                <div className="p-6 sm:p-8 bg-paper border-2 border-ink/15 hover:border-champagne-deep/50 transition-colors rounded-lg space-y-6 shadow-sm">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-1">
                      <span className="font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold">
                        FOCUS 02 // INSTANT SETTLEMENT
                      </span>
                      <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-800 font-semibold">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                        ESCROW ACTIVE
                      </span>
                    </div>
                    <h2
                      id="payment-heading"
                      className="font-display text-2xl sm:text-3xl text-ink tracking-tight"
                    >
                      Settle Production Retainer
                    </h2>
                    <p className="text-xs font-ui text-charcoal/75 mt-1">
                      Choose your preferred payment rails. Instant receipt &amp; counter-signed commission agreement issued automatically.
                    </p>
                  </div>

                  {/* Payment Rails Selector */}
                  <div className="grid grid-cols-3 gap-2 p-1 bg-paper-warm rounded-md border border-ink/10">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod("UPI")}
                      className={cn(
                        "py-2.5 px-2 rounded font-mono text-xs uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[44px]",
                        paymentMethod === "UPI"
                          ? "bg-ink text-paper font-bold shadow-xs"
                          : "text-charcoal/70 hover:text-ink hover:bg-paper"
                      )}
                    >
                      <QrCode className="w-4 h-4" />
                      <span>UPI / QR</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("CARD")}
                      className={cn(
                        "py-2.5 px-2 rounded font-mono text-xs uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[44px]",
                        paymentMethod === "CARD"
                          ? "bg-ink text-paper font-bold shadow-xs"
                          : "text-charcoal/70 hover:text-ink hover:bg-paper"
                      )}
                    >
                      <CreditCard className="w-4 h-4" />
                      <span>CARD</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod("NETBANKING")}
                      className={cn(
                        "py-2.5 px-2 rounded font-mono text-xs uppercase tracking-wider flex flex-col sm:flex-row items-center justify-center gap-1.5 transition-all touch-manipulation min-h-[44px]",
                        paymentMethod === "NETBANKING"
                          ? "bg-ink text-paper font-bold shadow-xs"
                          : "text-charcoal/70 hover:text-ink hover:bg-paper"
                      )}
                    >
                      <Building2 className="w-4 h-4" />
                      <span>NETBANKING</span>
                    </button>
                  </div>

                  {/* Form Body based on selected rail */}
                  <form onSubmit={handlePay} className="space-y-5">
                    {/* OPTION 1: UPI & DYNAMIC QR */}
                    {paymentMethod === "UPI" && (
                      <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                        <div className="p-4 bg-paper-warm border border-ink/10 rounded-md flex flex-col sm:flex-row items-center justify-between gap-4">
                          <div className="space-y-2 text-center sm:text-left flex-1">
                            <div>
                              <p className="font-mono text-xs font-bold text-ink">BHUBANESWAR STUDIO UPI VPA</p>
                              <div className="flex items-center justify-center sm:justify-start gap-2 mt-1">
                                <span className="font-mono text-sm text-champagne-deep font-bold tracking-wider">{upiId}</span>
                                <button
                                  type="button"
                                  onClick={handleCopyUpi}
                                  className="inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-mono font-bold rounded border border-ink/20 hover:border-champagne-deep bg-paper text-charcoal hover:text-ink transition-colors"
                                  aria-label="Copy UPI ID"
                                >
                                  {copiedUpi ? (
                                    <>
                                      <Check className="w-3 h-3 text-emerald-700" />
                                      <span className="text-emerald-800">COPIED</span>
                                    </>
                                  ) : (
                                    <>
                                      <Copy className="w-3 h-3 text-charcoal/60" />
                                      <span>COPY</span>
                                    </>
                                  )}
                                </button>
                              </div>
                            </div>

                            {/* Supported UPI Apps Pills */}
                            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-1.5 pt-1">
                              {["Google Pay", "PhonePe", "Paytm", "BHIM", "CRED"].map((app) => (
                                <span
                                  key={app}
                                  className="px-2 py-0.5 bg-paper border border-ink/10 rounded text-[10px] font-mono text-charcoal/70"
                                >
                                  {app}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="p-2.5 bg-white border border-ink/15 rounded shadow-xs shrink-0 text-center">
                            <QrCode className="w-16 h-16 text-ink mx-auto" />
                            <span className="font-mono text-[9px] uppercase tracking-widest text-charcoal/60 block mt-1">SCAN QR</span>
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="client-upi" className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                            Or Enter Your UPI ID for Instant Payment Request:
                          </label>
                          <input
                            id="client-upi"
                            type="text"
                            inputMode="email"
                            placeholder="yourname@okaxis"
                            value={clientUpiId}
                            onChange={(e) => setClientUpiId(e.target.value)}
                            className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 min-h-[44px] transition-colors"
                          />
                          <p className="text-[10px] font-ui text-charcoal/60">
                            A direct collect request will be sent to your UPI app upon clicking Pay below.
                          </p>
                        </div>
                      </div>
                    )}

                    {/* OPTION 2: CARD PAYMENT WITH TACTILE MASKS & AUTOFILL */}
                    {paymentMethod === "CARD" && (
                      <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                        <div className="space-y-1.5">
                          <div className="flex items-center justify-between">
                            <label htmlFor="cc-number" className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                              Card Number <span className="text-red-500">*</span>
                            </label>
                            {cardBrand && (
                              <span className="px-2 py-0.5 font-mono text-[10px] tracking-wider uppercase bg-champagne-deep/15 text-champagne-deep font-bold rounded border border-champagne-deep/30">
                                {cardBrand}
                              </span>
                            )}
                          </div>
                          <div className="relative">
                            <input
                              id="cc-number"
                              name="cc-number"
                              type="text"
                              autoComplete="cc-number"
                              inputMode="numeric"
                              maxLength={19}
                              pattern="[\d ]{13,19}"
                              placeholder="4111 2222 3333 4444"
                              value={cardNumber}
                              onChange={handleCardNumberChange}
                              required
                              className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 min-h-[44px] transition-colors pr-10"
                            />
                            <CreditCard className="w-4 h-4 text-charcoal/40 absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                          </div>
                        </div>

                        <div className="space-y-1.5">
                          <label htmlFor="cc-name" className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                            Cardholder Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="cc-name"
                            name="cc-name"
                            type="text"
                            autoComplete="cc-name"
                            maxLength={50}
                            pattern="[\p{L} \-\.]+"
                            placeholder="SUMITRA MOHAPATRA"
                            value={cardName}
                            onChange={(e) => setCardName(e.target.value)}
                            required
                            className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-ui text-sm text-ink focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 min-h-[44px] uppercase tracking-wide transition-colors"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div className="space-y-1.5">
                            <span id="exp-hint" className="block font-mono text-[10px] text-charcoal/60 uppercase">
                              Expiry Date (MM/YY) <span className="text-red-500">*</span>
                            </span>
                            <input
                              id="cc-exp"
                              name="cc-exp"
                              type="text"
                              autoComplete="cc-exp"
                              aria-describedby="exp-hint"
                              inputMode="numeric"
                              maxLength={5}
                              placeholder="12/28"
                              value={cardExp}
                              onChange={handleCardExpChange}
                              required
                              className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 min-h-[44px] transition-colors"
                            />
                          </div>

                          <div className="space-y-1.5">
                            <label htmlFor="cc-csc" className="block font-mono text-[10px] text-charcoal/60 uppercase">
                              CVV / Security Code <span className="text-red-500">*</span>
                            </label>
                            <input
                              id="cc-csc"
                              name="cc-csc"
                              type="text"
                              autoComplete="cc-csc"
                              inputMode="numeric"
                              maxLength={4}
                              pattern="[0-9]{3,4}"
                              placeholder="892"
                              value={cardCsc}
                              onChange={handleCardCscChange}
                              required
                              className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep focus:outline-none focus:ring-1 focus:ring-champagne-deep/40 min-h-[44px] transition-colors"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* OPTION 3: NETBANKING WITH ALL INDIAN BANKS */}
                    {paymentMethod === "NETBANKING" && (
                      <div className="space-y-4 pt-1 animate-in fade-in duration-200">
                        <label className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                          Select Bank for Direct Escrow Transfer:
                        </label>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                          {["HDFC", "ICICI", "SBI", "AXIS", "KOTAK", "PUNJAB NATIONAL"].map((bank) => (
                            <button
                              key={bank}
                              type="button"
                              onClick={() => {
                                setSelectedBank(bank);
                                setOtherBank("");
                              }}
                              className={cn(
                                "py-3 px-3 rounded text-left font-mono text-xs transition-colors border min-h-[44px] flex items-center justify-between",
                                selectedBank === bank && !otherBank
                                  ? "bg-ink text-paper border-ink font-bold shadow-xs"
                                  : "bg-paper-warm text-charcoal/80 border-ink/10 hover:border-ink/30"
                              )}
                            >
                              <span>{bank}</span>
                              {selectedBank === bank && !otherBank && <Check className="w-3.5 h-3.5 text-champagne" />}
                            </button>
                          ))}
                        </div>

                        {/* Other Banks Dropdown */}
                        <div className="space-y-1 pt-1">
                          <label htmlFor="other-bank" className="block font-mono text-[11px] text-charcoal/70 uppercase">
                            Or Choose from Other Partner Banks:
                          </label>
                          <select
                            id="other-bank"
                            value={otherBank}
                            onChange={(e) => {
                              setOtherBank(e.target.value);
                              if (e.target.value) setSelectedBank(e.target.value);
                            }}
                            className="w-full px-3 py-2.5 bg-paper-warm border border-ink/15 rounded text-xs font-mono text-charcoal focus:border-champagne-deep focus:outline-none min-h-[42px]"
                          >
                            <option value="">-- Select another bank (40+ supported) --</option>
                            <option value="Bank of Baroda">Bank of Baroda</option>
                            <option value="Canara Bank">Canara Bank</option>
                            <option value="IndusInd Bank">IndusInd Bank</option>
                            <option value="Union Bank of India">Union Bank of India</option>
                            <option value="Federal Bank">Federal Bank</option>
                            <option value="IDFC FIRST Bank">IDFC FIRST Bank</option>
                            <option value="Yes Bank">Yes Bank</option>
                            <option value="Indian Bank">Indian Bank</option>
                            <option value="Central Bank of India">Central Bank of India</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <div className="pt-2">
                      <button
                        type="submit"
                        disabled={isProcessing}
                        className={cn(
                          "w-full py-4 px-6 bg-ink text-paper font-mono text-xs tracking-widest uppercase rounded-sm shadow-lg hover:bg-charcoal transition-all flex items-center justify-center gap-2.5 min-h-[52px] touch-manipulation group",
                          isProcessing && "opacity-75 cursor-not-allowed"
                        )}
                      >
                        {isProcessing ? (
                          <>
                            <span className="w-4 h-4 border-2 border-champagne border-t-transparent rounded-full animate-spin" />
                            <span>PROCESSING SECURE RETAINER...</span>
                          </>
                        ) : (
                          <>
                            <Lock className="w-4 h-4 text-champagne" />
                            <span className="font-bold">PAY ₹{order.retainerDueNow.toLocaleString("en-IN")} RETAINER &amp; LOCK DATES</span>
                            <ArrowRight className="w-4 h-4 text-champagne group-hover:translate-x-1 transition-transform" />
                          </>
                        )}
                      </button>
                    </div>

                    {/* Trust Badges */}
                    <div className="flex flex-wrap items-center justify-between text-[11px] font-mono text-charcoal/60 pt-1 border-t border-ink/10 gap-2">
                      <span className="flex items-center gap-1 text-emerald-800 font-semibold">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-700" />
                        <span>256-Bit Bank Escrow</span>
                      </span>
                      <span>Zero Hidden Charges</span>
                      <span>Instant Digital Receipt</span>
                    </div>
                  </form>
                </div>

                {/* Need Help? Concierge Box */}
                <div className="p-4 bg-paper-warm border border-ink/10 rounded-md flex items-center justify-between gap-4 text-xs font-mono">
                  <div className="space-y-0.5">
                    <p className="font-bold text-ink">Prefer Offline RTGS Wire or Cheque?</p>
                    <p className="text-[11px] text-charcoal/70">Our studio manager can assist you directly.</p>
                  </div>
                  <a
                    href={`${WHATSAPP_LINK}&text=Hello%20WEDDING%20FILMS%20team,%20I%20have%20a%20question%20about%20paying%20the%20retainer%20for%20${encodeURIComponent(order.clientNames)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-3.5 py-2 bg-[#25D366] text-ink font-bold uppercase rounded text-[10px] tracking-wider shrink-0 flex items-center gap-1.5 hover:opacity-95 transition-opacity"
                  >
                    <PhoneCall className="w-3.5 h-3.5" />
                    <span>WHATSAPP HELP ↗</span>
                  </a>
                </div>
              </section>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
