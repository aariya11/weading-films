"use client";

import { ScrollExpandMedia } from "./ScrollExpandMedia";

export function Hero() {
  return (
    <ScrollExpandMedia
      backgroundMedia={{
        src: "/images/wedding/editorial-montage.jpg",
        alt: "WEDDING.FILMS signature editorial bridal montage with red roses",
        type: "image",
      }}
      foregroundMedia={{
        src: "/images/wedding/the-bride.jpg",
        alt: "The Bride — Grace wrapped in love, where elegance meets promise",
        type: "image",
      }}
      title="WEDDING FILMS"
      subtitle="BHUBANESWAR, ODISHA — CINEMATIC STORIES THAT STAY"
      scrollIndicator="SCROLL TO ENTER ↓"
    />
  );
}
