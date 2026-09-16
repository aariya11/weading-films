"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { WhatsAppCTA } from "@/components/ui/WhatsAppButton";

export interface GalleryItem {
  id: string;
  src: string;
  alt: string;
  title: string;
  category: "ALL" | "BRIDAL" | "CEREMONY" | "COUPLE" | "CELEBRATION";
  categoryLabel: string;
  location: string;
  quote?: string;
  width: number;
  height: number;
  highlight?: boolean;
}

export const galleryItems: GalleryItem[] = [
  {
    id: "g-1",
    src: "/images/wedding/bride-grand-entry.jpg",
    alt: "Bride stepping gracefully through grand architectural wooden doors in golden handloom silk saree",
    title: "THE ARCHITECTURAL ENTRY",
    category: "BRIDAL",
    categoryLabel: "Bridal Editorial",
    location: "Bhubaneswar Heritage Estate",
    quote: "Stepping gracefully through grand architectural double doors, draped in golden Odia silk.",
    width: 737,
    height: 1024,
    highlight: true,
  },
  {
    id: "g-2",
    src: "/images/wedding/lotus-rose-vows.jpg",
    alt: "Couple forehead-to-forehead with pink lotus blossoms in a shower of falling rose petals",
    title: "PETALS & SACRED PROMISES",
    category: "COUPLE",
    categoryLabel: "Cinematic Love Story",
    location: "Bhubaneswar Temple Enclave",
    quote: "Love is always patient and kind. It is never jealous, never boastful or conceited. It delights in the truth.",
    width: 748,
    height: 1024,
    highlight: true,
  },
  {
    id: "g-3",
    src: "/images/wedding/sangeet-twirl-candles.jpg",
    alt: "Bride twirling in shimmering silver lehenga surrounded by tabletop candlelight",
    title: "DANCING THROUGH EVERY BEAT",
    category: "CELEBRATION",
    categoryLabel: "Sangeet Euphoria",
    location: "Bhubaneswar, Odisha",
    quote: "Draped in mehendi hues and dancing through every sangeet beat, she glows like a dream wrapped in elegance.",
    width: 736,
    height: 1024,
    highlight: true,
  },
  {
    id: "g-4",
    src: "/images/wedding/temple-pond-couple.jpg",
    alt: "Wedding films — Couple portrait by historic Bindu Sagar temple pond in Bhubaneswar",
    title: "SACRED WATERS OF BHUBANESWAR",
    category: "COUPLE",
    categoryLabel: "Heritage Couple",
    location: "Bindu Sagar, Bhubaneswar",
    quote: "Two souls united in timeless love where ancient temple towers reflect across sacred waters.",
    width: 836,
    height: 1024,
    highlight: true,
  },
  {
    id: "g-5",
    src: "/images/wedding/bride-red-heritage.jpg",
    alt: "Bride in royal crimson red lehenga with kundan jewellery by ancient temple pond",
    title: "HERITAGE LAKE BRIDE",
    category: "BRIDAL",
    categoryLabel: "Bridal Monograph",
    location: "Bhubaneswar, Odisha",
    quote: "Royal crimson lehenga with antique kundan necklaces, standing serene against heritage waters.",
    width: 771,
    height: 1024,
    highlight: true,
  },
  {
    id: "g-6",
    src: "/images/wedding/beach-love-story.jpg",
    alt: "Made for each other — Pre-wedding couple running on Puri beach and framed lift in white attire",
    title: "MADE FOR EACH OTHER // PURI COASTLINE",
    category: "COUPLE",
    categoryLabel: "Coastal Pre-Wedding",
    location: "Puri Coastline, Odisha",
    quote: "Made for each other. Barefoot runs along the Bay of Bengal surf, windswept linen, and pure romance.",
    width: 732,
    height: 1024,
    highlight: true,
  },
  {
    id: "g-7",
    src: "/images/wedding/the-bride.jpg",
    alt: "The Bride — Crimson velvet backdrop, traditional gold jewellery: Grace wrapped in love",
    title: "THE BRIDE // CRIMSON VELVET",
    category: "BRIDAL",
    categoryLabel: "Bridal Editorial",
    location: "Bhubaneswar, Odisha",
    quote: "Grace wrapped in love, where elegance meets promise in sculpted chiaroscuro light.",
    width: 779,
    height: 1024,
  },
  {
    id: "g-8",
    src: "/images/wedding/mandap-pranam.jpg",
    alt: "Bride and groom with traditional Odia wedding crowns (mukut/topor) praying with folded hands",
    title: "MANDAP PRANAM & ODIA MUKUT",
    category: "CEREMONY",
    categoryLabel: "Sacred Rituals",
    location: "Bhubaneswar, Odisha",
    quote: "Bride and groom wearing traditional Odia crowns praying with folded hands before the sacred fire.",
    width: 789,
    height: 1024,
  },
  {
    id: "g-9",
    src: "/images/wedding/girija-sumitra.jpg",
    alt: "Girija & Sumitra couple holding hands under floral mandap canopy",
    title: "GIRIJA & SUMITRA // THE MANDAP",
    category: "CEREMONY",
    categoryLabel: "Wedding Film",
    location: "Bhubaneswar, Odisha",
    quote: "Some moments are beautiful because they happen only once, and some become beautiful because they are shared.",
    width: 830,
    height: 1024,
  },
  {
    id: "g-10",
    src: "/images/wedding/groom-ivory-sherwani.jpg",
    alt: "Royal Groom in embroidered ivory raw silk sherwani, emerald necklace, and feathered safaa",
    title: "THE ROYAL GROOM IN IVORY",
    category: "BRIDAL",
    categoryLabel: "Groom Atelier",
    location: "Bhubaneswar, Odisha",
    quote: "Ivory embroidered raw silk, emerald polki necklace, and regal feathered safaa under evening lights.",
    width: 734,
    height: 1024,
  },
  {
    id: "g-11",
    src: "/images/wedding/groom-monochrome-profile.jpg",
    alt: "Fine art chiaroscuro black-and-white side profile of groom in ceremonial turban",
    title: "GROOM CHIAROSCURO MONOCHROME",
    category: "BRIDAL",
    categoryLabel: "Fine Art Monochrome",
    location: "Bhubaneswar, Odisha",
    quote: "Dramatic directional lighting and 35mm monochrome texture capturing the dignity of the groom.",
    width: 787,
    height: 1024,
  },
  {
    id: "g-12",
    src: "/images/wedding/bride-golden-saree.jpg",
    alt: "Odia bride in golden handloom silk saree with antique temple gold jewellery",
    title: "ODIA HANDLOOM SILK BRIDE",
    category: "BRIDAL",
    categoryLabel: "Bridal Editorial",
    location: "Bhubaneswar, Odisha",
    quote: "Intricate temple gold necklaces, handwoven silk zari borders, and quiet grace in natural daylight.",
    width: 756,
    height: 1024,
  },
  {
    id: "g-13",
    src: "/images/wedding/groom-procession.jpg",
    alt: "Joyful groom waving from car roof with illuminated ceremonial umbrellas in Baraat arrival",
    title: "THE BARAAT // PROCESSION EUPHORIA",
    category: "CELEBRATION",
    categoryLabel: "Baraat & Energy",
    location: "Bhubaneswar, Odisha",
    quote: "Illuminated ceremonial umbrellas, euphoric dhol beats, and the groom waving in radiant happiness.",
    width: 791,
    height: 1024,
  },
  {
    id: "g-14",
    src: "/images/wedding/bride-night-bokeh.jpg",
    alt: "Bride adjusting heirloom earring in crimson lehenga with warm night bokeh lights",
    title: "NIGHT BRIDAL SERENADE",
    category: "BRIDAL",
    categoryLabel: "Bridal Editorial",
    location: "Bhubaneswar, Odisha",
    quote: "Smiling softly while adjusting emerald jhumkas amidst the warm glow of evening reception lanterns.",
    width: 742,
    height: 1024,
  },
  {
    id: "g-15",
    src: "/images/wedding/sacred-rituals.jpg",
    alt: "Sacred fire Agni kunda rituals and eternal Vedic vows",
    title: "AGNI KUNDA & VEDIC VOWS",
    category: "CEREMONY",
    categoryLabel: "Sacred Rituals",
    location: "Bhubaneswar, Odisha",
    quote: "In a world full of stories, theirs became our favorite. Timeless memories around the holy fire.",
    width: 768,
    height: 1024,
  },
  {
    id: "g-16",
    src: "/images/wedding/bridal-quad.jpg",
    alt: "Editorial 4-frame bridal monograph and mehendi hands covering face with film grain",
    title: "EDITORIAL 4-FRAME BRIDAL MONOGRAPH",
    category: "BRIDAL",
    categoryLabel: "Bridal Monograph",
    location: "Bhubaneswar, Odisha",
    quote: "Four intimate frames exploring bridal anticipation, veil textures, and intricate henna artistry.",
    width: 718,
    height: 1024,
  },
  {
    id: "g-17",
    src: "/images/wedding/whispered-stories.jpg",
    alt: "Pre-wedding couple on ancient temple stone steps with marigold garlands in Bhubaneswar",
    title: "WHISPERED LOVE STORIES // TEMPLE STEPS",
    category: "COUPLE",
    categoryLabel: "Heritage Pre-Wedding",
    location: "Ancient Sandstone Steps, Bhubaneswar",
    quote: "Against the weathered sandstone of Odisha's historic temples, a love story unfolds in whispered intimacy.",
    width: 736,
    height: 1024,
  },
  {
    id: "g-18",
    src: "/images/wedding/temple-steps-love.jpg",
    alt: "Couple smiling and holding hands on ancient heritage sandstone steps in traditional Odisha handloom attire",
    title: "LAUGHTER ON TEMPLE STEPS",
    category: "COUPLE",
    categoryLabel: "Heritage Pre-Wedding",
    location: "Bhubaneswar, Odisha",
    quote: "Unscripted smiles and genuine connection on ancient carved temple staircases.",
    width: 748,
    height: 1024,
  },
  {
    id: "g-19",
    src: "/images/wedding/editorial-montage.jpg",
    alt: "WEDDING.FILMS signature editorial film grain collage with red roses and candid bridal expressions",
    title: "WEDDING.FILMS 35MM MONOGRAPH",
    category: "BRIDAL",
    categoryLabel: "Film Archive",
    location: "Bhubaneswar, Odisha",
    quote: "Analog warmth, delicate optical grain, and bespoke keepsake monograph artistry.",
    width: 784,
    height: 1024,
  },
];

