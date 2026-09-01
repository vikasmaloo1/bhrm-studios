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

Eleven behaviours, all built from shared primitives in `src/lib/motion/` so
the page has one motion vocabulary rather than a pile of one-off tweens.

| #   | Behaviour                | Trigger                       | Elements                             | Implementation                                                     |
| --- | ------------------------ | ----------------------------- | ------------------------------------ | ------------------------------------------------------------------ |
| 1   | Headline line reveal     | on load, 0.15s                | `h1` visual lines                    | GSAP, per-line clip mask, `yPercent 108 → 0`, staggered            |
| 2   | Hero plate wipe          | on load, 0.6s                 | hero media plate                     | GSAP `clipPath inset(0 0 100% 0) → inset(0)` + `scale 1.12 → 1`    |
| 3   | Hero content rise        | on load, 0.75s                | subline, actions, spec strip         | GSAP `opacity/y`, staggered                                        |
| 4   | Hero plate parallax      | scrub, hero top→bottom        | hero plate image                     | GSAP `yPercent 12`, `scrub: true`                                  |
| 5   | Hero recede              | scrub, hero centre→top        | whole hero stage                     | GSAP `scale 0.965`, `opacity 0.4` — next section climbs over it    |
| 6   | Scroll cue fade          | scrub, first 200px            | cue                                  | GSAP opacity; the bar itself is a CSS keyframe                     |
| 7   | Section mask reveal      | ScrollTrigger `top 82%`, once | every heading, eyebrow, belief, card | `MaskReveal` — clip-path, four directions                          |
| 8   | Editorial media parallax | scrub                         | editorial plate                      | `Parallax`, `yPercent ±7`, `scale 1.06 → 1`                        |
| 9   | Statement word resolve   | pinned scrub, `+=120%`        | each word of the statement           | GSAP colour tween `paper-edge → ink`, stagger 0.4                  |
| 10  | Process horizontal run   | pinned scrub, `+=1993px`      | the seven-stage track                | GSAP `x → -(scrollWidth - clientWidth)`, `scrub: 0.8`, `pin: true` |
| 11  | Hover micro-interactions | pointer                       | buttons, nav, footer links, email    | CSS transitions + GSAP `quickTo` for magnetic                      |

**Button hover** is a compound: a fill wipes up from the bottom edge, the
label slides out while a duplicate slides in beneath it, and the arrow
travels. All CSS — a hover state does not need a timeline, and CSS drops out
correctly under `motion-reduce` with no JS involved.

**Magnetic hover** (`Magnetic`) is gated behind
`(hover: hover) and (pointer: fine)`, so it never runs on touch, where there
is no hover state and the transform would only fight the tap.

Deliberately **not** done: scroll hijacking / smooth-scroll libraries, custom
cursors, preloaders, WebGL. Four of the five reference sites run Lenis; it is
the single biggest contributor to their "feel", and it is also scroll
hijacking — which is exactly the behaviour the client reported as broken on
the current revamp. It is available as an opt-in if she wants it after seeing
this.

### Mobile behaviour

| Behaviour       | Below `lg` (1024)                               | Below `md` (768)                       |
| --------------- | ----------------------------------------------- | -------------------------------------- |
| Process section | vertical list, per-row reveal + active tracking | same                                   |
| Statement       | —                                               | no pin; single scroll-triggered reveal |
| Magnetic        | disabled (coarse pointer)                       | disabled                               |
| Hero plate      | moves below the copy, full width                | same                                   |
| Nav             | full-height sheet with focus trap               | same                                   |

`gsap.matchMedia()` owns both boundaries and reverts cleanly on resize across
them, so rotating a tablet does not leave a half-applied pin.

### Reduced motion

