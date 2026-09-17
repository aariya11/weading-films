"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  AlertCircle,
  CheckCircle2,
  AlertTriangle,
  RefreshCw,
  Save,
  PhoneCall,
  User,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Truck,
  Film,
  Sparkles,
  Info,
} from "lucide-react";
import { Navigation } from "@/components/navigation/Navigation";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/cursor/CustomCursor";
import { HelpSuiteNav } from "@/components/legal/HelpSuiteNav";
import { WHATSAPP_LINK } from "@/components/ui/WhatsAppButton";
import { cn } from "@/lib/utils";

export interface ProfileFormState {
  partnerOne: string;
  partnerTwo: string;
  salutation: string;
  email: string;
  phone: string;
  emergencyPhone: string;
  weddingDate: string;
  venue: string;
  guestCount: string;
  ceremonies: string[];
  shippingStreet: string;
  shippingCity: string;
  shippingState: string;
  shippingPostalCode: string;
  shippingCountry: string;
  aspectRatio: string;
  colorGrade: string;
  privacySetting: string;
}

const INITIAL_PROFILE: ProfileFormState = {
  partnerOne: "Sumitra Mohapatra",
  partnerTwo: "Girija Shankar Das",
  salutation: "Mr. & Mrs.",
  email: "sumitra.weddings@gmail.com",
  phone: "+91 9876543210",
  emergencyPhone: "+91 9124885729",
  weddingDate: "2024-11-28",
  venue: "Bhubaneswar Heritage Estate, Odisha",
  guestCount: "350",
  ceremonies: ["Odia Mandap Vows", "Haldi & Snana", "Grand Sangeet", "Puri Pre-Wedding"],
  shippingStreet: "Plot 42, Forest Park Enclave, Aerodrome Area",
  shippingCity: "Bhubaneswar",
  shippingState: "Odisha",
  shippingPostalCode: "751009",
  shippingCountry: "India",
  aspectRatio: "2.39:1 Anamorphic Widescreen",
  colorGrade: "Warm Kodachrome / Golden Hour",
  privacySetting: "Editorial Preview Only",
};

const CEREMONY_OPTIONS = [
  "Odia Mandap Vows",
  "Haldi & Snana",
  "Grand Sangeet",
  "Baraat Arrival Procession",
  "Reception Gala",
  "Puri Pre-Wedding Coastal Shoot",
  "Temple Blessings & Puja",
];

