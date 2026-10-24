import { notFound } from "next/navigation";

// Unknown paths under a locale render the 404 inside the locale root layout
// (fonts, colours, <html lang dir>) instead of Next's bare global 404.
export default function CatchAll() {
  notFound();
}