const filterCategories = [
  { id: "ALL", label: "ALL FRAMES (19)" },
  { id: "BRIDAL", label: "BRIDAL EDITORIAL (8)" },
  { id: "COUPLE", label: "COUPLE & PRE-WEDDING (5)" },
  { id: "CEREMONY", label: "SACRED RITUALS (3)" },
  { id: "CELEBRATION", label: "SANGEET & BARAAT (3)" },
] as const;

export function GalleryShowcase() {
  const [activeFilter, setActiveFilter] = useState<string>("ALL");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredItems =
    activeFilter === "ALL"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeFilter);

  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
  };

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
  }, []);

  // Lock scroll safely during lightbox
  useEffect(() => {
    if (lightboxIndex !== null) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [lightboxIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null || touchStartY.current === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Detect horizontal swipe (at least 45px, predominantly horizontal)
    if (Math.abs(deltaX) > 45 && Math.abs(deltaX) > Math.abs(deltaY) * 1.25) {
      if (deltaX < 0) {
        nextImage();
      } else {
        prevImage();
      }
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const nextImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === null ? null : (prev + 1) % filteredItems.length
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  const prevImage = useCallback(() => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev === null ? null : (prev - 1 + filteredItems.length) % filteredItems.length
      );
    }
  }, [lightboxIndex, filteredItems.length]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (lightboxIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") nextImage();
      if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, closeLightbox, nextImage, prevImage]);

  const activeItem = lightboxIndex !== null ? filteredItems[lightboxIndex] : null;

  return (
    <section
      id="gallery"
      className="relative py-28 lg:py-44 bg-paper text-ink dark:bg-ink dark:text-white border-t border-ink/10 dark:border-white/10"
      aria-labelledby="gallery-heading"
    >
      <div className="container">
        {/* Section Header */}
        <div className="mb-16 lg:mb-24 flex flex-col md:flex-row md:items-end justify-between gap-8 border-b border-ink/10 dark:border-white/10 pb-8">
          <div>
            <p className="label label-accent mb-4 tracking-[0.3em] text-xs font-mono">
              03 // BHUBANESWAR, ODISHA — 19 CLIENT MASTER FRAMES
            </p>
            <h2
              id="gallery-heading"
              className="font-display text-4xl sm:text-6xl lg:text-8xl tracking-tight leading-[0.95]"
            >
              EDITORIAL <br />
              <span className="italic font-serif font-light text-ink/80">
                EXHIBITION.
              </span>
            </h2>
          </div>
          <div className="max-w-md space-y-4">
            <p className="body-small text-charcoal/80 dark:text-white/80 leading-relaxed font-ui">
              Every photograph is an authentic commission produced in Bhubaneswar, Puri, and sacred temple destinations across Odisha. Click any frame to inspect in full-screen cinematic resolution.
            </p>
            <div className="pt-2">
              <WhatsAppCTA
                variant="primary"
                label="Inquire About Your Wedding Dates (+91 9124885729)"
              />
            </div>
          </div>
        </div>

        {/* Category Filters */}
        <div className="flex items-center gap-3 sm:gap-4 flex-wrap border-b border-ink/10 dark:border-white/10 pb-6 mb-16">
          {filterCategories.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={cn(
                "font-mono text-xs tracking-[0.2em] uppercase px-4 py-2 transition-all duration-200 border",
                activeFilter === filter.id
                  ? "bg-ink text-white dark:bg-white dark:text-ink border-ink dark:border-white font-semibold shadow-sm"
                  : "bg-transparent text-charcoal/70 dark:text-white/70 border-ink/15 dark:border-white/20 hover:border-ink dark:hover:border-white hover:text-ink dark:hover:text-white"
              )}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
          {filteredItems.map((item, index) => {
            const num = String(index + 1).padStart(2, "0");

            return (
              <article
                key={item.id}
                onClick={() => openLightbox(index)}
                className="group cursor-pointer relative bg-paper-warm border border-ink/10 overflow-hidden flex flex-col justify-between transition-all duration-500 hover:shadow-2xl hover:border-champagne/60 hover:-translate-y-1.5"
                data-cursor="VIEW"
              >
                {/* Image Frame */}
                <div className="relative aspect-[3/4] w-full overflow-hidden bg-ink/5">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover transition-transform duration-1000 ease-out-expo group-hover:scale-105"
                  />
                  {/* Subtle Grain Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-end p-6 text-white">
                    <span className="font-mono text-[10px] tracking-[0.25em] text-champagne uppercase mb-1">
                      {item.categoryLabel}
                    </span>
                    <h4 className="font-display text-xl text-white font-light">
                      {item.title}
                    </h4>
                    {item.quote && (
                      <p className="text-xs text-white/80 line-clamp-2 mt-2 font-ui italic">
                        &ldquo;{item.quote}&rdquo;
                      </p>
                    )}
                    <div className="mt-4 flex items-center justify-between font-mono text-[10px] tracking-widest text-champagne pt-3 border-t border-white/20">
                      <span>EXPAND FULLSCREEN</span>
                      <span>↗</span>
                    </div>
                  </div>

                  {/* Corner Badge */}
                  <div className="absolute top-3 left-3 z-10">
                    <span className="font-mono text-[10px] tracking-widest bg-ink/80 text-white px-2.5 py-1 backdrop-blur-sm">
                      FRAME {num}
                    </span>
                  </div>

                  {item.highlight && (
                    <div className="absolute top-3 right-3 z-10">
                      <span className="font-mono text-[9px] tracking-widest bg-champagne text-ink font-bold px-2 py-0.5 uppercase shadow">
                        FEATURED
                      </span>
                    </div>
                  )}
                </div>

                {/* Caption Bar */}
                <div className="p-5 border-t border-ink/10 bg-paper flex items-center justify-between">
                  <div>
                    <h3 className="font-display text-base text-ink group-hover:text-champagne transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-mono text-[10px] tracking-wider text-charcoal/60 uppercase mt-0.5">
                      {item.location}
                    </p>
                  </div>
                  <span className="text-xs font-mono text-charcoal/40 group-hover:text-ink transition-colors">
                    0{index + 1} / {filteredItems.length}
                  </span>
                </div>
              </article>
            );
          })}
        </div>

        {/* Footer CTA */}
        <div className="mt-20 pt-10 border-t border-ink/10 flex flex-col sm:flex-row items-center justify-between gap-6">
          <p className="text-xs font-mono uppercase tracking-[0.2em] text-charcoal/70">
            ALL 19 PHOTOGRAPHS COMMISSIONED & CAPTURED IN BHUBANESWAR & PURI, ODISHA
          </p>
          <a
            href="https://wa.me/919124885729"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 font-mono text-xs tracking-[0.2em] uppercase text-ink hover:text-champagne transition-colors underline underline-offset-8"
          >
            <span>DISCUSS BESPOKE COVERAGE ON WHATSAPP (+91 9124885729)</span>
            <span>→</span>
          </a>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal with Mobile Touch Swipe Navigation */}
      {lightboxIndex !== null && activeItem && (
        <div
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between p-4 sm:p-8 animate-in fade-in duration-300 touch-manipulation select-none"
          role="dialog"
          aria-modal="true"
          aria-label={activeItem.title}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Top Bar */}
          <div className="flex items-center justify-between text-white border-b border-white/10 pb-4 z-20">
            <div className="flex items-baseline gap-4">
              <span className="font-mono text-xs tracking-[0.25em] text-champagne uppercase">
                FRAME {String(lightboxIndex + 1).padStart(2, "0")} / {filteredItems.length}
              </span>
              <span className="font-display text-lg hidden sm:inline text-white/90">
                {activeItem.title}
              </span>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs font-mono text-white/50 hidden md:inline">
                USE ← / → KEYS TO NAVIGATE · ESC TO CLOSE
              </span>
              <button
                type="button"
                onClick={closeLightbox}
                className="font-mono text-xs tracking-widest border border-white/30 text-white hover:bg-white hover:text-black px-3.5 py-2 transition-colors uppercase cursor-pointer min-h-[44px] flex items-center justify-center"
                aria-label="Close lightbox"
              >
                CLOSE [×]
              </button>
            </div>
          </div>

          {/* Central Image Showcase */}
          <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
            {/* Left Nav Button */}
            <button
              type="button"
              onClick={prevImage}
              className="absolute left-2 sm:left-6 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
              aria-label="Previous photograph"
            >
              <span className="font-mono text-lg sm:text-2xl font-bold">←</span>
            </button>

            {/* Main Image */}
            <div className="relative h-full w-full max-w-4xl max-h-[62vh] sm:max-h-[75vh] flex items-center justify-center">
              <Image
                src={activeItem.src}
                alt={activeItem.alt}
                fill
                priority
                sizes="(max-width: 1200px) 100vw, 80vw"
                className="object-contain"
              />
            </div>

            {/* Right Nav Button */}
            <button
              type="button"
              onClick={nextImage}
              className="absolute right-2 sm:right-6 z-20 p-3 sm:p-4 text-white/70 hover:text-white bg-black/40 hover:bg-black/80 rounded-full transition-all backdrop-blur-sm border border-white/10 cursor-pointer"
              aria-label="Next photograph"
            >
              <span className="font-mono text-lg sm:text-2xl font-bold">→</span>
            </button>
          </div>

          {/* Bottom Bar with Metadata & WhatsApp Action */}
          <div className="border-t border-white/10 pt-4 z-20 flex flex-col sm:flex-row items-center justify-between gap-4 text-white">
            <div className="max-w-xl text-center sm:text-left">
              <p className="font-mono text-xs tracking-[0.2em] text-champagne uppercase">
                {activeItem.location} — {activeItem.categoryLabel}
              </p>
              {activeItem.quote && (
                <p className="text-xs sm:text-sm text-white/80 italic font-ui mt-1">
                  &ldquo;{activeItem.quote}&rdquo;
                </p>
              )}
            </div>

            <div className="flex items-center gap-3">
              <a
                href={"https://wa.me/919124885729?text=Hello%20Wedding%20Films,%20I%20am%20interested%20in%20commissioning%20a%20wedding%20look%20like:%20" + encodeURIComponent(activeItem.title)}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#25D366] hover:bg-[#20ba59] text-white font-mono text-xs tracking-widest uppercase px-5 py-3 rounded-none font-semibold transition-all inline-flex items-center justify-center gap-2 shadow-lg min-h-[44px] w-full sm:w-auto"
              >
                <span>BOOK THIS STYLE ON WHATSAPP</span>
                <span>↗</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
