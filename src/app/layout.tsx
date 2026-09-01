import type { Metadata } from 'next';
import { Archivo, DM_Serif_Display, Instrument_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/**
 * Four faces, each with one job.
 *
 * Archivo 900 in caps carries the display voice — the heavy, tight, confident
 * treatment the client pointed to, with words picked out in accent. DM Serif
 * Display appears only as an italic emphasis against it. Instrument Sans is
 * for reading, JetBrains Mono for labels and indices.
 */
const archivo = Archivo({
  variable: '--font-archivo',
  subsets: ['latin'],
  weight: ['500', '700', '900'],
  display: 'swap',
});

const dmSerif = DM_Serif_Display({
  variable: '--font-dm-serif',
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

const jetbrainsMono = JetBrains_Mono({
  variable: '--font-jetbrains-mono',
  subsets: ['latin'],
  weight: ['400', '500'],
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
      className={`${archivo.variable} ${dmSerif.variable} ${instrumentSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}
