const BASE = "https://isc-expo.net";

/**
 * Returns canonical + hreflang alternates for a given locale + path.
 * path should start with "/" or be "" for the home page.
 */
export function getAlternates(locale: string, path: string = "") {
  return {
    canonical: `${BASE}/${locale}${path}`,
    languages: {
      en: `${BASE}/en${path}`,
      ar: `${BASE}/ar${path}`,
      "x-default": `${BASE}/en${path}`,
    } as Record<string, string>,
  };
}
