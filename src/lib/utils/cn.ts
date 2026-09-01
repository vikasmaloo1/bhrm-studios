/**
 * Minimal class-name joiner.
 *
 * The POC does not have conflicting-utility problems, so `clsx` and
 * `tailwind-merge` would be dependencies earning nothing.
 */
export function cn(...parts: Array<string | false | null | undefined>): string {
  return parts.filter(Boolean).join(' ');
}
