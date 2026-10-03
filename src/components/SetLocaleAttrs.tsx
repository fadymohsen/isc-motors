"use client";

import { useEffect } from "react";

export default function SetLocaleAttrs({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === "ar" ? "rtl" : "ltr";
  }, [locale]);

  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `document.documentElement.lang="${locale}";document.documentElement.dir="${locale === "ar" ? "rtl" : "ltr"}"`,
      }}
    />
  );
}
