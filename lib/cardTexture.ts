const CARD_WIDTH = 320;
const CARD_HEIGHT = 512;
const CORNER_RADIUS = 12;
const CARD_NAME = "Spellshand";

const COLORS = {
  bg: "#0a0a0a",
  name: "#FFFFFF",
  alias: "#9CA3AF",
  accent: "#3b82f6",
  muted: "#6B7280",
} as const;

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + w - r, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + r);
  ctx.lineTo(x + w, y + h - r);
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h);
  ctx.lineTo(x + r, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function generateCardTexture(_isDark = false): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const pad = 24;

  // Card background (always black, matches ref)
  roundedRect(ctx, 0, 0, CARD_WIDTH, CARD_HEIGHT, CORNER_RADIUS);
  ctx.fillStyle = COLORS.bg;
  ctx.fill();

  // Top-left small monogram
  ctx.fillStyle = COLORS.name;
  ctx.font = "bold 28px system-ui, -apple-system, sans-serif";
  ctx.textBaseline = "top";
  ctx.textAlign = "left";
    ctx.fillText("S", pad, pad);

  // Huge "SPELLSHAND" rotated 90° counterclockwise along right edge,
  // partially overflowing the right side like a watermark.
  ctx.save();
  // Position pivot near right edge, vertically centered
  ctx.translate(CARD_WIDTH - 40, CARD_HEIGHT / 2);
  ctx.rotate(-Math.PI / 2);
  ctx.fillStyle = COLORS.name;
  ctx.font = "900 84px system-ui, -apple-system, sans-serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  // Bleed off the right side: shift text upward (which after rotation is to the right)
  ctx.fillText(CARD_NAME.toUpperCase(), 22, 0);
  ctx.restore();

  // Bottom-left identity block
  const bottomY = CARD_HEIGHT - pad;

  ctx.textAlign = "left";
  ctx.textBaseline = "alphabetic";

  // © year (very bottom)
  ctx.fillStyle = COLORS.muted;
  ctx.font = "11px system-ui, -apple-system, sans-serif";
  ctx.fillText("© 2026", pad, bottomY);

  // Blue accent bar
  const barY = bottomY - 16;
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(pad, barY, 60, 3);

  // Alias
  ctx.fillStyle = COLORS.alias;
  ctx.font = "400 14px system-ui, -apple-system, sans-serif";
  ctx.fillText("VERCEL SHIP 2024", pad, barY - 10);

  // Name
  ctx.fillStyle = COLORS.name;
  ctx.font = "bold 22px system-ui, -apple-system, sans-serif";
  ctx.fillText(CARD_NAME, pad, barY - 32);

  // Role above name
  ctx.fillStyle = COLORS.muted;
  ctx.font = "500 11px system-ui, -apple-system, sans-serif";
  ctx.fillText("INTERACTIVE BADGE", pad, barY - 56);

  return canvas;
}
