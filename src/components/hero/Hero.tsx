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
        alt: "The Bride — Editorial portrait in royal crimson velvet lehenga",
        type: "image",
      }}
      title="WEDDING FILMS"
      subtitle="BHUBANESWAR, ODISHA · CINEMATIC WEDDING FILMS + FINE ART PHOTOGRAPHY"
      scrollIndicator="SCROLL TO ENTER ↓"
    />
  );
}
