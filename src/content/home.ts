/**
 * Homepage content — BHMR Studios POC.
 *
 * Copy sourced from client-supplied materials + the current BHMR revamp
 * (bhrm-studios.vercel.app). Nothing invented — no testimonials, client
 * logos, case studies or statistics have been added.
 */

export const site = {
  name: 'BHMR Studios',
  location: 'Ahmedabad, India',
  tagline: 'The embedded build partner',
} as const;

export const nav = {
  links: [
    { label: 'The Address', href: '#address' },
    { label: 'Beliefs', href: '#beliefs' },
    { label: 'How We Work', href: '#process' },
  ],
  cta: { label: 'Start a Conversation', href: '#start' },
} as const;

export type HeadlineWord = { text: string; accent?: boolean; italic?: boolean };

/**
 * The client's exact headline — restored in full through
 * "and a better site." (the clause that lands the argument).
 */
export const hero = {
  eyebrow: 'BHMR Studios',
  index: '(01) — Homepage',
  headline: [
    { text: 'Your website' },
    { text: 'should not be' },
    { text: 'the reason' },
    { text: 'you' },
    { text: 'lose customers', accent: true },
    { text: 'to a competitor with a' },
    { text: 'worse product', italic: true },
    { text: 'and a' },
    { text: 'better site.', accent: true },
  ] satisfies HeadlineWord[],
  subline:
    'We design and build the whole thing — brand, product, front end, back end — so nobody on your team plays project manager between three freelancers who never reply on the same day.',
  actions: [
    { label: 'How We Work', href: '#process', variant: 'primary' as const },
    { label: 'Start a Conversation', href: '#start', variant: 'ghost' as const },
  ],
  marquee: 'Brand · Product · Front end · Back end',
  meta_strip: [
    { label: 'Studio', value: 'Ahmedabad, IN' },
    { label: 'Founded', value: '2026' },
    { label: 'Scope', value: 'Brand · Product · Code' },
    { label: 'Support', value: '30 days, every build' },
  ],
  /**
   * The service stack, drawn as typography inside the hero card rather than
   * photographed — see Hero.tsx. Same four pillars as the marquee, in the
   * order the copy uses them.
   */
  stack: ['Brand', 'Product', 'Front end', 'Back end'],
} as const;

export const address = {
  eyebrow: 'The Honest Address',
  index: '01',
  heading: 'Exactly who we are, who we build for, and how we actually work.',
  paragraphs: [
    'We started this studio in 2026, so no, we cannot show you twenty years of case studies. What we can show you is exactly how we work, who is doing the work, and why we think most agencies make this harder than it needs to be.',
    'If you run an SMB and your current website looks like it was built by your nephew in 2015, we can help. If you are a funded startup racing toward your next round and you need a product that looks like you already raised the round after that, we can help with that too. Same team either way, just a different starting point.',
  ],
  industries: ['SaaS', 'Ecommerce', 'Healthcare', 'Fintech', 'Edtech', 'B2B'],
  regions: 'US · UK · Canada · Australia · NZ · UAE · Singapore · Europe',
  image: {
    src: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1100&q=80',
    alt: 'Studio workspace with design tools, sketches and laptop',
  },
} as const;

export const clientTypes = {
  eyebrow: 'Who We Work With',
  index: '02',
  heading: 'A few kinds of clients, one team.',
  intro:
    'Same team either way, just a different starting point. What changes is where we start, not who shows up.',
  items: [
    {
      label: 'Pre-launch founders',
      body: "Founders who have validated an idea and locked a name, and need a professional identity in place before they build anything — or before they bring on a team, ours or anyone else's, to build it.",
    },
    {
      label: 'Growing SMBs',
      body: 'Owners and operators done with template sites and DIY builders, who want something that looks like a real business because it is one. Services, ecommerce, local and regional brands.',
    },
    {
      label: 'Funded startups',
      body: 'Founders shipping products that need to look and feel like the round they are trying to raise, not the one they just closed. B2B and B2C, from pre-seed through Series B.',
    },
  ],
} as const;

export const editorial = {
  eyebrow: 'What We Believe',
  index: '03',
  heading:
    'A website that looks great and does nothing for your revenue is an expensive piece of art.',
  intro:
    'Most product problems people bring to us are not actually design problems. They are “we never sat down and decided what this is supposed to do” problems, wearing a design problem’s clothes.',
  beliefs: [
    {
      index: '01',
      text: 'You should be able to explain why your product looks the way it does, in one sentence, without needing us in the room.',
    },
    {
      index: '02',
      text: 'Design and code should not live in different postcodes. One team that talks to itself ships faster than three that don’t.',
    },
    {
      index: '03',
      text: 'Your website is a colleague — the one that never sleeps and does the first pitch for you. Treat it like one.',
    },
    {
      index: '04',
      text: 'If your competitor is winning with a worse product, the problem is not the product. It’s the front door.',
    },
  ],
} as const;

