import Image, { ImageProps } from "next/image";
import { withBasePath } from "@/app/lib/basePath";

interface HeritageImageProps extends Omit<ImageProps, "fill"> {
  /** Tailwind height class applied to the wrapper. */
  containerHeight?: string;

  /** Additional classes for the outer wrapper div. */
  containerClassName?: string;
}

export default function HeritageImage({
  containerHeight = "h-48",
  containerClassName = "",
  alt,
  className = "",
  src,
  ...rest
}: HeritageImageProps) {
  const imageSrc = typeof src === "string" ? withBasePath(src) : src;

  return (
    <div
      className={`
        relative w-full min-w-0 overflow-hidden
        ${containerHeight}
        ${containerClassName}
      `}
    >
      <Image
        fill
        src={imageSrc}
        alt={alt}
        className={`object-cover ${className}`}
        sizes="
          (max-width: 640px) 100vw,
          (max-width: 1024px) 50vw,
          33vw
        "
        {...rest}
      />
    </div>
  );
}