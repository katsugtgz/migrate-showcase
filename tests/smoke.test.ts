import { describe, expect, it } from "vitest";
import {
  IDENTITY,
  SOCIALS,
  NAV_LINKS,
  PROJECTS,
  HERO_CLOCK,
  MARQUEE_ROWS,
  ABOUT_COPY,
  TECH_LOGOS,
  PROJECT_CATEGORIES,
  QUOTE,
  CONTACT_CTA,
  FOOTER,
} from "@/lib/constants";

// ── Original smoke tests ─────────────────────────────────────

describe("constants", () => {
  it("exports IDENTITY with required fields", () => {
    expect(IDENTITY.name).toBe("Nizar Alfarizi Akbar");
    expect(IDENTITY.alias).toBe("Fariz");
    expect(IDENTITY.role).toBe("Software Engineer");
    expect(IDENTITY.email).toContain("@");
  });

  it("exports SOCIALS as a non-empty array", () => {
    expect(Array.isArray(SOCIALS)).toBe(true);
    expect(SOCIALS.length).toBeGreaterThan(0);
    for (const social of SOCIALS) {
      expect(social).toHaveProperty("label");
      expect(social).toHaveProperty("href");
    }
  });

  it("exports NAV_LINKS as a non-empty array", () => {
    expect(Array.isArray(NAV_LINKS)).toBe(true);
    expect(NAV_LINKS.length).toBeGreaterThan(0);
  });

  it("exports PROJECTS as a non-empty array with valid entries", () => {
    expect(Array.isArray(PROJECTS)).toBe(true);
    expect(PROJECTS.length).toBeGreaterThan(0);
    for (const project of PROJECTS) {
      expect(project).toHaveProperty("title");
      expect(project).toHaveProperty("href");
    }
  });
});

// ── HERO_CLOCK ────────────────────────────────────────────────

describe("HERO_CLOCK", () => {
  it("has siteTimezone and localTimeLabel fields", () => {
    expect(HERO_CLOCK.siteTimezone).toBe("WIB");
    expect(HERO_CLOCK.localTimeLabel).toBe("Your time");
  });
});

// ── MARQUEE_ROWS ──────────────────────────────────────────────

describe("MARQUEE_ROWS", () => {
  it("is a 2-element tuple of non-empty string arrays", () => {
    expect(MARQUEE_ROWS).toHaveLength(2);
    for (const row of MARQUEE_ROWS) {
      expect(Array.isArray(row)).toBe(true);
      expect(row.length).toBeGreaterThan(0);
      for (const item of row) {
        expect(typeof item).toBe("string");
        expect(item.length).toBeGreaterThan(0);
      }
    }
  });
});

// ── ABOUT_COPY ────────────────────────────────────────────────

describe("ABOUT_COPY", () => {
  it("has heading, body, and skills fields", () => {
    expect(typeof ABOUT_COPY.heading).toBe("string");
    expect(ABOUT_COPY.heading.length).toBeGreaterThan(0);
    expect(typeof ABOUT_COPY.body).toBe("string");
    expect(ABOUT_COPY.body.length).toBeGreaterThan(0);
    expect(Array.isArray(ABOUT_COPY.skills)).toBe(true);
    expect(ABOUT_COPY.skills.length).toBeGreaterThan(0);
    for (const skill of ABOUT_COPY.skills) {
      expect(typeof skill).toBe("string");
      expect(skill.length).toBeGreaterThan(0);
    }
  });
});

// ── TECH_LOGOS ────────────────────────────────────────────────

describe("TECH_LOGOS", () => {
  it("is a non-empty array with accessible local marks", () => {
    expect(TECH_LOGOS.length).toBeGreaterThan(0);
    for (const entry of TECH_LOGOS) {
      expect(typeof entry.name).toBe("string");
      expect(entry.name.length).toBeGreaterThan(0);
      expect(typeof entry.mark).toBe("string");
      expect(entry.mark.length).toBeGreaterThan(0);
      expect(entry.color).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });
});

// ── PROJECT_CATEGORIES ────────────────────────────────────────

describe("PROJECT_CATEGORIES", () => {
  it("is a non-empty readonly array of uppercase strings", () => {
    expect(Array.isArray(PROJECT_CATEGORIES)).toBe(true);
    expect(PROJECT_CATEGORIES.length).toBeGreaterThan(0);
    for (const cat of PROJECT_CATEGORIES) {
      expect(typeof cat).toBe("string");
      expect(cat).toBe(cat.toUpperCase());
    }
  });
});

// ── QUOTE ─────────────────────────────────────────────────────

describe("QUOTE", () => {
  it("has text and author fields", () => {
    expect(typeof QUOTE.text).toBe("string");
    expect(QUOTE.text.length).toBeGreaterThan(0);
    expect(typeof QUOTE.author).toBe("string");
    expect(QUOTE.author.length).toBeGreaterThan(0);
  });
});

// ── CONTACT_CTA ───────────────────────────────────────────────

describe("CONTACT_CTA", () => {
  it("has heading, subheading, and email fields", () => {
    expect(typeof CONTACT_CTA.heading).toBe("string");
    expect(CONTACT_CTA.heading.length).toBeGreaterThan(0);
    expect(typeof CONTACT_CTA.subheading).toBe("string");
    expect(CONTACT_CTA.subheading.length).toBeGreaterThan(0);
    expect(typeof CONTACT_CTA.email).toBe("string");
    expect(CONTACT_CTA.email).toContain("@");
  });
});

// ── FOOTER ────────────────────────────────────────────────────

describe("FOOTER", () => {
  it("has tagline, navItems, and copyright fields", () => {
    expect(typeof FOOTER.tagline).toBe("string");
    expect(FOOTER.tagline.length).toBeGreaterThan(0);
    expect(Array.isArray(FOOTER.navItems)).toBe(true);
    expect(FOOTER.navItems.length).toBeGreaterThan(0);
    for (const item of FOOTER.navItems) {
      expect(item).toHaveProperty("label");
      expect(item).toHaveProperty("href");
    }
    expect(typeof FOOTER.copyright).toBe("string");
    expect(FOOTER.copyright.length).toBeGreaterThan(0);
  });
});

// ── Identity guard: no Ifalf personal identity ────────────────

describe("identity guard", () => {
  const IFALF_MARKERS = [
    "ifalfahri16@gmail.com",
    "IFALFAHRIA",
    "ifalfahri",
    "ifalfahria",
    "ifalf.com",
  ] as const;

  const allConstantStrings = JSON.stringify({
    IDENTITY,
    SOCIALS,
    NAV_LINKS,
    PROJECTS,
    HERO_CLOCK,
    MARQUEE_ROWS,
    ABOUT_COPY,
    TECH_LOGOS,
    PROJECT_CATEGORIES,
    QUOTE,
    CONTACT_CTA,
    FOOTER,
  }).toLowerCase();

  for (const marker of IFALF_MARKERS) {
    it(`does not contain "${marker}" in any exported constant`, () => {
      expect(allConstantStrings).not.toContain(marker.toLowerCase());
    });
  }
});

// ── Negative validation: project entries must have required fields ─

describe("negative validation", () => {
  it("a project entry missing title would fail validation", () => {
    const requiredProjectFields = ["title", "href", "displayTitle", "subtitle", "tech", "year"] as const;
    for (const project of PROJECTS) {
      for (const field of requiredProjectFields) {
        expect(project).toHaveProperty(field);
        expect((project as Record<string, unknown>)[field]).toBeTruthy();
      }
    }
  });
});