export const statement = {
  label: 'What We Do',
  words: ['We', 'design', 'and', 'build', 'the', 'whole', 'thing.'],
  support:
    'Brand, product, front end, back end. One team that actually talks to itself, so you are not managing contractors instead of running your business.',
} as const;

export type Gate = { kind: 'soft' | 'hard'; text: string };
export type Stage = {
  number: string;
  title: string;
  owner: string;
  body: string;
  gates: Gate[];
};

export const process = {
  eyebrow: 'How We Work',
  index: '04',
  heading: 'Seven stages. Every one has a name attached to it, not a department.',
  intro:
    'Every stage ends with either a quick internal check or an actual decision from you, so you always know exactly where things stand and who is on the hook for what.',
  gateNote:
    'Soft gate = we check our own work before it reaches you. Hard gate = we stop and wait for your sign-off. Nothing expensive happens past a hard gate until you say go.',
  stages: [
    {
      number: '01',
      title: 'Discovery & Alignment',
      owner: 'Project Lead',
      body: 'We sit inside your actual business, not a questionnaire. What are people paying for, where does the current experience lose them, what does your competitor get wrong that you could get right.',
      gates: [
        { kind: 'soft', text: 'Internal review of discovery notes against the brief.' },
        {
          kind: 'hard',
          text: 'You approve the problem statement and the goals we are optimizing for.',
        },
      ],
    },
    {
      number: '02',
      title: 'Scope & Roadmap Lock',
      owner: 'Project Lead + Design Lead',
      body: 'Discovery becomes a plan. What gets built, in what order, on what timeline — and, just as importantly, what we are deliberately choosing not to build yet.',
      gates: [
        { kind: 'soft', text: 'Internal reality check on scope vs timeline.' },
        {
          kind: 'hard',
          text: 'You approve the fixed scope. Changes now go through a change request.',
        },
      ],
    },
    {
      number: '03',
      title: 'Design',
      owner: 'Design Lead',
      body: 'Brand, interface, and user flow take shape — built around how people actually decide to buy or sign up, not what looks good in a portfolio shot.',
      gates: [
        { kind: 'soft', text: 'Second senior designer reviews against approved scope and goals.' },
        {
          kind: 'hard',
          text: 'You review and approve the final designs. Engineering waits for the green light.',
        },
      ],
    },
    {
      number: '04',
      title: 'Engineering & Build',
      owner: 'Engineering Lead',
      body: 'Front end and back end come together. Modern, maintainable code — not a stack that needs a rebuild in two years.',
      gates: [
        { kind: 'soft', text: 'Internal code review and a first QA pass before you see it.' },
        {
          kind: 'hard',
          text: 'You walk through the working build and confirm it does what Stage 2 promised.',
        },
      ],
    },
    {
      number: '05',
      title: 'Testing & Hardening',
      owner: 'QA Lead',
      body: 'We test the build properly — functionality, accessibility, edge cases. The stuff that only surfaces once real people start using something.',
      gates: [
        {
          kind: 'soft',
          text: 'Full internal test pass: automated where it makes sense, manual where it matters.',
        },
        { kind: 'hard', text: 'You sign off that the build is ready to go live.' },
      ],
    },
    {
      number: '06',
      title: 'Launch & Handover',
      owner: 'Project Lead',
      body: 'We take it live. You get full documentation, credentials, and source — not a black box you need us forever to open.',
      gates: [
        {
          kind: 'soft',
          text: 'A clear handover checklist so you know exactly what has been delivered.',
        },
      ],
    },
    {
      number: '07',
      title: 'Post-Launch Support',
      owner: 'Project Lead · 30 days included',
      body: 'For 30 days after launch, we are still watching, fixing what surfaces, and answering the questions that only come up once real users are actually in the product.',
      gates: [],
    },
  ] satisfies Stage[],
} as const;

export const cta = {
  eyebrow: 'Start the Conversation',
  index: '05',
  heading:
    'Tell us what you are building. We will tell you honestly if we are the right people for it.',
  body: 'A few lines about your business and where you are stuck. A real person reads every message and replies — no chatbot pretending to be one.',
  action: { label: 'Start a Conversation', href: '#start' },
  meta: [
    { label: 'Email', value: 'hello@bhmrstudios.com' },
    { label: 'Reply time', value: 'Under 24 hours' },
    { label: 'Timezones', value: 'US · UK · IN · APAC' },
  ],
} as const;

export const footer = {
  recap:
    'BHMR Studios — Design and full product builds for growing SMBs and funded startups. One embedded team, brand through back end.',
  email: 'hello@bhmrstudios.com',
  address:
    '606, Block A, Prahladnagar Trade Center, B/H Titanium City Center Mall, Ahmedabad, Gujarat 380051, India',
  registration: [
    { label: 'CIN', value: 'U62012GJ2026PTC180167' },
    { label: 'GSTIN', value: '24AAOCB9077H1Z8' },
    { label: 'D-U-N-S', value: '581775943' },
  ],
  copyright: '© 2026 BHMR Studios Private Limited. All rights reserved.',
} as const;
