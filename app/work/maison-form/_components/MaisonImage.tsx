import Image from "next/image";
import type { MaisonAsset } from "../_lib/content";
import { maisonAssets } from "../_lib/content";
import { mfAsset } from "../_lib/routes";

type MaisonImageProps = {
  asset: MaisonAsset;
  alt?: string;
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  sizes?: string;
  objectPosition?: string;
};

export default function MaisonImage({
  asset,
  alt,
  className = "",
  imageClassName = "",
  priority = false,
  sizes = "100vw",
  objectPosition,
}: MaisonImageProps) {
  const image = maisonAssets[asset];

  return (
    <div className={`mf-image ${className}`}>
      <Image
        src={mfAsset(asset)}
        alt={alt ?? image.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={imageClassName}
        style={objectPosition ? { objectPosition } : undefined}
      />
    </div>
  );
}
