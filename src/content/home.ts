/**
 * Homepage content for the BHMR Studios POC.
 *
 * Every string here is taken verbatim from the client-supplied copy document
 * `docs/references/Homepage_Copy.docx`. Nothing is invented — no testimonials,
 * client logos, case studies or statistics have been added.
 *
 * Only the sections inside the agreed POC boundary are represented:
 * hero, one editorial section, one process section, CTA and footer.
 */

export const site = {
  name: 'BHMR Studios',
  location: 'Ahmedabad, India',
  tagline: 'The embedded build partner',
} as const;

/**
 * Navigation.
 *
 * These point at sections that exist in this POC, not at the full nine-page
 * IA (Services, Pricing, Careers, …). Shipping a nav whose links go nowhere
 * is precisely the "parts of it break down" problem this POC has to disprove,
 * so every link here resolves. The full IA returns when those pages do.
 */
export const nav = {
  links: [
    { label: 'What We Believe', href: '#beliefs' },
    { label: 'How We Work', href: '#process' },
    { label: 'Work With Us', href: '#start' },
  ],
  cta: { label: 'Start a Conversation', href: '#start' },
} as const;

/**
 * A headline segment. `accent` picks the word out in BHMR orange — the
 * treatment used on the current marketing site, where the emphasis lands on
 * specific words inside the sentence rather than on a trailing clause.
 */
export type HeadlineWord = { text: string; accent?: boolean };

export const hero = {
  eyebrow: 'BHMR Studios',
  meta: 'Ahmedabad, India',
  /**
   * The full headline, word-segmented for accent emphasis.
   *
   * The current live site truncates this after "worse product". The supplied
   * copy runs through "and a better site." — the clause that lands the whole
   * argument — so it is restored here.
   */
  headline: [
    { text: 'Your website' },
    { text: 'should not be' },
    { text: 'the reason you' },
    { text: 'lose customers', accent: true },
    { text: 'to a competitor' },
    { text: 'with a worse product' },
    { text: 'and a better site.', accent: true },
  ] satisfies HeadlineWord[],
  subline:
    'We design and build the whole thing, brand, product, front end, back end, so nobody on your team has to play project manager between three freelancers who never reply on the same day.',
  actions: [
    { label: 'How We Work', href: '#process', variant: 'primary' as const },
    { label: 'Start a Conversation', href: '#start', variant: 'ghost' as const },
  ],
  marquee: 'We build brands, products, and code',
  /** Mono meta strip under the hero — the "studio" register. */
  meta_strip: [
    { label: 'Studio', value: 'Ahmedabad, India' },
    { label: 'Founded', value: '2026' },
    { label: 'Scope', value: 'Brand · Product · Front end · Back end' },
    { label: 'Support', value: '30 days, every package' },
  ],
} as const;

export const editorial = {
  eyebrow: 'The honest address',
  heading: 'What we believe',
  intro:
    'We started this studio in 2026, so no, we cannot show you twenty years of case studies. What we can show you is exactly how we work, who is doing the work, and why we think most agencies make this harder than it needs to be.',
  beliefs: [
    {
      index: '01',
      text: 'A website that looks great and does nothing for your revenue is an expensive piece of art.',
    },
    {
      index: '02',
      text: 'Most product problems people bring to us are not actually design problems. They are “we never sat down and decided what this is supposed to do” problems, wearing a design problem’s clothes.',
    },
    {
      index: '03',
      text: 'You should be able to explain why your product looks the way it does, in one sentence, without needing us in the room. If you cannot, we have not done our job yet.',
    },
  ],
} as const;

/**
 * The pinned statement between the beliefs and the process.
 *
 * The sentence is lifted verbatim from the homepage subline ("We design and
 * build the whole thing, brand, product, front end, back end") — not invented
 * for the layout.
 */
export const statement = {
  label: 'What we do',
  words: ['We', 'design', 'and', 'build', 'the', 'whole', 'thing.'],
  support:
    'Brand, product, front end, back end. One team that actually talks to itself, so you are not managing contractors instead of running your business.',
} as const;

export type Gate = {
  kind: 'soft' | 'hard';
  text: string;
};

export type Stage = {
  number: string;
  title: string;
  owner: string;
  body: string;
  gates: Gate[];
};

