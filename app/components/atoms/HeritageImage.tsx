import Image, { ImageProps } from "next/image";

interface HeritageImageProps extends Omit<ImageProps, "fill"> {
  /** Tailwind height class applied to the wrapper, e.g. "h-48", "h-64". Defaults to "h-48". */
  containerHeight?: string;
  /** Additional classes for the outer wrapper div */
  containerClassName?: string;
}

/**
 * Responsive image atom built on next/image with the `fill` strategy.
 * The parent container is `relative w-full` so the image always stretches
 * to fill its column without causing cumulative layout shifts (CLS).
 *
 * @example
 * <HeritageImage
 *   src="/images/heritage-site.jpg"
 *   alt="Historic Intramuros walls"
 *   containerHeight="h-64"
 *   className="object-cover rounded-xl"
 * />
 */
export default function HeritageImage({
  containerHeight = "h-48",
  containerClassName = "",
  alt,
  className = "",
  ...rest
}: HeritageImageProps) {
  return (
    <div
      className={`relative w-full overflow-hidden ${containerHeight} ${containerClassName}`}
    >
      <Image
        fill
        alt={alt}
        className={`object-cover ${className}`}
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        {...rest}
      />
    </div>
  );
}
