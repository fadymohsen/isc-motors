export type BlogPost = {
  slug: string;
  tag: string;
  title: string;
  date: string;
  excerpt: string;
  image: string;
  imagePosition?: string;
  body: string[];
};

export const posts: BlogPost[] = [
  {
    slug: "why-attend-jims-2026",
    tag: "Fundamentals",
    title: "Why You Should Attend JIMS 2026: What You'll See, Try and Experience",
    date: "October 16, 2026",
    excerpt:
      "From new car unveilings to live test drives, discover everything waiting for you at the Jeddah International Motor Show, 4–7 November 2026 at JCEE.",
    image: "/images/booklet/crowd.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "five-reasons-jims-2026",
    tag: "Fundamentals",
    title: "More Than a Car Show: 5 Reasons JIMS 2026 Is Worth the Trip",
    date: "October 16, 2026",
    excerpt:
      "JIMS 2026 is a family outing, an entertainment stage, and an industry showcase rolled into one free visit. Here are five reasons it's worth clearing your calendar for 4–7 November.",
    image: "/images/booklet/hero.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "national-importance-jims-2026",
    tag: "Authority",
    title: "Why JIMS 2026 Matters for Saudi Arabia's Automotive Future",
    date: "October 16, 2026",
    excerpt:
      "JIMS 2026 is more than a four-day event — it's where Vision 2030's EV localization push, institutional partners, and the region's active car buyers meet on one show floor.",
    image: "/images/booklet/tech-zone.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "twenty-editions-jims-2026",
    tag: "Brand & Authority",
    title: "Celebrating 20 Editions: What JIMS Means for Jeddah and the Kingdom",
    date: "October 16, 2026",
    excerpt:
      "JIMS 2026 marks its 20th edition as organizers describe it: the Kingdom's longest-running automotive stage, honoring 19 editions of history while leading the industry's next chapter.",
    image: "/images/booklet/talk.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "300000-buyers-jims-2026",
    tag: "B2B",
    title: "Why Showcasing Your Car at JIMS 2026 Puts You in Front of 300,000 Potential Buyers",
    date: "October 16, 2026",
    excerpt:
      "Up to 300,000 visitors, 60% Saudi and 40% international, over four days. Here's what that reach actually means for a brand deciding whether to exhibit at JIMS 2026.",
    image: "/images/booklet/stand-plug.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "brand-value-jims-2026",
    tag: "B2B",
    title: "Beyond the Sale: The Brand Value of Exhibiting at JIMS 2026",
    date: "October 16, 2026",
    excerpt:
      "Press coverage, influencer reach, and institutional credibility don't show up on a showroom sales report — but they're a real part of what exhibiting at JIMS 2026 is worth.",
    image: "/images/booklet/press.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "visit-checklist-jims-2026",
    tag: "Fundamentals",
    title: "Your JIMS 2026 Visit Checklist: How to Prepare Before You Go",
    date: "October 16, 2026",
    excerpt:
      "A practical, step-by-step checklist for visiting JIMS 2026 — registration, timing, parking, and how to plan your day at the Jeddah Center for Exhibitions and Events.",
    image: "/images/booklet/crowd.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "crowd-magnets-jims-2026",
    tag: "Experience",
    title: "What Actually Draws the Crowds? Inside JIMS 2026's Biggest Visitor Magnets",
    date: "October 16, 2026",
    excerpt:
      "With up to 300,000 visitors expected, JIMS 2026 isn't pulling crowds on car displays alone. Here's a breakdown of what actually drives attendance at the show.",
    image: "/images/booklet/hero.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "press-day-2026",
    tag: "Press Day",
    title: "Press Day: 100+ Journalists, One Morning",
    date: "November 4, 2026",
    excerpt:
      "A full morning, in the spotlight in front of Arabian press: scheduled brand launches, pre-appointed interviews, and a dedicated media centre.",
    image: "/images/booklet/press.jpg",
    body: [
      "A full morning, in the spotlight in front of Arabian press. Press Day brings together 100+ journalists from 10+ countries, with 20% international press, across 10+ press conferences.",
      "Scheduled brand launches will happen throughout Press Day to ensure that the media have access to the big news of the show.",
      "Exhibitors can offer their spokespeople for pre-appointed interviews with the media to fit around their own agenda.",
      "A dedicated media centre will provide studio space, technical support, and access to state-of-the-art broadcast facilities.",
      "All the press releases and assets from the press conference will be collated and hosted online by JIMS for use by Arabian media.",
    ],
  },
  {
    slug: "vip-night-2026",
    tag: "VIP Night",
    title: "Inside VIP Night: Industry Talks & Gala",
    date: "November 4, 2026",
    excerpt:
      "For those who want the privilege to be the first to see the show and connect with the industry. 1,000 pros & guests, 50+ key influencers.",
    image: "/images/booklet/talk.jpg",
    body: [
      "For those who want the privilege to be the first to see the show and connect with the industry. VIP Night welcomes 1,000 pros & guests and 50+ key influencers across 10+ curated sessions and talks.",
      "Guests will have an exclusive opportunity to experience all brand stands and zones before the experience opens to the public.",
      "Exclusive talks, panel discussions, and automotive masterclasses on tech, design, and sustainability for business and VIP guests.",
      "For the time-poor and those seeking an enhanced experience, JIMS will provide exclusive show tour experiences.",
      "Exhibitors and guests will be able to mix and enjoy champagne, canapés and dinner in a vibrant setting at Gala Night.",
    ],
  },
  {
    slug: "visitors-days-2026",
    tag: "Visitors Days",
    title: "Visitors Days: 10,000+ Reasons to Attend",
    date: "November 5 to 7, 2026",
    excerpt:
      "Three days for visitors to get closer to the exhibits and entertainment. 10,000+ visitors, 60% Saudis, 40% from around the world.",
    image: "/images/booklet/crowd.jpg",
    body: [
      "Three days for visitors to get closer to the exhibits and entertainment. 10,000+ visitors are expected, 60% Saudis and 40% from the rest of the world, spending an average of 2.5 hours on-site.",
      "Visitors get an exclusive first look at global premieres, production-ready electric vehicles (EVs), and futuristic concept cars.",
      "Host outdoor entertainment such as carting demonstrations, stunt driving shows, and motorcycle displays.",
      "Interactive exhibits feature virtual reality simulators, intelligent driving systems, and family-friendly or educational zones for younger visitors.",
      "Attendees can register to drive the newest models on closed tracks or local routes to test performance and comfort.",
    ],
  },
  {
    slug: "thematic-spaces-2026",
    tag: "Thematic Spaces",
    title: "New for 2026: Thematic Experience Zones",
    date: "November 2026",
    excerpt:
      "The curated zones will offer new high profile opportunities for brands to participate and showcase vehicles or technologies: Auto Display Lens, Audience Activation Spaces, Conversation Spaces.",
    image: "/images/booklet/tech-zone.jpg",
    body: [
      "This year, we're doing things a little differently. Step inside the exhibition hall to enter a world of cutting-edge technology, sleek designs, and mind-boggling innovation.",
      "The JIMS takes you on a curated journey through inspiring thematic spaces, promising an unmissable event for all passionate auto fans and beyond.",
      "The curated zones will offer new high profile opportunities for brands to participate and showcase vehicles or technologies. Within these zones, exhibitors and visitors will discover additional curated moments to inspire and connect.",
      "Bespoke packages upon request: Auto Display Lens, Audience Activation Spaces, Conversation Spaces.",
    ],
  },
  {
    slug: "exhibition-booth-design-leads",
    tag: "Booth Design",
    title: "More Than a Booth: How Smart Exhibition Design Turns Footfall into Leads",
    date: "October 9, 2026",
    excerpt:
      "Booth size doesn't generate leads — design does. See how ISCOM plans stand layout, flow and staffing to turn exhibition footfall into qualified leads.",
    image: "/images/booklet/stand-plug.jpg",
    imagePosition: "center",
    body: [],
  },
  {
    slug: "exhibition-logistics-behind-the-scenes",
    tag: "Behind the Scenes",
    title: "Behind Every Successful Show: The Logistics No One Sees",
    date: "October 13, 2026",
    excerpt:
      "Visitors never see the planning that makes a show feel effortless. See how ISCOM plans build, live operations and teardown for major exhibitions.",
    image: "/images/booklet/stand-custom.jpg",
    imagePosition: "center",
    body: [],
  },
];

export function getPostBySlug(slug: string) {
  return posts.find((p) => p.slug === slug);
}
