"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";

type ExampleSiteImageProps = Omit<ImageProps, "src"> & {
  src: string;
  fallbackSrc: string;
};

export default function ExampleSiteImage({ src, fallbackSrc, alt, ...props }: ExampleSiteImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  useEffect(() => {
    setCurrentSrc(src);
  }, [src]);

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      onError={() => {
        if (currentSrc !== fallbackSrc) {
          setCurrentSrc(fallbackSrc);
        }
      }}
    />
  );
}
