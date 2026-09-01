# POC Review — BHMR Studios

**Status:** BUILT — ready for client review
**Date:** 2026-09-01
**Built by:** Claude Code, under D-009 authorization
**Phase:** PHASE 2 — PROOF OF CONCEPT

> **This review is not independent.** The same agent wrote the code and this
> assessment. AGENTS.md Section H requires that no AI approve its own output,
> and this document does not approve anything — it reports. A separate review
> pass (Codex, or a fresh Claude session) before the POC reaches the client is
> recorded as **R-008** and is still recommended.

---

## 1. What was built

A single-page coded proof of concept at `/`, composed of six parts:

| Part              | Section id | Purpose                                                    |
| ----------------- | ---------- | ---------------------------------------------------------- |
| Navigation        | —          | Fixed pill nav; condenses on scroll; full sheet below `lg` |
| Hero              | `#top`     | The headline, subline, two CTAs, abstract visual, marquee  |
| Editorial section | `#beliefs` | "What we believe" — three positioning statements           |
| Process section   | `#process` | The seven stages, with soft/hard gates                     |
| CTA               | `#start`   | "Tell us what you are trying to build."                    |
| Footer            | —          | Recap, contact, registered-entity details                  |

All copy is verbatim from `docs/references/Homepage_Copy.docx`, held in
`src/content/home.ts`. **Nothing was invented** — no testimonials, client
logos, case studies, metrics or placeholder lorem.

One content correction: the live site truncates the headline after "worse
product". The supplied copy runs through **"and a better site."** — the clause
that actually lands the argument — so it is restored, and set in serif italic
and accent as the sentence's punchline.

---

## 2. Why these sections

The brief allowed one editorial and one process/capability section. The
choices were made against what the client actually questioned.

- **"What we believe"** over the capabilities grid. Capabilities are a list any
  studio could publish. The beliefs carry BHMR's voice — blunt, specific,
  slightly combative — and voice is what makes a marketing site feel like a
  company rather than a template.
- **The seven stages** over "Who we work with". It is the most distinctive
  asset in the entire copy set, it is structurally interesting enough to prove
  a layout system, and it directly answers the concern that drove this
  engagement: Nikky spent half a project timeline micromanaging the previous
  freelancer. A section that renders named owners and explicit approval gates
  argues the point in the medium itself.

---

## 3. Visual direction

Retained from the existing revamp, because the client said she liked it:
warm paper rather than white, warm near-black rather than pure black, the
BHMR orange, and a high-contrast editorial serif.

Changed:

| Area          | Before                                  | Now                                                             |
| ------------- | --------------------------------------- | --------------------------------------------------------------- |
| Design values | Hard-coded per component                | Tokens in `@theme` — the client's specific complaint            |
| Headline      | Truncated; video thumbnail mid-sentence | Complete; type given the whole stage                            |
| Structure     | One continuous light page               | Tonal shift — paper → ink at the process section, back to paper |
| Imagery       | Small inline video, doodle arrow        | Original abstract layer stack, built in CSS                     |
| Orange        | One value, white text on it (2.9:1)     | Three roles, all passing AA                                     |

**Type:** Instrument Serif (display) + Instrument Sans (UI), via `next/font`.
One family, two voices — no second licence, and a coherent pairing.

**The tonal shift is the structural device.** Light for argument, dark for
process, light again for the ask. It gives the page depth and range without
requiring photography the client has not supplied.

---

## 4. Motion

Six patterns, all from shared tokens in `src/lib/motion/tokens.ts` — which is
what makes them read as one motion language rather than six ideas.

| #   | Pattern                 | Where              | Implementation                   |
| --- | ----------------------- | ------------------ | -------------------------------- |
| 1   | Hero entrance           | Headline           | GSAP, line-mask rise, staggered  |
| 2   | Scroll text reveal      | Section headings   | GSAP + ScrollTrigger, same mask  |
| 3   | Section reveal          | All content blocks | GSAP, fade + 24px rise           |
| 4   | Media reveal + parallax | Hero layer stack   | GSAP, staggered settle, scrubbed |
| 5   | Hover micro-interaction | Buttons, nav links | CSS transitions                  |
| 6   | Scroll-linked progress  | Process rail       | GSAP ScrollTrigger, scrubbed     |

Deliberately **not** done: scroll hijacking, pinned sections, a preloader,
cursor effects. The current site's hero pins and fights the scroll; that is
the behaviour flagged as "breaks down", and it is not reproduced here.

Patterns 5 uses CSS rather than GSAP because a hover transition does not need
a timeline. The marquee is a CSS keyframe for the same reason — a permanently
running animation should not occupy the JS thread.

**Line splitting is measured, not hard-coded.** GSAP's SplitText is a paid
plugin, so `TextReveal` groups words by `offsetTop` to find real visual lines.
That keeps the mask correct at every width; a hard-coded split would break at
the first unexpected viewport.

---

## 5. Responsive behaviour

Verified at **320, 375, 768 and 1440 px**.

- Zero horizontal overflow at every width (measured, not eyeballed —
  `scrollWidth === clientWidth`, and no element escapes its container except
  inside deliberate `overflow-hidden` clips).
