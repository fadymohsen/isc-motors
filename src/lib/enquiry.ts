export type EnquiryOption = { value: string; label: string };

// What a visitor can enquire about. Labels follow the Exhibitor Booklet: the three
// participation options, then the two marketing recommendations.
export const enquiryOptions: EnquiryOption[] = [
  { value: "general", label: "General enquiry" },
  { value: "custom-stand", label: "Custom Stand" },
  { value: "plug-and-play", label: "Plug & Play Booth" },
  { value: "thematic-spaces", label: "Thematic Spaces" },
  { value: "virtual-reveals", label: "Virtual Reveals" },
  { value: "challenges-competitions", label: "Challenges & Competitions" },
];

export const enquiryHref = (value: string) => `/contact?enquiry=${value}#enquiry`;

export const isEnquiry = (value: string | undefined): value is string =>
  Boolean(value) && enquiryOptions.some((option) => option.value === value);
