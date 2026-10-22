"use client";

import { useEffect } from "react";
import Script from "next/script";

export default function SetLocaleAttrs({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <Script
      id="set-locale-attrs"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang="${locale}";document.documentElement.dir="${locale === "ar" ? "rtl" : "ltr"}"`,
      }}
    />
  );
}