- Mobile is designed, not shrunk: CTAs go full-width and stacked instead of
  wrapping at two unequal widths; the hero visual moves from behind the type
  to below it; plane size and stack spacing scale together so the composition
  keeps its proportions.
- The nav switches to a full-height sheet below `lg`, not `md` — at 768 the
  desktop nav was cramped enough to wrap "Work With Us" onto two lines.
- Type is fluid via `clamp()`, with lower bounds tuned for a 375px phone.

---

## 6. Components created

```
src/components/layout/     Container, Navigation, Footer
src/components/ui/         Button, Eyebrow, SectionHeading, Marquee
src/components/sections/   Hero, EditorialSection, ProcessSection,
                           ProcessTimeline, CTASection
src/components/visuals/    LayerStack
src/lib/motion/            tokens, gsap, Reveal, TextReveal
src/lib/utils/             cn
src/content/               home.ts
```

Everything visual composes from `Container`, `SectionHeading`, `Eyebrow` and
`Button`. No page-specific one-off styling; no hard-coded colour or spacing
values in any component.

Only `Navigation`, `ProcessTimeline`, `LayerStack`, `Reveal` and `TextReveal`
are client components — the rest render on the server.

---

## 7. Technical decisions

- **GSAP added** (D-011), the only new dependency. One package.
- **No** state library, no CSS-in-JS, no icon library, no `clsx`/`tailwind-merge`
  — a six-line `cn()` covers the need.
- **No** backend, database, CMS, auth, analytics, HubSpot or Google Sheets.
- Imagery is generated in CSS. Nothing is downloaded, nothing is licensed,
  nothing is copied from either reference site.

### Two robustness fixes worth calling out

Both address the exact failure mode the client complained about.

1. **Stranded-content bug (ScrollTrigger).** ScrollTrigger caches element
   positions when a trigger is created. Web fonts swapping in — and the
   headline re-splitting into lines — reflow the page afterwards, leaving
   those positions stale. A section could sit permanently invisible in its
   hidden "from" state. Fixed by refreshing triggers once fonts settle, and by
   not using scroll triggers for above-the-fold hero content at all.

2. **Frame-loop watchdog.** Entrance animations hide an element and tween it
   back. If the frame loop never runs, the content simply never appears. This
   is real: offscreen renderers, heavy main-thread contention and some
   embedded webviews all report `visibilityState: "visible"` while firing zero
   frames — it happened during this build's own verification. A watchdog now
   confirms a frame arrives and, if none does, every motion component drops
   back to plain rendering. **Unanimated content beats invisible content.**

---

## 8. Accessibility

Measured, not assumed:

- **Contrast:** all 23 distinct text/background pairs pass WCAG AA. Lowest is
  4.89:1. This required splitting the orange into three roles — paper text on
  the bright orange is only 2.9:1, so buttons use ink-on-orange (5.6:1), and a
  deeper `accent-ink` is used wherever the accent is text on paper.
- **Structure:** one `h1`, no skipped heading levels, `lang="en"`.
- **Keyboard:** visible accent focus ring on every interactive element; skip
  link to `#main`; the mobile sheet moves focus in, closes on Escape, returns
  focus to its toggle, and locks body scroll.
- **Motion:** `prefers-reduced-motion` disables every animation, GSAP and CSS
  alike. Nothing is hidden behind an animation that reduced-motion users never
  see.
- **Links:** all 15 in-page anchors resolve. No dead links.

---

## 9. Known limitations

1. **Motion was not visually confirmed frame-by-frame.** The verification
   browser never delivered a frame (zero rAF callbacks despite reporting
   visible), so animation was validated by construction, by DOM state, and by
   the watchdog's fallback path — not by watching it run. **Open the preview
   in a normal browser before sending it to the client.** This is the single
   most important outstanding check.
2. Nav labels are the POC's own sections, not the nine-page IA. Shipping
   Services/Pricing/FAQ links with nowhere to go would reproduce the exact
   defect this POC exists to disprove.
3. `Container`'s `wide` variant and `Button`'s `invert` variant are defined
   but currently unused — they exist for the sections not yet built.
4. No favicon or OG image yet; the scaffold default is still in place.
5. Cross-browser testing (Safari, Firefox, Edge) has not been done. The 3D
   transform stack in `LayerStack` is the most likely place for a difference.
6. Design tokens are POC working values, not an approved brand system.

---

## 10. Recommendation

**The direction is strong enough to present.** The typography, the tonal
shift, and the process section give the client something specific to react to,
and the whole thing is built on tokens and reusable components — which is the
concrete answer to "he hard-coded it".

Before sending:

1. Open it in a real browser and watch the motion (limitation 1).
2. Get a second pair of eyes on it — R-008.
3. Settle the commercial position on POC effort — D-013.

After feedback, the natural sequence is: freeze the visual direction, then
Figma, then the remaining pages. Not before.

---

_Owner: CODEX (governance) · Built by Claude Code under D-009_
_Status: BUILT — awaiting client review_
