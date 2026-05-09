import { IDENTITY } from "@/lib/constants";

const CARD_WIDTH = 512;
const CARD_HEIGHT = 320;
const ACCENT_HEIGHT = 8;
const CORNER_RADIUS = 12;

const COLORS = {
  bg: "#FAFAF9",
  accent: "#D97706",
  name: "#1C1917",
  alias: "#78716C",
  role: "#44403C",
  muted: "#A8A29E",
  border: "#E7E5E4",
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

export function generateCardTexture(): HTMLCanvasElement {
  const canvas = document.createElement("canvas");
  canvas.width = CARD_WIDTH;
  canvas.height = CARD_HEIGHT;

  const ctx = canvas.getContext("2d");
  if (!ctx) return canvas;

  const pad = 28;

  // card shape + fill
  roundedRect(ctx, 0, 0, CARD_WIDTH, CARD_HEIGHT, CORNER_RADIUS);
  ctx.fillStyle = COLORS.bg;
  ctx.fill();

  roundedRect(ctx, 0, 0, CARD_WIDTH, CARD_HEIGHT, CORNER_RADIUS);
  ctx.strokeStyle = COLORS.border;
  ctx.lineWidth = 1;
  ctx.stroke();

  // accent stripe clipped to top rounded corners
  ctx.save();
  roundedRect(ctx, 0, 0, CARD_WIDTH, CARD_HEIGHT, CORNER_RADIUS);
  ctx.clip();
  ctx.fillStyle = COLORS.accent;
  ctx.fillRect(0, 0, CARD_WIDTH, ACCENT_HEIGHT);
  ctx.restore();

  ctx.textBaseline = "top";

  ctx.fillStyle = COLORS.name;
  ctx.font = "bold 36px system-ui, -apple-system, sans-serif";
  ctx.fillText(IDENTITY.name, pad, pad + 4);

  ctx.fillStyle = COLORS.alias;
  ctx.font = "400 20px system-ui, -apple-system, sans-serif";
  ctx.fillText(`a.k.a. ${IDENTITY.alias}`, pad, pad + 50);

  ctx.fillStyle = COLORS.role;
  ctx.font = "500 18px system-ui, -apple-system, sans-serif";
  ctx.letterSpacing = "2px";
  ctx.fillText(IDENTITY.role.toUpperCase(), pad, pad + 88);

  ctx.fillStyle = COLORS.muted;
  ctx.font = "italic 14px system-ui, -apple-system, sans-serif";
  ctx.fillText(`"${IDENTITY.motto}"`, pad, CARD_HEIGHT - pad - 36);

  ctx.font = "12px system-ui, -apple-system, sans-serif";
  ctx.fillText(IDENTITY.email, pad, CARD_HEIGHT - pad - 14);

  return canvas;
}