export default function ProfilePage() {
  const [formData, setFormData] = useState<ProfileFormState>(INITIAL_PROFILE);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [serverSaveError, setServerSaveError] = useState<string | null>(null);
  const [simulateServerError, setSimulateServerError] = useState(false);
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  const errorSummaryRef = useRef<HTMLDivElement>(null);
  const inputRefs = useRef<Record<string, HTMLInputElement | HTMLSelectElement | null>>({});

  // Load saved profile from localStorage if present
  useEffect(() => {
    try {
      const saved = localStorage.getItem("wf_client_profile");
      if (saved) {
        setFormData(JSON.parse(saved));
      }
    } catch {
      // ignore in incognito
    }
  }, []);

  // Validation function with clear error messages
  const validateField = (name: keyof ProfileFormState, value: unknown): string | null => {
    if (name === "partnerOne") {
      const str = String(value).trim();
      if (!str) return "Primary partner name is required.";
      if (str.length < 2) return "Primary partner name must be at least 2 characters.";
    }
    if (name === "partnerTwo") {
      const str = String(value).trim();
      if (!str) return "Secondary partner name is required.";
      if (str.length < 2) return "Secondary partner name must be at least 2 characters.";
    }
    if (name === "email") {
      const str = String(value).trim();
      if (!str) return "Email address is required.";
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(str)) {
        return "Please enter a valid email address with '@' and domain (e.g., couple@domain.com).";
      }
    }
    if (name === "phone") {
      const str = String(value).trim();
      if (!str) return "Phone number is required for WhatsApp dispatches.";
      if (!/^\+?[0-9\s-]{8,20}$/.test(str)) {
        return "Please provide a valid phone number with country code (e.g., +91 9124885729).";
      }
    }
    if (name === "weddingDate") {
      const str = String(value).trim();
      if (!str) return "Wedding date is required for crew scheduling.";
    }
    if (name === "venue") {
      const str = String(value).trim();
      if (!str) return "Wedding venue or city is required.";
      if (str.length < 3) return "Venue name must be at least 3 characters.";
    }
    if (name === "guestCount") {
      const str = String(value).trim();
      if (!str) return "Guest count is required.";
      const num = parseInt(str, 10);
      if (isNaN(num) || num <= 0) return "Please enter a valid number of guests (greater than 0).";
    }
    if (name === "shippingStreet") {
      const str = String(value).trim();
      if (!str) return "Street address is required for album & SSD shipping.";
      if (str.length < 5) return "Please provide a complete street address (minimum 5 characters).";
    }
    if (name === "shippingCity") {
      const str = String(value).trim();
      if (!str) return "City/District is required.";
    }
    if (name === "shippingPostalCode") {
      const str = String(value).trim();
      if (!str) return "Postal PIN code is required for courier delivery.";
      if (str.length < 4) return "Please enter a valid postal code (minimum 4 digits).";
    }

    return null;
  };

  const validateAll = (): Record<string, string> => {
    const newErrors: Record<string, string> = {};
    (Object.keys(formData) as (keyof ProfileFormState)[]).forEach((field) => {
      const error = validateField(field, formData[field]);
      if (error) {
        newErrors[field] = error;
      }
    });
    return newErrors;
  };

  const handleInputChange = (field: keyof ProfileFormState, value: string | string[]) => {
    setFormData((prev) => ({ ...prev, [field]: value }));

    // If field was touched or submit attempted, run live validation
    if (touched[field] || hasAttemptedSubmit) {
      const error = validateField(field, value);
      setErrors((prev) => {
        const next = { ...prev };
        if (error) {
          next[field] = error;
        } else {
          delete next[field];
        }
        return next;
      });
    }
  };

  const handleBlur = (field: keyof ProfileFormState) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    const error = validateField(field, formData[field]);
    setErrors((prev) => {
      const next = { ...prev };
      if (error) {
        next[field] = error;
      } else {
        delete next[field];
      }
      return next;
    });
  };

  const toggleCeremony = (ceremony: string) => {
    setFormData((prev) => {
      const current = prev.ceremonies;
      const updated = current.includes(ceremony)
        ? current.filter((c) => c !== ceremony)
        : [...current, ceremony];
      return { ...prev, ceremonies: updated };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    setServerSaveError(null);
    setSaveSuccess(false);

    // Mark all fields as touched
    const allTouched: Record<string, boolean> = {};
    (Object.keys(formData) as (keyof ProfileFormState)[]).forEach((f) => {
      allTouched[f] = true;
    });
    setTouched(allTouched);

    const validationErrors = validateAll();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      // Scroll to error summary
      setTimeout(() => {
        if (errorSummaryRef.current) {
          errorSummaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }, 50);
      return;
    }

    // Process Save
    setIsSaving(true);

    setTimeout(() => {
      setIsSaving(false);

      if (simulateServerError) {
        setServerSaveError(
          "HTTP 500 Network Exception: Unable to synchronize with the Bhubaneswar studio vault. A local draft has been preserved in your browser."
        );
        setTimeout(() => {
          if (errorSummaryRef.current) {
            errorSummaryRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 50);
        return;
      }

      // Successful save
      try {
        localStorage.setItem("wf_client_profile", JSON.stringify(formData));
      } catch {
        // fallback
      }
      setSaveSuccess(true);
      setTimeout(() => setSaveSuccess(false), 5000);
    }, 1000);
  };

  const jumpToField = (fieldId: string) => {
    const el = inputRefs.current[fieldId];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
      el.focus();
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <>
      <Navigation />
      <CustomCursor />
      <main id="main-content" className="flex-1 bg-paper text-ink pt-28 sm:pt-36 pb-36 min-h-screen">
        <div className="container max-w-4xl px-4 sm:px-6">
          {/* Sub Navigation */}
          <div className="mb-8">
            <HelpSuiteNav />
          </div>

          {/* Header */}
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <span className="label label-accent tracking-[0.3em] text-xs font-mono text-champagne-deep font-semibold">
                CLIENT COMMISSION PORTAL // PROFILE & CREDENTIALS
              </span>
              <span className="hidden sm:inline-block w-8 h-px bg-champagne-deep/40" />
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-900 border border-emerald-300/70 font-mono text-[10px] font-semibold tracking-wider uppercase">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-pulse" />
                ACTIVE MASTER PROFILE
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-5xl lg:text-7xl mb-3 tracking-tight text-balance">
              CLIENT PROFILE.
            </h1>
            <p className="body-large text-charcoal/80 max-w-2xl font-ui text-sm sm:text-base leading-relaxed">
              Verify and update your couple details, shipping address for physical 4K SSDs and albums, and cinematography preferences.
            </p>
          </header>

          {/* ─────────────────────────────────────────────────────────────
              CLARIFIED ERROR SUMMARY BOX (Appears on validation/save failure)
              ───────────────────────────────────────────────────────────── */}
          {hasAttemptedSubmit && errorCount > 0 && (
            <div
              ref={errorSummaryRef}
              role="alert"
              aria-live="assertive"
              className="mb-10 p-5 sm:p-6 bg-red-50 border-2 border-red-500 rounded-lg shadow-md animate-in fade-in slide-in-from-top-3 duration-200"
            >
              <div className="flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
                <div className="space-y-2 flex-1">
                  <h2 className="font-mono text-sm font-bold uppercase text-red-900 tracking-wider">
                    Unable to Save Profile: {errorCount} {errorCount === 1 ? "Field Requires" : "Fields Require"} Your Attention
                  </h2>
                  <p className="text-xs font-ui text-red-800 leading-relaxed">
                    Please correct the highlighted errors below before saving your credentials to the studio ledger:
                  </p>

                  <ul className="space-y-1.5 pt-2 text-xs font-mono text-red-900">
                    {Object.entries(errors).map(([field, msg]) => (
                      <li key={field} className="flex items-start gap-2">
                        <span className="text-red-500 font-bold">•</span>
                        <button
                          type="button"
                          onClick={() => jumpToField(field)}
                          className="text-left underline hover:text-red-950 font-semibold cursor-pointer"
                        >
                          {msg}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SERVER SAVE ERROR BOX (Network or Vault sync error)
              ───────────────────────────────────────────────────────────── */}
          {serverSaveError && (
            <div
              ref={errorSummaryRef}
              role="alert"
              className="mb-10 p-5 sm:p-6 bg-amber-50 border-2 border-amber-500 rounded-lg shadow-md animate-in fade-in duration-200"
            >
              <div className="flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
                <div className="space-y-2 flex-1">
                  <h2 className="font-mono text-sm font-bold uppercase text-amber-900 tracking-wider">
                    Server Save Exception // Sync Incomplete
                  </h2>
                  <p className="text-xs font-ui text-amber-800 leading-relaxed">
                    {serverSaveError}
                  </p>
                  <div className="pt-3 flex items-center gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-amber-800 text-white font-mono text-xs font-bold uppercase rounded-sm hover:bg-amber-900 flex items-center gap-1.5 touch-manipulation min-h-[40px]"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>RETRY SAVE</span>
                    </button>
                    <a
                      href={WHATSAPP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 bg-[#25D366] text-ink font-mono text-xs font-bold uppercase rounded-sm hover:opacity-90 flex items-center gap-1.5 touch-manipulation min-h-[40px]"
                    >
                      <PhoneCall className="w-3.5 h-3.5" />
                      <span>SEND TO CONCIERGE ON WHATSAPP ↗</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ─────────────────────────────────────────────────────────────
              SAVE SUCCESS ALERT
              ───────────────────────────────────────────────────────────── */}
          {saveSuccess && (
            <div
              role="status"
              className="mb-10 p-5 sm:p-6 bg-emerald-50 border-2 border-emerald-500 rounded-lg shadow-md animate-in fade-in duration-200"
            >
              <div className="flex items-center gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <div>
                  <p className="font-mono text-xs font-bold uppercase text-emerald-900 tracking-wider">
                    Profile Successfully Saved & Synchronized
                  </p>
                  <p className="text-xs font-ui text-emerald-800 mt-0.5">
                    Your wedding details and shipping destination have been updated in the master commission ledger.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Main Form */}
          <form onSubmit={handleSubmit} noValidate className="space-y-12">
            {/* ─────────────────────────────────────────────────────────
                SECTION 1: COUPLE & IDENTITY DETAILS
                ───────────────────────────────────────────────────────── */}
            <fieldset className="p-6 sm:p-8 bg-paper-warm/50 border border-ink/10 rounded-lg space-y-6">
              <legend className="px-2 font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold flex items-center gap-2">
                <User className="w-4 h-4 text-champagne-deep" />
                <span>01 // COUPLE IDENTITY & NAMES</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Partner One */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="partnerOne"
                      className="font-mono text-xs text-charcoal/80 uppercase font-semibold"
                    >
                      Primary Partner Full Name <span className="text-red-500">*</span>
                    </label>
                    {touched.partnerOne && !errors.partnerOne && (
                      <span className="font-mono text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    id="partnerOne"
                    ref={(el) => {
                      inputRefs.current.partnerOne = el;
                    }}
                    type="text"
                    value={formData.partnerOne}
                    onChange={(e) => handleInputChange("partnerOne", e.target.value)}
                    onBlur={() => handleBlur("partnerOne")}
                    aria-invalid={!!errors.partnerOne}
                    aria-describedby={errors.partnerOne ? "partnerOne-error" : undefined}
                    placeholder="e.g. Sumitra Mohapatra"
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink transition-all min-h-[44px]",
                      errors.partnerOne
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep focus:ring-1 focus:ring-champagne-deep"
                    )}
                  />
                  {errors.partnerOne ? (
                    <p id="partnerOne-error" className="font-mono text-xs text-red-600 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.partnerOne}</span>
                    </p>
                  ) : (
                    <p className="font-mono text-[10px] text-charcoal/50">Used on official cinema monograph credits.</p>
                  )}
                </div>

                {/* Partner Two */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label
                      htmlFor="partnerTwo"
                      className="font-mono text-xs text-charcoal/80 uppercase font-semibold"
                    >
                      Secondary Partner Full Name <span className="text-red-500">*</span>
                    </label>
                    {touched.partnerTwo && !errors.partnerTwo && (
                      <span className="font-mono text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    id="partnerTwo"
                    ref={(el) => {
                      inputRefs.current.partnerTwo = el;
                    }}
                    type="text"
                    value={formData.partnerTwo}
                    onChange={(e) => handleInputChange("partnerTwo", e.target.value)}
                    onBlur={() => handleBlur("partnerTwo")}
                    aria-invalid={!!errors.partnerTwo}
                    aria-describedby={errors.partnerTwo ? "partnerTwo-error" : undefined}
                    placeholder="e.g. Girija Shankar Das"
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink transition-all min-h-[44px]",
                      errors.partnerTwo
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep focus:ring-1 focus:ring-champagne-deep"
                    )}
                  />
                  {errors.partnerTwo ? (
                    <p id="partnerTwo-error" className="font-mono text-xs text-red-600 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.partnerTwo}</span>
                    </p>
                  ) : (
                    <p className="font-mono text-[10px] text-charcoal/50">Featured in custom teaser title cards.</p>
                  )}
                </div>
              </div>

              {/* Preferred Title */}
              <div className="space-y-2 pt-2">
                <label htmlFor="salutation" className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                  Preferred Monogram Salutation
                </label>
                <select
                  id="salutation"
                  value={formData.salutation}
                  onChange={(e) => handleInputChange("salutation", e.target.value)}
                  className="w-full sm:w-1/2 px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep min-h-[44px]"
                >
                  <option value="Mr. & Mrs.">Mr. & Mrs. (Traditional)</option>
                  <option value="The Couple">The Couple (Modern)</option>
                  <option value="Individual Names Only">First Names Only (Editorial)</option>
                </select>
              </div>
            </fieldset>

            {/* ─────────────────────────────────────────────────────────
                SECTION 2: CONTACT & DISPATCH CHANNELS
                ───────────────────────────────────────────────────────── */}
            <fieldset className="p-6 sm:p-8 bg-paper-warm/50 border border-ink/10 rounded-lg space-y-6">
              <legend className="px-2 font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold flex items-center gap-2">
                <Mail className="w-4 h-4 text-champagne-deep" />
                <span>02 // CONTACT & NOTIFICATIONS</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Email Address */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="email" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      Primary Email Address <span className="text-red-500">*</span>
                    </label>
                    {touched.email && !errors.email && (
                      <span className="font-mono text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    id="email"
                    ref={(el) => {
                      inputRefs.current.email = el;
                    }}
                    type="email"
                    inputMode="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    onBlur={() => handleBlur("email")}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    placeholder="bride@domain.com"
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink transition-all min-h-[44px]",
                      errors.email
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep focus:ring-1 focus:ring-champagne-deep"
                    )}
                  />
                  {errors.email ? (
                    <p id="email-error" className="font-mono text-xs text-red-600 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.email}</span>
                    </p>
                  ) : (
                    <p className="font-mono text-[10px] text-charcoal/50">Receives encrypted VIP streaming keys and invoices.</p>
                  )}
                </div>

                {/* WhatsApp Phone */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="phone" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      WhatsApp / Mobile Number <span className="text-red-500">*</span>
                    </label>
                    {touched.phone && !errors.phone && (
                      <span className="font-mono text-[10px] text-emerald-700 flex items-center gap-1 font-bold">
                        <CheckCircle2 className="w-3 h-3" /> Valid
                      </span>
                    )}
                  </div>
                  <input
                    id="phone"
                    ref={(el) => {
                      inputRefs.current.phone = el;
                    }}
                    type="tel"
                    inputMode="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    onBlur={() => handleBlur("phone")}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    placeholder="+91 9124885729"
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink transition-all min-h-[44px]",
                      errors.phone
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep focus:ring-1 focus:ring-champagne-deep"
                    )}
                  />
                  {errors.phone ? (
                    <p id="phone-error" className="font-mono text-xs text-red-600 flex items-center gap-1 pt-0.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.phone}</span>
                    </p>
                  ) : (
                    <p className="font-mono text-[10px] text-charcoal/50">Instant milestone pings and on-site producer calls.</p>
                  )}
                </div>
              </div>
            </fieldset>

            {/* ─────────────────────────────────────────────────────────
                SECTION 3: WEDDING ITINERARY & VENUE
                ───────────────────────────────────────────────────────── */}
            <fieldset className="p-6 sm:p-8 bg-paper-warm/50 border border-ink/10 rounded-lg space-y-6">
              <legend className="px-2 font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold flex items-center gap-2">
                <Calendar className="w-4 h-4 text-champagne-deep" />
                <span>03 // WEDDING ITINERARY & VENUE</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                {/* Wedding Date */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="weddingDate" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      Wedding Date <span className="text-red-500">*</span>
                    </label>
                    {touched.weddingDate && !errors.weddingDate && (
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">✓ Valid</span>
                    )}
                  </div>
                  <input
                    id="weddingDate"
                    ref={(el) => {
                      inputRefs.current.weddingDate = el;
                    }}
                    type="date"
                    value={formData.weddingDate}
                    onChange={(e) => handleInputChange("weddingDate", e.target.value)}
                    onBlur={() => handleBlur("weddingDate")}
                    aria-invalid={!!errors.weddingDate}
                    aria-describedby={errors.weddingDate ? "weddingDate-error" : undefined}
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-mono text-xs text-ink transition-all min-h-[44px]",
                      errors.weddingDate
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep"
                    )}
                  />
                  {errors.weddingDate && (
                    <p id="weddingDate-error" className="font-mono text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.weddingDate}</span>
                    </p>
                  )}
                </div>

                {/* Primary Venue */}
                <div className="sm:col-span-2 space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="venue" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      Primary Venue & City <span className="text-red-500">*</span>
                    </label>
                    {touched.venue && !errors.venue && (
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">✓ Valid</span>
                    )}
                  </div>
                  <input
                    id="venue"
                    ref={(el) => {
                      inputRefs.current.venue = el;
                    }}
                    type="text"
                    value={formData.venue}
                    onChange={(e) => handleInputChange("venue", e.target.value)}
                    onBlur={() => handleBlur("venue")}
                    aria-invalid={!!errors.venue}
                    aria-describedby={errors.venue ? "venue-error" : undefined}
                    placeholder="e.g. Bhubaneswar Heritage Estate, Odisha"
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink transition-all min-h-[44px]",
                      errors.venue
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep"
                    )}
                  />
                  {errors.venue && (
                    <p id="venue-error" className="font-mono text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.venue}</span>
                    </p>
                  )}
                </div>
              </div>

              {/* Ceremonies Multi-Select Pills */}
              <div className="space-y-3 pt-2">
                <label className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                  Covered Ceremonial Events (Select All Applicable)
                </label>
                <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
                  {CEREMONY_OPTIONS.map((c) => {
                    const isSelected = formData.ceremonies.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCeremony(c)}
                        className={cn(
                          "px-3.5 py-2 rounded-full font-mono text-xs tracking-wider uppercase transition-all touch-manipulation min-h-[38px]",
                          isSelected
                            ? "bg-ink text-paper font-bold shadow-xs ring-1 ring-champagne-deep"
                            : "bg-paper text-charcoal/70 border border-ink/10 hover:border-champagne-deep hover:text-ink"
                        )}
                      >
                        <span>{isSelected ? "✓ " : "+ "}</span>
                        <span>{c}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </fieldset>

            {/* ─────────────────────────────────────────────────────────
                SECTION 4: PHYSICAL DELIVERY ADDRESS (SSD & Albums)
                ───────────────────────────────────────────────────────── */}
            <fieldset className="p-6 sm:p-8 bg-paper-warm/50 border border-ink/10 rounded-lg space-y-6">
              <legend className="px-2 font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold flex items-center gap-2">
                <Truck className="w-4 h-4 text-champagne-deep" />
                <span>04 // PHYSICAL DELIVERABLES DESTINATION (SSD & ALBUM)</span>
              </legend>

              <div className="space-y-4">
                {/* Street Address */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label htmlFor="shippingStreet" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      Street Address & Residence <span className="text-red-500">*</span>
                    </label>
                    {touched.shippingStreet && !errors.shippingStreet && (
                      <span className="font-mono text-[10px] text-emerald-700 font-bold">✓ Valid</span>
                    )}
                  </div>
                  <input
                    id="shippingStreet"
                    ref={(el) => {
                      inputRefs.current.shippingStreet = el;
                    }}
                    type="text"
                    value={formData.shippingStreet}
                    onChange={(e) => handleInputChange("shippingStreet", e.target.value)}
                    onBlur={() => handleBlur("shippingStreet")}
                    aria-invalid={!!errors.shippingStreet}
                    aria-describedby={errors.shippingStreet ? "shippingStreet-error" : undefined}
                    placeholder="Plot / Apartment, Street, Locality"
                    className={cn(
                      "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink transition-all min-h-[44px]",
                      errors.shippingStreet
                        ? "border-red-500 bg-red-50/40 ring-1 ring-red-500"
                        : "border-ink/15 focus:border-champagne-deep"
                    )}
                  />
                  {errors.shippingStreet && (
                    <p id="shippingStreet-error" className="font-mono text-xs text-red-600 flex items-center gap-1">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{errors.shippingStreet}</span>
                    </p>
                  )}
                </div>

                {/* City, State, Postal PIN */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {/* City */}
                  <div className="space-y-2">
                    <label htmlFor="shippingCity" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      City / District <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="shippingCity"
                      ref={(el) => {
                        inputRefs.current.shippingCity = el;
                      }}
                      type="text"
                      value={formData.shippingCity}
                      onChange={(e) => handleInputChange("shippingCity", e.target.value)}
                      onBlur={() => handleBlur("shippingCity")}
                      aria-invalid={!!errors.shippingCity}
                      className={cn(
                        "w-full px-4 py-3 bg-paper border rounded-md font-ui text-sm text-ink min-h-[44px]",
                        errors.shippingCity ? "border-red-500 bg-red-50/40" : "border-ink/15"
                      )}
                    />
                    {errors.shippingCity && (
                      <p className="font-mono text-[11px] text-red-600">{errors.shippingCity}</p>
                    )}
                  </div>

                  {/* State */}
                  <div className="space-y-2">
                    <label htmlFor="shippingState" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      State / Province
                    </label>
                    <input
                      id="shippingState"
                      type="text"
                      value={formData.shippingState}
                      onChange={(e) => handleInputChange("shippingState", e.target.value)}
                      className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-ui text-sm text-ink min-h-[44px]"
                    />
                  </div>

                  {/* Postal Code */}
                  <div className="space-y-2">
                    <label htmlFor="shippingPostalCode" className="font-mono text-xs text-charcoal/80 uppercase font-semibold">
                      Postal PIN Code <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="shippingPostalCode"
                      ref={(el) => {
                        inputRefs.current.shippingPostalCode = el;
                      }}
                      type="text"
                      inputMode="numeric"
                      value={formData.shippingPostalCode}
                      onChange={(e) => handleInputChange("shippingPostalCode", e.target.value)}
                      onBlur={() => handleBlur("shippingPostalCode")}
                      aria-invalid={!!errors.shippingPostalCode}
                      placeholder="e.g. 751009"
                      className={cn(
                        "w-full px-4 py-3 bg-paper border rounded-md font-mono text-xs text-ink min-h-[44px]",
                        errors.shippingPostalCode ? "border-red-500 bg-red-50/40" : "border-ink/15"
                      )}
                    />
                    {errors.shippingPostalCode && (
                      <p className="font-mono text-[11px] text-red-600">{errors.shippingPostalCode}</p>
                    )}
                  </div>
                </div>
              </div>
            </fieldset>

            {/* ─────────────────────────────────────────────────────────
                SECTION 5: CINEMATOGRAPHY & MASTER GRADING PREFERENCES
                ───────────────────────────────────────────────────────── */}
            <fieldset className="p-6 sm:p-8 bg-paper-warm/50 border border-ink/10 rounded-lg space-y-6">
              <legend className="px-2 font-mono text-xs uppercase tracking-widest text-champagne-deep font-bold flex items-center gap-2">
                <Film className="w-4 h-4 text-champagne-deep" />
                <span>05 // MASTER CINEMA POST-PRODUCTION PREFERENCES</span>
              </legend>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {/* Aspect Ratio */}
                <div className="space-y-2">
                  <label htmlFor="aspectRatio" className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                    Master Framing Aspect Ratio
                  </label>
                  <select
                    id="aspectRatio"
                    value={formData.aspectRatio}
                    onChange={(e) => handleInputChange("aspectRatio", e.target.value)}
                    className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep min-h-[44px]"
                  >
                    <option value="2.39:1 Anamorphic Widescreen">2.39:1 Anamorphic Widescreen (Theatrical)</option>
                    <option value="16:9 Standard Cinema">16:9 Full Frame (Home Television)</option>
                    <option value="4:3 Heritage Monograph">4:3 Fine Art Editorial Portraiture</option>
                  </select>
                </div>

                {/* Color Emulation */}
                <div className="space-y-2">
                  <label htmlFor="colorGrade" className="block font-mono text-xs text-charcoal/80 uppercase font-semibold">
                    DaVinci Resolve Color Grade Profile
                  </label>
                  <select
                    id="colorGrade"
                    value={formData.colorGrade}
                    onChange={(e) => handleInputChange("colorGrade", e.target.value)}
                    className="w-full px-4 py-3 bg-paper border border-ink/15 rounded-md font-mono text-xs text-ink focus:border-champagne-deep min-h-[44px]"
                  >
                    <option value="Warm Kodachrome / Golden Hour">Warm Kodachrome (Golden Mandap & Silk)</option>
                    <option value="Timeless Fuji 35mm Grain">Fuji 35mm Film Grain (Authentic Daylight)</option>
                    <option value="Noir Chiaroscuro Monochrome">Chiaroscuro Noir (High-Contrast Monochrome)</option>
                  </select>
                </div>
              </div>
            </fieldset>

            {/* Simulation & Diagnostic Tool (Demonstrates Save Error Recovery) */}
            <div className="p-4 bg-paper-warm/40 border border-ink/10 rounded-md flex items-center justify-between gap-4 text-xs font-mono">
              <label htmlFor="simulate-error" className="flex items-center gap-2 cursor-pointer select-none text-charcoal/80">
                <input
                  id="simulate-error"
                  type="checkbox"
                  checked={simulateServerError}
                  onChange={(e) => setSimulateServerError(e.target.checked)}
                  className="rounded border-ink/20 text-ink accent-champagne-deep w-4 h-4 cursor-pointer"
                />
                <span>Simulate Server Save Error (Test HTTP 500 / Network Failure Handling)</span>
              </label>
              <span className="text-[10px] text-charcoal/50 hidden sm:inline">QA TESTING TOGGLE</span>
            </div>

            {/* Bottom Action Bar */}
            <div className="pt-6 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="font-mono text-xs text-charcoal/60 text-center sm:text-left">
                All changes are encrypted and synchronized with our Bhubaneswar studio vault.
              </p>

              <button
                type="submit"
                disabled={isSaving}
                className={cn(
                  "w-full sm:w-auto px-8 py-4 bg-ink text-paper font-mono text-xs tracking-widest uppercase rounded-sm shadow-md hover:bg-charcoal transition-all flex items-center justify-center gap-2 min-h-[48px] touch-manipulation",
                  isSaving && "opacity-75 cursor-not-allowed"
                )}
              >
                {isSaving ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin text-champagne" />
                    <span>SYNCHRONIZING PROFILE...</span>
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4 text-champagne" />
                    <span>SAVE PROFILE CHANGES</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
}