export const process = {
  eyebrow: 'How we work',
  heading: 'Seven stages. Every one has a name attached to it, not a department.',
  intro:
    'Every one of them ends with either a quick internal check or an actual decision from you, so you always know exactly where things stand and who is on the hook for what.',
  gateNote:
    'A soft gate is us checking our own work before it reaches you, so you are never the first person to notice a problem. A hard gate is the opposite, a point where we stop and wait for your actual sign off before moving forward. Nothing expensive happens on the other side of a hard gate until you have said go.',
  stages: [
    {
      number: '01',
      title: 'Discovery and Alignment',
      owner: 'your Project Lead',
      body: 'We start by sitting inside your actual business, not a questionnaire. What are people paying for right now, where does the current experience lose them, what does your competitor get wrong that you could get right.',
      gates: [
        {
          kind: 'soft',
          text: 'Internal review of discovery notes against the brief, so we walk into the next conversation with a real point of view.',
        },
        {
          kind: 'hard',
          text: 'You approve the problem statement and the goals we are optimizing for. Nothing gets scoped until you agree we are solving the right problem.',
        },
      ],
    },
    {
      number: '02',
      title: 'Scope and Roadmap Lock',
      owner: 'your Project Lead, with your Design Lead',
      body: 'We turn discovery into an actual plan. What gets built, in what order, on what timeline, and just as importantly, what we are deliberately choosing not to build yet.',
      gates: [
        {
          kind: 'soft',
          text: 'Internal review to make sure the scope is realistic given the timeline, not just optimistic.',
        },
        {
          kind: 'hard',
          text: 'You approve the fixed scope document. Once this gate is cleared, changes go through a change request instead of quietly expanding the project.',
        },
      ],
    },
    {
      number: '03',
      title: 'Design',
      owner: 'your Design Lead',
      body: 'Brand, interface, and user flow take shape, built around how people actually decide to buy or sign up rather than what looks good in a portfolio shot.',
      gates: [
        {
          kind: 'soft',
          text: 'Internal design review against the approved scope and goals, checked by a second senior designer, not just the person who made it.',
        },
        {
          kind: 'hard',
          text: 'You review and approve the final designs. Engineering does not start building on anything you have not signed off on.',
        },
      ],
    },
    {
      number: '04',
      title: 'Engineering and Build',
      owner: 'your Engineering Lead',
      body: 'Front end and back end come together, no-code or hand-coded depending on what you need. Modern, maintainable code, not a stack that needs a rebuild in two years.',
      gates: [
        {
          kind: 'soft',
          text: 'Internal code review and a first QA pass before anything is shown to you, so early bugs never reach your screen.',
        },
        {
          kind: 'hard',
          text: 'You walk through the working build and confirm it does what was agreed in Stage 2.',
        },
      ],
    },
    {
      number: '05',
      title: 'Testing and Hardening',
      owner: 'your QA Lead',
      body: 'We test the build properly, not just click around it. Functionality, accessibility, and real world edge cases, the stuff that only shows up once actual people start using something.',
      gates: [
        {
          kind: 'soft',
          text: 'A full internal test pass, automated where it makes sense, manual where it matters.',
        },
        {
          kind: 'hard',
          text: 'You sign off that the build is ready to go live. This is the final gate before launch.',
        },
      ],
    },
    {
      number: '06',
      title: 'Launch and Handover',
      owner: 'your Project Lead',
      body: 'We take it live. You get full documentation, credentials, and source, not a black box you need us forever to open.',
      gates: [
        {
          kind: 'soft',
          text: 'A clear handover checklist, so you know exactly what has been given to you and what, if anything, is still pending.',
        },
      ],
    },
    {
      number: '07',
      title: 'Post Launch Support',
      owner: 'your Project Lead · 30 days, included on every package',
      body: 'This is the stage most agencies skip, or charge extra for on day one. For 30 days after launch, we are still watching, fixing anything that surfaces, and answering the questions that only come up once real users are actually in the product.',
      gates: [],
    },
  ] satisfies Stage[],
} as const;

export const cta = {
  eyebrow: 'Start the conversation',
  heading:
    'Tell us what you are trying to build. We will tell you honestly if we are the right people for it.',
  body: 'A few lines about your business and where you are stuck. A real person reads every message and replies, no chatbot pretending to be one.',
  action: { label: 'Start a Conversation', href: '#start' },
} as const;

export const footer = {
  recap:
    'BHMR Studios Private Limited. Design and full product builds for growing small to medium businesses and funded startups alike.',
  email: 'hello@bhmrstudios.com',
  address:
    '606, Block A, Prahladnagar Trade Center, B/H Titanium City Center Mall, Ahmedabad, Gujarat 380051, India',
  registration: [
    { label: 'CIN', value: 'U62012GJ2026PTC180167' },
    { label: 'GSTIN', value: '24AAOCB9077H1Z8' },
    { label: 'D-U-N-S', value: '581775943' },
  ],
  copyright: 'Copyright 2026 BHMR Studios Private Limited. All rights reserved.',
} as const;
