/**
 * Site content — edit this file to re-brand the whole site.
 *
 * Every section on the landing page renders from this object. Change the
 * copy here and the page follows; the components in components/sections/
 * only decide how it looks, never what it says.
 */

export interface Feature {
  keyword: string
  description: string
}

export interface FaqItem {
  question: string
  answer: string
}

export const site = {
  brand: 'Create A International Corporate',

  /**
   * The waiting screen — what this site shows while the real product is
   * being built. It is the default composition in app/page.tsx; replace it
   * with sections from the kit below when the product is ready.
   */
  waiting: {
    eyebrow: 'in the works',
    headline: 'Something good is taking shape.',
    sub: 'Create A International Corporate is being built right now — pages, data and all. This address will become it.',
    notify: {
      heading: 'Be first through the door',
      sub: 'Leave your email and we\u2019ll tell you the moment it opens.',
    },
    phases: ['laying foundations', 'shaping pages', 'wiring data', 'polishing details'],
  },

  hero: {
    eyebrow: 'full-stack starter',
    // Keep the headline to two short lines — it is set very large.
    headline: 'A running start.',
    sub: 'Next.js, FastAPI and PostgreSQL — already wired, already serving. Everything on this page is live: the forms write to your database and the status line below is a real health check.',
    primaryCta: { label: 'Get in touch', href: '#contact' },
  },

  features: [
    {
      keyword: 'Live',
      description:
        'Frontend, API and database run behind one gateway. Hot reload in development, hardened multi-stage builds for production.',
    },
    {
      keyword: 'Inbox',
      description:
        'The contact form below writes straight to PostgreSQL — no third-party form service, your data stays in your stack.',
    },
    {
      keyword: 'Audience',
      description:
        'Newsletter signup with unsubscribe built in, stored alongside the rest of your data and ready to export.',
    },
    {
      keyword: 'Night',
      description:
        'Dark mode that respects the system preference and remembers the choice — every component ships styled for both.',
    },
    {
      keyword: 'Shipped',
      description:
        'Dockerfiles, compose files and migrations included. The same images that run here deploy to staging and production.',
    },
  ] as Feature[],

  faq: [
    {
      question: 'How do I change what this page says?',
      answer:
        'Edit frontend/content/site.ts — every headline, feature and answer on this page lives in that one file. The components under components/sections/ control layout only.',
    },
    {
      question: 'Where do form submissions go?',
      answer:
        'Into your PostgreSQL database. The contact form posts to /api/contact and newsletter signups to /api/newsletter/subscribe — inspect them with docker compose exec db psql.',
    },
    {
      question: 'How do I add an API endpoint?',
      answer:
        'Model in backend/models, schema in backend/schemas, logic in backend/services, route in backend/routes, then wire it in main.py. The contact feature is the reference implementation.',
    },
    {
      question: 'How do I deploy it?',
      answer:
        'docker-compose.prod.yml builds production images behind a Traefik-ready configuration — no bind mounts, no published ports. Point your pipeline at it and go.',
    },
  ] as FaqItem[],

  contact: {
    heading: 'Say hello',
    sub: 'This form is real — submissions land in your database the moment you press send.',
  },

  newsletter: {
    heading: 'Get updates',
    sub: 'Occasional email, one-click unsubscribe.',
  },

  footer: {
    note: 'Built on a full-stack starter — Next.js, FastAPI, PostgreSQL.',
  },
}
