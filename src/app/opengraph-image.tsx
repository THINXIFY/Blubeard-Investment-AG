import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { site } from "@/lib/site";

export const alt = `${site.name} — ${site.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  const logo = await readFile(join(process.cwd(), "public/media/branding/logo-dark.png"));
  const logoSrc = `data:image/png;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 80,
        background: "#101320",
        color: "#ffffff",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- rendered by next/og, not the browser */}
      <img src={logoSrc} alt={`${site.name} logo`} width={366} height={80} />
      <div style={{ display: "flex", flexDirection: "column", fontSize: 78, lineHeight: 1.05, letterSpacing: -2.5 }}>
        <span>Capital with Vision.</span>
        <span style={{ color: "#8d94a5" }}>Value with Purpose.</span>
      </div>
      <div style={{ display: "flex", fontSize: 22, color: "#c5cbd6", letterSpacing: 4, textTransform: "uppercase" }}>
        {`${site.address.locality} · ${site.address.country}`}
      </div>
    </div>,
    size,
  );
}
