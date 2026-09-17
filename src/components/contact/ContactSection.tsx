"use client";

import { useState, useRef, useTransition } from "react";
import { studioInfo } from "@/data";
import { cn } from "@/lib/utils";
import { PopButton } from "@/components/ui/PopButton";
import { WhatsAppCTA } from "@/components/ui/WhatsAppButton";
import { submitInquiry, InquiryFormState } from "@/app/actions";

type FormFields = {
  name: string;
  email: string;
  phone: string;
  discipline: string;
  weddingDate: string;
  venue: string;
  message: string;
  consent: boolean;
};

const initialForm: FormFields = {
  name: "",
  email: "",
  phone: "",
  discipline: "Full Wedding Coverage",
  weddingDate: "",
  venue: "",
  message: "",
  consent: false,
};

export function ContactSection() {
  const [formData, setFormData] = useState<FormFields>(initialForm);
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [serverState, setServerState] = useState<InquiryFormState | null>(null);
  const [isPending, startTransition] = useTransition();
  const sectionRef = useRef<HTMLElement>(null);

  const validateClient = (): boolean => {
    const errs: Record<string, string> = {};
    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errs.name = "Please provide your full name (minimum 2 characters).";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errs.email = "Please provide a valid email address.";
    }
    if (formData.phone.trim() && (formData.phone.trim().length < 7 || formData.phone.trim().length > 30)) {
      errs.phone = "Please provide a valid phone or WhatsApp number.";
    }
    if (!formData.weddingDate.trim()) {
      errs.weddingDate = "Please share your approximate wedding date or month.";
    }
    if (!formData.venue.trim() || formData.venue.trim().length < 3) {
      errs.venue = "Please mention your wedding venue or city (e.g. Bhubaneswar, Puri).";
    }
    if (!formData.message.trim() || formData.message.trim().length < 10) {
      errs.message = "Please share a brief note about your celebration vision (minimum 10 characters).";
    }
    if (!formData.consent) {
      errs.consent = "Consent is required to submit your inquiry.";
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTouched({
      name: true,
      email: true,
      phone: true,
      weddingDate: true,
      venue: true,
      message: true,
      consent: true,
    });

    if (!validateClient()) return;

    const data = new FormData(e.currentTarget);
    data.set("discipline", formData.discipline);
    data.set("weddingDate", formData.weddingDate);
    data.set("venue", formData.venue);
    data.set("message", formData.message);
    data.set("consent", formData.consent ? "on" : "off");

    startTransition(async () => {
      try {
        const res = await submitInquiry(null, data);
        setServerState(res);
        if (res.success) {
          setFormData(initialForm);
          setErrors({});
          setTouched({});
        } else if (res.errors) {
          setErrors(res.errors);
        }
      } catch {
        setServerState({
          success: false,
          message: "A network error occurred. Please try again or reach us via WhatsApp directly.",
        });
      }
    });
  };

  const isLabelActive = (field: keyof FormFields) => {
    return (
      focusedField === field ||
      (typeof formData[field] === "string" && (formData[field] as string).length > 0)
    );
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="relative py-28 lg:py-44 bg-paper text-ink border-t border-ink/10"
      aria-labelledby="contact-heading"
    >
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-start">
          {/* Left Column: Directives & Contact Info */}
          <div className="lg:col-span-5">
            <p className="label label-accent mb-6 tracking-[0.3em] text-xs font-mono text-champagne-deep font-medium">
              06 // COMMISSIONS & DATES
            </p>
            <h2
              id="contact-heading"
              className="font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight leading-[0.98] mb-8 text-ink "
            >
              <span className="block">LET&apos;S CRAFT</span>
              <span className="block italic font-serif font-light text-ink/70 ">
                YOUR WEDDING
              </span>
              <span className="block">CINEMA</span>
              <span className="block">LEGACY.</span>
            </h2>

            <p className="body-small text-charcoal/80 max-w-md leading-relaxed font-ui mb-10">
              We accept a limited number of commissions each wedding season across Bhubaneswar, Odisha, and luxury destination venues worldwide to dedicate complete artistic devotion to each couple.
            </p>

            {/* Direct WhatsApp Action Box */}
            <div className="p-6 bg-paper-warm border border-ink/10 mb-10 space-y-3">
              <p className="font-mono text-xs tracking-wider uppercase text-champagne-deep font-semibold">
                FASTEST RESPONSE // WHATSAPP DIRECT
              </p>
              <p className="text-xs text-charcoal/80 leading-relaxed">
                Connect directly with our lead cinematography director in Bhubaneswar for instant date availability:
              </p>
              <WhatsAppCTA
                variant="primary"
                label="Chat on WhatsApp (+91 9124885729) →"
                className="w-full justify-center py-3 text-xs"
              />
            </div>

            <div className="space-y-6 pt-6 border-t border-ink/10 font-ui text-sm">
              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-champagne-deep font-semibold mb-1">
                  STUDIO BASE & ADDRESS
                </p>
                <p className="text-base font-display text-ink font-light">
                  Bhubaneswar, Odisha, India
                </p>
                <p className="text-xs font-mono text-charcoal/70 mt-1">
                  Available worldwide for destination weddings
                </p>
              </div>

              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-champagne-deep font-semibold mb-1">
                  PHONE & WHATSAPP
                </p>
                <a
                  href="tel:+919124885729"
                  className="text-base text-charcoal/90 hover:text-ink transition-colors font-mono font-medium focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  aria-label="Call WEDDING FILMS at +91 9124885729"
                >
                  +91 9124885729
                </a>
              </div>

              <div>
                <p className="font-mono text-xs tracking-wider uppercase text-champagne-deep font-semibold mb-1">
                  DIRECT EMAIL
                </p>
                <a
                  href={"mailto:" + studioInfo.email}
                  className="font-display text-xl sm:text-2xl text-ink hover:text-champagne-deep transition-colors break-all sm:break-normal focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
                  aria-label={`Send email to ${studioInfo.email}`}
                >
                  {studioInfo.email}
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: High-End Interactive Form */}
          <div className="lg:col-span-7" aria-live="polite">
            {serverState?.success ? (
              <div className="bg-paper-warm border border-ink/10 p-12 lg:p-16 text-center space-y-6">
                <span className="w-12 h-12 rounded-full bg-champagne/20 text-champagne-deep inline-flex items-center justify-center font-mono text-xl">
                  ✓
                </span>
                <h3 className="font-display text-3xl sm:text-4xl text-ink ">
                  INQUIRY RECEIVED.
                </h3>
                <p className="body-small text-charcoal/80 max-w-md mx-auto leading-relaxed">
                  {serverState.message ||
                    "Thank you for reaching out. The WEDDING FILMS production team in Bhubaneswar will review your wedding dates and respond within 12 hours."}
                </p>
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-4">
                  <WhatsAppCTA
                    variant="primary"
                    label="Continue on WhatsApp →"
                    className="w-full sm:w-auto justify-center min-h-[48px]"
                  />
                  <button
                    type="button"
                    onClick={() => setServerState(null)}
                    className="btn inline-flex items-center justify-center min-h-[48px] px-6 py-3.5 !bg-[#0f0f0f] !text-white font-mono text-xs tracking-wider uppercase font-bold rounded-xs hover:!bg-[#2d2d2d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink cursor-pointer w-full sm:w-auto"
                  >
                    SEND ANOTHER NOTE
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-8">
                {/* Honeypot anti-spam field */}
                <input
                  type="text"
                  name="studio_reference_key"
                  tabIndex={-1}
                  autoComplete="off"
                  style={{ display: "none" }}
                  aria-hidden="true"
                />

                {/* General server error alert */}
                {serverState?.message && !serverState.success && (
                  <div
                    role="alert"
                    className="p-4 border border-red-300 bg-red-50 text-red-800 text-xs font-mono"
                  >
                    {serverState.message}
                  </div>
                )}

                {/* Coverage Discipline Selector */}
                <fieldset>
                  <legend className="font-mono text-xs tracking-[0.25em] uppercase text-champagne-deep font-bold block mb-4">
                    SELECT COVERAGE DISCIPLINE
                  </legend>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                    {[
                      "Full Wedding Coverage",
                      "Cinematic Film Only",
                      "Editorial Bridal",
                      "Pre-Wedding Story",
                    ].map((type) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, discipline: type })}
                        className={cn(
                          "min-h-[48px] py-3.5 px-3 border text-left font-mono text-xs tracking-wider cursor-pointer touch-manipulation rounded-xs",
                          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink",
                          formData.discipline === type
                            ? "border-ink bg-ink !text-white font-bold shadow-xs"
                            : "border-ink/20 !text-ink hover:border-ink bg-paper-warm font-semibold"
                        )}
                        aria-pressed={formData.discipline === type}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </fieldset>

                {/* Name and Email in 2 columns on desktop */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Name */}
                  <div className="relative border-b border-ink/25 focus-within:border-ink transition-colors pb-2">
                    <label
                      htmlFor="form-name"
                      className={cn(
                        "font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 block pointer-events-none",
                        isLabelActive("name")
                          ? "text-champagne-deep font-bold -translate-y-1 text-[11px]"
                          : "text-charcoal/90 font-semibold"
                      )}
                    >
                      COUPLE OR CLIENT NAME *
                    </label>
                    <input
                      id="form-name"
                      name="name"
                      type="text"
                      required
                      placeholder="e.g. Priya & Rahul"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-1 bg-transparent text-ink font-ui text-base focus:outline-none placeholder:text-charcoal/40"
                      aria-invalid={Boolean(touched.name && errors.name)}
                      aria-describedby={touched.name && errors.name ? "name-error" : undefined}
                    />
                    {touched.name && errors.name && (
                      <p id="name-error" role="alert" className="text-xs font-mono text-red-600 mt-1">
                        {errors.name}
                      </p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="relative border-b border-ink/25 focus-within:border-ink transition-colors pb-2">
                    <label
                      htmlFor="form-email"
                      className={cn(
                        "font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 block pointer-events-none",
                        isLabelActive("email")
                          ? "text-champagne-deep font-bold -translate-y-1 text-[11px]"
                          : "text-charcoal/90 font-semibold"
                      )}
                    >
                      EMAIL ADDRESS *
                    </label>
                    <input
                      id="form-email"
                      name="email"
                      type="email"
                      required
                      placeholder="your.email@domain.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-1 bg-transparent text-ink font-ui text-base focus:outline-none placeholder:text-charcoal/40"
                      aria-invalid={Boolean(touched.email && errors.email)}
                      aria-describedby={touched.email && errors.email ? "email-error" : undefined}
                    />
                    {touched.email && errors.email && (
                      <p id="email-error" role="alert" className="text-xs font-mono text-red-600 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>
                </div>

                {/* Phone & Wedding Date in 2 columns */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                  {/* Phone / WhatsApp */}
                  <div className="relative border-b border-ink/25 focus-within:border-ink transition-colors pb-2">
                    <label
                      htmlFor="form-phone"
                      className={cn(
                        "font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 block pointer-events-none",
                        isLabelActive("phone")
                          ? "text-champagne-deep font-bold -translate-y-1 text-[11px]"
                          : "text-charcoal/90 font-semibold"
                      )}
                    >
                      PHONE / WHATSAPP NUMBER
                    </label>
                    <input
                      id="form-phone"
                      name="phone"
                      type="tel"
                      placeholder="+91 9124885729"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      onFocus={() => setFocusedField("phone")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-1 bg-transparent text-ink font-ui text-base focus:outline-none placeholder:text-charcoal/40"
                      aria-invalid={Boolean(touched.phone && errors.phone)}
                      aria-describedby={touched.phone && errors.phone ? "phone-error" : undefined}
                    />
                    {touched.phone && errors.phone && (
                      <p id="phone-error" role="alert" className="text-xs font-mono text-red-600 mt-1">
                        {errors.phone}
                      </p>
                    )}
                  </div>

                  {/* Wedding Date */}
                  <div className="relative border-b border-ink/25 focus-within:border-ink transition-colors pb-2">
                    <label
                      htmlFor="form-wedding-date"
                      className={cn(
                        "font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 block pointer-events-none",
                        isLabelActive("weddingDate")
                          ? "text-champagne-deep font-bold -translate-y-1 text-[11px]"
                          : "text-charcoal/90 font-semibold"
                      )}
                    >
                      WEDDING DATE OR MONTH *
                    </label>
                    <input
                      id="form-wedding-date"
                      name="weddingDate"
                      type="text"
                      required
                      placeholder="e.g. December 2025 / Nov 18-20"
                      value={formData.weddingDate}
                      onChange={(e) => setFormData({ ...formData, weddingDate: e.target.value })}
                      onFocus={() => setFocusedField("weddingDate")}
                      onBlur={() => setFocusedField(null)}
                      className="w-full pt-1 bg-transparent text-ink font-ui text-base focus:outline-none placeholder:text-charcoal/40"
                      aria-invalid={Boolean(touched.weddingDate && errors.weddingDate)}
                      aria-describedby={touched.weddingDate && errors.weddingDate ? "wedding-date-error" : undefined}
                    />
                    {touched.weddingDate && errors.weddingDate && (
                      <p id="wedding-date-error" role="alert" className="text-xs font-mono text-red-600 mt-1">
                        {errors.weddingDate}
                      </p>
                    )}
                  </div>
                </div>

                {/* Venue & Location */}
                <div className="relative border-b border-ink/25 focus-within:border-ink transition-colors pb-2">
                  <label
                    htmlFor="form-venue"
                    className={cn(
                      "font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 block pointer-events-none",
                      isLabelActive("venue")
                        ? "text-champagne-deep font-bold -translate-y-1 text-[11px]"
                        : "text-charcoal/90 font-semibold"
                    )}
                  >
                    VENUE & CEREMONY LOCATION *
                  </label>
                  <input
                    id="form-venue"
                    name="venue"
                    type="text"
                    required
                    placeholder="e.g. Mayfair Lagoon, Bhubaneswar / Blue Lily Resort, Puri"
                    value={formData.venue}
                    onChange={(e) => setFormData({ ...formData, venue: e.target.value })}
                    onFocus={() => setFocusedField("venue")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pt-1 bg-transparent text-ink font-ui text-base focus:outline-none placeholder:text-charcoal/40"
                    aria-invalid={Boolean(touched.venue && errors.venue)}
                    aria-describedby={touched.venue && errors.venue ? "venue-error" : undefined}
                  />
                  {touched.venue && errors.venue && (
                    <p id="venue-error" role="alert" className="text-xs font-mono text-red-600 mt-1">
                      {errors.venue}
                    </p>
                  )}
                </div>

                {/* Message / Celebration Vision */}
                <div className="relative border-b border-ink/25 focus-within:border-ink transition-colors pb-2">
                  <label
                    htmlFor="form-message"
                    className={cn(
                      "font-mono text-xs tracking-[0.2em] uppercase transition-all duration-200 block pointer-events-none",
                      isLabelActive("message")
                        ? "text-champagne-deep font-bold -translate-y-1 text-[11px]"
                        : "text-charcoal/90 font-semibold"
                    )}
                  >
                    VISION, TIMELINE & NOTES *
                  </label>
                  <textarea
                    id="form-message"
                    name="message"
                    rows={4}
                    required
                    placeholder="Tell us about your celebration, ceremonial events, number of guests, or specific cinema style you cherish..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className="w-full pt-3 pb-2 bg-transparent text-ink font-ui text-base focus:outline-none resize-none placeholder:text-charcoal/40"
                    aria-invalid={Boolean(touched.message && errors.message)}
                    aria-describedby={touched.message && errors.message ? "message-error" : undefined}
                  />
                  {touched.message && errors.message && (
                    <p id="message-error" role="alert" className="text-xs font-mono text-red-600 mt-1">
                      {errors.message}
                    </p>
                  )}
                </div>

                {/* Consent */}
                <div className="flex items-start gap-3">
                  <input
                    id="form-consent"
                    name="consent"
                    type="checkbox"
                    checked={formData.consent}
                    onChange={(e) => setFormData({ ...formData, consent: e.target.checked })}
                    className="mt-1 accent-ink cursor-pointer w-4 h-4"
                    aria-invalid={Boolean(touched.consent && errors.consent)}
                    aria-describedby={touched.consent && errors.consent ? "consent-error" : undefined}
                  />
                  <label
                    htmlFor="form-consent"
                    className="text-xs font-ui text-charcoal/90 leading-relaxed cursor-pointer select-none"
                  >
                    I consent to WEDDING FILMS processing my contact details for this wedding inquiry in accordance with the{" "}
                    <a
                      href="/privacy"
                      className="underline hover:text-champagne-deep text-ink font-medium focus-visible:outline-1 focus-visible:outline-ink"
                    >
                      Privacy Policy
                    </a>.
                  </label>
                </div>
                {touched.consent && errors.consent && (
                  <p id="consent-error" role="alert" className="text-xs font-mono text-red-600 -mt-6">
                    {errors.consent}
                  </p>
                )}

                {/* Submit & WhatsApp CTAs */}
                <div className="pt-4 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                  <PopButton
                    type="submit"
                    disabled={isPending}
                    className="w-full sm:w-auto justify-center min-h-[48px]"
                    data-cursor="OPEN"
                  >
                    {isPending ? "TRANSMITTING INQUIRY..." : "INQUIRE ABOUT YOUR DATE"}
                  </PopButton>

                  <WhatsAppCTA
                    variant="outline"
                    label="Or Chat on WhatsApp"
                    className="w-full sm:w-auto justify-center min-h-[48px]"
                  />
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
