import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getOgCard, ogCardKeys } from "../../../lib/site-routes";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return ogCardKeys().map((key) => ({ image: `${key}.png` }));
}

const font = (pkg, file) => readFile(path.join(process.cwd(), "node_modules/@fontsource", pkg, "files", file));

/** 1200×630 social/preview card for each page, in the site's colours and typefaces. */
export async function GET(_request, { params }) {
  const { image } = await params;
  const card = getOgCard(image.replace(/\.png$/, ""));
  if (!card) return new Response("Not found", { status: 404 });

  const [manrope, manropeBold, playfair] = await Promise.all([
    font("manrope", "manrope-latin-600-normal.woff"),
    font("manrope", "manrope-latin-800-normal.woff"),
    font("playfair-display", "playfair-display-latin-700-normal.woff"),
  ]);

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: "64px 72px", background: "linear-gradient(120deg, #0B1D3A 0%, #0B1D3A 55%, #0D47A1 100%)", color: "#fff", fontFamily: "Manrope" }}>
        <div style={{ display: "flex", alignItems: "center", fontSize: 34, fontWeight: 800 }}>
          <span style={{ color: "#2196F3" }}>Y</span>antransh<span style={{ color: "#2196F3" }}>VT</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 24, letterSpacing: 3, textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 18 }}>{card.eyebrow}</div>
          <div style={{ fontFamily: "Playfair Display", fontSize: card.title.length > 40 ? 60 : 72, lineHeight: 1.12, maxWidth: 1000 }}>{card.title}</div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 24, color: "rgba(255,255,255,0.7)" }}>
          <span>Strategy | Technology | Talent Excellence</span>
          <span>yantranshvt.com</span>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Manrope", data: manrope, weight: 600, style: "normal" },
        { name: "Manrope", data: manropeBold, weight: 800, style: "normal" },
        { name: "Playfair Display", data: playfair, weight: 700, style: "normal" },
      ],
    },
  );
}