`useShouldAnimate()` is the single gate every primitive checks. When the user
prefers reduced motion **no effect runs at all** — no "from" state is ever
applied, so nothing is hidden and nothing needs un-hiding. The two CSS
animations (marquee, scroll cue) are behind `motion-safe:`. Reduced motion is
respected live: the hook is a `useSyncExternalStore` over `matchMedia`, so
toggling the OS setting mid-session reverts the animations immediately.

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
- Imagery is eight generated artifacts (`scripts/generate-media.py`), not
  stock. See `docs/poc/ASSETS.md`. Nothing is licensed,
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

1. **Animation playback has never been watched.** The verification browser in
   this environment delivers **zero `requestAnimationFrame` callbacks** while
   reporting `visibilityState: "visible"`, so no animation could be played
   back or filmed. Every behaviour in section 4 is verified by construction
   and by DOM/computed-style inspection only. **Timing, easing and pacing are
   unproven and must be checked in Chrome.**
2. **Image compositing in the verification browser is unreliable.** The hero
   plate renders blank in screenshots. It was proven present three ways: the
   `<img>` is the topmost element at the plate's centre, it is loaded at
   546×655 with opacity 1, and canvas sampling shows **34.5% of its pixels are
   the accent orange**. The artwork is correct; the renderer is not painting
   that layer. Confirm visually in Chrome.
3. **The pinned behaviours could not be exercised.** ScrollTrigger `pin` needs
   a running frame loop. The horizontal track's _layout_ was verified by
   forcing `data-horizontal` (7 panels, row direction, 1993px of travel, clean
   column fallback), but the pin itself, its scrub feel, and pin-spacing on
   resize are unverified.
4. Cross-browser testing (Safari, Firefox, Edge) has not been done. The
   likeliest divergences are `clip-path` transitions and pinned sections in
   Safari.
5. No favicon or OG image yet.
6. Nav labels are the POC's own sections, not the nine-page IA — shipping
   links to pages that do not exist would reproduce the defect this POC is
   meant to disprove.
7. Design tokens are POC working values, not an approved brand system.
8. `Counter` and the `invert` button variant are built but unused; they exist
   for sections not yet in scope.

### What I verified programmatically

- **Breakpoints 360 / 390 / 480 / 768 / 1024 / 1280 / 1440:** zero horizontal
  overflow (`scrollWidth === clientWidth`, and no element escaping its
  container outside a deliberate clip), zero stranded-invisible elements.
- **Scroll depth:** 8.7–12.1 viewports before pins; ~12 with both pins active.
- **Media:** all four plates load and carry real pixel variation (canvas
  sampled, not just `complete === true`).
- **Links:** all in-page anchors resolve; zero broken.
- **Structure:** one `h1`, no skipped heading levels, `lang` set.
- **Fonts:** Archivo resolved on `h1` (79px at 1440, 30px at 360), JetBrains
  Mono resolved on labels.
- **Horizontal mode:** forced on — `flex-direction: row`, 7 × 480px panels,
  3418px track, 1993px travel, `h-screen`; forced off — clean `column`.
- **Touch targets:** raised to 44px minimum in the footer and logo.
- **Nav:** desktop links at ≥1024, sheet below; sheet traps focus, closes on
  Escape, restores focus, locks body scroll.
- **Gates:** `pnpm format:check`, `lint`, `typecheck`, `build` all pass.

### What must be checked manually in Chrome

1. Every animation in section 4 — does it play, and does the **timing feel
   right**? This is the whole unverified surface.
2. The hero plate and all four generated plates actually appearing.
3. The pinned horizontal process run: does it pin cleanly, scrub at a
   comfortable rate, and release without a jump?
4. The pinned statement: word-by-word resolve, and that `+=120%` is not too
   long a hold.
5. Resize across 1024 and 768 while mid-page — pins should re-init without
   leaving gaps.
6. Scroll performance / jank, especially the two scrubbed pins on a laptop.
7. `prefers-reduced-motion: reduce` — everything static, nothing hidden.
8. Real touch behaviour on a phone: no magnetic effects, no pin, momentum
   scrolling unaffected.

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
