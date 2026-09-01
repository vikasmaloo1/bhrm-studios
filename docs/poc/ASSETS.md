# POC Visual Assets

**Status:** POC placeholders — all replaceable
**Last updated:** 2026-09-01

---

## The set

| Asset                  | Source                                          | Used by                                                                                         | Notes                                                                                                                                                                                                      |
| ---------------------- | ----------------------------------------------- | ----------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `cta-flow.webp`        | Generated — `scripts/generate-media.py`         | `CTASection.tsx` background                                                                     | Flowing orange light on near-black. Owner asked to keep this exact look after seeing an earlier, third-party-hosted version live; this is a self-hosted original recreating the same visual family. 13 KB. |
| Studio workspace photo | Unsplash (`address.image` in `content/home.ts`) | `AddressSection.tsx` sticky column                                                              | Real photography, Unsplash License — free for commercial use, no attribution required. The only photograph on the page.                                                                                    |
| Everything else        | Typography / CSS / SVG                          | Hero service-stack card, section headings, giant outline wordmarks, process progress rail, etc. | No image file — drawn with Tailwind/CSS or plain HTML.                                                                                                                                                     |

Four images that were on the page earlier in this POC's history are gone:

- Three Emergent-platform-hosted "glossy 3D render" images (hero, beliefs,
  and the original CTA background) — removed because they lived on a
  third-party domain (`static.prod-images.emergentagent.com`) outside this
  project's control, and because two of them contributed to the "gaming,
  not professional" feedback that drove this pass's rework. The CTA one was
  the exception — the owner liked its look specifically, so `cta-flow.webp`
  recreates it as an owned asset (see above).
- One generated plate (`art-orbit.webp`), left over from an earlier
  direction of this POC that was itself superseded. Removed as dead weight
  once nothing in the code referenced it any more.

---

## Provenance and licensing

- **`cta-flow.webp`** is generated from scratch by `scripts/generate-media.py`
  — no stock, no scraping, nothing copied from any reference site. Re-run
  the script after changing the palette constants at its top to match a
  brand refresh.
- **The Unsplash photo** is used under the Unsplash License (free for
  commercial and non-commercial use, no permission needed). Its ID and
  crop parameters live in `content/home.ts` under `address.image`.

Nothing on the page is hotlinked from a domain this project does not
control.

---

## Replacing an asset

- **`cta-flow.webp`**: edit the `cta_flow()` function in
  `scripts/generate-media.py` (ribbon count, colour, curve) and re-run the
  script, or drop in a different file at the same path — `CTASection.tsx`
  references it by a single `src`.
- **The Unsplash photo**: swap the `src`/`alt` in `content/home.ts`. It sits
  inside a fixed `aspect-[3/4]` frame, so a different source image will crop
  to fit rather than break the layout.

---

_Generated asset produced by `scripts/generate-media.py` · re-run with `python scripts/generate-media.py`_
