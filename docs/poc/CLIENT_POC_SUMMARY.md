# BHMR Studios — Proof of Concept

Prepared for BHMR Studios · 1 September 2026

---

## What this is

A focused, working proof of concept for the BHMR Studios homepage — built in
code, running in a browser, using your actual copy.

Its job is narrow and specific: to show you the visual direction, the motion,
and the build quality before we commit to designing all nine pages. You should
be able to look at this and know whether it is the direction you want.

It is **not** the finished website, and it is not trying to be.

---

## What is included

- **Navigation** — including how it behaves on scroll, and the full-screen
  menu on phones and tablets
- **The hero** — your headline, set as the centrepiece
- **"What we believe"** — the three positioning statements
- **"How we work"** — all seven stages, with the soft and hard gates
- **The closing call to action**
- **The footer**

Everything you see uses your supplied copy, word for word. There are no
invented testimonials, no placeholder logos, no made-up statistics, and no
stock photography.

One small correction: the current site cuts your headline short at _"a worse
product"_. Your copy actually ends _"...and a better site."_ — which is the
line that makes the sentence land. It is restored here, and given emphasis.

---

## What is intentionally not included

These are deliberately out of scope for a proof of concept, not oversights:

- The other eight pages — About, Services, Pricing, Work With Us, Careers,
  Director of BD, Privacy, Terms
- The three-step qualification form
- The careers application flow
- HubSpot, Google Sheets, analytics, or any other integration
- Any backend, database, or CMS
- Figma files and the full design system

The nav links point to the sections that exist on this page. We would rather
show you three links that work than six that go nowhere.

---

## How to view it

```bash
pnpm install
pnpm dev
```

Then open **http://localhost:3000**.

Best viewed on a desktop browser first, then resize the window down to phone
width — the responsive behaviour is a deliberate part of what is being shown.

---

## Key design choices

**We kept what was working.** The warm off-white, the near-black, the orange,
and the editorial serif all come from the direction you already said you
liked. This is an evolution of it, not a replacement.

**Type does the heavy lifting.** The headline gets the whole stage rather than
sharing it with a small video. The closing clause is set in italic and orange
because it is the point of the sentence.

**The page changes tone as you move through it.** It opens light and
editorial, turns dark for the seven-stage process, then returns to light for
the closing ask. That shift gives the page depth and marks the move from
_what we think_ to _how it actually runs_.

**Everything is built from shared design values.** Colour, spacing, type
sizes and motion timings are defined once and referenced everywhere. Nothing
is hard-coded into individual sections. This is what makes the remaining pages
consistent with this one — and it directly addresses the problem you had
last time.

**The imagery is original.** The layered shapes in the hero are drawn in code,
not stock imagery — four planes settling into one object, which is the same
argument your copy makes about brand, product, front end and back end coming
from one team.

---

## Key interaction choices

Motion is used where it supports the story and nowhere else:

- The headline rises into place, line by line
- Sections reveal as you reach them
- The hero visual drifts gently and shifts with scroll
- The seven-stage rail fills as you read down it
- Buttons and links respond to hover

Just as important — what we avoided. No scroll hijacking, no forced loading
screen, no animation that gets between you and the content. If a visitor has
reduced motion enabled in their system settings, every animation switches off
and the page remains completely usable.

---

## Known limitations

- **The motion has not yet been watched in a normal browser.** It was built
  and verified structurally in an automated environment that could not play
  animations back. Please flag anything that feels off in timing or pacing.
- Only Chrome-family rendering has been checked so far; Safari and Firefox
  passes are still to come.
- No favicon or social-sharing image yet.
- Colour and spacing values are working values for this proof of concept.
  Final brand values get set properly in the design stage, with your input.

---

## What we would like from you

Please focus your feedback on the direction, not the details:

1. **Does this feel like BHMR?** Tone, personality, level of confidence.
2. **Is the visual quality where you want it?** Typography, spacing,
   composition.
3. **Does the motion feel right** — too much, too little, about right?
4. **Does the mobile version feel properly designed** rather than squeezed?
5. **Is the seven-stage section doing its job?** It is the most distinctive
   thing in your copy and we have given it the most room.

Specific copy edits, page-level details and anything about the other eight
pages can wait — those come after the direction is agreed.

---

## What happens next

Once you are happy with the direction, we freeze it and move into the Figma
design system and the full page designs, then engineering. Nothing beyond this
proof of concept starts until you have confirmed the direction.

---

_BHMR Studios Private Limited · Prepared by Vikas Maloo_
