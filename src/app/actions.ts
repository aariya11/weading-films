"use server";

export interface InquiryFormState {
  success: boolean;
  message?: string;
  errors?: Record<string, string>;
}

const ALLOWED_DISCIPLINES = [
  "Full Wedding Coverage",
  "Cinematic Film Only",
  "Editorial Bridal",
  "Pre-Wedding Story",
];

function sanitizeString(input: string): string {
  return input
    .replace(/[<>]/g, "")
    .replace(/javascript:/gi, "")
    .trim();
}

export async function submitInquiry(
  prevState: InquiryFormState | null,
  formData: FormData
): Promise<InquiryFormState> {
  // Honeypot anti-spam check: if bot fills this hidden field, fail silently with success
  const honeypot = formData.get("studio_reference_key");
  if (honeypot && String(honeypot).trim() !== "") {
    // Return simulated success to confuse bot scripts without executing any logic
    return {
      success: true,
      message: "Inquiry received. The production team will respond promptly.",
    };
  }

  const name = sanitizeString(String(formData.get("name") || ""));
  const email = sanitizeString(String(formData.get("email") || ""));
  const phone = sanitizeString(String(formData.get("phone") || ""));
  const discipline = sanitizeString(String(formData.get("discipline") || "Full Wedding Coverage"));
  const details = sanitizeString(String(formData.get("details") || ""));
  const consent = formData.get("consent") === "on" || formData.get("consent") === "true";

  const errors: Record<string, string> = {};

  if (!name || name.length < 2) {
    errors.name = "Please provide your full name (minimum 2 characters).";
  } else if (name.length > 100) {
    errors.name = "Name must not exceed 100 characters.";
  }

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!email || !emailRegex.test(email)) {
    errors.email = "Please provide a valid email address.";
  } else if (email.length > 150) {
    errors.email = "Email must not exceed 150 characters.";
  }

  if (phone && (phone.length < 7 || phone.length > 30)) {
    errors.phone = "Please enter a valid phone number or WhatsApp contact.";
  }

  if (!ALLOWED_DISCIPLINES.includes(discipline)) {
    errors.discipline = "Please select a valid coverage discipline.";
  }

  if (!details || details.length < 10) {
    errors.details = "Please provide details regarding your wedding date, venue, and vision (minimum 10 characters).";
  } else if (details.length > 3000) {
    errors.details = "Message must not exceed 3000 characters.";
  }

  if (!consent) {
    errors.consent = "You must consent to the privacy policy to submit an inquiry.";
  }

  if (Object.keys(errors).length > 0) {
    return {
      success: false,
      errors,
    };
  }

  // Log sanitized inquiry for studio review
  console.log("[INQUIRY RECEIVED - WEDDING FILMS BHUBANESWAR]", {
    timestamp: new Date().toISOString(),
    name,
    email,
    phone,
    discipline,
    detailsPreview: details.slice(0, 80) + "...",
  });

  return {
    success: true,
    message: "Thank you for reaching out. The WEDDING FILMS production team in Bhubaneswar will review your wedding dates and respond within 12 hours.",
  };
}
