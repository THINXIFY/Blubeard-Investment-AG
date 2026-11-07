import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/cn";
import { site } from "@/lib/site";
import { LogoProgress } from "./LogoProgress";

type LogoProps = {
  /** Surface the logo sits on: "light" uses the dark-type artwork, "dark" the white-type artwork. */
  tone?: "light" | "dark";
  /** Whether the logo is a primary above-the-fold element (header). */
  priority?: boolean;
  className?: string;
  imageClassName?: string;
  /** Fill the emblem's bars with reading progress (header, main pages). */
  progress?: boolean;
  onClick?: () => void;
};

/** Official artwork (resized from public/media/branding originals; served as-is to keep edges crisp). */
const artwork = {
  light: { src: "/media/branding/logo-light.png", width: 640, height: 139 },
  dark: { src: "/media/branding/logo-dark.png", width: 640, height: 140 },
} as const;

/** Official Blubeard Investment AG logo, linked to the homepage. */
export function Logo({
  tone = "light",
  priority = false,
  className,
  imageClassName,
  progress = false,
  onClick,
}: LogoProps) {
  const art = artwork[tone];
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${site.name} — Home`}
      className={cn(
        "relative inline-flex items-center rounded-xs outline-none focus-visible:ring-2 focus-visible:ring-imperial focus-visible:ring-offset-2",
        className,
      )}
    >
      <Image
        src={art.src}
        alt={`${site.name} logo`}
        width={art.width}
        height={art.height}
        unoptimized
        priority={priority}
        className={cn("h-9 w-auto max-w-none xl:h-10", imageClassName)}
      />
      {progress ? <LogoProgress /> : null}
    </Link>
  );
}
