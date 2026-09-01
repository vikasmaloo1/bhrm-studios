import type { Metadata } from 'next';
import { Instrument_Sans, Instrument_Serif } from 'next/font/google';
import './globals.css';

/**
 * Instrument Serif carries the display voice — high contrast, editorial, and
 * close to the serif already in use on the current BHMR site, so the POC reads
 * as an evolution of the brand rather than a replacement of it.
 *
 * Instrument Sans handles UI and body from the same family, which keeps the
 * pairing coherent without a second typeface to license.
 */
const instrumentSerif = Instrument_Serif({
  variable: '--font-instrument-serif',
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  display: 'swap',
});

const instrumentSans = Instrument_Sans({
  variable: '--font-instrument-sans',
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'BHMR Studios — Design and full product builds',
  description:
    'We design and build the whole thing, brand, product, front end, back end, so nobody on your team has to play project manager between three freelancers.',
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang="en"
      className={`${instrumentSerif.variable} ${instrumentSans.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
