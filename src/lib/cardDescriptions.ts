export interface CardInfo {
  summary: string;
  cta: string;
}

export const cardDescriptions: Record<string, CardInfo> = {
  'Buy Now': {
    summary: 'Discover our Drop 1 — a faux leather silhouette with hand-finished gold chain detailing. Designed to move with you, from day to night.',
    cta: 'Shop Now',
  },
  'Discover Versions': {
    summary: 'Explore every expression of Drop 1 — from noir to ivory, each version carries its own character while sharing the same meticulous craft.',
    cta: 'View Collection',
  },
  'Discover': {
    summary: 'Clasp is a study in restraint and intention — where Indian craftsmanship meets contemporary minimalism. Every stitch tells a story.',
    cta: 'Our Story',
  },
  'Contact Us': {
    summary: 'Have a question, collaboration idea, or just want to say hello? We\'d love to hear from you.',
    cta: 'Get in Touch',
  },
};
